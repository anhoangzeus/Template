  import React from 'react';
  import { 
    Image, 
    StyleSheet,
    ScrollView, 
    StatusBar, 
    Dimensions, 
    Platform,
    View,
    ActivityIndicator,
    Text,
    SafeAreaView,
    Button,
    FlatList,
    TouchableOpacity,
    RefreshControl,
  } from 'react-native';
  import NumberFormat from 'react-number-format';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {fbApp} from "../firebaseconfig";
  import "firebase/auth";
  import Swiper from 'react-native-swiper';

  const { height, width } = Dimensions.get('screen');
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
  export default class Pro extends React.PureComponent {
    constructor(props) {
      super(props);
      this.itemRef = fbApp.database();
      this.state = { 
        listcate:[],
        listbrand:[],
        listcategory:[],
        listcontents:[],
        BrandID:"",
        CatogoryID:"AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI",
        Price:0,
        Date:"",
        loading1:true,
        loading2:true,
        loading3:true,
        refreshing: false,
        numcart:0,
      }; 
    };
    BrandItem = ({image,id}) => (
      <TouchableOpacity onPress={()=> this.setState({BrandID :id})} style={styles.branditemContainer}>
            <Image source={{uri:image}} style={styles.cateImage} />
      </TouchableOpacity>
    );
    CategoryItem = ({name,id,icon}) => (
        <TouchableOpacity  onPress={()=> this.setState({CatogoryID: id})}>
          <Icons name={icon} color="gold" size={width/8} 
            style={styles.cateIcon}/>
          <Text style={styles.itemName1}>{name}</Text>
        </TouchableOpacity>
    );
    componentDidUpdate(prevProps, prevState){
      if(this.state.BrandID != prevState.BrandID || this.state.CatogoryID != prevState.CatogoryID)
        this.ListenForItemsSamsung();
    };
    componentDidMount(){
      this.ListenForItemsSamsung();
      this.GetAllBrand();
      this.GetAllCate();
      this.getListBanner();
    };
    _onRefresh = () => {
      this.setState({refreshing: true});
      this.ListenForItemsSamsung();
      this.GetAllBrand();
      this.GetAllCate();
      this.getListBanner();
    };
    GetAllBrand =() =>{
      var items= [];
      this.itemRef.ref('/Brands').once('value').then((snapshot) => {
        snapshot.forEach(function (childSnapshot){
          items.push({
            image:childSnapshot.val().Image,
            id: childSnapshot.val().BrandID,
          });         
        });
        this.setState({
          listbrand:items,
          loading2:false
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
          loading3:false
      });  
    });
  };
  ListenForItemsSamsung = ()=>{
    var items=[];
      this.itemRef.ref('/Products').once('value').then((snapshot) => {
      var brandid = this.state.BrandID;
      var cateid = this.state.CatogoryID;
      snapshot.forEach(function (childSnapshot){
        if(brandid == ""){
          if(cateid == ""){
            items.push({
              title:childSnapshot.val().Name,
              price:childSnapshot.val().Price,
              metades:childSnapshot.val().MetaDescription,
              image:childSnapshot.val().Image,
              id: childSnapshot.val().ProductID,
              BrandID:childSnapshot.val().BrandID,
              CategoryID:childSnapshot.val().CategoryID,
            })    
          }else{
              if(childSnapshot.val().CategoryID == cateid){
                items.push({
                  title:childSnapshot.val().Name,
                  price:childSnapshot.val().Price,
                  metades:childSnapshot.val().MetaDescription,
                  image:childSnapshot.val().Image,
                  id: childSnapshot.val().ProductID,
                  BrandID:childSnapshot.val().BrandID,
                  CategoryID:childSnapshot.val().CategoryID,
                })                
              }  
            }                    
          }else{
            if(cateid == ""){
              if(childSnapshot.val().BrandID == brandid){
                items.push({
                  title:childSnapshot.val().Name,
                  price:childSnapshot.val().Price,
                  metades:childSnapshot.val().MetaDescription,
                  image:childSnapshot.val().Image,
                  id: childSnapshot.val().ProductID,
                  BrandID:childSnapshot.val().BrandID,
                  CategoryID:childSnapshot.val().CategoryID,
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
                  BrandID:childSnapshot.val().BrandID,
                  CategoryID:childSnapshot.val().CategoryID,
                })                
              }  
            }                
          }
        })
      this.setState({
        listcate:items,
        loading1:false
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
        <View style={{position:"absolute", borderRadius:25,backgroundColor:"red",alignItems:"center",marginLeft:width/12,width:width/20 }}>
              <Text  style={{alignSelf:'center', fontSize:10,margin:1,fontWeight:'bold',color:"white"}} numberOfLines={1}>{this.state.numcart}</Text>
        </View>
      )
    }
  };
  render() {
    const { navigation } = this.props;
    if (this.state.loading1 || this.state.loading1 || this.state.loading3) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }
    return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}> 
        <View style={styles.inputContainer}>
          <FontAwesome name="search" size={24} color="#969696" />
          <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
        </View>
        <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate("Cart")}>
          <FontAwesome name="shopping-cart" size={24} color="#fff" /> 
          {this.renderNofiCart()}
        </TouchableOpacity> 
      </View>
      <View style={styles.bodyContainer}> 
    <ScrollView
       refreshControl={
        <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
        />}
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
              </TouchableOpacity>)}
          </Swiper>
        <View style={{backgroundColor:'#fff'}}>
        <View style={{height:2, backgroundColor:'#1ba8ff'}}/>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.listcategory}
            renderItem={({item})=>
              <this.CategoryItem           
                name={item.name}
                id={item.id}
                icon={item.icon}
              />}
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
              />}
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
      <View style={{height:2, backgroundColor:'#1ba8ff'}}/>
        <View style={styles.listItemContainer}>
          <FlatList 
            initialNumToRende={3}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.listcate}
            renderItem={({item})=>
              <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
                <ProductItem
                  name={item.title}
                  image={item.image}
                  price={item.price}
                />                   
              </TouchableOpacity>}
            keyExtractor={item => item.id}
          />     
        </View>   
      </View>
      <View style={{height:height/7}}>
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
      paddingTop:5,
      justifyContent: 'center',
      borderRadius:15,
      width:70
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
      height:height/3.6,
      margin: -0.2,
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
      width:width/6.5,
      height:height/20,
      resizeMode:"contain",
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
      width: width - 24,
      height: height/4.5,
      borderRadius: 10,
      resizeMode:'center',
      margin:10
    },
    textnum:{
      fontSize:15,
      color:'#1ba8ff'
    },
    itemImage1: {
      width: 100,
      height: 120,
      resizeMode:'contain'
    },
    reviewimg:{
      width:width/4,
      height:height/50,
      marginLeft:width/60
    },
    branditemContainer:{
      marginHorizontal:5,
      borderStyle:"solid",
      width:width/4.5,
      height:height/13,
      justifyContent:"center",
      alignItems:'center',
      borderWidth:2,
      borderRadius:70, 
      borderColor:'#3eafff'
    },
    cateIcon:{
      backgroundColor:'#3eafff', 
      marginHorizontal:14, 
      borderRadius:30,
      marginVertical:5
    }
  });
  
   