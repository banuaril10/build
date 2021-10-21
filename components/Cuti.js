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
  SafeAreaView 	  
} from "react-native";
import * as Location from 'expo-location';
import * as Permissions from "expo-permissions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from "react-native-datepicker";
import moment from "moment";
export default class Cuti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
	  image: "https://absen.idolmartidolaku.com/noimage.png",
	  capture: 0,
	  approved: 0
    };
  }
  
  componentDidMount = async () => {
	  
	  
	  
	  
	  
	  const nik = await AsyncStorage.getItem("nik");
	  const nama_lengkap = await AsyncStorage.getItem("nama_lengkap");
	  const store = await AsyncStorage.getItem("store");
	  this.setState({nik: nik, nama: nama_lengkap, toko: store})
	  

	  
	// const value = await AsyncStorage.getItem("nohp");
    // if (value !== null) {
      // this.props.navigation.navigate("ListStore");
    // }
	  
    // await Facebook.initializeAsync('587269805125650');
    // firebase.auth().onAuthStateChanged((user) => {
      // if (user != null) {
        // console.log(user);
      // }
    // });
    // this.signOutAsync();
    const { state, navigate } = this.props.navigation;
    const { navigation } = this.props;
  };
  

	cekLocation = (lat, lng, store) => {
        this.setState({ isLoading: true });
		
		
		
		
		
      fetch('https://absen.idolmartidolaku.com/action.php?modul=absen&act=ceklokasi&lat='+lat+'&long='+lng+'&store='+store)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == "1") {
            ToastAndroid.show("Location approved", ToastAndroid.SHORT)
			this.setState({approved: 1});
          } else if(responseJson.result == "0"){
			ToastAndroid.show("Lokasi diluar jangkauan", ToastAndroid.SHORT)
			this.setState({approved: 0});
			  
		  } else {
            Alert.alert(
              "Mohon maaf absen tidak berhasil!",
              "Server tidak berjalan..",
              [{ text: "OKE", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.setState({
              loading: false,
            });
          }
        });
		
		this.setState({ isLoading: false });
    
  };


  onPress = () => {
    this.signInAsync();
  };
  
  
   absensi = () => {
	if(this.state.capture == 0){
		ToastAndroid.show("Ambil foto terlebih dahulu", ToastAndroid.SHORT)
		
	}else{
		
		
	this.setState({ error: "", loading: true });
    const { nik, nama, toko } = this.state;
	
	const data = new FormData();
	data.append("nik", nik);
	data.append("nama", nama);
	data.append("toko", toko);
          if (this.state.image != null) {
            data.append("image", {
              uri: this.state.image,
              type: "image/jpeg",
              name: "default.jpg",
            });
          }




      fetch("https://absen.idolmartidolaku.com/action.php?modul=absen&act=masuk", {
        method: "POST",
        body: data, // <-- Post parameters
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == "1") {
            ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
			this.setState({ image: "https://absen.idolmartidolaku.com/noimage.png" });
			this.setState({capture: 0,});
          } else if(responseJson.result == "0"){
			  ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
		  } else {
            Alert.alert(
              "Mohon maaf absen tidak berhasil!",
              "Server tidak berjalan..",
              [{ text: "OKE", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.setState({
              loading: false,
            });
          }
        });
		
		
		
		
	}
  };
  
  
  
  absensi_pulang = () => {
	if(this.state.capture == 0){
		ToastAndroid.show("Ambil foto terlebih dahulu", ToastAndroid.SHORT)
		
	}else{
		
		
	this.setState({ error: "", loading: true });
    const { nik, nama, toko } = this.state;

const data = new FormData();
	data.append("nik", nik);
	data.append("nama", nama);
	data.append("toko", toko);
          if (this.state.image != null) {
            data.append("image", {
              uri: this.state.image,
              type: "image/jpeg",
              name: "default.jpg",
            });
          }


      fetch("https://absen.idolmartidolaku.com/action.php?modul=absen&act=pulang", {
        method: "POST",
        body: data, // <-- Post parameters 
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == "1") {
            ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
			this.setState({ image: "https://absen.idolmartidolaku.com/noimage.png" });
			this.setState({capture: 0,});
          } else if(responseJson.result == "0"){
			  ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
		  } else {
            Alert.alert(
              "Mohon maaf absen tidak berhasil!",
              "Server tidak berjalan..",
              [{ text: "OKE", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.setState({
              loading: false,
            });
          }
        });
		
		
		
		
	}
  };

  // onSignUpPress() {
    // this.setState({ error: "", loading: true, halaman: "login" });

    // const { email_regis, password_regis } = this.state;
    // firebase
      // .auth()
      // .createUserWithEmailAndPassword(email_regis, password_regis)
      // .then(() => {
        // this.setState({ error: "", loading: false });
        // this.props.navigation.navigate("gettingData");
      // })
      // .catch(() => {
        // this.setState({ error: "Authentication Failed", loading: false });
      // });
  // }

 takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {

      this.setState({ image: result.uri });
	  console.log(result.uri);
	  this.setState({capture: 1})
    }
    //CameraRoll.saveToCameraRoll(this.state.image);
    // this.takePictureAndCreateAlbum();
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
	  
	  
    return (

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingLeft: 0,
          paddingRight: 0,
		  backgroundColor: '#506D84',
		  padding: 20
        }}
      >
	  

	 
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          ></StatusBar>
		  

		 

			  
		<View style={{padding: 10, backgroundColor: '#fff'}}> 	  
		
		
		<View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                 
                }}
              >
			  
			  
			  <Text style={{
                   
                    fontSize: 14,
                    letterSpacing: 0,
                    letterSpacing: 1,
                    marginBottom: 10,
                    textAlign: "left",
					fontWeight: 'bold'
                  }}>FORM PENGAJUAN CUTI (msh tahap pengembangan)</Text>
			
		</View>
		
		
		<Text
                  allowFontScaling={false}
                  style={{
                   
                    fontSize: 14,
                    letterSpacing: 0,
                    letterSpacing: 1,
                    marginTop: 0,
                    textAlign: "left",
					fontWeight: 'bold'
                  }}
                >
                  Jumlah Hari
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={"3"}
				  keyboardType={"numeric"}
                  style={{
                    padding: 5,
                    backgroundColor: "white",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    fontSize: 14,
                    textAlign: "left",
                  }}
                  onChangeText={(text) =>
                    this.setState({
                      jum: jum,
                    })
                  }
                  value={this.state.jum}
                />
		
		
		
		
			  <Text
                  allowFontScaling={false}
                  style={{
                   
                    fontSize: 14,
                    letterSpacing: 0,
                    letterSpacing: 1,
                    marginTop: 0,
                    textAlign: "left",
					fontWeight: 'bold'
                  }}
                >
                  Keterangan Cuti
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={"Acara Keluarga"}
                  style={{
                    padding: 5,
                    backgroundColor: "white",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    fontSize: 14,
                    textAlign: "left",
                  }}
                  onChangeText={(text) =>
                    this.setState({
                      ket: text,
                    })
                  }
                  value={this.state.ket}
                />
				
				
				
				
				
                <Text
                  allowFontScaling={false}
                  style={{
                   
                    fontSize: 14,
                    letterSpacing: 0,
                    letterSpacing: 1,
                    marginTop: 10,
                    textAlign: "left",
					fontWeight: 'bold'
                  }}
                >
                  Tanggal Cuti
                </Text>
				
				
				
				
				
				<View style={{flexDirection: 'row'}}>
                 <DatePicker
              style={{
                width: "42%",
                backgroundColor: "transparent",
                marginTop: 10,
                borderColor: "white",
                borderRadius: 5,
              }}
              date={this.state.date}
              mode="date"
              placeholder="Select Date"
              format="DD-MM-YYYY"
              minDate="1900-01-01"
              maxDate="2200-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 0,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ date: date }, () => {
                  this.setState(
                    {
                      umur: moment(this.state.date, "YYYY-MM-DD")
                        .fromNow()
                        .substring(0, 2),
                    },
                    () => {
                      console.log(this.state.umur);
                    }
                  );
                });
              }}
            />
			
			<Text style={{
                width: "10%",
                marginTop: 20,
				marginLeft: 10
              }}> s.d. </Text>
			
			<DatePicker
              style={{
                width: "42%",
                backgroundColor: "transparent",
                marginTop: 10,
                borderColor: "white",
                borderRadius: 5,
              }}
              date={this.state.date1}
              mode="date"
              placeholder="Select Date"
              format="DD-MM-YYYY"
              minDate="1900-01-01"
              maxDate="2200-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 0,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ date1: date }, () => {
                  this.setState(
                    {
                      umur: moment(this.state.date1, "YYYY-MM-DD")
                        .fromNow()
                        .substring(0, 2),
                    },
                    () => {
                      console.log(this.state.umur);
                    }
                  );
                });
              }}
            />
				
		</View>		
				
		<View style={{flex: 1,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop:10}}>
				<View style={{flex: 1,}}>
				<TouchableOpacity
                style={{
					alignItems: "center",
					backgroundColor: "#e55f2b",
					padding: 10,
					color: 'white',
					marginTop: 5,
					width: '100%',
				
				}}
                onPress={() => this.absensi()}
              ><Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}>AJUKAN CUTI</Text>
				
              </TouchableOpacity>
				</View>
				<View style={{flex: 1,}}>
				<TouchableOpacity
                style={{
					alignItems: "center",
					backgroundColor: "#3ba927",
					padding: 10,
					color: 'white',
					marginTop: 5,
					width: '100%',
				}}
                onPress={() => this.absensi_pulang()}
              ><Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}> LIST PENGAJUAN</Text>
				
              </TouchableOpacity>
				</View>
			</View>    		
				
				
			  
			</View> 
			  
			  
			  
			  
			
        </View>
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
	padding: 10
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});
