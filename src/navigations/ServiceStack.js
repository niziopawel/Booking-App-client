import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceList from '../components/services/ServiceList';
import ServiceDetail from '../components/services/ServiceDetail';
import CreateService from '../components/services/CreateService';
import Styles from '../styles';

export default ServiceStack = createStackNavigator(
  {
    ServiceList: {
      screen: ServiceList,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Usługi',
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
    CreateService: {
      screen: CreateService,
      navigationOptions: {
        title: 'Dodaj usługę',
        headerTintColor: 'white'
      }
    },
    ServiceDetail: {
      screen: ServiceDetail,
      navigationOptions: {
        title: 'Szczegóły usługi',
        headerTintColor: 'white'
      }
    }
  },
  {
    initialRouteName: 'ServiceList',
    defaultNavigationOptions: {
      headerStyle: Styles.headerStyle,
      headerTitleStyle: Styles.headerTitleStyle
    }
  }
);
