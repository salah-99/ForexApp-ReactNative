import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Google from "expo-google-app-auth";
import { SocialIcon } from 'react-native-elements';
import styless from './styless';

import axios from 'axios'

const image = { uri: "https://images.pexels.com/photos/6801872/pexels-photo-6801872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" };

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onFooterLinkPress = () => {
      navigation.navigate('Registration')
  }
  const onLoginPress = () => {firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        navigation.navigate('Profile')
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
         console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
         console.log('That email address is invalid!');
        }
        console.error(error);
    });
  }
  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        androidClientId: `607696297500-d29dk1ssear0btfbo847146s9rv8lvev.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });

      let userData = {name: user.name, email: user.email, photo_url: user.photoUrl}

      if (type === "success") {
        console.log("LoginScreen.js 17 | success, navigating to profile");
        axios.post("https://foreexapp.herokuapp.com/api/user/signUp", userData).then(() => {
          console.log("data inserted")
        })
        .catch((e) => {
          console.log("data not inserted")
        })
        navigation.navigate("Profile", { userData, user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styless.container}>
        <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
          <Image style={styless.logo} source={require('../assets/iconFireBase.png')}/>
          <TextInput style={styless.input} placeholder='E-mail' placeholderTextColor="#aaaaaa" onChangeText={(text) => setEmail(text)} value={email} underlineColorAndroid="transparent" autoCapitalize="none"/>
          <TextInput style={styless.input} placeholderTextColor="#aaaaaa" secureTextEntry placeholder='Password' onChangeText={(text) => setPassword(text)} value={password} underlineColorAndroid="transparent" autoCapitalize="none"/>
          <TouchableOpacity style={styless.button} onPress={() => onLoginPress()}>
            <Text style={styless.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <SocialIcon style={{justifyContent: 'center', marginLeft: 30, marginRight: 30,  marginTop: 20, height: 48, borderRadius: 5, alignItems: "center",fontSize : 30, color:'red', fontWeight : "bold", textAlign : "center",}} title='Login with Google' button type='google' onPress={signInAsync}/>
          <View style={styless.footerView}>
            <Text style={styless.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styless.footerLink}>Sign up</Text></Text>
          </View>
        </KeyboardAwareScrollView>
  
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container : {
    marginTop : 200,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
},
  
});
