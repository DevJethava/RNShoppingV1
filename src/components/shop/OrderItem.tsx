import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';

type OrderItemProps = {
    amount: string,
    date: string,
    items: []
}

const OrderItem = (props: OrderItemProps) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItems}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>

            <Button
                title={showDetails ? 'Hide Detail' : 'Show Details'}
                color={Colors.colorPrimary}
                onPress={setShowDetails(prevState => !prevState)}
            />

            {showDetails && (
                <View>
                    {props.items.map(cartItem => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            price={parseFloat(cartItem.sum).toString()}
                            deletable={true}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItems: {
        shadowColor: Colors.colorBlack,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 10,
        backgroundColor: Colors.colorWhite,
        margin: 16,
        padding: 8,
        alignItems: 'center',
    },

    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.colorAccent,
    },

    date: {
        fontSize: 14,
    },
});

export default OrderItem;
