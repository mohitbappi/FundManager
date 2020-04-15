import { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import { checkConnectivity } from './NoConnectionHandleAction';
import {bindActionCreators} from 'redux';
 
class NoConnectionHandle extends Component {

    componentDidMount() {
        const unsubscribe = NetInfo.addEventListener(state => {
            this.props.onCheckConnectivity(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }

    render() {      
      return false;
    }
};

const mapDispatchToProps = dispatch => {  
    return {    
      onCheckConnectivity: bindActionCreators(checkConnectivity, dispatch),
    };
  }
 
export default connect(null, mapDispatchToProps)(NoConnectionHandle);