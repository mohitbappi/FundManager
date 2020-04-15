import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {storeUserData} from './HomeScreenAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InternetComponent from '../NoConnectionHandle/InternetComponent';
import NoConnectionHandle from '../NoConnectionHandle/NoConnectionHandle';
import ActivityIndicatorExample from '../ActivityIndicatorExample/ActivityIndicatorExample';

class HomeScreen extends Component { 

  async componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
      webClientId: '140686736776-cl54nhqioi06d4cn2hir1pis53btg4k1.apps.googleusercontent.com',      
      offlineAccess: true, 
      hostedDomain: '', 
      loginHint: '', 
      forceConsentPrompt: true, 
      accountName: '',
      iosClientId: '140686736776-rc666jpt2indbre7q73pe2tgc9obhm0u.apps.googleusercontent.com'      
    }); 
    await this.getCurrentUserInfo();      
    if(this.props.isSignedIn)
    {      
      this.props.navigation.navigate('Employee'); 
    }
  }   

  signIn = async () => {         
    if(this.props.isActive == 'none')
    {      
      try {      
        await GoogleSignin.hasPlayServices();            
        const userInfo = await GoogleSignin.signIn();                
        this.props.onStoreUserData(userInfo, true);           
        this.props.navigation.navigate('Employee');      
      } 
      catch (error) {      
        if (error.code === statusCodes.SIGN_IN_CANCELLED) 
        {
          console.log("SIGN_IN_CANCELLED ",error)
        } 
        else if (error.code === statusCodes.IN_PROGRESS) 
        {
          console.log("IN_PROGRESS ",error)        
        } 
        else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) 
        {
          console.log("PLAY_SERVICES_NOT_AVAILABLE ",error)        
        } 
        else 
        {
          console.log("else ", error.message, "hi")        
        }
      }      
    }    
  };

  async getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.props.onStoreUserData(userInfo, true);
    } 
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) 
      {} 
      else 
      {}
    }
  };

  render(){    
    return (      
      this.props.isSignedIn
      ?
      <ActivityIndicatorExample />       
      :   
      <View style={styles.main}>          
        <NoConnectionHandle />     
        <Image 
          source={require('../../../images/icon.png')}
          style={styles.iconImage} 
        />        
        <TouchableOpacity style={styles.btn} onPress={this.signIn}>
          <View style={styles.google}>
            <Image 
              source={require('../../../images/google_logo.png')}
              style={styles.googleIconImage} 
            />
            <Text style={styles.googleText}>Sign in with Google</Text>
          </View>          
        </TouchableOpacity> 
        <InternetComponent isActive = {this.props.isActive} position = {this.props.position} />   
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex:1,
    justifyContent:'center',    
    backgroundColor:'#FBF06F'
  },
  iconImage: {    
    width:150,
    height:150,
    alignSelf:'center'
  },
  btn: {
    marginTop:100,
    backgroundColor:'#F9F9F9',
    height:50,
    marginHorizontal:70,
    shadowColor: 'rgba(53,53,53,0.4)',
    shadowOffset: { height: 4, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation:2,
    justifyContent:'center',
  },
  google: {
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  googleIconImage: {
    width:30,
    height:30
  },
  googleText: {
    alignSelf:'center',
    fontSize:20,
    color:'#6B6969',
    fontWeight:'bold'
  }
});

const mapStateToProps = state => {
  return {
    isActive: state.connection.isActive,
    position: state.connection.position,
    loggedIn: state.home.loggedIn,
    isSignedIn: state.home.isSignedIn,
  }
}

const mapDispatchToProps = dispatch => {  
  return {    
    onStoreUserData: bindActionCreators(storeUserData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);