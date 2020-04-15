import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity, BackHandler, StatusBar } from 'react-native';
import {connect} from 'react-redux';
import {db} from '../../Config/config';
import { bindActionCreators } from 'redux';
import {resetValues} from '../AddEmployeeScreen/AddEmployeeScreenAction';
import {getAllEmployees, setAmount} from './EmployeeScreenAction';
import { storeUserData, isSignedIn } from '../HomeScreen/HomeScreenAction';
import {GoogleSignin} from '@react-native-community/google-signin';
import InternetComponent from '../NoConnectionHandle/InternetComponent';
import NoConnectionHandle from '../NoConnectionHandle/NoConnectionHandle';
import ActivityIndicatorExample from '../ActivityIndicatorExample/ActivityIndicatorExample';

class EmployeeScreen extends Component {

    componentDidMount() {                
        let data = this.props.userInfo.user;        
        db.ref('/users').child(data.id).once("value", function(querySnapShot) {            
            if(querySnapShot.val() === null)
            {                
                db.ref('/users').child(data.id+'/details').set({
                    name: data.name,
                    DOB: '',                    
                    email: data.email,
                    employeeCode: ''
                });                
            }            
        });     
        db.ref('/users/'+data.id+'/employees').on("value" ,query => {            
            let response = query.val();   
            let totalAmount = 0;  
            let val = []
            response
            ? Object.entries(response).map(([key, value]) => {           
                totalAmount += parseInt(value.amount);                
                val = val.concat({"key": key, "value": value})                
            })                       
            : null          
            this.props.onAddEmployee(val); 
            this.props.onSetAmount(totalAmount);             
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }   
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {        
        BackHandler.exitApp();
    }

    add = () => {
        this.props.onResetValues()
        this.props.navigation.navigate('AddEmployee')
    }

    signOut = async () => {
        if(this.props.isActive == 'none')
        {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                const isSignedIn = await GoogleSignin.isSignedIn();        
                this.props.checkIsSignedIn(isSignedIn);  
                this.props.onStoreUserData(null, false);
                this.props.navigation.navigate('Home')
            } 
            catch (error) {
                console.error(error);
            }
        }
    };

    render() {                
        return (            
            <View style={styles.main}>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#EE4C7C" translucent = {true}/>
                <NoConnectionHandle /> 
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.editBtn} onPress={() => this.props.navigation.navigate('EditProfile')}>
                        <Text style={styles.btnText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.employeeBtn} onPress={this.add}>
                        <Text style={styles.employeeBtnText}>Add Employee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editBtn} onPress = {this.signOut}>
                        <Text style={styles.btnText}>Signout</Text>
                    </TouchableOpacity>
                </View>          
                { this.props.totalAmountCollected ? <Text style = {styles.fund}>Total Fund Collected: {'\u20B9'}{this.props.totalAmountCollected}</Text> : null }
                <ScrollView>
                    <View style = {styles.mainEmployees}>                        
                        {            
                            this.props.allEmployeesData      
                            ? <FlatList 
                                data = {this.props.allEmployeesData}
                                renderItem = {({item}) => 
                                    <TouchableOpacity onPress = {() => this.props.isActive == 'none' ? this.props.navigation.navigate('EditEmployee',{key: item.key}) : null} activeOpacity = {0.3}>
                                        <View style = {styles.details}>                                        
                                            <Image 
                                                source={require('../../../images/cake.png')}
                                                style={styles.cakeImage} 
                                            />
                                            <View>
                                                <Text style = {styles.code}>{item.value.name}  ({item.value.employeeCode})</Text>
                                                <View style = {styles.row}>                                                
                                                    <Text style = {styles.amount}>Contributed Amount: </Text>
                                                    <View style = {styles.normalFontView}>
                                                        <Text style = {styles.normalFont}>{'\u20B9'} {item.value.amount}</Text>
                                                    </View>
                                                </View>
                                            </View>                                        
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                            : <ActivityIndicatorExample />                                                                                                       
                        }                       
                    </View>
                </ScrollView>    
                <InternetComponent isActive = {this.props.isActive} position = {this.props.position} />                   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#E4E7DD',
        flex: 1
    },
    btn: {
        flexDirection:'row',
        justifyContent:'space-around',                
        borderBottomColor: '#9A1750',
        borderBottomWidth: 2,
        backgroundColor: '#EE4C7C'
    },
    editBtn: {        
        width:100,
        height:50,
        justifyContent:'center'
    },
    btnText: {
        color:'white',
        alignSelf:'center',
        fontSize:16,
        fontWeight:'bold'
    },
    employeeBtn: {        
        width:120,
        height:50,
        justifyContent:'center'
    },
    employeeBtnText: {
        color:'white',
        alignSelf:'center',
        fontSize:15,
        fontWeight:'bold'
    },
    fund: {
        alignSelf: 'flex-end',
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    details: {
        borderColor: '#2d2d2d',        
        borderWidth: 1,
        minHeight: 100,
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal:20,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,        
    },
    cakeImage: {
        height: 50,
        width: 50,
        alignSelf: 'center'
    },
    code: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,        
        marginBottom: 15,
        color: '#EE4C7C',
        marginVertical: 15,
        marginHorizontal: 25
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    name: {
        fontSize: 17
    },
    amount: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginLeft: 20
    },
    normalFontView: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EE4C7C',
        maxWidth:100
    },  
    normalFont: {
        fontWeight: 'normal',        
        padding: 3       
    }
});

const mapStateToProps = state => {
    return {
        userInfo: state.home.userInfo,
        allEmployeesData: state.employee.allEmployees,
        totalAmountCollected: state.employee.totalAmount,
        isActive: state.connection.isActive,
        position: state.connection.position 
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onResetValues: bindActionCreators(resetValues, dispatch),
        onAddEmployee: bindActionCreators(getAllEmployees, dispatch),
        onStoreUserData: bindActionCreators(storeUserData, dispatch),
        onSetAmount : bindActionCreators(setAmount, dispatch),
        checkIsSignedIn: bindActionCreators(isSignedIn, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeScreen);