import {
    StyleSheet
} from 'react-native';

export default {
    icon: {},
    iconToggle: StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%'
        },
        activeIconContainer: {
            backgroundColor: '#ddd',
            overflow: 'hidden'
        },
        icon: {
            top: 0
        },
        activeIcon: {
            color: '#fff',
        },
        disabledIcon: {
            color: '#bbb'
        },
        ripple: {
            position: 'absolute'
        },
        labelContainter: {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            right: 1,
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            width: 16,
            height: 16,
            borderRadius: 10,
        },
        activeLabelContainter: {},
        labelText: {
            fontSize: 10,
            color: '#fff'
        },
        activeLabelText: {}
    })
};
