import React, { Component } from 'react';
import {
  Image, 
  StyleSheet,
  ScrollView, 
  StatusBar, 
  Dimensions, 
  Platform,
  View,
  ActivityIndicator, 
  Alert ,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import {  Button} from 'galio-framework';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import { element } from 'prop-types';
import NumberFormat from 'react-number-format';
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
}
export default class Cart extends Component{
    constructor(props) {
        super(props);
        this.itemRef = fbApp.database();
        this.state = { 
         CartItem:[],
         Address:{},
         refesh:true,
         amount:0,
         loading:true,
         hasAddress:false
        }; 
      }
    componentDidMount(){
          this.ListenCart();       
          this.GetAddress();
    }
      GetAddress =() =>{
        if(fbApp.auth().currentUser)
        {
            this.itemRef.ref('ListAddress').child(fbApp.auth().currentUser.uid).once('value')
            .then((snapshot)=>{
              var item;
              snapshot.forEach(function(childSnapshot){
                var Address={
                  ShipName:'',
                  ShipPhone:'',
                  NumberAddress:'',
                  Xa:'',
                  Huyen:'',
                  City:'',
                }
                if(childSnapshot.val().Main==true){
                  Address.ShipName= childSnapshot.val().ShipName;
                  Address.ShipPhone= childSnapshot.val().ShipPhone;
                  Address.NumberAddress= childSnapshot.val().NumberAddress;
                  Address.Xa= childSnapshot.val().Xa;
                  Address.Huyen= childSnapshot.val().Huyen;
                  Address.City= childSnapshot.val().City;
                  item=Address;
                }
              });
              if(item !=null){
                this.setState({hasAddress:true})
              }
              this.setState({
                Address:item,
                loading:false
            })
          })
        }
      }
      ListenCart = () => {
        console.log("vao gio hang");
        if(fbApp.auth().currentUser){
          this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid).once('value').then((snapshot) => {
            var items =[];
            snapshot.forEach(function(childSnapshot){
              items.push({
                key : childSnapshot.key,
                Id : childSnapshot.val().Id,
                Name : childSnapshot.val().Name,
                Picture : childSnapshot.val().Picture,
                Price : childSnapshot.val().Price,
                Quantity : childSnapshot.val().Quantity,
                BrandID : childSnapshot.val().BrandID,
                CategoryID : childSnapshot.val().CategoryID,
              });
            });
            this.setState({
              CartItem:items,
            })  
            console.log(this.state.amount);
          })  
        }
      }   
       GetCurrentDate =()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1; 
        var year = new Date().getFullYear();
        var gio = new Date().getHours();
        var phut = new Date().getMinutes();
        var giay = new Date().getSeconds();
          return date + '/' +month+ "/" +year + " " + gio+":"+ phut+":"+giay;
      }
      _checkGioHang=()=>{
        if(this.state.amount!=0 && this.state.hasAddress==true)
        {
          this.props.navigation.navigate("Payment",{content : this.state.amount})
        }else{
          Alert.alert("Hãy mua sắm ngay thôi")
        }
      }
    render(){
      const { navigation } = this.props;
      console.log(this.state.CartItem);
      this.state.amount=0;
      this.state.CartItem.forEach(element =>{      
        const a = Number(element.Price);        
        this.state.amount+=(Number(element.Price) * element.Quantity);
      })  
      if (this.state.loading) {
        return (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        )
      }
    return(      
     <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{width:75}} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="#fff" style={{marginLeft:width/40}}/>
          </TouchableOpacity>
        
          <Text style={styles.headerText}>Giỏ hàng</Text>  
        </View>
        <ScrollView style={{height:height}}>
        { this.state.hasAddress ? 
          <View style={styles.listItem}>
          <View style={{flex:1, margin: 10}}>   
            <View style={{flexDirection:'row',justifyContent:'space-between' }}>
            <Text style={styles.addresstitle}>Địa chỉ nhận hàng</Text>
            <TouchableOpacity
              onPress={()=> {this.props.navigation.navigate("AddressScreen")}}
              >
              <Text style={{color:'green', marginRight:5, fontSize:17}}>Thay đổi</Text>
            </TouchableOpacity>
            </View>
           
            <Text style={styles.address}>{this.state.Address.NumberAddress}, {this.state.Address.Xa}, {this.state.Address.Huyen}, {this.state.Address.City}</Text>
            <Text style={styles.address}>{this.state.Address.ShipName} - {this.state.Address.ShipPhone}</Text>
            <View style={{justifyContent:'space-between', flexDirection:'row',marginTop:10}}>
              </View>             
            </View>                   
          </View>
          :
          <View style={styles.listItem}>
                <TouchableOpacity 
                    onPress={()=> {this.props.navigation.navigate('DetailAddressScreen', {id: ""})}}
                    style={{flex:1, margin: 10, flexDirection:'row'}}>
                  <FontAwesome name="plus" color="green" size={25}/>
                     <Text style={{color: 'green',fontSize:20, marginLeft:10}}>Thêm địa chỉ nhận hàng</Text>
               </TouchableOpacity>
          </View>
        }
        <FlatList 
          data={this.state.CartItem}
          extraData={this.state.refesh}
          renderItem={ ({item})=>
          <View style={styles.itemcard}>
          <View style={{paddingLeft:10,paddingTop:5,flexDirection:"row"}}>
            <TouchableOpacity onPress={() => navigation.navigate('Items', {id: item.Id, CategoryID: item.CategoryID, BrandID: item.BrandID})}>
            <Text style={styles.itemName}>{item.Name} </Text>
            </TouchableOpacity>
          <View style={{marginTop:0}}>
          <FontAwesome name="angle-right" size={30} />
          </View>
          </View>
          <View style={{flexDirection:"row"}}>
          <FontAwesome name="gift" color="green" size={24} style={styles.itemGift} ></FontAwesome>
          <Text style={{marginLeft:5, color:"green", fontSize:18}}>nhận một phần quà may mắn</Text>
          </View>
          <View style={styles.itemInfo}>
            <Image style={styles.itemImage} source={{uri:item.Picture }}></Image>
            <View style={styles.itemDec}>
              <Text style={{marginVertical:4,fontSize:16}} numberOfLines={2}> </Text>
              <Text style={{marginVertical:4,fontSize:19, color:"red"}}><ReactNativeNumberFormat value={item.Price}/></Text>
              <View style={{flexDirection:"row"}}>            
                  <Button style={styles.buttonUpDown} color='#ff3333' onPress={()=>{
                    if(item.Quantity>1){
                      console.log("vào sub");
                      this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+"/"+item.key).set({
                        Id:item.Id,
                        Name:item.Name,
                        Picture:item.Picture,
                        Price:item.Price,
                        Quantity:item.Quantity-1,
                       });
                      this.state.CartItem.forEach(element => {if(element.Id == item.Id){element.Quantity=item.Quantity-1}});
                      this.setState({ 
                        refresh: !this.state.refresh
                    });
                    console.log(this.state.refesh);
                    }else{
                      this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+'/'+item.key).set({
                      })
                      var dem=0;
                      
                      this.state.CartItem.forEach(element => {
                        if(element.Id == item.Id){return;}
                        else{
                          dem++;
                        }       
                      });
                      console.log(dem);
                      this.state.CartItem.splice(dem-1,1);
                      this.setState({ 
                        refresh: !this.state.refresh
                    });
                    }
                  }}>-</Button>
                <View style={{marginTop:10}}><Text fontSize={18} >{item.Quantity}</Text></View>
                <Button style={styles.buttonUpDown} color='#ff3333' onPress={
                  ()=>{
                    console.log("vào add");
                    this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+"/"+item.key).set({
                      Id:item.Id,
                      Name:item.Name,
                      Picture:item.Picture,
                      Price:item.Price,
                      Quantity:item.Quantity+1,
                     })
                     this.state.CartItem.forEach(element => {if(element.Id == item.Id){element.Quantity=item.Quantity+1}});
                     this.setState({ 
                      refresh: !this.state.refresh
                  });
                  }
                }>+</Button>
              </View>
            </View>
            <View style={{marginLeft:width/8}}>
              <TouchableOpacity onPress={() =>{
                this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+'/'+item.key).set({
                })
                var dem=0;
                
                this.state.CartItem.forEach(element => {
                  if(element.Id == item.Id){return;}
                  else{
                    dem++;
                  }       
                });
                console.log(dem);
                this.state.CartItem.splice(dem-1,1);
                this.setState({ 
                  refresh: !this.state.refresh
              });
              }}>
              <FontAwesome  name="remove" size={25} color="red" />
              </TouchableOpacity>       
            </View>
          </View>
        </View>
          }
        />
        </ScrollView>
        <View style={{backgroundColor:"#fff",marginBottom:5}}>
          <View flexDirection="row">
              <Text style={{marginLeft:10, fontSize:16}}>Thành tiền: </Text>
              <View style={{marginLeft:width*0.4}}><Text color="red" style={{fontSize:20}}><ReactNativeNumberFormat value={this.state.amount} /></Text></View>
          </View>
          <Button style={styles.btnSubmit} color='#ff3333' onPress={() =>{this._checkGioHang()}} >Tiến hành đặt hàng</Button>
        </View>
      <View style={styles.bodyContainer}></View>
    </View>
        )
    }
}
const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor:"silver"
    },
    
    headerContainer: {
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 4,
      backgroundColor: '#1e88e5',
    },
    headerText:{
      color:"white",
      textAlignVertical: 'center',
      marginLeft:width*0.23,
      fontSize:20,
    },
    itemcard:{
      backgroundColor:'#fff',
      width:width,
      height:height*0.3,
      marginTop:width/100,
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
    listItem:{
      backgroundColor:"#fff",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5,
      width:width
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
      backgroundColor: 'silver',
    },
    itemGift:{
      marginLeft:10,
      flexDirection:"row"
    },
    itemImage: {
      width: width/4,
     height:height/6,
     resizeMode:'contain'
    },
    itemInfo: {
      flexDirection: 'row',
      marginTop:height/35,
      marginLeft:5
    },
    
    itemName: {
      fontSize: 16,
      color: '#484848',
      marginVertical: 4,
      fontWeight:"bold"
    },
    itemDec:{
      marginLeft: width/20,
      marginRight:20,
      width:width*0.45,
    },
    buttonUpDown:{
     width:width/15,
     height:height/30,
    },
    btnSubmit:{
      width:width*0.9,
      marginLeft:width*0.05,
    },
    address:{
      marginTop:5,
      fontSize:17
    },
    addresstitle:{
      fontWeight:'bold',
      fontSize:17
    }
});