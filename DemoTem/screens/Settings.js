import React from 'react';
import { ImageBackground, Image, StyleSheet,ScrollView, StatusBar, Dimensions, TextInput,View,LogBox } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';


const { height, width } = Dimensions.get('screen');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const section_banner = require('../assets/section_banner.png');
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import { SafeAreaView } from 'react-navigation';


const ProductItem = ({image, name, price}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri:image}} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>
  </View>
);
let brandname ="Oppo";
export default class Setting extends React.Component {

  constructor(props) {
    super(props);
    LogBox.ignoreAllLogs();
    this.itemRef = fbApp.database();
    this.state = { 
      brand:"Samsung",
      listcate:[],
      searchText:"",
    }; 
  }
  searchDictionary=()=>{
    var st = this.state.searchText.toLowerCase();
   
    this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var items=[];
      snapshot.forEach( function(childSnapshot){       
        var product={
          title:'',
          price:'',
          metades:'',
          image:'',
          id: '',
        }
        var rs = childSnapshot.val().Name.toLowerCase();
        console.log(rs.indexOf(st));
        if (rs.indexOf(st) != -1){        
          product.title = childSnapshot.val().Name;
          product.price=childSnapshot.val().Price;
          product.metades=childSnapshot.val().MetaDescription;
          product.image=childSnapshot.val().Image;
          product.id=childSnapshot.val().ProductID;
          items.push(product);     
        }              
    });
    this.setState({
      listcate:items,
    })
  })
  }
  render() {
    const { navigation } = this.props;

    return (
    <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" />
    <View style={styles.headerContainer}>    
      <View style={styles.inputContainer}>
        <FontAwesome name="search" size={24} color="#969696" />
        <TextInput style={styles.inputText} placeholder="Bạn tìm gì hôm nay?" 
        autoFocus={true}
        onChangeText={(text) => this.setState({searchText:text})}
        onSubmitEditing={() => this.searchDictionary()}
        />
      </View>
        <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate("Cart")}>
           <FontAwesome name="shopping-cart" size={24} color="#fff" /> 
        </TouchableOpacity> 
    </View>
    <View style={styles.bodyContainer}>     
    <View style={styles.sectionContainer}>    
    <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
      <SafeAreaView>
      <ScrollView>
      <View style={styles.listItemContainer}>
      <FlatList 
        initialNumToRende={3}
        numColumns={3}
        data={this.state.listcate}
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
      </View>    
      </ScrollView>
      </SafeAreaView>
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
    paddingTop: 10,
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
    height:height/25,
    padding:height/125,
  },
  cartContainer: {
    paddingHorizontal: 20,
    borderRadius:15,
    width:70,
    paddingTop:10,
  },
  //
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollCate:{
    height: height/10,
    flexDirection: 'row',
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
    resizeMode:'contain'
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
  //
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
  cateImage:{
    marginTop:5,
    width:100,
    height:height/11,
    resizeMode:"center",
  }
});

 