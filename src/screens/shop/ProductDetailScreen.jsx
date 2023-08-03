import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartAction from '../../store/actions/cart';

const ProductDetailScreen = ({ navigation, route }) => {

    const { productId } = route.params;

    const slelectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image
                style={styles.productImage}
                source={{ uri: slelectedProduct.imageUrl }} />

            <View style={styles.actions}>
                <Button
                    title="Add to Cart"
                    color={Colors.colorAccent}
                    onPress={() => {
                        dispatch(cartAction.addToCart(slelectedProduct));
                    }} />
            </View>

            <Text style={styles.price}>$ {parseFloat(slelectedProduct.price)}</Text>
            <Text style={styles.description}>{slelectedProduct.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    productImage: {
        width: "100%",
        height: 250
    },

    actions: {
        marginVertical: 8,
        alignItems: 'center'
    },

    price: {
        fontSize: 20,
        color: Colors.colorBlack,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16
    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 16
    }
});

export default ProductDetailScreen;