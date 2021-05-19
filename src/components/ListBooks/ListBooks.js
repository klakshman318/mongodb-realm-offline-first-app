import React from 'react';
import { 
    FlatList,
    StyleSheet,
    View
} from 'react-native';

import BookItem from './Book';
import EmptyState from '../EmptyState';

const ListBooks = ({ loading, fetchBooksListCall, handleActionMenuList, books=[] }) => {

    const renderItem = ({item, index}) => {
        return (
            <BookItem 
                item={item}
                handleActionMenuList={handleActionMenuList} 
            />
        );
    }

    const booksListKeyExtractor = (item, index) => {
        return (item && item._id) ? item._id : index+'';
    }

    return (
        <View style={styles.containerWrap}>
            <FlatList 
                data={books}
                numColumns={2}
                ListEmptyComponent={EmptyState}
                renderItem={renderItem}
                keyExtractor={booksListKeyExtractor}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerWrap}
                onRefresh={fetchBooksListCall}
                refreshing={loading}
            />
        </View>
    );
}

export default ListBooks;

const styles = StyleSheet.create({
    containerWrap: {
        flex:1
    },
    contentContainerWrap: {
        flex:1, 
        backgroundColor:'transparent', 
        marginHorizontal:12
    }
});


