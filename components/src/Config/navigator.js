import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import EmployeeScreen from '../Screens/EmployeeScreen/EmployeeScreen';
import EditProfileScreen from '../Screens/EditProfileScreen/EditProfileScreen';
import AddEmployeeScreen from '../Screens/AddEmployeeScreen/AddEmployeeScreen';
import EditEmployeeDetailsScreen from '../Screens/EditEmployeeDetailsScreen/EditEmployeeDetailsScreen';
import { connect } from 'react-redux';
import { GoogleSignin } from '@react-native-community/google-signin';
import { bindActionCreators } from 'redux';
import { isSignedIn } from '../Screens/HomeScreen/HomeScreenAction';
import { storeUserData } from '../Screens/HomeScreen/HomeScreenAction';

const Stack = createStackNavigator();

class AppNavigator extends Component {

    async componentDidMount() {
        const isSignedIn = await GoogleSignin.isSignedIn();        
        this.props.checkIsSignedIn(isSignedIn);        
        const userInfo = await GoogleSignin.getCurrentUser();
        this.props.onStoreUserData(userInfo, true);           
    }

    render(){                
        return (
            <NavigationContainer>            
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Home" 
                        component={HomeScreen} 
                        options={
                            { 
                                title: '' ,
                                headerStyle: {
                                    backgroundColor: '#FBF06F',
                                },
                                headerTintColor:'yellow'                            
                            }
                        } 
                    />                   
                    <Stack.Screen 
                        name="Employee" 
                        component={EmployeeScreen} 
                        options={
                            { 
                                title: 'Funds',                            
                                headerStyle: {
                                    backgroundColor: '#EE4C7C'                                                            
                                },
                                headerTintColor:'white',                            
                                headerLeft:null
                            }
                        } 
                    />              
                    <Stack.Screen 
                        name="EditProfile" 
                        component={EditProfileScreen} 
                        options={
                            { 
                                title: 'Edit Profile' ,
                                headerStyle: {
                                    backgroundColor: '#EE4C7C',
                                },
                                headerTintColor:'white',                            
                            }
                        } 
                    />
                    <Stack.Screen 
                        name="AddEmployee" 
                        component={AddEmployeeScreen} 
                        options={
                            { 
                                title: 'New Employee' ,
                                headerStyle: {
                                    backgroundColor: '#EE4C7C',
                                },
                                headerTintColor:'white',                            
                            }
                        } 
                    />
                    <Stack.Screen 
                        name="EditEmployee" 
                        component={EditEmployeeDetailsScreen} 
                        options={
                            { 
                                title: 'Employee Profile' ,
                                headerStyle: {
                                    backgroundColor: '#EE4C7C',
                                },
                                headerTintColor:'white',                            
                            }
                        } 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.home.isSignedIn,
        userInfo: state.home.userInfo
    };
}

const mapDispatchToProps = dispatch => {
    return {
        checkIsSignedIn: bindActionCreators(isSignedIn, dispatch),
        onStoreUserData: bindActionCreators(storeUserData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);

