import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import * as cartAction from '../../store/actions/cart';
import * as ordersAction from '../../store/actions/orders';

const CartScreen = ({ navigation }) => {

    const cartAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const items = [];
        for (const key in state.cart.items) {
            items.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return items.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>$ {parseFloat(cartAmount)}</Text></Text>
                <Button
                    title="Order Now"
                    color={Colors.colorAccent}
                    disabled={cartItems.length === 0 ? true : false}
                    onPress={() => {
                        dispatch(ordersAction.addOrder(
                            cartItems,
                            Math.abs(cartAmount.toFixed(2))
                        ));
                        alert("Order Placed");
                        navigation.goBack();
                    }} />
            </View>

            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData =>
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            price={itemData.item.productPrice}
                            deletable={true}
                            onRemove={() => {
                                dispatch(cartAction.removeFromCart(itemData.item.productId));
                            }} />
                    } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },

    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 8,
        shadowColor: Colors.colorBlack,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 10,
        backgroundColor: Colors.colorWhite,
    },

    summaryText: {
        fontSize: 20
    },

    amount: {
        color: Colors.colorAccent,
        fontWeight: 'bold'
    },

});

export default CartScreen;