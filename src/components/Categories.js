import React, {useState} from 'react';
import { 
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native';

import { Ripple } from '../utils';

import getBookCategories from '../booksCategories';

import commonStyles from '../styles';

const Categories = () => {

    const [selectedMenu, setMenu] = useState('All');

    const renderMenuItems = () => {
        let data = [];
        if(getBookCategories) {
            getBookCategories.forEach((item, index) => {
                const selectedItem = selectedMenu === item.title;
                data.push(
                    <Ripple 
                        key={item._id}
                        onPress={() => setMenu(item.title)}  
                        style={{
                            paddingHorizontal:16, 
                            paddingVertical:12, 
                            marginRight:8, 
                        }}
                    >
                        <View>
                            <Text style={{fontSize:18, color:selectedItem ? '#2d2d2d' : '#a0a0a0', fontWeight: selectedItem ? '600' : '600'}}>{item.title}</Text>
                            <View style={commonStyles.vSpace2} />
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{paddingHorizontal:8, paddingVertical:2, backgroundColor: selectedItem ? item.iconColor : 'transparent'}} />
                            </View>
                        </View>
                    </Ripple>
                );
            });
        }
        return data;
    }

    return (
        <View style={styles.categoryMenuContainer}>
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
                horizontal
            >
                <View style={styles.categoryMenuWrapper}>
                    {renderMenuItems()}
                </View>
            </ScrollView>
        </View>
    );
}

export default Categories;

const styles = StyleSheet.create({
    categoryMenuContainer: {
        // paddingHorizontal: 12
    },
    scrollViewContainer: {
        marginHorizontal:12
    },
    categoryMenuWrapper: {
        flexDirection:'row'
    }
});


