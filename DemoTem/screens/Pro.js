import React from 'react';
import { ImageBackground, Image, StyleSheet,ScrollView, StatusBar, Dimensions, Platform,View,LogBox } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';


const { height, width } = Dimensions.get('screen');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const section_banner = require('../assets/section_banner.png');
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

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

export default class Pro extends React.Component {

  constructor(props) {
    super(props);
    LogBox.ignoreAllLogs();
    this.itemRef = fbApp.database();
    this.state = { 
      brand:"Oppo",
    }; 
  }

  ChangBrand(Brand){
    
  }

  ListenForItemsSamsung(){import React from 'react';
  import { ImageBackground, Image, StyleSheet,ScrollView, StatusBar, Dimensions, Platform,View,LogBox } from 'react-native';
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
  export default class Pro extends React.Component {
  
    constructor(props) {
      super(props);
      LogBox.ignoreAllLogs();
      this.itemRef = fbApp.database();
      this.state = { 
        brand:"Samsung",
        listcate:[],
      }; 
    }
    ChangBrand = ({Brand})=>{
      // this.setState({
      //   brand:Brand,
      // })
      // console.log(Brand);
      // console.log(this.state.brand);
    }
  
    
  
    componentDidMount(){
      this.ListenForItemsSamsung();
    }
  
    ListenForItemsSamsung = ()=>{
      var items=[];
        this.itemRef.ref('/Products').once('value').then((snapshot) => {
          snapshot.forEach(function (childSnapshot){
            
            if(childSnapshot.val().CategoryID=="AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI")
            items.push({
              // key:snapshot.key,
              title:childSnapshot.val().Name,
              price:childSnapshot.val().Price,
              metades:childSnapshot.val().MetaDescription,
              image:childSnapshot.val().Image,
              id: childSnapshot.val().ProductID,
            })
            
          })
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
        <View >
            <ScrollView horizontal={true} style={styles.scrollCate}>
              <TouchableOpacity onPress={{backgroundColor:"blue"}}>
                <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/a/a2/OPPO_LOGO_2019.png"}} style={styles.cateImage} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={{uri:"https://dwglogo.com/wp-content/uploads/2016/02/Apple_logo.png"}} style={styles.cateImage} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={{uri:"https://giadungviet.vn/wp-content/uploads/2014/11/samsung-logo.jpg"}} style={styles.cateImage} />
              </TouchableOpacity>
            
              <TouchableOpacity>
                <Image source={{uri:"https://www.gizmochina.com/wp-content/uploads/2020/08/Xiaomi-Logo-Featured.jpg"}} style={styles.cateImage} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={{uri:"https://www.gizmochina.com/wp-content/uploads/2020/08/Nokia-Logo-Featured.jpg"}} style={styles.cateImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.ChangBrand("Vinmart")}>
                <Image source={{uri:"data:image/png;base64,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"}} style={styles.cateImage} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={{uri:"https://i.pinimg.com/originals/ed/c9/4c/edc94cb126b133878333758ee1e334b5.jpg"}} style={styles.cateImage} />
              </TouchableOpacity>
            </ScrollView>
        </View>
      <Text style={styles.sectionTitle}>{this.state.brand}</Text>
        {/*  */}
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
    },
    cartContainer: {
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
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
  
    var items=[];
      this.itemRef.ref('/Products').on('value', snapshot => {
        snapshot.forEach(function (childSnapshot){
          
          if(childSnapshot.val().CategoryID=="AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI")
          items.push({
            // key:snapshot.key,
            title:childSnapshot.val().Name,
            price:childSnapshot.val().Price,
            metades:childSnapshot.val().MetaDescription,
            image:childSnapshot.val().Image,
            id: childSnapshot.val().ProductID,
          })
          
        })
        console.log(items);
    })
    return items;
  }
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" />
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
      <View >
          <ScrollView horizontal={true} style={styles.scrollCate}>
            <TouchableOpacity >
              <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/a/a2/OPPO_LOGO_2019.png"}} style={styles.cateImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:"https://dwglogo.com/wp-content/uploads/2016/02/Apple_logo.png"}} style={styles.cateImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:"https://giadungviet.vn/wp-content/uploads/2014/11/samsung-logo.jpg"}} style={styles.cateImage} />
            </TouchableOpacity>
          
            <TouchableOpacity>
              <Image source={{uri:"https://www.gizmochina.com/wp-content/uploads/2020/08/Xiaomi-Logo-Featured.jpg"}} style={styles.cateImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:"https://www.gizmochina.com/wp-content/uploads/2020/08/Nokia-Logo-Featured.jpg"}} style={styles.cateImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:"data:image/png;base64,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"}} style={styles.cateImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:"https://i.pinimg.com/originals/ed/c9/4c/edc94cb126b133878333758ee1e334b5.jpg"}} style={styles.cateImage} />
            </TouchableOpacity>
          </ScrollView>
      </View>
      <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
      {/*  */}
      
      <ScrollView>
      <View style={styles.listItemContainer}>
      <FlatList 
        initialNumToRende={3}
        numColumns={3}
        data={this.ListenForItemsSamsung()}
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
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
