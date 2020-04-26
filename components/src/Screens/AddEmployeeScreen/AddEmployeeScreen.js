import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, BackHandler } from 'react-native';
import {connect} from 'react-redux';
import {db} from '../../Config/config';
import Field from '../EditProfileScreen/field';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import {setEmail, setCode, setName, setDOB, setAmount} from './AddEmployeeScreenAction';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '../EditProfileScreen/DateTimePicker';
import InternetComponent from '../NoConnectionHandle/InternetComponent';
import NoConnectionHandle from '../NoConnectionHandle/NoConnectionHandle';
import Toast, { DURATION } from 'react-native-easy-toast'

class AddEmployeeScreen extends Component {  

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }    

    state = {
        colorCode: '#E4E7DD',
        colorEmail: '#E4E7DD',
        colorName: '#E4E7DD',
        colorAmount: '#E4E7DD',
        isEmailTrue: false,
        isCodeTrue: false,
        isNameTrue: false,     
        isDOBTrue: false,   
        isAmountTrue: false,
        backgroundColor: 'grey',
        disabled: true,
        isDatePickerVisible:false            
    }    

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);       
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {        
        this.props.navigation.goBack(null);
        return true;
    }

    fun = (isEmail, isCode, isName, isDOB, isAmount) => {                               
        if(!isEmail || !isCode || !isName || !isDOB || !isAmount)
        {                                 
            this.setState({                
                backgroundColor: 'grey',
                disabled: true
            })
        }   
        else
        {
            this.setState({                
                backgroundColor: '#EE4C7C',
                disabled: false
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
        this.props.onSetDOB(fullDate)       
        this.setState({
            isDOBTrue: true
        })    
        this.fun(this.state.isEmailTrue, this.state.isCodeTrue, this.state.isNameTrue, true, this.state.isAmountTrue)       
    };        
    
    setEmployeeEmail = text => {        
        const expression=/^[a-zA-Z]+[0-9.]*[a-zA-Z0-9]+@[a-zA-Z]+[0-9]*[a-zA-Z]+\.[A-Za-z]{2,10}$/;    
        this.props.onSetEmail(String(text).toLowerCase())
        if(expression.test(String(text).toLowerCase()))
        {            
            this.setState({
                colorEmail:'#E4E7DD',
                backgroundColor: '#EE4C7C',
                disabled: false,
                isEmailTrue: true
            })            
            this.fun(true, this.state.isCodeTrue, this.state.isNameTrue, this.state.isDOBTrue, this.state.isAmountTrue)
        }
        else
        {
            this.setState({
                colorEmail:'red',
                backgroundColor: 'grey',
                disabled: true,
                isEmailTrue: false
            })
            this.fun(false, this.state.isCodeTrue, this.state.isNameTrue, this.state.isDOBTrue, this.state.isAmountTrue)
        }
    }

    setEmployeeCode = text => {    
        const expression = /^[0-9]*$/;            
        this.props.onSetCode(text)    
        if(text.length == 5 && expression.test(String(text).toLowerCase()))
        {            
            this.setState({
                colorCode: '#E4E7DD',
                backgroundColor: '#EE4C7C',
                disabled: false,
                isCodeTrue: true
            })            
            this.fun(this.state.isEmailTrue, true, this.state.isNameTrue, this.state.isDOBTrue, this.state.isAmountTrue)
        }
        else
        {
            this.setState({
                colorCode: 'red',
                backgroundColor: 'grey',
                disabled: true,
                isCodeTrue: false
            })
            this.fun(this.state.isEmailTrue, false, this.state.isNameTrue, this.state.isDOBTrue, this.state.isAmountTrue)
        }
    }

    setEmployeeName = text => {                
        const expression=/^[a-zA-Z]+\s?[a-zA-Z]*\s?[a-zA-Z]*$/;
        this.props.onSetName(text)
        if(expression.test(String(text).toLowerCase()))
        {            
            this.setState({
                colorName: '#E4E7DD',
                backgroundColor: '#EE4C7C',
                disabled: false,
                isNameTrue: true
            })        
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, true, this.state.isDOBTrue, this.state.isAmountTrue)
        } 
        else
        {
            this.setState({
                colorName: 'red',
                backgroundColor: 'grey',
                disabled: true,
                isNameTrue: false
            })
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, false, this.state.isDOBTrue, this.state.isAmountTrue)
        }
    }    

    setEmployeeAmount = text => {      
        const expression = /^[0-9]+$/;    
        this.props.onSetAmount(text)
        if(expression.test(String(text).toLowerCase()))
        {            
            this.setState({         
                colorAmount: '#E4E7DD',       
                backgroundColor: '#EE4C7C',
                disabled: false,
                isAmountTrue: true
            })
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, this.state.isNameTrue, this.state.isDOBTrue, true)
        }
        else
        {
            this.setState({          
                colorAmount: 'red',      
                backgroundColor: 'grey',
                disabled: true,
                isAmountTrue: false
            })
            this.fun(this.state.isEmailTrue, this.state.isCodeTrue, this.state.isNameTrue, this.state.isDOBTrue, false)
        }        
    }    

    onAddEmployee = () => {
        if(this.props.isActive == 'none' && (this.state.isEmailTrue && this.state.isCodeTrue && this.state.isNameTrue && this.state.isDOBTrue && this.state.isAmountTrue))
        {
            let data = this.props.userInfo.user;   
            let flag = true
            db.ref('/users/'+data.id+'/employees').on("value" ,query => {                            
                let response = query.val();                                   
                response &&
                Object.entries(response).map(([key, value]) => {           
                    let email = value.email
                    let employeeCode = value.employeeCode
                    console.log("email", email)
                    if(this.props.email === email || this.props.code === employeeCode)                                 
                    {
                        flag = false                        
                    }
                })                                  
            })            
            if(flag)
            {
                db.ref('/users/'+this.props.userInfo.user.id+'/employees').push({
                    email: this.props.email,
                    employeeCode: this.props.code,
                    name: this.props.name,
                    dob: this.props.dob,
                    amount: this.props.amount
                })
                this.props.navigation.navigate('Employee')
            }
            else
            {
                this.refs.toast.show("This employee has been added. Please add another employee", DURATION.LENGTH_LONG);
            }
        }
    }
    
    render() {        
        let dat = new Date()
        dat.setFullYear(dat.getFullYear() - 18)    
        return (
            <View style = {styles.main}>       
                <NoConnectionHandle />       
                <ScrollView>
                    <View style = {styles.form}>
                        <Field                         
                            text_value = 'EMAIL' 
                            editable = {true}
                            display = 'none'
                            blur = {false} 
                            submit = {() => {this.email.focus();}}
                            placeholder = 'Enter Email Here' 
                            keyboard='email-address'
                            change = {(text) => {this.setEmployeeEmail(text)}} 
                            color = {this.state.colorEmail}
                            error_value  ='Enter Valid Email'
                        />
                        <Field                         
                            blur = {false} 
                            submit = {() => {this.code.focus();}}
                            refs = {(input) => {this.email = input;}}
                            maxlength = {5} 
                            placeholder = 'Enter Employee Code' 
                            text_value = 'Employee Code' 
                            change = {(text) => {this.setEmployeeCode(text)}} 
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
                            change = {(text) => {this.setEmployeeName(text)}}
                            error_value ='Enter Valid Name' 
                        />
                        <DateTimePicker 
                            value = {this.props.dob}                                                 
                            text_value = 'DATE OF BIRTH'                    
                            onPress = {this.showDatePicker}                                                   
                        />                        
                        <Field                                                                            
                            submit = {() => {this.onAddEmployee();}}   
                            refs = {(input) => {this.name = input;}}                        
                            placeholder = 'Enter Amount' 
                            text_value = 'Amount' 
                            maxlength = {5} 
                            change = {(text) => {this.setEmployeeAmount(text)}} 
                            editable = {true}
                            keyboard = 'number-pad'
                            color = {this.state.colorAmount}
                            error_value ='Only Numbers Allowed' 
                        />
                    </View>    
                </ScrollView>                                                      
                <TouchableOpacity style={[styles.submitBtn,{backgroundColor:this.state.backgroundColor}]} disabled = {this.state.disabled} onPress = {this.onAddEmployee}>
                    <Text style={styles.submitBtnText}>Add</Text>
                </TouchableOpacity>
                <Toast ref="toast" />
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
        justifyContent:'center'
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
        justifyContent:'center',
        marginTop: 40
    },
    submitBtn: {   
        height:50,
        justifyContent:'center',        
        marginBottom: 20,
        marginTop: 10,
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
        email: state.add.email,
        code: state.add.code,
        name: state.add.name,
        dob: state.add.dob,
        amount: state.add.amount,
        userInfo: state.home.userInfo,
        isActive: state.connection.isActive,
        position: state.connection.position  
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetEmail: bindActionCreators(setEmail, dispatch),
        onSetCode: bindActionCreators(setCode, dispatch),
        onSetName: bindActionCreators(setName, dispatch),
        onSetDOB: bindActionCreators(setDOB, dispatch),
        onSetAmount: bindActionCreators(setAmount, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeScreen);