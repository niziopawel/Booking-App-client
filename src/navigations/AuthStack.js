import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../components/auth/LoginScreen';
import Styles from '../styles';
import RegisterScreen from '../components/auth/RegisterScreen';

const AuthStack = createStackNavigator({
  SignIn: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: RegisterScreen,
    navigationOptions: {
      headerStyle: Styles.headerStyle,
      headerTintColor: 'white',
      headerTitleStyle: {
        paddingLeft: 80,
        flexGrow: 1,
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Roboto'
      }
    }
  }
});

export default AuthStack;
