import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {db} from '../../Config/config';
import Field from '../EditProfileScreen/field';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import {editUserEmail, editUserCode, editUserName, editUserDOB, editUserAmount ,storeInitialData} from './EditEmployeeDetailsScreenAction';
import { setNull } from '../EmployeeScreen/EmployeeScreenAction';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '../EditProfileScreen/DateTimePicker';
import InternetComponent from '../NoConnectionHandle/InternetComponent';
import NoConnectionHandle from '../NoConnectionHandle/NoConnectionHandle';

class EditEmployeeDetailsScreen extends Component {  

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }  
    
    state = {
        colorCode: '#E4E7DD',
        colorEmail: '#E4E7DD',
        colorName: '#E4E7DD',
        colorAmount: '#E4E7DD',
        isEmailTrue: true,
        isCodeTrue: true,
        isNameTrue: true,
        isAmountTrue: true,
        backgroundColor: '#EE4C7C',
        disabled: false,        
        isDatePickerVisible:false 
    }  
    
    fun = (isEmail, isCode, isName, isAmount) => {                               
        if(!isEmail || !isCode || !isName || !isAmount)
        {                                 
            this.setState({                
                backgroundColor: 'grey',
                disabled: true
            })
        }        
    }       
    
    showDatePicker = () => {
        this.setState({
            isDatePickerVisible:true
        })    
    };

    hideDatePicker = () => {
        this.setState({
            isDatePickerVisible:false
        })    
    };    

    handleConfirm = date => {        
        let day = date.getDate();
        let month = date.getMonth();
        const year = date.getFullYear();    
        this.hideDatePicker();
        if(day<10)
        {
            day = `0${day}`
        }
        if(month<10)
        {
            month = `0${month+1}`
        }
        const fullDate = `${day}/${month}/${year}`
        this.props.onEditDOB(fullDate)                        
    };      

    editEmployeeEmail = text => {        
        const expression=/^[a-zA-Z]+[0-9.]*[a-zA-Z0-9]+@[a-zA-Z]+[0-9]*[a-zA-Z]+\.[A-Za-z]{2,10}$/;    
        this.props.onEditEmail(String(text).toLowerCase())
        if(expression.test(String(text).toLowerCase()))
        {            
            this.setState({
                colorEmail:'#E4E7DD',
                backgroundColor: '#EE4C7C',
                disabled: false,
                isEmailTrue: true
            })            
            this.fun(true, this.state.isCodeTrue, this.state.isNameTrue, this.state.isAmountTrue)
        }
        else
        {
            this.setState({
                colorEmail:'red',
                backgroundColor: 'grey',
                disabled: true,
                isEmailTrue: false
            })
            this.fun(false, this.state.isCodeTrue, this.state.isNameTrue, this.state.isAmountTrue)
        }        
    }

    editEmployeeCode = text => {    
        const expression = /^[0-9]*$/;            
        this.props.onEditCode(text)    
        if(text.length == 5 && expression.test(String(text).toLowerCase()))
        {                        
            this.setState({
                colorCode: '#E4E7DD',
                backgroundColor: '#EE4C7C',
                disabled: false,
                isCodeTrue: true
            })                        
            this.fun(this.state.isEmailTrue, true, this.state.isNameTrue, this.state.isAmountTrue)
        }
        else
        {
            this.setState({
                colorCode: 'red',
                backgroundColor: 'grey',
                disabled: true,
                isCodeTrue: false
            })
            this.fun(this.state.isEmailTrue, false, this.state.isNameTrue, this.state.isAmountTrue)
        }        
    }

    editEmployeeName = text => {                
        const expression=/^[a-zA-Z]+\s?[a-zA-Z]*\s?[a-zA-Z]*$/;
        this.props.onEditName(text)
        if(expression.test(String(text).toLowerCase()) && text.length != 0)
        {            
            this.setState({
                colorName: '#E4E7DD',
                backgroundColor: '#EE4C7C',
                disabled: false,
                isNameTrue: true
            })        
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, true, this.state.isAmountTrue)
        } 
        else
        {
            this.setState({
                colorName: 'red',
                backgroundColor: 'grey',
                disabled: true,
                isNameTrue: false
            })
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, false, this.state.isAmountTrue)
        }
    }

    editEmployeeAmount = text => {      
        const expression = /^[0-9]+$/;    
        this.props.onEditAmount(text)
        if(expression.test(String(text).toLowerCase()) && text.length != 0)
        {            
            this.setState({         
                colorAmount: '#E4E7DD',       
                backgroundColor: '#EE4C7C',
                disabled: false,
                isAmountTrue: true
            })
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, this.state.isNameTrue, true)
        }
        else
        {
            this.setState({          
                colorAmount: 'red',      
                backgroundColor: 'grey',
                disabled: true,
                isAmountTrue: false
            })
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, this.state.isNameTrue, false)
        }               
    }    

    componentDidMount() {        
        db.ref('/users/'+this.props.userInfo.user.id+'/employees/'+this.props.route.params.key).on("value", querySnapShot => {
            let data = querySnapShot.val()
            data ? this.props.onStoreInitialData(data.name, data.dob, data.employeeCode, data.email, data.amount) : null                                          
        });        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick); 
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {        
        this.props.navigation.goBack(null);
        return true;
    }

    onEditEmployee = () => {
        if(this.props.isActive == 'none' && (this.state.isEmailTrue && this.state.isCodeTrue && this.state.isNameTrue && this.state.isAmountTrue))
        {
            db.ref('/users/'+this.props.userInfo.user.id+'/employees/'+this.props.route.params.key).update({
                email: this.props.email,
                employeeCode: this.props.code,
                name: this.props.name,
                dob: this.props.dob,
                amount: this.props.amount
            })
            this.props.navigation.navigate('Employee')
        }
    }

    onRemoveEmployee = () => {
        if(this.props.isActive == 'none')
        {
            let val = this.props.userInfo.user
            let params = this.props.route.params        
            this.props.navigation.goBack(); 
            db.ref('/users/'+val.id+'/employees/'+params.key).remove();
        }
    }
    
    render() {        
        let dat = new Date()
        dat.setFullYear(dat.getFullYear() - 18)    
        return (
            <View style = {styles.main}>   
                <NoConnectionHandle />             
                <TouchableOpacity style = {styles.removeEmployeeTouchable} onPress = {this.onRemoveEmployee}>
                    <Text style = {styles.removeEmployee}>Remove Employee</Text>
                </TouchableOpacity>        
                <ScrollView>
                    <View style = {styles.form}>
                        <Field                  
                            value = {this.props.email}       
                            text_value = 'EMAIL' 
                            editable = {true}                            
                            blur = {false} 
                            submit = {() => {this.email.focus();}}
                            placeholder = 'Enter Email Here' 
                            keyboard='email-address'
                            change = {(text) => {this.editEmployeeEmail(text)}} 
                            color = {this.state.colorEmail}
                            error_value  ='Enter Valid Email'
                        />
                        <Field                         
                            value = {this.props.code}       
                            blur = {false} 
                            submit = {() => {this.code.focus();}}
                            refs = {(input) => {this.email = input;}}
                            maxlength = {5} 
                            placeholder = 'Enter Employee Code' 
                            text_value = 'Employee Code' 
                            change = {(text) => {this.editEmployeeCode(text)}} 
                            editable = {true}
                            keyboard = 'number-pad'
                            color = {this.state.colorCode}
                            error_value ='Enter Valid Employee Code (only numbers)'
                        />
                        <Field          
                            value = {this.props.name}                      
                            blur = {false} 
                            submit = {() => {this.name.focus();}}
                            refs = {(input) => {this.code = input;}}
                            maxlength = {50} 
                            placeholder = 'Enter your full name' 
                            text_value = 'FULL NAME' 
                            editable = {true}
                            color = {this.state.colorName}
                            change = {(text) => {this.editEmployeeName(text)}}
                            error_value ='Enter Valid Name' 
                        />
                        <DateTimePicker 
                            value = {this.props.dob}                                                 
                            text_value = 'DATE OF BIRTH'                    
                            onPress = {this.showDatePicker}                                                   
                        />                        
                        <Field                 
                            value = {this.props.amount}                                                                
                            submit = {() => {this.onEditEmployee();}}
                            refs = {(input) => {this.name = input;}}                                                    
                            placeholder = 'Enter Amount' 
                            text_value = 'Amount' 
                            change = {(text) => {this.editEmployeeAmount(text)}} 
                            editable = {true}
                            keyboard = 'number-pad'
                            color = {this.state.colorAmount}
                            error_value ='Only Numbers Allowed' 
                        />
                    </View>        
                </ScrollView>                                             
                <TouchableOpacity style={[styles.submitBtn,{backgroundColor:this.state.backgroundColor}]} disabled = {this.state.disabled} onPress = {this.onEditEmployee}>
                    <Text style={styles.submitBtnText}>Save</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}    
                    maximumDate={dat}                  
                />  
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
    removeEmployeeTouchable: {
        width: 150,
        height: 40,
        backgroundColor: '#9A1750',
        alignSelf: 'flex-end',
        margin: 20,
        justifyContent:'center',
        borderRadius: 10,
        shadowColor: 'rgba(53,53,53,0.4)',
        shadowOffset: { height: 3, width: 3 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation:2,
    },
    removeEmployee: {
        alignSelf: 'flex-end',        
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    },  
    btn: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        marginHorizontal:20
    },
    editBtn: {
        backgroundColor:'#2d2d2d',
        width:100,
        height:40,
        justifyContent:'center',        
    },
    btnText: {
        color:'white',
        alignSelf:'center',
        fontSize:15,
        fontWeight:'bold'
    },
    form: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent:'center'
    },
    submitBtn: {   
        height:50,
        justifyContent:'center',     
        marginTop: 10,   
        marginBottom: 50,
        marginHorizontal:20,
        borderRadius: 15,
        shadowColor: 'rgba(53,53,53,0.4)',
        shadowOffset: { height: 3, width: 3 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation:2,    
    },
    submitBtnText: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => {
    return {
        email: state.editEmployee.email,
        code: state.editEmployee.code,
        name: state.editEmployee.name,
        dob: state.editEmployee.dob,
        amount: state.editEmployee.amount,
        userInfo: state.home.userInfo,
        isActive: state.connection.isActive,
        position: state.connection.position 
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onEditEmail: bindActionCreators(editUserEmail, dispatch),
        onEditCode: bindActionCreators(editUserCode, dispatch),
        onEditName: bindActionCreators(editUserName, dispatch),
        onEditDOB: bindActionCreators(editUserDOB, dispatch),
        onEditAmount: bindActionCreators(editUserAmount, dispatch),
        onStoreInitialData: bindActionCreators(storeInitialData, dispatch),
        onSetNull: bindActionCreators(setNull, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeeDetailsScreen);