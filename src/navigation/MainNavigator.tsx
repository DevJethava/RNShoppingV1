import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopNavigator from './ShopNavigator';
import OrdersNavigator from './OrdersNavigator';
import AdminNavigator from './AdminNavigator';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="ShopNavigator"
            screenOptions={{ drawerActiveTintColor: Colors.colorPrimary, headerShown: false }}>
            <Drawer.Screen
                name="ShopNavigator"
                component={ShopNavigator}
                options={({ route }) => ({
                    drawerLabel: 'Products',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name={"cart"}
                            size={20}
                            color={focused ? Colors.colorPrimary : Colors.colorPrimaryDrawerColor} />
                    )
                })} />

            <Drawer.Screen
                name="OrdersNavigator"
                component={OrdersNavigator}
                options={({ route }) => ({
                    drawerLabel: 'Orders',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name={"list"}
                            size={20}
                            color={focused ? Colors.colorPrimary : Colors.colorPrimaryDrawerColor} />
                    )
                })} />

            <Drawer.Screen
                name="AdminNavigator"
                component={AdminNavigator}
                options={({ route }) => ({
                    drawerLabel: 'Admin',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name={"create"}
                            size={20}
                            color={focused ? Colors.colorPrimary : Colors.colorPrimaryDrawerColor} />
                    )
                })} />
        </Drawer.Navigator>
    );
};

export default MainNavigator;