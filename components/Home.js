import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
  Alert, 
  FlatList,
  SafeAreaView
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
	  image: "https://images.unsplash.com/photo-1574876999803-955c688d6581?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
	  capture: 0,
	  approved: 0,
	  isLoading: false,
    };
  }
  
  componentDidMount = async () => {
	  
	  
	  
	  
	  
	  const nik = await AsyncStorage.getItem("nik");
	  const nama_lengkap = await AsyncStorage.getItem("nama_lengkap");
	  const store = await AsyncStorage.getItem("store");
	  this.setState({nik: nik, nama: nama_lengkap, toko: store})
	  

	  
  };


  logout = async () => {
    await AsyncStorage.removeItem("nik");
    await AsyncStorage.removeItem("nama_lengkap");
    await AsyncStorage.removeItem("store");

    this.props.navigation.navigate("Login");
    this.setState({
      nik: "",
		nama: "",
		toko: "",
    });
  };



  render() {
	const DeviceWidth = Dimensions.get('window').width  
	  
    return (

		<SafeAreaView style={{
			padding: 25,
    flex: 1,
    alignItems: 'center',
  }}>
  
  
  <TouchableOpacity
                style={{
					alignItems: "center",
					backgroundColor: "red",
					padding: 10,
					color: 'white',
					marginBottom: 10,
					width: '100%',
				
				}}
                onPress={() => this.logout()}
              >
			  
			  
			  <Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}>LOGOUT</Text>
              </TouchableOpacity>
  
  
  	<SafeAreaView style={{
      flexDirection: 'row',
      backgroundColor: "#fff"}}>
      <View style={{padding: 12}}>
		
		
					<Text style={{color: '#000', fontSize:15, textTransform:'uppercase', fontWeight: 'bold'}}>Selamat bekerja, {this.state.nama} ({this.state.nik})</Text>
			<Text style={{color: '#000', fontSize:15, textTransform:'uppercase', marginBottom: 10, fontWeight: 'bold'}}>TOKO : {this.state.toko}</Text>
		
      </View> 
    </SafeAreaView>
  
  
  
    <SafeAreaView style={{
      flexDirection: 'row',
      backgroundColor: "#fff"}}>
      <View style={{padding: 12}}>
		
	<TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Absen");
                      }}
                    >	
		<Image style={{width: DeviceWidth*0.35, height: DeviceWidth*0.35, marginBottom:1, marginLeft:1, backgroundColor: 'white'}}
              source={require("../assets/absen_icon.png")}
            />
		<Text style={{textAlign: 'center', fontWeight: 'bold'}}>ABSENSI</Text>
		
	</TouchableOpacity>	
      </View>
      <View style={{paddingHorizontal: 12, paddingTop: 12}}>
        <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Cuti");
                      }}
                    >	
		<Image style={{width: DeviceWidth*0.35, height: DeviceWidth*0.35, marginBottom:1, marginLeft:1, backgroundColor: 'white'}}
              source={require("../assets/cuti.png")}
            />
		<Text style={{textAlign: 'center', fontWeight: 'bold'}}>PENGAJUAN CUTI</Text>
		
	</TouchableOpacity>	
      </View>    
    </SafeAreaView>
	
	

	
  </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
   containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    numberStyle: {
        flex: 1
    },

});
