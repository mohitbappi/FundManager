/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore,combineReducers} from 'redux';
import HomeScreenReducer from './components/src/Screens/HomeScreen/HomeScreenReducer';
import {Provider} from 'react-redux';
import EditProfileScreenReducer from './components/src/Screens/EditProfileScreen/EditProfileScreenReducer';
import AddEmployeeScreenReducer from './components/src/Screens/AddEmployeeScreen/AddEmployeeScreenReducer';
import EmployeeScreenReducer from './components/src/Screens/EmployeeScreen/EmployeeScreenReducer';
import EditEmployeeDetailsScreenReducer from './components/src/Screens/EditEmployeeDetailsScreen/EditEmployeeDetailsScreenReducer';
import NoConnectionHandleReducer from './components/src/Screens/NoConnectionHandle/NoConnectionHandleReducer';

const rootReducer = combineReducers({
  home: HomeScreenReducer,
  edit: EditProfileScreenReducer,
  add: AddEmployeeScreenReducer,
  employee: EmployeeScreenReducer,
  editEmployee: EditEmployeeDetailsScreenReducer,
  connection: NoConnectionHandleReducer
})
const store = createStore(rootReducer);

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Root);
