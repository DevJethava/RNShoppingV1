import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserProductsScreen"
                component={UserProductsScreen}
                options={({ route }) => ({
                    title: "Your Products",
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.colorPrimary : Colors.colorWhite,
                    },
                    headerTintColor: Platform.OS === 'android' ? Colors.colorWhite : Colors.colorPrimary,
                })} />

            <Stack.Screen
                name="EditProductScreen"
                component={EditProductScreen}
                options={({ route }) => ({
                    title: route.params.productId ? "Edit Product" : "Add Product",
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.colorPrimary : Colors.colorWhite,
                    },
                    headerTintColor: Platform.OS === 'android' ? Colors.colorWhite : Colors.colorPrimary,
                })} />

        </Stack.Navigator>
    );
};

export default AdminNavigator;