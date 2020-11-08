import React from 'react';
import ProductScreen from './Product';

function Items({ route, navigation}) {
    
    var searchContent = "";    
    if (route.params != null) {
        const { content } = route.params.id;
        searchContent = route.params.id;
        console.log(searchContent);
    }
    return (
        <ProductScreen
            content = {searchContent}
            navigation = {navigation}
        />
    );    
};

export default Items;