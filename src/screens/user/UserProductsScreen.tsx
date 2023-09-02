import React, { useLayoutEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const AdminProductItem = (props) => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (

        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp
                    onPress={props.onViewDetail}
                    useForeground>
                    <View style={{ height: "100%" }}>
                        <Image
                            source={{ uri: props.imageUrl }}
                            style={styles.image}
                        />
                        <View style={styles.titleContainer}>
                            <View>
                                <Text style={styles.title}>{props.title}</Text>
                                <Text style={styles.price}>$ {props.price}</Text>
                            </View>
                            <View>
                                <Icon
                                    name="trash"
                                    size={30}
                                    onPress={props.onDelete}
                                    color={Colors.colorRed}
                                    style={{ margin: 8 }} />
                            </View>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
};

const UserProductsScreen = ({ navigation }) => {

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id, productTitle) => {
        navigation.navigate("EditProductScreen", {
            productId: id
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Menu"
                        iconName={'menu'}
                        onPress={() => navigation.openDrawer()} />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Add"
                        iconName={'add'}
                        onPress={() => navigation.navigate("EditProductScreen", {
                            productId: ""
                        })} />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    const deleteProduct = async (itemId) => {
        try {
            await dispatch(productsActions.deleteproduct(itemId))
        } catch (err) {
            Alert.alert("Error", err.message)
        }
    }

    return (
        <FlatList
            data={userProducts.reverse()}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            renderItem={
                (itemData) => (
                    <AdminProductItem
                        imageUrl={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onViewDetail={() => editProductHandler(itemData.item.id, itemData.item.title)}
                        onDelete={() => {
                            Alert.alert('Delete', 'Are you sure you wants to Delete this Product?', [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                { text: 'OK', onPress: () => deleteProduct(itemData.item.id) },
                            ])
                        }} />
                )
            } />
    );
}

const styles = StyleSheet.create({
    product: {
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
        height: 300,
        margin: 16
    },

    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },

    image: {
        width: "100%",
        height: "70%"
    },

    title: {
        fontSize: 18,
        marginVertical: 8,
        marginHorizontal: 8,
        fontWeight: 'bold'
    },

    price: {
        fontSize: 18,
        color: Colors.colorBlack,
        fontWeight: 'bold',
        marginHorizontal: 8
    },
});

export default UserProductsScreen;