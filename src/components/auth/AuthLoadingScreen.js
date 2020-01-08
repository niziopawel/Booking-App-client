import React from 'react';
import { ActivityIndicator, StatusBar, View, StyleSheet } from 'react-native';

class AuthLoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AuthLoadingScreen;
