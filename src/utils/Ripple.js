import PropTypes from 'prop-types';

import React, {
    useRef, 
    useState,
    useEffect
} from 'react';

import {
    View, 
    Animated, 
    Easing, 
    TouchableWithoutFeedback, 
    StyleSheet
} from 'react-native';

const radius = 10;
const useNativeDriver = true;

const Ripple = (props) => {

    const uniqueRef = useRef(0);
    const mountedRef = useRef(false);

    const [initialState, setInitState] = useState({
        width: 0,
        height: 0,
        ripples: []
    });

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            uniqueRef.current = 0;
        }
    });

    const onLayout = (event) => {
        let {width, height} = event.nativeEvent.layout;
        let {onLayout} = props;
        if ('function' === typeof onLayout) {
            onLayout(event);
        }
        setInitState({
            ...initialState,
            width,
            height
        });
    }

    const onPress = (event) => {
        if(props.disabled) {
            return;
        }
        let {ripples} = initialState;
        let {onPress, rippleSequential} = props;

        let {nativeEvent} = event;

        if (!rippleSequential || !ripples.length) {
            if (typeof onPress === 'function') {
                requestAnimationFrame(() => onPress(event, nativeEvent));
            }
            startRipple(event);
        }
    }

    const onLongPress = (event) => {
        let {onLongPress} = props;

        if ('function' === typeof onLongPress) {
            requestAnimationFrame(() => onLongPress(event));
        }

        startRipple(event);
    }

    const onPressIn = (event) => {
        let {onPressIn} = props;

        if (typeof onPressIn === 'function') {
            onPressIn(event);
        }
    }

    const onPressOut = (event) => {
        let {onPressOut} = props;

        if (typeof onPressOut === 'function') {
            onPressOut(event);
        }
    }

    const onAnimationEnd = () => {
        if (mountedRef.current) {
            setInitState({
                ...initialState,
                ripples: initialState?.ripples?.slice(1)
            });
        }
    }

    const startRipple = (event) => {
        let {width, height} = initialState;
        let {rippleDuration, rippleCentered, rippleSize, onRippleAnimation} = props;

        let w2 = 0.5 * width;
        let h2 = 0.5 * height;

        let {locationX, locationY} = rippleCentered
            ? {
                locationX: w2,
                locationY: h2
            }
            : event.nativeEvent;

        let offsetX = Math.abs(w2 - locationX);
        let offsetY = Math.abs(h2 - locationY);

        let R = rippleSize > 0
            ? 0.5 * rippleSize
            : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

        let ripple = {
            unique: uniqueRef.current++,
            progress: new Animated.Value(0),
            locationX,
            locationY,
            R
        };

        let animation = Animated.timing(ripple.progress, {
            toValue: 1,
            easing: Easing.out(Easing.ease),
            duration: rippleDuration,
            useNativeDriver
        });

        onRippleAnimation(animation, onAnimationEnd);

        setInitState({
            ...initialState,
            ripples: initialState?.ripples?.concat(ripple)
        });

    }

    const renderRipple = ({unique, progress, locationX, locationY, R}) => {
        let {rippleColor, rippleOpacity, rippleFades} = props;

        let rippleStyle = {
            top: locationY - radius,
            left: locationX - radius,
            backgroundColor: rippleColor,

            transform: [
                {
                    scale: progress.interpolate({
                        inputRange: [
                            0, 1
                        ],
                        outputRange: [
                            0.5 / radius,
                            R / radius
                        ]
                    })
                }
            ],

            opacity: rippleFades
                ? progress.interpolate({
                    inputRange: [
                        0, 1
                    ],
                    outputRange: [rippleOpacity, 0]
                })
                : rippleOpacity
        };

        return (
            <Animated.View style={[styles.ripple, rippleStyle]} key={unique}/>
        );
    }

    let {ripples} = initialState;
    let {
        delayLongPress,
        delayPressIn,
        delayPressOut,
        disabled,
        hitSlop,
        pressRetentionOffset,
        children,
        rippleContainerBorderRadius,
        testID,
        nativeID,
        accessible,
        accessibilityLabel,
        onLayout: __ignored__,
        ...propsVals
    } = props;

    let touchableProps = {
        delayLongPress,
        delayPressIn,
        delayPressOut,
        disabled,
        hitSlop,
        pressRetentionOffset,
        onPress,
        onPressIn,
        testID,
        nativeID,
        accessible,
        accessibilityLabel,
        onPressOut,
        onLongPress: propsVals.onLongPress ? onLongPress : undefined,
        onLayout
    };

    let containerStyle = {
        borderRadius: rippleContainerBorderRadius
    };

    return (
        <TouchableWithoutFeedback {...touchableProps}>
            <Animated.View {...propsVals} style={propsVals.style} pointerEvents='box-only'>
                {children}
                <View style={[styles.container, containerStyle]}>
                    {ripples?.map(renderRipple)}
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },

    ripple: {
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        overflow: 'hidden',
        position: 'absolute'
    }
});

Ripple.defaultProps = {
    ...TouchableWithoutFeedback.defaultProps,
    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.30,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    disabled: false,
    onRippleAnimation: (animation, callback) => animation.start(callback)
};

Ripple.propTypes = {
    ...Animated.View.propTypes,
    ...TouchableWithoutFeedback.propTypes,
    rippleColor: PropTypes.string,
    rippleOpacity: PropTypes.number,
    rippleDuration: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleContainerBorderRadius: PropTypes.number,
    rippleCentered: PropTypes.bool,
    rippleSequential: PropTypes.bool,
    rippleFades: PropTypes.bool,
    disabled: PropTypes.bool,
    onRippleAnimation: PropTypes.func
};

export default Ripple;
