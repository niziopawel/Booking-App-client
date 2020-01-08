import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ScheduleScreen from '../components/ScheduleScreen';
import Styles from '../styles';

export default ScheduleStack = createStackNavigator(
  {
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Terminarz',
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
