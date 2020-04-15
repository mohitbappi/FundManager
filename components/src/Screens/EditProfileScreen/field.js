import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Field = (props) =>{
    return(
        <View>
            <Text style={styles.elements}>{props.text_value}</Text>
            <TextInput onPress = {props.onPress} keyboardType = {props.keyboard} editable = {props.editable} value={props.value} ref={props.refs} blurOnSubmit={props.blur} onSubmitEditing={props.submit} maxLength={props.maxlength} placeholder={props.placeholder} style={styles.fields} onChangeText={props.change}></TextInput>            
            <Text style={[styles.valid,{color:props.color}]}>{props.error_value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({  
    elements: {
        color:'#EE4C7C',
        fontSize:20,
        marginVertical: 10
    },
    fields: {
        fontSize:15,
        color:'#2d2d2d',
        borderBottomWidth:1,
        borderColor:'#9A1750',    
        marginBottom: 50,
        paddingHorizontal: 0
    },
    valid: {
        marginBottom: 10,
        marginTop: -40        
    }
});  

export default Field;