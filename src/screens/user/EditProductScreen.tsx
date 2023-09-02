import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
    Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import * as productsAction from "../../store/actions/products";

const EditProductScreen = ({ navigation, route }) => {

    const { productId } = route.params;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : "");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : "");

    const submitHandler = useCallback(async () => {

        if (editedProduct) {

            if (title.toString().trim().length <= 0) {
                alert("Title is Empty");
                return;
            } else if (imageUrl.toString().trim().length <= 0) {
                alert("Image URL is Empty");
                return;
            } else if (description.toString().trim().length <= 0) {
                alert("Description is Empty");
                return;
            } else {
                try {
                    await dispatch(productsAction.updateProduct(productId, title, description, imageUrl));
                    navigation.goBack();
                } catch (error) {
                    Alert.alert("Error", error.message)
                }
            }
        } else {

            if (title.toString().trim().length <= 0) {
                alert("Title is Empty");
                return;
            } else if (imageUrl.toString().trim().length <= 0) {
                alert("Image URL is Empty");
                return;
            } else if (price.toString().trim().length <= 0) {
                alert("Price is Empty");
                return;
            } else if (description.toString().trim().length <= 0) {
                alert("Description is Empty");
                return;
            } else {
                try {
                    await dispatch(productsAction.createProduct(title, description, imageUrl, parseFloat(price)));
                    navigation.goBack();
                } catch (error) {
                    Alert.alert("Error", error.message)
                }
            }
        }
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Save"
                        iconName={'save'}
                        onPress={submitHandler} />
                </HeaderButtons>
            ),
        });
    }, [navigation, title, imageUrl, price, description]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={text => setTitle(text)} />
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Image URL"
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)} />
                </View>

                {
                    editedProduct ? null :
                        (
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Price</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    value={price}
                                    onChangeText={text => setPrice(text)} />
                            </View>
                        )
                }

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Description"
                        value={description}
                        onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        margin: 16
    },

    formControl: {
        width: "100%"
    },

    input: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderBottomColor: Colors.colorPrimary,
        borderBottomWidth: 1
    },

    label: {
        fontWeight: 'bold',
        marginVertical: 8,
    }
});

export default EditProductScreen;