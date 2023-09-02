import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    GestureResponderEvent,
} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

type ProductItemProps = {
    imageUrl: string,
    title: string,
    price: string,
    onViewDetail: ((event: GestureResponderEvent) => void) | undefined,
    onAddToCart: ((event: GestureResponderEvent) => void) | undefined
}

const ProductItem = (props: ProductItemProps) => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    <View style={{ height: '100%' }}>
                        <Image source={{ uri: props.imageUrl }} style={styles.image} />
                        <View style={styles.titleContainer}>
                            <View>
                                <Text style={styles.title}>{props.title}</Text>
                                <Text style={styles.price}>$ {parseFloat(props.price)}</Text>
                            </View>
                            <View>
                                <Icon
                                    name="cart"
                                    size={35}
                                    onPress={props.onAddToCart}
                                    color={Colors.colorPrimaryDark}
                                    style={{ margin: 8 }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
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
        height: 300,
        margin: 16,
    },

    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },

    image: {
        width: '100%',
        height: '70%',
    },

    title: {
        fontSize: 18,
        marginVertical: 8,
        marginHorizontal: 8,
        fontWeight: 'bold',
    },

    price: {
        fontSize: 18,
        color: Colors.colorBlack,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
});

export default ProductItem;
