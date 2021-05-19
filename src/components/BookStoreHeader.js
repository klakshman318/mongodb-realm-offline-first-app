import React from 'react';
import { 
    StyleSheet,
    Text,
    View
} from 'react-native';

import { IconToggle } from '../utils';

import commonStyles from '../styles';

const drawerIconStyles = {icon: {transform: [{ rotate: '90deg'}]}};

const BookStoreHeader = ({ openAddEditBookModal }) => {

    const initialBookValues = {
        title: '',
        author: '',
        category: '',
        price: '',
        realm_id: '9705759424'
    };
    
    return (
        <View>
            <View style={styles.headerBarContainer}>
                <View>
                    <IconToggle 
                        name={'bar-chart-2'}
                        size={32}
                        set={'feather'}
                        styles={drawerIconStyles}
                        color={'#2d2d2d'}
                        onPress={() => null}
                    />
                </View>
                <View style={commonStyles.row}>
                    <View>
                        <IconToggle 
                            name={'search'}
                            size={24}
                            set={'feather'}
                            color={'#2d2d2d'}
                            onPress={() => null}
                        />
                    </View>
                    <View>
                        <IconToggle 
                            name={'bookmark'}
                            size={24}
                            set={'feather'}
                            color={'#2d2d2d'}
                            onPress={() => null}
                        />
                    </View>
                    <View style={commonStyles.hSpace3} />
                </View>
            </View>
            <View style={styles.headerWelcomeContainer}>
                <View style={styles.headerWelcomeInnerContainer}>
                    <Text style={styles.welcomeSubHeading}>Welcome to,</Text>
                    <Text style={styles.welcomeHeading}>Book Store</Text>
                </View>
                <View style={styles.addBookContainer}>
                    <IconToggle 
                        name={'book-plus-multiple'}
                        size={42}
                        set={'material'}
                        color={'#298df7'}
                        onPress={() => openAddEditBookModal('add', initialBookValues)}
                    />
                </View>
            </View>
        </View>
    );
}

export default BookStoreHeader;

const styles = StyleSheet.create({
    headerBarContainer: {
        paddingHorizontal:6,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    headerWelcomeContainer: {
        paddingHorizontal:6,
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    headerWelcomeInnerContainer: {
        marginLeft:20, 
        alignItems: 'flex-start', 
        justifyContent:'center', 
        flex:1
    },
    welcomeHeading: {
        fontSize:30, 
        fontWeight:'700'
    },
    welcomeSubHeading: {
        fontSize:18, 
        fontWeight:'300'
    },
    addBookContainer: {
        alignItems: 'flex-end', 
        justifyContent:'center', 
        flex:1
    }
});