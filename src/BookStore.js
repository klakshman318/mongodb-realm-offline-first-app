import React, {
    useState, 
    useEffect
} from 'react';

import {
    ActionSheetIOS,
    ActivityIndicator,
    StyleSheet,
    View
} from 'react-native';

// GenerateMongoLikeObjectId
import {ObjectId} from 'bson';

// get RealmApp Config
import getRealm from './database';

import ListBooks, {
    BookStoreHeader,
    AddEditBookModal,
    Categories
} from './components';

import commonStyles from './styles';

const initialBookValues = {
    title: '',
    author: '',
    category: '',
    price: '',
    realm_id: '2F6092d4c594587f582ef165a0' // replace it with your loggedIn userId or Any static id for testing
};

const initialAddEditBookModalValues = {
    pending: false,
    failed: false,
    visible: false,
    data: initialBookValues,
    isAdd: null
};

const BookStore = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addEditBookModal, setAddEditBookModal] = useState(initialAddEditBookModalValues);

    useEffect(() => {
        return fetchBooksListCall();
    }, []);

    fetchBooksListCall = () => {
        getRealm().then(realm => {
            const booksList = realm.objects('Book');
            setBooks(booksList);
            setLoading(false);
            booksList.addListener(() => {
                setBooks([...booksList]);
            });
            return () => {
              const booksList = realm.objects('Book');
              booksList.removeAllListeners();
              realm.close();
            };
        }).catch(error => {
            setLoading(false);
            console.log(error,'ERROR');
        });
    }

    const onChangeInput = (inputValue, inputName) => {
        setAddEditBookModal({
            ...addEditBookModal,
            data: {
                ...addEditBookModal.data,
                [inputName]: inputValue
            }
        });
    }

    const submitAddEditBook = async () => {
        if(addEditBookModal.data.title) {
            setAddEditBookModal((prevState) => ({
                ...prevState,
                pending: true,
                failed: false
            }));
            try {
                const realm = await getRealm();
                const newBook = {
                    _id: addEditBookModal.isAdd ? new ObjectId() : addEditBookModal.data._id,
                    ...addEditBookModal.data
                };
                if(addEditBookModal.data.title) {
                    realm.write(() => {
                        if(addEditBookModal.isAdd) {
                            realm.create('Book', newBook);
                        } else {
                            realm.create('Book', newBook, 'modified');
                        }
                    });
                    const booksListUpdated = realm.objects('Book');
                    setBooks([...booksListUpdated]);
                    setAddEditBookModal((prevState) => ({
                        ...prevState,
                        visible: false,
                        pending: false,
                        failed: false
                    }));
                }
            } catch(error) { 
                if(error){
                    setAddEditBookModal((prevState) => ({
                        ...prevState,
                        pending: false,
                        failed: true
                    }));
                }
            }
        }
    }

    const deleteBook = async (bookId) => {
        try {
            const realm = await getRealm();
            const deleteBook = realm.objectForPrimaryKey('Book', bookId);
            realm.write(() => {
                if(deleteBook) {
                    realm.delete(deleteBook);
                }
            });
            const results = realm.objects('Book');
            setBooks(results);
        } catch(error) { 
            if(error){
                console.log(error.message); 
            }
        }
    }

    const openAddEditBookModal = (action, data) => {
        setAddEditBookModal((prevState) => ({
            ...prevState,
            isAdd: action === 'add',
            visible: true,
            data
        }));
    }

    const closeAddEditBookModal = () => {
        setAddEditBookModal((prevState) => ({
            ...prevState,
            visible: false
        }));
    }

    const handleActionMenuList = (dataItem) => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: ["Cancel", "Edit Book", "Delete Book"],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'light'
        }, buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                // Edit Book
                openAddEditBookModal('edit', dataItem);
            } else if (buttonIndex === 2) {
                // Delete Book
                deleteBook(dataItem._id)
            }
        });
    }

    const renderHeader = () => {
        return (
            <View>
                <BookStoreHeader openAddEditBookModal={openAddEditBookModal} />
                <View style={commonStyles.vSpace4} />
                <Categories />
                <View style={commonStyles.vSpace1} />
            </View>
        )
    }

    return (
        <View style={styles.containerWrap}>
            {loading ? (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator color="#4C4CFF" size="large" />
                </View>
            ) : (
                <View style={styles.contentContainerWrap}>
                    {renderHeader()}
                    <View style={commonStyles.vSpace2} />
                    <ListBooks 
                        loading={loading}
                        fetchBooksListCall={fetchBooksListCall}
                        handleActionMenuList={handleActionMenuList}
                        books={books}
                    />
                </View>
            )}
            <AddEditBookModal 
                addEditBookModal={addEditBookModal}
                closeAddEditBookModal={closeAddEditBookModal}
                submitAddEditBook={submitAddEditBook}
                onChangeInput={onChangeInput}
            />
        </View>
    );
}

export default BookStore;

const styles = StyleSheet.create({
    containerWrap: {
        flex:1, 
        backgroundColor:'white'
    },
    contentContainerWrap: {
        flex:1, 
        backgroundColor:'transparent'
    },
    activityIndicatorContainer: {
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'
    }
});