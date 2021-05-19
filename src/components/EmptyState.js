import React from 'react';
import { 
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import commonStyles from '../styles';

const EmptyState = () => {
    return (
        <View style={styles.emptyStateContainer}>
            <Image 
                source={require('../assets/emptyState.jpg')} 
                style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateHeading}>Add New Books</Text>
            <View style={commonStyles.vSpace2} />
            <Text style={styles.emptyStateDescription}>Bookshelf is empty now!</Text>
        </View>
    );
}

export default EmptyState;

const styles = StyleSheet.create({
    emptyStateContainer: {
        alignItems:'center', 
        marginTop:70, 
        justifyContent:'center'
    },
    emptyStateImage: {
        width:200, 
        height:200, 
        borderRadius:8, 
        resizeMode:'contain'
    },
    emptyStateHeading: {
        fontSize:24, 
        color:'#262634'
    },
    emptyStateDescription: {
        fontSize:18, 
        color:'#a1a0a3'
    }
});


