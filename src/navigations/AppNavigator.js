import { createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';
import AuthStack from './AuthStack';

export default AppNavigator = createSwitchNavigator(
  {
    App: DrawerNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth'
  }
);
