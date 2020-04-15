import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InternetComponent = props => {        
    return(
        <View style = {[styles.error, {display: props.isActive, position: props.position}]}>
            <Text style = {styles.errorText}>There is no active internet connection. Please check!!</Text>
        </View>   
    );
}

const styles = StyleSheet.create({
    error: {    
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.8)',
      paddingHorizontal: 15,
      marginHorizontal: 15,
      height: 40,
      shadowColor: 'rgba(53,53,53,0.4)',
      shadowOffset: { height: 3, width: 3 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation:2,      
      bottom: 10,
      left: 10,
      right: 10    
    },
    errorText: {
      alignSelf: 'center',
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      justifyContent: 'center',    
    }
});

export default InternetComponent;
  