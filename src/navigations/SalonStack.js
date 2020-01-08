import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../styles';
import SalonInformation from '../components/SalonInformation';

export default SalonStack = createStackNavigator(
  {
    SalonInfo: {
      screen: SalonInformation,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Informacje o salonie',
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
  },
  {
    defaultNavigationOptions: {
      headerStyle: Styles.headerStyle,
      headerTitleStyle: Styles.headerTitleStyle
    }
  }
);
