import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Platform,
    ActivityIndicator,
    Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartAction from '../../store/actions/cart';
import * as productsAction from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { useCallback } from 'react';

const ProductsOverviewScreen = ({ navigation, route }) => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productsAction.setProduct());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Cart"
                        iconName={'cart'}
                        onPress={() => navigation.navigate("CartScreen")} />
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Menu"
                        iconName={'menu'}
                        onPress={() => navigation.openDrawer()} />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.colorPrimary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Some Error Occurred!</Text>
                <Button title="Try Again" color={Colors.colorPrimary} onPress={loadProducts} />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Products found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={
                    (itemData) => (
                        <ProductItem
                            imageUrl={itemData.item.imageUrl}
                            title={itemData.item.title}
                            price={itemData.item.price}
                            onViewDetail={() => {
                                navigation.navigate("ProductDetailScreen", {
                                    title: itemData.item.title,
                                    productId: itemData.item.id
                                });
                            }}
                            onAddToCart={() => {
                                dispatch(cartAction.addToCart(itemData.item));
                            }} />
                    )
                } />
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;