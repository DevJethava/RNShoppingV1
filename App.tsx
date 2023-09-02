import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import productReducer from './src/store/reducers/products';
import cartReducer from './src/store/reducers/cart';
import ordersReducer from './src/store/reducers/orders';
import MainNavigator from './src/navigation/MainNavigator';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
