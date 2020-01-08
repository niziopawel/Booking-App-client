import React, { Component } from 'react';
import { Image, View } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  Header
} from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../../styles';
import { Spinner } from '../common';
import { loginUser } from '../../actions/AuthActions';
import validate from './../../validation/validate_wrapper';

class LoginScreen extends Component {
  state = { email: '', password: '', emailError: '', passwordError: '' };

  componentDidMount() {
    if (this.props.token) {
      this.props.navigation.navigate('App');
    }
  }
  onButtonPress() {
    this.props.loginUser(this.state.email, this.state.password);
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'transparent', paddingTop: 10 }}>
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
        <Text style={{ alignSelf: 'center' }}>Zaloguj</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Header
          style={{ height: 230, backgroundColor: '#161c2c' }}
          androidStatusBarColor='#161c2c'
        >
          <Image
            style={Styles.imageStyle}
            source={require('../../../assets/image/logo.png')}
            resizeMode='contain'
          />
        </Header>
        <Content contentContainerStyle={styles.containerStyle}>
          <Item
            style={
              !this.state.emailError
                ? Styles.inputStyle
                : Styles.inputErrorStyle
            }
          >
            <Icon active name='md-mail' size={24} color={'white'} />
            <Input
              placeholder='Adres E-mail'
              textContentType='emailAddress'
              placeholderTextColor='white'
              onChangeText={text => this.setState({ email: text })}
              style={{ color: 'white', paddingLeft: 20 }}
              onBlur={() => {
                this.setState({
                  emailError: validate('email', this.state.email)
                });
              }}
            />
          </Item>
          {this.state.emailError ? (
            <Text style={{ color: 'red', alignSelf: 'center' }}>
              {this.state.emailError}
            </Text>
          ) : null}
          <Item
            style={
              !this.state.passwordError
                ? Styles.inputStyle
                : Styles.inputErrorStyle
            }
          >
            <Icon active name='md-key' size={24} color={'white'} />
            <Input
              placeholder='Hasło'
              placeholderTextColor='white'
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              style={{ color: 'white', paddingLeft: 20, fontFamily: 'Roboto' }}
              onBlur={() => {
                this.setState({
                  passwordError: validate('password', this.state.password)
                });
              }}
            />
          </Item>
          {this.state.passwordError ? (
            <Text style={{ color: 'red', alignSelf: 'center' }}>
              {this.state.passwordError}
            </Text>
          ) : null}
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
          <Text style={{ alignSelf: 'center', color: 'white', paddingTop: 10 }}>
            lub
          </Text>
          <Item
            style={{
              justifyContent: 'center',
              marginTop: 10,
              borderColor: '#161c2c'
            }}
          >
            <Button
              style={Styles.loginButtonStyle}
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <Text style={{ alignSelf: 'center' }}>Zarejestruj</Text>
            </Button>
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
    error: state.auth.error,
    loading: state.auth.loading,
    token: state.auth.token
  };
};
export default connect(mapStateToProps, { loginUser })(LoginScreen);
