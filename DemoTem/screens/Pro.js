  import React from 'react';
  import { ImageBackground, Image, StyleSheet,ScrollView, StatusBar, Dimensions, Platform,View,LogBox } from 'react-native';
  import { Block, Button, Text, theme } from 'galio-framework';
  import NumberFormat from 'react-number-format';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
  import {fbApp} from "../firebaseconfig";
  import "firebase/auth";
  import { SafeAreaView } from 'react-navigation';

  const { height, width } = Dimensions.get('screen');
  const section_banner = require('../assets/section_banner.png');

  function ReactNativeNumberFormat({ value }) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        renderText={formattedValue => <Text>{formattedValue} đ</Text>} 
      />
    );
  }

  const ProductItem = ({image, name, price}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri:image}} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={1}>
        {name}
      </Text>
      <ReactNativeNumberFormat value={price} />
    </View>
  );

  export default class Pro extends React.Component {

    constructor(props) {
      super(props);
      LogBox.ignoreAllLogs();
      this.itemRef = fbApp.database();
      this.state = { 
        listcate:[],
        listbrand:[],
        listcategory:[],
        BrandID:"",
        CatogoryID:"",
        Price:0,
        Date:"",
      }; 
    }
    BrandItem = ({image,id}) => (
      <TouchableOpacity onPress={()=> this.ChangBrand({id})} style={{marginHorizontal:5, borderBottomColor:'gold',
      borderWidth:2,borderRadius:50, borderEndColor:'white',borderTopColor:'gold'}}>
            <Image source={{uri:image}} style={styles.cateImage} />
      </TouchableOpacity>
    );
    CategoryItem = ({name,id,icon}) => (
        <TouchableOpacity  onPress={()=> this.ChangCate({id})}>
          <Icons name={icon} color="gold" size={50} 
          style={{backgroundColor:'#3eafff', marginHorizontal:14, borderRadius:30,marginVertical:5,}}/>
          <Text style={styles.itemName1}>{name}</Text>
        </TouchableOpacity>
    );
    ChangBrand = ({id})=>{
        this.setState({BrandID: id})
        this.ListenForItemsSamsung();    
    }

    ChangCate = ({id})=>{
      this.setState({CatogoryID: id});    
      this.ListenForItemsSamsung();
    }

    componentDidMount(){
      this.ListenForItemsSamsung();
      this.GetAllBrand();
      this.GetAllCate();
    }
  
    GetAllBrand =() =>{
      var items= [];
      this.itemRef.ref('/Brands').once('value').then((snapshot) => {
        snapshot.forEach(function (childSnapshot){
          items.push({
            image:childSnapshot.val().Image,
            id: childSnapshot.val().BrandID,
          })           
        })
        this.setState({
          listbrand:items,
      })      
    })
  }

    GetAllCate =() =>{
      var items= [];
      this.itemRef.ref('/Catogorys').once('value').then((snapshot) => {
        snapshot.forEach(function (childSnapshot){
          items.push({
            name:childSnapshot.val().Name,
            id: childSnapshot.val().CateProductID,
            icon:childSnapshot.val().Icon,
          })           
        })
        this.setState({
          listcategory:items,
      })      
    })
  }

    ListenForItemsSamsung = ()=>{
      var items=[];
        this.itemRef.ref('/Products').once('value').then((snapshot) => {
          var brandid = this.state.BrandID;
          var cateid = this.state.CatogoryID;
          snapshot.forEach(function (childSnapshot){
            if(brandid == "")
            {
                if(cateid == ""){
                  items.push({
                    title:childSnapshot.val().Name,
                    price:childSnapshot.val().Price,
                    metades:childSnapshot.val().MetaDescription,
                    image:childSnapshot.val().Image,
                    id: childSnapshot.val().ProductID,
                  })    
                }else{
                  if(childSnapshot.val().CategoryID == cateid){
                    items.push({
                      title:childSnapshot.val().Name,
                      price:childSnapshot.val().Price,
                      metades:childSnapshot.val().MetaDescription,
                      image:childSnapshot.val().Image,
                      id: childSnapshot.val().ProductID,
                  })                
                }  
              }                    
            }
            else{
                if(cateid == "")
                {
                    if(childSnapshot.val().BrandID == brandid){
                      items.push({
                        title:childSnapshot.val().Name,
                        price:childSnapshot.val().Price,
                        metades:childSnapshot.val().MetaDescription,
                        image:childSnapshot.val().Image,
                        id: childSnapshot.val().ProductID,
                    })                
                  }  
                }else{
                  if(childSnapshot.val().BrandID == brandid && childSnapshot.val().CategoryID == cateid ){
                    items.push({
                      title:childSnapshot.val().Name,
                      price:childSnapshot.val().Price,
                      metades:childSnapshot.val().MetaDescription,
                      image:childSnapshot.val().Image,
                      id: childSnapshot.val().ProductID,
                  })                
                }  
              }                
            }
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
        <View style={styles.headerContainer}> 
          <View style={styles.inputContainer}>
            <FontAwesome name="search" size={24} color="#969696" />
            <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
          </View>
        <View style={styles.cartContainer}>
          <TouchableOpacity onPress={() => navigation.push("Cart")}>
             <FontAwesome name="shopping-cart" size={24} color="#fff" /> 
          </TouchableOpacity> 
        </View>
      </View>
      
      <View style={styles.bodyContainer}> 
      <ScrollView>
      <Image source={section_banner} style={styles.sectionImage} />
        <View style={{backgroundColor:'#fff',paddingTop:10}}>
        <View style={{height:2, backgroundColor:'#1ba8ff'}}/>
          <View style={{}}>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
             data={this.state.listcategory}
                renderItem={({item})=>
                    <this.CategoryItem           
                    name={item.name}
                    id={item.id}
                    icon={item.icon}
          />
            }
            keyExtractor={item => item.id}
           />    
          <FlatList 
            style={{marginTop:10}}
            horizontal
            showsHorizontalScrollIndicator={false}
             data={this.state.listbrand}
                renderItem={({item})=>
                    <this.BrandItem           
                    image={item.image}
                    id={item.id}
          />
            }
            keyExtractor={item => item.id}
           /> 
           <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical:10}}>
            <TouchableOpacity style={{marginHorizontal:5}}>
                <Text style={styles.textnum}>Dưới 2 triệu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:5}}>
                <Text style={styles.textnum}>Từ 2 - 4 triệu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:5}}>
                <Text style={styles.textnum}>Từ 4 - 7 triệu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:5}}>
                <Text style={styles.textnum}>Từ 7 - 13 triệu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:5}}>
                <Text style={styles.textnum}>Từ 13 - 20 triệu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:5}}>
                <Text style={styles.textnum}>Trên 20 triệu</Text>
            </TouchableOpacity>
             </ScrollView>                                          
          </View>
          <View style={{height:2, backgroundColor:'#1ba8ff'}}/>
          <View style={{}}>
               <View style={styles.listItemContainer}>
                       <FlatList 
                         initialNumToRende={3}
                         showsVerticalScrollIndicator={false}
                         numColumns={2}
                         data={this.state.listcate}
                         renderItem={({item})=>
                         <TouchableOpacity onPress={() => navigation.push('Items', {id: item.id})}>
                             <ProductItem
                             name={item.title}
                             image={item.image}
                             price={item.price}
                       />                   
                         </TouchableOpacity>    
                         }
                         keyExtractor={item => item.id}
                  />     
               </View>   
          </View>
        </View>     
        </ScrollView>  
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
    bodyContainer: {
      flex: 1,
      backgroundColor: '#ededed',
    },
    scrollCate1:{
        height: height/12,
        flexDirection: 'row',
    },
    itemContainer: {
      alignItems:'center',
      width: width/2,
      height:height/4,
      margin: -0.5,
      borderColor:'#3eafff',
      borderWidth: 1,

      
    },
    listItemContainer: {
      flexDirection: 'row',
    },
    itemImage: {
      width: 150,
      height: 150,
      marginTop:5,
      resizeMode: 'contain'
    },
    itemName: {
      fontSize: 14,
      color: '#484848',
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: '500',
      color: '#2a2a2a',
    },
    cateImage:{
      marginVertical:5,
      width:width/6.15,
      height:height/15,
      resizeMode:"stretch",
    },
    cate:{
      margin:5,
      width:width/3,
      height:height/10,
      resizeMode:"center",
    },
    cate1:{
      margin:5,
      width:width/4.25,
      height:height/12,
      resizeMode:"center",
    },
    button1:{
      borderColor:'#1ba8ff', 
      borderLeftWidth:5
    },
    itemName1:{
      color:'#1ba8ff', 
      textAlign:'center', 
      fontWeight:'bold'
    },
    sectionImage: {
      width: width-20,
      height: 130,
      borderRadius: 4,
      marginHorizontal:10,
      resizeMode: 'contain'
    },
    textnum:{
      fontSize:15,
      color:'#1ba8ff'
    }
  });
  
   