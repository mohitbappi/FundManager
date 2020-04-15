import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DateTimePicker = (props) =>{
    return(
        <View>
            <Text style={styles.elements}>{props.text_value}</Text>
            <TouchableOpacity style={styles.fields} onPress = {props.onPress}>
                <Text onChangeText={props.change}>{props.value}</Text>                        
                <Text>{'\uD83D\uDCC5'}</Text>
            </TouchableOpacity>                      
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
        paddingBottom: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});  

export default DateTimePicker;