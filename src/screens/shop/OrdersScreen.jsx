import React, { useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import * as ordersAction from "../../store/actions/orders";
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import moment from 'moment';

const OrdersScreen = ({ navigation, route }) => {

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(ordersAction.setOrders());
        } catch (error) {
            alert(error);
        }
    }, [dispatch]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Menu"
                        iconName={'menu'}
                        onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            ),
        });
    }, [navigation, orders]);

    return (
        <FlatList
            style={{ backgroundColor: Colors.colorWhite }}
            data={orders.reverse()}
            keyExtractor={(item, index) => index}
            renderItem={(itemData) => {
                return (
                    // <OrderItem
                    //     amount={itemData.item.totalAmount}
                    //     date={itemData.item.readbleDate}
                    //     items={itemData.item.items} />
                    <View style={{ margin: 8, padding: 8, borderColor: Colors.colorBlack, borderWidth: 1 }}>
                        {itemData.item?.items.map(cartItem => (
                            // <CartItem
                            //     key={cartItem.productId}
                            //     quantity={cartItem.quantity}
                            //     price={parseFloat(cartItem.sum)}
                            //     deletable={true}
                            // />
                            <CartItem
                                key={cartItem.productId}
                                quantity={cartItem.quantity}
                                price={parseFloat(cartItem.sum)}
                                title={cartItem.productTitle}
                                deletable={false}
                            />
                        ))}
                        {/* {JSON.stringify(itemData.item?.items?.length)} */}
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text>{moment(itemData.item.date).format("DD-MM-YYYY, hh:mm A")}</Text>
                        </View>
                    </View>
                )
            }
            }
        />
    );
}

const styles = StyleSheet.create({});

export default OrdersScreen;