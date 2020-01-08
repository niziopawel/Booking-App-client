import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceStack from './ServiceStack';
import HomeScreen from '../components/home/HomeScreen';
import EmployeeStack from './EmployeeStack';
import ScheduleScreen from '../components/ScheduleScreen';
import CustomDrawer from '../components/CustomDrawer';

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Strona Główna',
        tabBarLabel: 'Główna',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-home' color={tintColor} size={24} />
        )
      }
    },
    Service: {
      screen: ServiceStack,
      navigationOptions: {
        title: 'Strona Główna',
        tabBarLabel: 'Usługi',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-cut' color={tintColor} size={24} />
        )
      }
    },
    Employee: {
      screen: EmployeeStack,
      navigationOptions: {
        title: 'Strona Główna',
        tabBarLabel: 'Pracownicy',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-people' color={tintColor} size={24} />
        )
      }
    },
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: {
        title: 'Strona Główna',
        tabBarLabel: 'Terminarz',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-calendar' color={tintColor} size={24} />
        )
      }
    }
  },
  {
    navigationOptions: {
      headerTitle: 'New Look',
      headerStyle: {
        backgroundColor: '#161c2c'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      }
    },
    tabBarOptions: {
      style: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        backgroundColor: 'white'
      },
      activeTintColor: 'black',
      inactiveTintColor: 'grey'
    }
  }
);

const MainStackNavigator = createStackNavigator(
  {
    MainStackNavigator: MainTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
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
  }
);

export default AppDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainStackNavigator,
      defaultNavigationOptions: {
        title: 'Strona Główna'
      }
    }
  },
  {
    initialRouteName: 'Main',
    contentComponent: CustomDrawer,
    drawerOpenRoute: 'DrawerOpen',
    rawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);
