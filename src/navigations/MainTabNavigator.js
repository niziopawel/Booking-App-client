import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import EmployeeStack from './EmployeeStack';
import ServiceStack from './ServiceStack';
import BookingStack from './BookingStack';
import Styles from '../styles';

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Główna',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-home' size={24} color={tintColor} />
        )
      }
    },
    Employee: {
      screen: EmployeeStack,
      navigationOptions: {
        tabBarLabel: 'Fryzjerzy',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-people' size={24} color={tintColor} />
        )
      }
    },
    Service: {
      screen: ServiceStack,
      navigationOptions: {
        tabBarLabel: 'Oferta',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-cut' size={24} color={tintColor} />
        )
      }
    },
    Booking: {
      screen: BookingStack,
      navigationOptions: {
        tabBarLabel: 'Umów na wizytę',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-calendar' size={24} color={tintColor} />
        )
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: Styles.bottomTabStyle,
      activeTintColor: '#161c2c',
      inactiveTintColor: 'grey'
    }
  }
);

export default createStackNavigator(
  { MainTabNavigator },
  { headerMode: 'none' }
);
