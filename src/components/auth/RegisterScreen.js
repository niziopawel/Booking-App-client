import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spinner } from '../common';
import Styles from '../../styles';
import { registerUser } from '../../actions/AuthActions';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Rejestracja'
  };
  state = { name: '', email: '', phone: '', password: '' };

  onButtonPress() {
    const { name, email, password, confirmPassword, phone } = this.state;
    this.props.registerUser(name, email, password, confirmPassword, phone);
  }

  renderError() {
    if (this.props.error) {
      return (
        <View
          style={{
            backgroundColor: 'transparent',
            paddingTop: 10,
            paddingLeft: 15
          }}
        >
          <Text style={{ color: 'red', alignSelf: 'center' }}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button
        style={Styles.loginButtonStyle}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{ alignSelf: 'center', color: 'white' }}>Zarejestruj</Text>
      </Button>
    );
  }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.containerStyle}>
          <Item style={Styles.inputStyle}>
            <Icon active name='md-contact' size={24} color={'white'} />
            <Input
              placeholder='Imię i nazwisko'
              textContentType='name'
              placeholderTextColor='white'
              onChangeText={text => this.setState({ name: text })}
              style={{ color: 'white', paddingLeft: 20 }}
            />
          </Item>
          <Item style={Styles.inputStyle}>
            <Icon active name='md-mail' size={24} color={'white'} />
            <Input
              placeholder='Adres E-mail'
              textContentType='emailAddress'
              placeholderTextColor='white'
              onChangeText={text => this.setState({ email: text })}
              style={{ color: 'white', paddingLeft: 20 }}
            />
          </Item>
          <Item style={Styles.inputStyle}>
            <Icon active name='md-key' size={24} color={'white'} />
            <Input
              placeholder='Hasło'
              placeholderTextColor='white'
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              style={{ color: 'white', paddingLeft: 20, fontFamily: 'Roboto' }}
            />
          </Item>
          <Item style={Styles.inputStyle}>
            <Icon active name='md-key' size={24} color={'white'} />
            <Input
              placeholder='Powtórz hasło'
              placeholderTextColor='white'
              secureTextEntry
              onChangeText={text => this.setState({ confirmPassword: text })}
              style={{ color: 'white', paddingLeft: 20, fontFamily: 'Roboto' }}
            />
          </Item>
          <Item style={Styles.inputStyle}>
            <Icon active name='md-call' size={24} color={'white'} />
            <Input
              placeholder='Numer telefonu'
              textContentType='telephoneNumber'
              placeholderTextColor='white'
              onChangeText={text => this.setState({ phone: text })}
              style={{ color: 'white', paddingLeft: 20 }}
            />
          </Item>
          {this.renderError()}
          <Item
            style={{
              justifyContent: 'center',
              marginTop: 40,
              borderColor: '#161c2c'
            }}
          >
            {this.renderButton()}
          </Item>
        </Content>
      </Container>
    );
  }
}
const styles = {
  containerStyle: {
    backgroundColor: '#161c2c',
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'space-between'
  }
};

const mapStateToProps = state => {
  return {
    error: state.register.error,
    loading: state.register.loading
  };
};
export default connect(mapStateToProps, { registerUser })(RegisterScreen);
