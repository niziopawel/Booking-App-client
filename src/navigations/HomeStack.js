import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../components/home/HomeScreen';
import CreatePost from '../components/home/CreatePost';
import EditPost from '../components/home/EditPost';
import Styles from '../styles';

export default HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'New Look',
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
    CreatePost: {
      screen: CreatePost,
      navigationOptions: {
        title: 'Dodaj nowy post',
        headerTintColor: 'white'
      }
    },
    EditPost: {
      screen: EditPost,
      navigationOptions: {
        title: 'Edytuj post',
        headerTintColor: 'white'
      }
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: Styles.headerStyle,
      headerTitleStyle: Styles.headerTitleStyle
    }
  }
);
