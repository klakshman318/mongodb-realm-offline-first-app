import React from 'react';
import PropTypes from 'prop-types';

import {
    AntDesign, 
    Ionicons, 
    EvilIcons, 
    Entypo, 
    Feather, 
    Foundation, 
    FontAwesome, 
    FontistoIcons, 
    SimpleLineIcons, 
    MaterialCommunityIcons, 
    MaterialIcons
} from './IconSets';

export const spacing = {
    actionButtonSize: 56,
    iconSize: 24,
    avatarSize: 40,
    snackbarHeight: 48
};

const Icon = (props) => {
    
    let {
        color,
        name,
        style,
        size,
        set
    } = props;

    const iconSize = size || spacing.iconSize;

    let Component;

    if(!set) {
        Component = Ionicons;
    } else {
        set = set.toLowerCase();
        Component = set === 'fontawesome' ? FontAwesome : (
            set === 'ionicons' ? Ionicons : (
                set === 'foundation' ? Foundation : (
                    set === 'evilicons' ? EvilIcons : (
                        set === 'antdesign' ? AntDesign : (
                            set === 'entypo' ? Entypo : (
                                set === 'simplelineicons' ? SimpleLineIcons : (
                                    set === 'material' ? MaterialCommunityIcons : (
                                        set === 'fontisto' ? FontistoIcons : (
                                            set === 'materialicons' ? MaterialIcons : (
                                                set === 'feather' ? Feather : MaterialIcons
                                            )
                                        )  
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }

    return (
        <Component
            color={color}
            name={name}
            size={iconSize}
            style={style}
        />
    );
}

Icon.defaultProps = {
    size: null,
    color: null,
    style: null
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
    size: PropTypes.number,
    color: PropTypes.string
};

export default Icon;
