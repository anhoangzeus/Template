import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View,Image ,SafeAreaView,TouchableWithoutFeedback,LogBox} from 'react-native';
import { Button, Block, Text, theme, Input } from 'galio-framework';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import {fbApp} from "../firebaseconfig";
import "firebase/auth";



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    LogBox.ignoreAllLogs();
    this.itemRef = fbApp.database();
    this.state = { 
    }; 
  }

  ListenForItems(){
    var items=[];
    this.itemRef.ref('/Products').on('value', snapshot => {
      snapshot.forEach(function (childSnapshot){
        items.push({
          key:snapshot.key,
          title:childSnapshot.val().Name,
          price:childSnapshot.val().Price,
          metades:childSnapshot.val().MetaDescription,
          image:childSnapshot.val().Image
        })
      })
     
  })
  console.log(items);
  return items;
}



  
  renderProducts = (items) => {
    const { navigation } = this.props;   
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <TouchableOpacity  onPress={() =>  navigation.navigate('Product')}>
          <Product product={products[0]} full />
          </TouchableOpacity>    
        </Block>
      </ScrollView>    
    )
  }
  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    return (
      <SafeAreaView>
     
       <FlatList
       data={this.ListenForItems()}
       renderItem={({item})=>
    //    <ScrollView
    //    showsVerticalScrollIndicator={true}
    //    contentContainerStyle={styles.products}>
    //    <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
    //     <TouchableWithoutFeedback >
    //       <Block  style={[styles.imageContainer, styles.shadow]}>
    //         <Image source={{ uri: item.image }} style={styles.imageStyle} />
    //         <Text size={20} style={styles.productTitle}>{item.name}</Text>
    //       </Block>
    //     </TouchableWithoutFeedback>
    //     <TouchableWithoutFeedback >
    //       <Block flex space="between" style={styles.productDescription}>
           
    //         <Text size={12} muted={!priceColor} color={priceColor}>{item.metades}</Text>
    //         <Text size={12} muted={!priceColor} color={priceColor}>${item.price}</Text>
    //       </Block>
    //     </TouchableWithoutFeedback>
    //   </Block>
    //  </ScrollView>
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.products}>
      <Block flex>
        <TouchableOpacity  onPress={() => navigation.navigate('Product',this.key)}>
          <Product product={item} horizontal />
        </TouchableOpacity>   
        </Block>
    </ScrollView>
       } />      
     
      </SafeAreaView>
      
    );
    
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageContainer: {
    elevation: 1,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
   productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  imageStyle:{
    width:150,
    height:200,
    marginLeft:20
  }
});
