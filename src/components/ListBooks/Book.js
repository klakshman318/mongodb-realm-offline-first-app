import React from 'react';
import { 
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    Ripple, 
    Icon, 
    IconToggle
} from '../../utils';

import commonStyles from '../../styles';

const Book = ({ handleActionMenuList, item }) => {

    return (
        <View style={styles.bookItemContainer}>
            <Ripple style={styles.contentRippleContainer}>
                <View style={styles.bookIconContainer}>
                    <Icon 
                        set={'material'} 
                        name={'book-open-page-variant'} 
                        color={'#6d6d6d'}
                        size={48}
                    />
                </View>
                <View style={commonStyles.vSpace4} />
                <View>
                    <Text style={styles.bookTitleStyle} numberOfLines={2}>{item.title}</Text>
                    <View style={commonStyles.vSpace2} />
                    <Text style={styles.bookCategoryStyle} numberOfLines={1}>{item.category}</Text>
                    <View style={commonStyles.vSpace2} />
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceTextStyle}>{'\u20B9'}{Math.round(item.price)}</Text>
                    </View>
                </View>
            </Ripple>
            <View style={styles.dottedMenuContainer}>
                <IconToggle
                    set={'ionicons'} 
                    name={'ellipsis-vertical-outline'} 
                    size={22} 
                    onPress={() => handleActionMenuList(item)}
                />
            </View>
        </View>
    );
}

export default Book;

const styles = StyleSheet.create({
    bookItemContainer: {
        flex:1, 
        overflow:'hidden', 
        margin:12, 
        borderWidth:StyleSheet.hairlineWidth, 
        borderRadius:16, 
        borderColor:'#e2e2e2'
    },
    contentRippleContainer: {
        padding: 16
    },
    bookIconContainer: {
        borderRadius:80/2, 
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center', 
        width:80, 
        height:80, 
        backgroundColor:'#f9f9f9'
    },
    bookTitleStyle: {
        fontSize:14, 
        fontWeight:'600', 
        lineHeight:20
    },
    bookCategoryStyle: {
        fontSize:14, 
        fontWeight:'700', 
        color:'#59c798', 
        textTransform: 'capitalize'
    },
    priceContainer: {
        alignItems:'center', 
        flexDirection:'row'
    },
    priceTextStyle: {
        fontWeight:'600', 
        fontSize:16
    },
    dottedMenuContainer: {
        position:'absolute', 
        right:0, 
        top:6
    }
});


