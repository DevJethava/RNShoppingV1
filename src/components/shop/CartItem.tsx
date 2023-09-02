import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

type CartItemProps = {
    title?: string,
    price: string,
    quantity: string,
    deletable: boolean,
    onRemove?: ((event: GestureResponderEvent) => void) | undefined
}

const CartItem = (props: CartItemProps) => {
    return (
        <View style={styles.cardItem}>
            <View>
                <Text style={styles.itemData}>
                    <Text style={styles.textBold} numberOfLines={2}>
                        {props.title}
                    </Text>
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text
                        style={{
                            ...styles.textBold,
                            color: Colors.colorAccent,
                            marginVertical: 4,
                            fontSize: 20,
                        }}>
                        $ {parseFloat(props.price)}
                    </Text>
                    <Text style={{ ...styles.quantity, marginVertical: 4 }}>
                        {' '}
                        x {props.quantity}
                    </Text>
                </View>
            </View>

            {props.deletable ? (
                <View style={styles.itemData}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.deleteButton}
                        onPress={props.onRemove}>
                        <Icon
                            size={30}
                            color={Colors.colorRed}
                            name={'trash'}
                        />
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    cardItem: {
        padding: 16,
        backgroundColor: Colors.colorWhite,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 8,
        marginVertical: 4,
    },

    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    quantity: {
        color: Colors.colorBlack,
        fontSize: 16,
    },

    textBold: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.colorBlack,
    },

    deleteButton: {
        marginLeft: 16,
    },
});

export default CartItem;
