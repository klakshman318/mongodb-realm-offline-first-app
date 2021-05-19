
import React, {useRef, useState, useEffect} from 'react';
import {Animated, View} from 'react-native';
import PropTypes from 'prop-types';

import Icon, {spacing} from './Icon';
import Ripple from './Ripple';
import TimeEventsHOC from './TimeEventsHOC';

import styles from './styles';

const utilStyles = {
    bgTrans: {
        backgroundColor: 'transparent'
    }
}

const getStyles = (props) => {
    let _styles = {
        ...styles.iconToggle,
        ...props.styles
    };
    if (props.disabled) {
        _styles.icon = [_styles.icon, _styles.disabledIcon];
    }
    if (props.iconSize) {
        _styles.container = {
            ..._styles.container,
            width: props.iconSize * 2,
            height: props.iconSize * 2
        };
    }
    return _styles;
}

const getIconSize = (props) => {
    const {
        icon
    } = props.style;
    if (icon && icon.width) {
        return icon.width;
    }
    if (props.size) {
        return props.size;
    }
    return spacing.iconSize;
}

const getContainerSize = (iconSize) => {
    return iconSize * 2;
}

const getRippleSize = (containerSize, percent) => {
    return (percent / 100) * containerSize;
}

const useNativeDriver = true;

const IconToggle = (props) => {

    const iconSize = getIconSize(props);
    const containerSizeVal = getContainerSize(iconSize);
    
    const nativeStyles = useRef({});
    const customStyles = useRef({});
    const scaleAnim = useRef(new Animated.Value(1, {useNativeDriver})).current;

    const [iconData, setIconData] = useState({
        containerSize: containerSizeVal,
        iconSize,
        rippleSize: getRippleSize(containerSizeVal, props.percent),
        name: props.name
    });

    useEffect(() => {
        buildStyles(props);
    }, [props.active, props.disabled, props.iconSize, props.styles]);

    useEffect(() => {
        animateIcon();
        setIconData({
            ...iconData,
            name: props.name
        });
    }, [props.name]);

    const animateIcon = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver
        }).start(() => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver
            }).start();
        });
    }

    const buildStyles = (props) => {
        const {
            containerSize,
            rippleSize
        } = iconData;

        const top = (containerSize - rippleSize) / 2;

        nativeStyles.current = getStyles(props);

        let {active} = props;

        customStyles.current.labelContainerStyles = [
            nativeStyles.current.labelContainter,
            active ? nativeStyles.current.activeLabelContainter : undefined
        ];

        customStyles.current.labelTextStyles = [
            nativeStyles.current.labelText,
            active ? nativeStyles.current.activeLabelText : undefined
        ];

        customStyles.current.containerStyles  = [
            nativeStyles.current.container,
            utilStyles.bgTrans,
            {
                width: containerSize,
                height: containerSize
            }
        ];

        customStyles.current.rippleStyles = [{
            top,
            left: top,
            width: rippleSize,
            height: rippleSize
        }, nativeStyles.current.ripple];

        customStyles.current.iconContainerStyles = [
            nativeStyles.current.iconContainer,
            {
                borderRadius: props.size,
                transform: [{
                    scale: scaleAnim
                }]
            },
            active ? nativeStyles.current.activeIconContainer : undefined
        ];

    }

    const renderIcon = () => {
        const {name, iconSize} = iconData;
        const {
            children,
            color,
            set
        } = props;
        if (children) {
            return children;
        }
        return <Icon name={name} color={color} style={nativeStyles.current.icon} size={iconSize} set={set} />;
    }

    const onPress = (e) => {
        if (props.disabled) {
            return;
        }
        setTimeout(animateIcon, 100);
        if (props.onPress) {
            props.setTimeout(()=>{
                props.onPress(e);
            }, 200);
        }
    }

    const { containerSize } = iconData;

    const {
        disabled,
        isPicker
    } = props;

    return (
        <View style={customStyles.current.containerStyles}>
            <Ripple
                rippleCentered={true}
                rippleSize={containerSize}
                onPress={onPress}
                style={customStyles.current.rippleStyles}
                disabled={disabled}
                isPicker={isPicker}
            >
                <Animated.View style={customStyles.current.iconContainerStyles}>
                    {renderIcon()}
                </Animated.View>
            </Ripple>
        </View>
    );
}

IconToggle.defaultProps = {
    active: false,
    children: null,
    color: '#000',
    onPress: null,
    size: 24,
    disabled: false,
    percent: 90,
    style: {},
};

IconToggle.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.element,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    name: PropTypes.string.isRequired,
    percent: PropTypes.number,
    style: PropTypes.object,
    onPress: PropTypes.func
};

export default TimeEventsHOC(IconToggle);
