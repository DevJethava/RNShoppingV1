import React from 'react';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ProductsOverviewScreen">
            <Stack.Screen
                name="ProductsOverviewScreen"
                component={ProductsOverviewScreen}
                options={{
                    title: 'All Products',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.colorPrimary : Colors.colorWhite,
                    },
                    headerTintColor: Platform.OS === 'android' ? Colors.colorWhite : Colors.colorPrimary,
                }} />

            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.colorPrimary : Colors.colorWhite,
                    },
                    headerTintColor: Platform.OS === 'android' ? Colors.colorWhite : Colors.colorPrimary,
                })} />

            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={({ route }) => ({
                    title: "Your Cart",
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.colorPrimary : Colors.colorWhite,
                    },
                    headerTintColor: Platform.OS === 'android' ? Colors.colorWhite : Colors.colorPrimary,
                })} />

        </Stack.Navigator>
    );
};

export default ShopNavigator;