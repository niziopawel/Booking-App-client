import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BookAppointment from '../components/BookAppointment';
import Styles from '../styles';

export default BookingStack = createStackNavigator(
  {
    BookAppoint: {
      screen: BookAppointment,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Umów na wizytę',
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
