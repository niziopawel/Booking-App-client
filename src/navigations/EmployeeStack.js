import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import EmployeeList from '../components/employee/EmployeeList';
import CreateEmployee from '../components/employee/CreateEmployee';
import EmployeeDetails from '../components/employee/EmployeeDetails';
import Styles from '../styles';

export default EmployeeStack = createStackNavigator(
  {
    EmployeeList: {
      screen: EmployeeList,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Fryzjerzy',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name='md-menu'
              size={30}
            />
          )
        };
      }
    },
    CreateEmployee: {
      screen: CreateEmployee,
      navigationOptions: {
        title: 'Dodaj pracownika',
        headerTintColor: 'white'
      }
    },
    EmployeeDetail: {
      screen: EmployeeDetails,
      navigationOptions: {
        title: 'Edytuj dane o pracowniku',
        headerTintColor: 'white'
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: Styles.headerStyle,
      headerTitleStyle: Styles.headerTitleStyle
    }
  }
);
