import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View,Image ,SafeAreaView,TouchableWithoutFeedback,LogBox,StatusBar} from 'react-native';
import { Button, Block, Text, theme, Input } from 'galio-framework';

import { Icon, Product } from '../components/';

const section_banner = require('../assets/section_banner.png');
const { width } = Dimensions.get('screen');
import products from '../constants/products';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeSectionComponent from '../components/HomeSectionComponents';

import {fbApp} from "../firebaseconfig";
import "firebase/auth";

const ProductItem = ({image, name, price}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri:image}} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>
  </View>
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    LogBox.ignoreAllLogs();
    this.itemRef = fbApp.database();
    this.state = { 
    }; 
  }

  componentDidMount(){
      this.ListenForItems();
  }
  ListenForItems(){
    var items=[];
    this.itemRef.ref('/Products').on('value', snapshot => {
      snapshot.forEach(function (childSnapshot){
        items.push({
          // key:snapshot.key,
          title:childSnapshot.val().Name,
          price:childSnapshot.val().Price,
          metades:childSnapshot.val().MetaDescription,
          image:childSnapshot.val().Image,
          id: childSnapshot.val().ProductID,
        })
      })
  })
  return items;
}

  renderProducts = (items) => {
    const { navigation } = this.props;   
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <TouchableOpacity >
          <Product product={products[0]}  />
          </TouchableOpacity>    
        </Block>
      </ScrollView>    
    )
  }
  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    return (
    //   <SafeAreaView >
    //  <Block center style={styles.home}  >
    //  <ScrollView
    // showsVerticalScrollIndicator={true}
    // horizontal={false}
    // pagingEnabled={true}
    // contentContainerStyle={styles.products}>
    //    <FlatList
    //    horizontal={true}
    //    pagingEnabled={false}
    //    data={this.ListenForItems()}
    //    renderItem={({item})=>
    //    <View>
    //       <TouchableOpacity  onPress={() => navigation.navigate('Items', {id: item.id})}>
    //       <Product product={item} horizontal />
    //     </TouchableOpacity>   
    //    </View>
       
    //    } />   
    //   </ScrollView>   
    //  </Block>
    //   </SafeAreaView>  
    
    <View style={styles.screenContainer}>
    <StatusBar backgroundColor='#1e88e5' barStyle="light-content"/>
    {/*  */}
    <View style={styles.headerContainer}>
      
      <View style={styles.inputContainer}>
        <FontAwesome name="search" size={24} color="#969696" />
        <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
      </View>
      {/*  */}
      <View style={styles.cartContainer}>
        <FontAwesome name="shopping-cart" size={24} color="#fff" />
      </View>
    </View>
    {/*  */}
    <View style={styles.bodyContainer}>
    
    
    <View style={styles.sectionContainer}>
      {/*  */}
      <Text style={styles.sectionTitle}>Điện thoại - Máy tính bảng</Text>
      {/*  */}
      <Image source={section_banner} style={styles.sectionImage} />
      {/*  */}
      <ScrollView horizontal={true}>
        <View style={styles.filterContainer}>
          {[
            'Tất cả',
            'Điện thoại SmartPhone',
            'Máy tính bảng',
            'Điện thoại',
          ].map((e, index) => (
            <View
              key={index.toString()}
              style={
                index === 0
                  ? styles.filterActiveButtonContainer
                  : styles.filterInactiveButtonContainer
              }>
              <Text
                style={
                  index === 0
                    ? styles.filterActiveText
                    : styles.filterInactiveText
                }>
                {e}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView>
      <View style={styles.listItemContainer}>
        <FlatList 
        horizontal={true}
        pagingEnabled={false}
        data={this.ListenForItems()}
        renderItem={({item})=>
        <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id})}>
            <ProductItem
                    name={item.title}
                    image={item.image}
                    price={item.price}
                  />
        </TouchableOpacity>  
        }
        ></FlatList>
        {/* <HomeSectionComponent /> */}
      </View>
      </ScrollView>
      </View>
    </View>
    </View>
    ); 
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 4,
    backgroundColor: '#1e88e5',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a2a2a',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginVertical: 12,
  },
  sectionImage: {
    width: width - 24,
    height: 130,
    borderRadius: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#242424',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: '#5a5a5a',
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: '#fff',
  },
  filterInactiveText: {
    color: '#5a5a5a',
  },
});
