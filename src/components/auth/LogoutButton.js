import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { logoutUser } from '../../actions/AuthActions';

class LogoutButton extends Component {
  onButtonPress() {
    this.props.logoutUser();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onButtonPress.bind(this)}
      >
        <Icon name='md-power' size={24} />
        <Text style={{ paddingLeft: 35, color: 'black', fontWeight: '500' }}>
          Wyloguj
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = {
  container: {
    paddingLeft: 20,
    height: 55,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'grey'
  },
  drawerImage: {
    flex: 1,
    width: 280,
    alignSelf: 'center'
  }
};

export default connect(null, { logoutUser })(LogoutButton);
