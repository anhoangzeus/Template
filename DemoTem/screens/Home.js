import React,{useState} from 'react';
import { StyleSheet, 
  Dimensions, 
  ScrollView, 
  View,
  Image ,
  SafeAreaView,
  ActivityIndicator,
  TextInput ,
  LogBox,
  StatusBar,
  RefreshControl,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumberFormat from 'react-number-format';
import Swiper from 'react-native-swiper';
import {fbApp} from "../firebaseconfig";
import "firebase/auth"; 

const { width,height } = Dimensions.get('screen');
function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text>{formattedValue} đ</Text>} 
    />
  );
};
const ProductItem = ({image, name, price}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri:image}} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}><ReactNativeNumberFormat value={price}/> 
        <Text style={{color:"red"}}>  -20%</Text>
    </Text>
    <View style={{flexDirection:'row'}}>
      <Image source={require("../assets/images/star.jpg")} style={styles.reviewimg}/>
      <Text style={{color:'green',}}>(500)</Text>
    </View>
  </View>
);
const NewProductItem = ({image, name, price}) => (
  <View style={styles.itemContainer1}>
    <Image source={{uri:image}} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}><ReactNativeNumberFormat value={price}/> 
        <Text style={{color:"red"}}>  -20%</Text>
    </Text>
    <View style={{flexDirection:'row'}}>
      <Image source={require("../assets/images/star.jpg")} style={styles.reviewimg}/>
      <Text style={{color:'green',}}>(500)</Text>
    </View>
  </View>
);
export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    LogBox.ignoreAllLogs();
    this.itemRef = fbApp.database();
    this.state = { 
     listpro:[],
     listphone:[],
     listtablet:[],
     listdongho:[],
     listphukien:[],
     listall:[],
     listcontents:[],
     searchText:"",
     numcart:0,
     refreshing: false,
     loading:true
    }; 
  };
  componentDidMount(){
    this.ListenForItems();
    this.getListBanner();
    this._getListPhoneNew();
    this._getListLaptopNew();
    this._getListTabletNew();
    this._getListDongHoNew();
    this._getListPhukienNew();
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.ListenForItems();
    this.getListBanner();
    this._getListPhoneNew();
    this._getListLaptopNew();
    this._getListTabletNew();
    this._getListDongHoNew();
    this._getListPhukienNew();
  };
  _getListPhoneNew = () => {
    this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var itemsphone=[];
      snapshot.forEach(function (childSnapshot){   
        if(childSnapshot.val().CategoryID=="AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI")
        {
          itemsphone.push({ 
            title : childSnapshot.val().Name,
            price : childSnapshot.val().Price,
            image : childSnapshot.val().Image,
            metades:childSnapshot.val().MetaDescription,
            id : childSnapshot.val().ProductID,
            BrandID : childSnapshot.val().BrandID,
            CategoryID : childSnapshot.val().CategoryID,
          });
        };                   
      });
      this.setState({
        listphone:itemsphone,
      });
    });
  };
  _getListLaptopNew = () => {
    this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var itemslap=[];
      snapshot.forEach(function (childSnapshot){   
        if(childSnapshot.val().CategoryID=="-MJaC7kTLJOYZjt9G4zs")
        {
          itemslap.push({ 
            title : childSnapshot.val().Name,
            price : childSnapshot.val().Price,
            image : childSnapshot.val().Image,
            metades:childSnapshot.val().MetaDescription,
            id : childSnapshot.val().ProductID,
            BrandID : childSnapshot.val().BrandID,
            CategoryID : childSnapshot.val().CategoryID,
          });
        };                   
      });
      this.setState({
        listpro:itemslap,
      });
    });
  };
  _getListTabletNew = () => {
    this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var itemstab=[];
      snapshot.forEach(function (childSnapshot){   
        if(childSnapshot.val().CategoryID=="-MJaB1_P1gTPbxmjMXSW")
        {
          itemstab.push({ 
            title : childSnapshot.val().Name,
            price : childSnapshot.val().Price,
            image : childSnapshot.val().Image,
            metades:childSnapshot.val().MetaDescription,
            id : childSnapshot.val().ProductID,
            BrandID : childSnapshot.val().BrandID,
            CategoryID : childSnapshot.val().CategoryID,
          });
        };                   
      });
      this.setState({
        listtablet:itemstab,
      });
    });
  };
  _getListDongHoNew = () => {
    this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var itemsdongho=[];
      snapshot.forEach(function (childSnapshot){   
        if(childSnapshot.val().CategoryID=="-MJaCJRVtI_o9Hv5XY-N")
        {
          itemsdongho.push({ 
            title : childSnapshot.val().Name,
            price : childSnapshot.val().Price,
            image : childSnapshot.val().Image,
            metades:childSnapshot.val().MetaDescription,
            id : childSnapshot.val().ProductID,
            BrandID : childSnapshot.val().BrandID,
            CategoryID : childSnapshot.val().CategoryID,
          });
        };                   
      });
      this.setState({
        listdongho:itemsdongho,
      });
    });
  };
  _getListPhukienNew = () => {
    this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var itemsphukien=[];
      snapshot.forEach(function (childSnapshot){   
        if(childSnapshot.val().CategoryID=="-MJaCDw6CYGQenBvOtGO")
        {
          itemsphukien.push({ 
            title : childSnapshot.val().Name,
            price : childSnapshot.val().Price,
            image : childSnapshot.val().Image,
            metades:childSnapshot.val().MetaDescription,
            id : childSnapshot.val().ProductID,
            BrandID : childSnapshot.val().BrandID,
            CategoryID : childSnapshot.val().CategoryID,
          });
        };                   
      });
      this.setState({
        listphukien:itemsphukien,
      });
    });
  };
  ListenForItems = () => {
    this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var items=[];
      snapshot.forEach(function (childSnapshot){     
          items.push({
            title : childSnapshot.val().Name,
            price : childSnapshot.val().Price,
            image : childSnapshot.val().Image,
            metades : childSnapshot.val().MetaDescription,
            id : childSnapshot.val().ProductID,
            BrandID : childSnapshot.val().BrandID,
            CategoryID : childSnapshot.val().CategoryID,                          
          });
        }); 
      this.setState({
        listall:items,
      });
    });
  };
  getListBanner =() =>{
    this.itemRef.ref('Contents').once('value').then((snapshot)=>{
      var items=[];
      snapshot.forEach((childSnapshot) => {
        items.push({           
          id:childSnapshot.key,
          Detail:childSnapshot.val().Detail,
          Image:childSnapshot.val().Image,
          Name:childSnapshot.val().Name,
        });
      });
      this.setState({
        listcontents:items,
        refreshing: false,
        loading:false
      });
    });
  };
  renderNofiCart = () =>{
    if(fbApp.auth().currentUser){ 
      this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid).once('value').then((snapshot) => {
        var dem = 0;
        snapshot.forEach(function(childSnapshot){
        dem += childSnapshot.val().Quantity;
        });
        this.setState({
        numcart:dem,
        });  
      });  
    }
    if(this.state.numcart == 0){
      return null;
    }
    else{
      return(
        <View style={{position:"absolute", borderRadius:25,backgroundColor:"red",alignItems:"center",marginLeft:width/30,width:width/20}}>
              <Text style={{alignSelf:'center', fontSize:10,margin:1,fontWeight:'bold',color:'white'}} numberOfLines={1}>{this.state.numcart}</Text>
        </View>
      )
    }
  };
  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }  
  return (  
    <View style={styles.screenContainer}>
    <StatusBar backgroundColor='#1e88e5' barStyle="light-content"/>
    <View style={styles.headerContainer}>
    <TouchableOpacity  onPress={()=> navigation.navigate("Setting")}>
    <View style={styles.inputContainer}>
          <FontAwesome name="search" size={24} color="#969696" />
          <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
      </View>
      </TouchableOpacity>
      <View style={styles.cartContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>    
             <FontAwesome name="shopping-cart" size={24} color="#fff" /> 
             {this.renderNofiCart()}
          </TouchableOpacity>       
      </View>     
    </View>
    <View style={styles.bodyContainer}>
       <ScrollView
           refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
          }
      >
        
        <Swiper 
            autoplay={true}
            autoplayTimeout={2}
            loop={true}
            showsPagination={true}
            showsButtons={true}
            index={0}
            width={width}
            height={height / 4.2}>
              {this.state.listcontents.map((item)=>
                <TouchableOpacity 
                key={item.id}
                onPress={() => {}}>
                    <View style={styles.sectionContainer}>
                    <Image source={{uri: item.Image}} style={styles.sectionImage} />
                    </View>
                </TouchableOpacity>  
              )}
            </Swiper>

      <View style={styles.proHotContainer1}>
        <Text style={{fontSize:17, color:'black',}}>
          <Icons name="fire" color="red" size={25}/>
          Hot nhất hôm nay </Text>
        <View style={{flexDirection:'row', marginTop:5}}>
          <Image style={styles.tophotimg1}
              source={require('../assets/images/iphonepromax.jpg')}
          />
          <View style={{marginLeft:5}}>
            <Image style={styles.hotimgtype2} source={require('../assets/images/sale1.jpg')}
            />
            <Image style={styles.hotimgtype1} source={require('../assets/images/sale2.jpg')}
            />   
          </View>
          <View style={{marginLeft:5}}>
            <Image style={styles.hotimgtype2} source={require('../assets/images/sale3.jpg')}
            />
            <Image style={styles.hotimgtype1} source={require('../assets/images/sale4.jpg')}
            />           
          </View>    
        </View>
      </View>  
      
      <View style={styles.proHotContainer1}>
        <Text style={{fontSize:17, color:'black',}}>
          <Icons name="fire" color="red" size={25}/>
          Top sản phẩm bán chạy </Text>
        <View style={{flexDirection:'row', marginTop:5}}>
          <Image style={styles.tophotimg1}
              source={require('../assets/images/iphonepromax.jpg')}
          />
          <View style={{marginLeft:5}}>
            <Image style={styles.hotimgtype2} source={{uri:"https://cdn.tgdd.vn/Products/Images/42/213031/TimerThumb/iphone-12-blue-600x600-thumb-hen-gio.jpg"}}
            />
            <Image style={styles.hotimgtype1} source={{uri:"https://cdn.tgdd.vn/Products/Images/42/229056/oppo-a93-230520-060532-400x400.jpg"}}
            />   
          </View>
          <View style={{marginLeft:5}}>
            <Image style={styles.hotimgtype2} source={{uri:"https://cdn.tgdd.vn/Products/Images/42/225380/iphone-12-mini-blue-600jpg-400x400.jpg"}}
            />
            <Image style={styles.hotimgtype1} source={{uri:"https://cdn.tgdd.vn/Products/Images/42/217308/xiaomi-redmi-9-tim-new-600x600-400x400.jpg"}}
            />           
          </View>    
        </View>
      </View>  
      <View style={styles.proHotContainer}>
        <Text style={{fontSize:17, color:'black',marginVertical:10}}>
            <Foundation name="burst-new" color="red" size={25}/>
           Mẫu điện thoại mới nhất
        </Text>
        <FlatList 
            horizontal={true}
            numberOfLines={2}
            showsHorizontalScrollIndicator={false}
            data={this.state.listphone}
            renderItem={({item})=>
            <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
                <NewProductItem
                        name={item.title}
                        image={item.image}
                        price={item.price}
                      />
            </TouchableOpacity>  
            }
        />    
      </View>
      <View style={styles.proHotContainer}>
        <Text style={{fontSize:17, color:'black',marginVertical:10}}>
            <Foundation name="burst-new" color="red" size={25}/>
           Mẫu Tablet mớt nhất
        </Text>
        <FlatList 
            horizontal={true}
            numberOfLines={2}
            showsHorizontalScrollIndicator={false}
            data={this.state.listtablet}
            renderItem={({item})=>
            <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
                <NewProductItem
                        name={item.title}
                        image={item.image}
                        price={item.price}
                      />
            </TouchableOpacity>  
            }
        />    
      </View>
      <View style={styles.proHotContainer}>
        <Text style={{fontSize:17, color:'black',marginVertical:10}}>
            <Foundation name="burst-new" color="red" size={25}/>
           Mẫu Laptop mới nhất
        </Text>
        <FlatList 
            horizontal={true}
            numberOfLines={2}
            showsHorizontalScrollIndicator={false}
            data={this.state.listpro}
            renderItem={({item})=>
            <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
                <NewProductItem
                        name={item.title}
                        image={item.image}
                        price={item.price}
                      />
            </TouchableOpacity>  
            }
        />    
      </View>
      <View style={styles.proHotContainer}>
        <Text style={{fontSize:17, color:'black',marginVertical:10}}>
            <Foundation name="burst-new" color="red" size={25}/>
           Mẫu đồng hồ sang trọng mới 
        </Text>
        <FlatList 
            horizontal={true}
            numberOfLines={2}
            showsHorizontalScrollIndicator={false}
            data={this.state.listdongho}
            renderItem={({item})=>
            <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
                <NewProductItem
                        name={item.title}
                        image={item.image}
                        price={item.price}
                      />
            </TouchableOpacity>  
            }
        />    
      </View>
      <View style={styles.proHotContainer}>
        <Text style={{fontSize:17, color:'black',marginVertical:10}}>
            <Foundation name="burst-new" color="red" size={25}/>
           Mẫu phụ kiện mới nhất
        </Text>
        <FlatList 
            horizontal={true}
            numberOfLines={2}
            showsHorizontalScrollIndicator={false}
            data={this.state.listphukien}
            renderItem={({item})=>
            <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
                <NewProductItem
                        name={item.title}
                        image={item.image}
                        price={item.price}
                      />
            </TouchableOpacity>  
            }
        />  
      </View>
    <View style={{marginTop:10}}>
    <FlatList 
        initialNumToRende={3}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={this.state.listall}
        renderItem={({item})=>
        <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
            <ProductItem
                    name={item.title}
                    image={item.image}
                    price={item.price}
                  />
        </TouchableOpacity>  
        }
        ></FlatList>    
    </View>
      <View style={{height:10, backgroundColor:'silver'}}/>
      <View style={styles.sectionContainer}>
      </View> 
      </ScrollView>
    </View>
  </View>
    ); 
  };
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  proHotContainer1:{
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height:height/2.8
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
    paddingVertical: height/50,
    paddingHorizontal: 12,
    borderRadius: 2,
    height:height/10,
    width:width*0.8,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  cartContainer: {
    paddingHorizontal: 15, 
    justifyContent: 'center',
    width:75,
    borderRadius:15,
    paddingTop:5,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    width: width/2,
    height:height/2.8,
    borderColor:'silver',
    borderWidth:1,
  },
  itemImage: {
    width: width/2.5,
    height: height/4,
    resizeMode:'contain',
    alignSelf:'center'
  },
  itemName: {
    fontSize: 14,
    color: 'black',
    marginHorizontal:10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal:10
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginTop:10,
  },
  proHotContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height:height/2.3
  },
  sectionImage: {
    width: width - 24,
    height: height/4.5,
    borderRadius: 10,
    resizeMode:'center',
  },
  hotimgtype1:{
    width:width/3.5,
    height:height/6.7, 
    borderWidth:1, 
    borderColor:'#DDDDDD', 
    borderRadius:5,
    marginTop:5,
    resizeMode:'contain'
  },
  hotimgtype2:{
    width:width/3.5,
    height:height/6.7, 
    borderWidth:1, 
    borderColor:'#DDDDDD', 
    borderRadius:5,
    resizeMode:'contain'
  },
  itemContainer1:{
    width: width/2.15,
    height:height/2.8,
    borderColor:'silver',
    borderWidth:1,
    borderRadius:25,
    marginRight:5
  },
  reviewimg:{
    width:width/4,
    height:height/50,
    marginLeft:width/60
  },
  tophotimg1:{
    width:width/3,
    height:height/3.285, 
    borderWidth:1, 
    borderColor:'#DDDDDD', 
    borderRadius:5,
    resizeMode:'cover'
  }
});