import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from '../screens/shop/OrdersScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OrdersScreen"
                component={OrdersScreen}
                options={({ route }) => ({
                    title: "Your Orders",
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.colorPrimary : Colors.colorWhite,
                    },
                    headerTintColor: Platform.OS === 'android' ? Colors.colorWhite : Colors.colorPrimary,
                })} />

        </Stack.Navigator>
    );
};

export default OrdersNavigator;