import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {db} from '../../Config/config';
import Field from './field';
import { bindActionCreators } from 'redux';
import {editUserCode, editUserName, editUserDOB, storeInitialData} from './EditProfileScreenAction';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from './DateTimePicker';
import InternetComponent from '../NoConnectionHandle/InternetComponent';
import NoConnectionHandle from '../NoConnectionHandle/NoConnectionHandle';
import ActivityIndicatorExample from '../ActivityIndicatorExample/ActivityIndicatorExample';

class EditProfileScreen extends Component {  

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }  

    state = {        
        colorCode: '#E4E7DD',
        disabled: false,
        backgroundColor: '#EE4C7C',
        isDatePickerVisible:false,
        loader: ''
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
        this.props.onSetUserDOB(fullDate)
    };
    
    setUserCode = text => {
        const expression = /^[0-9]*$/;        
        if(expression.test(String(text).toLowerCase()))
        {
            this.props.onSetUserCode(text)            
        }
        if(text.length < 5)
        {
            this.setState({
                colorCode: 'red',
                backgroundColor: 'grey',
                disabled: true                
            })
        }
        else
        {
            this.setState({
                colorCode: '#E4E7DD',
                backgroundColor: '#EE4C7C',
                disabled: false                
            })
        }
    }    

    componentDidMount() {
        db.ref('/users/'+this.props.userInfo.user.id+'/details').on("value", querySnapShot => {
            let data = querySnapShot.val()                                   
            data ? this.props.onStoreInitialData(data.name, data.DOB, data.employeeCode) : null
            this.setState({
                loader: data.email
            })
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

    onUpdateData = () => {
        if(this.props.isActive == 'none')
        {
            db.ref('/users/'+this.props.userInfo.user.id+'/details').update({
                name: this.props.userName,
                employeeCode: this.props.userCode,
                DOB: this.props.userDOB
            })
            this.props.navigation.navigate('Employee')        
        }
    }
    
    render() {
        const data = this.props.userInfo.user
        let dat = new Date()
        dat.setFullYear(dat.getFullYear() - 18)        
        return (
            <View style = {styles.main}>                
                <NoConnectionHandle />  
                {console.log(this.state.loader)}
                { 
                    this.state.loader
                    ?
                    <ScrollView>
                        <View style = {styles.form}>
                            <Field 
                                value = {data.email} 
                                text_value = 'EMAIL' 
                                editable = {false}
                                display = 'none'
                            />
                            <Field 
                                value = {this.props.userCode}
                                blur = {false} 
                                submit = {() => {this.code.focus();}}
                                maxlength = {5} 
                                placeholder = 'Enter Employee Code' 
                                text_value = 'Employee Code' 
                                change = {(text) => {this.setUserCode(text)}} 
                                editable = {true}
                                keyboard = 'number-pad'
                                color = {this.state.colorCode}
                                error_value ='Enter Valid Employee Code'
                            />
                            <Field 
                                value = {this.props.userName}                                                                 
                                refs = {(input) => {this.code = input;}}
                                maxlength = {50} 
                                placeholder = 'Enter your full name' 
                                text_value = 'FULL NAME' 
                                editable = {true}
                                display = 'none'
                                change = {(text) => {this.props.onSetUserName(text)}}
                            />                        
                            <DateTimePicker 
                                value = {this.props.userDOB}                                                 
                                text_value = 'DATE OF BIRTH'                    
                                onPress = {this.showDatePicker}                                                   
                            />
                        </View>            
                    </ScrollView>   
                    : 
                    <ActivityIndicatorExample />
                }
                <TouchableOpacity style={[styles.submitBtn,{backgroundColor:this.state.backgroundColor}]} disabled={this.state.disabled} onPress = {this.onUpdateData}>
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
        marginTop: 50,
        flex: 1,
        justifyContent:'center'
    },
    submitBtn: { 
        height:50,
        justifyContent:'center',   
        marginTop: 10,        
        marginBottom: 20,
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
        userInfo: state.home.userInfo,
        userCode: state.edit.code,
        userName: state.edit.name,
        userDOB: state.edit.dob,
        isActive: state.connection.isActive,
        position: state.connection.position        
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetUserCode: bindActionCreators(editUserCode, dispatch),
        onSetUserName: bindActionCreators(editUserName, dispatch),
        onSetUserDOB: bindActionCreators(editUserDOB, dispatch),
        onStoreInitialData: bindActionCreators(storeInitialData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);