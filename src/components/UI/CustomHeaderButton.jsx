import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';

const CustomHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Icon}
            iconSize={25}
            color={
                Platform.OS === 'android' ? Colors.colorWhite : Colors.colorPrimary
            }
        />
    );
};

export default CustomHeaderButton;
