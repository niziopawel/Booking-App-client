import React from 'react';
import { View, Picker, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-vector-icons';
import Axios from 'axios';
import {
  CheckBox,
  Body,
  ListItem,
  Content,
  Button,
  Text,
  Left,
  Right
} from 'native-base';
import { CardSection, Spinner, InputWithLabel, Input } from '../common';
import { updateEmployee, deleteEmployee } from '../../actions/EmployeeActions';
import Styles from '../../styles';

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      servicesData: [],
      _id: this.props.navigation.getParam('employeeID'),
      name: this.props.navigation.getParam('name'),
      information: this.props.navigation.getParam('information'),
      email: this.props.navigation.getParam('email'),
      phone: this.props.navigation.getParam('phone'),
      url: this.props.navigation.getParam('url'),
      services: this.props.navigation.getParam('employeeServices')
    };
  }

  componentDidMount() {
    this.setState({ servicesData: this.props.services }, () =>
      this.setInitialCheck()
    );
  }

  onButtonPress() {
    const { _id, name, email, phone, information, url } = this.state;
    const services = this.setEmployeeServices();
    this.props.updateEmployee(
      _id,
      name,
      email,
      phone,
      information,
      services,
      url,
      this.props.token
    );
  }

  setInitialCheck() {
    const initialCheck = this.state.servicesData.map(x => false);
    this.state.servicesData.forEach(element => {
      for (let i = 0; i < this.state.services.length; i++) {
        if (element._id === this.state.services[i]) {
          // console.log(this.state.servicesData.indexOf(element));
          initialCheck[this.state.servicesData.indexOf(element)] = true;
        }
      }
    });
    this.setState({ checked: initialCheck });
  }

  setEmployeeServices() {
    const { checked, servicesData } = this.state;
    const emplServ = [];

    for (let i = 0; i < checked.length; i++) {
      if (this.state.checked[i]) {
        emplServ.push(servicesData[i]._id);
      }
    }
    return emplServ;
  }

  handleCheckBox = index => {
    const checked = [...this.state.checked];
    checked[index] = !checked[index];
    this.setState({ checked });
  };

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
        style={Styles.formButtonStyle}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{ alignSelf: 'center' }}>Zapisz</Text>
      </Button>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoord={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <CardSection>
          <Input
            label='Imię'
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Informacje'
            multilineWithLabel
            // numberOfLines={6}
            value={this.state.information}
            onChangeText={text => this.setState({ information: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            label='E-mail'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Numer telefonu'
            value={this.state.phone}
            onChangeText={text => this.setState({ phone: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Adres URL zdjęcia'
            value={this.state.url}
            onChangeText={text => this.setState({ url: text })}
          />
        </CardSection>
        <Content>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontSize: 18 }}> Wykonywane usługi: </Text>
          </View>
          <FlatList
            data={this.state.servicesData}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <ListItem>
                <CheckBox
                  color='#2bb3c0'
                  onPress={() => this.handleCheckBox(index)}
                  checked={this.state.checked[index]}
                />
                <Body>
                  <Text> {item.name} </Text>
                </Body>
              </ListItem>
            )}
            keyExtractor={item => item._id}
          />
        </Content>

        {this.renderError()}
        <View style={{ paddingVertical: 20 }}>{this.renderButton()}</View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = {
  containerPickerStyle: {
    justfiyContent: 'space-between',
    colorBackground: '#5c93ed',
    height: 50,
    width: 300,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStyle: {
    color: 'grey',
    fontSize: 18,
    paddingLeft: 10,
    flex: 1
  },
  pickerStyle: {
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    width: 120
  }
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    services: state.service.services,
    loading: state.employee.loading,
    error: state.employee.error
  };
};

export default connect(mapStateToProps, { updateEmployee, deleteEmployee })(
  EmployeeDetails
);
