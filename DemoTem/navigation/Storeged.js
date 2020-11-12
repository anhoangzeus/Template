import AsyncStorage from '@react-native-community/async-storage';


export async function storeToken(user) {
    try{
        await AsyncStorage.setItem("userData", JSON.stringify(user));
    }
    catch (e){
        console.log("Loi", e);
    }
}
export async function getToken() {
    try {
        let userData = await AsyncStorage.getItem("userData");
        let data = JSON.parse(userData);
        dataToken = data;
        // console.log(data); 
        // console.log(userData);
  
    } catch (error) {
      console.log("Something went wrong", error);
    }
    var a ="aasasasas"
    return a;
  }
  