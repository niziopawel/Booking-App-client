import React from 'react';
import { View, Picker, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox, Body, ListItem, Content, Button, Text } from 'native-base';
import { CardSection, Input, MultilineInput, Spinner } from '../common';
import { createEmployee } from '../../actions/EmployeeActions';
import Styles from '../../styles';

class CreateEmployee extends React.Component {
  state = {
    checked: [],
    servicesData: [],
    name: '',
    information: '',
    email: '',
    phone: '',
    url: ''
  };

  componentDidMount() {
    this.setState({ servicesData: this.props.services }, () => {
      const initialCheck = this.state.servicesData.map(x => false);
      this.setState({ checked: initialCheck });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.services !== this.props.services) {
      this.setState({ servicesData: nextProps.services });
    }
  }

  onButtonPress() {
    const { name, email, phone, information, url } = this.state;
    const services = this.setEmployeeServices();

    const data = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      information: information,
      services: services,
      url: url
    });

    console.log(data);
    this.props.createEmployee(
      name,
      email,
      phone,
      information,
      services,
      url,
      this.props.token
    );
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
            placeholder='Imię i nazwisko'
            onChangeText={text => this.setState({ name: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            multiline
            numberOfLines={6}
            placeholder='Informacje o pracowniku'
            onChangeText={text => this.setState({ information: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder='Adres e-mail'
            onChangeText={text => this.setState({ email: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder='Numer telefonu'
            onChangeText={text => this.setState({ phone: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder='Adres URL zdjęcia'
            onChangeText={text => this.setState({ url: text })}
          />
        </CardSection>
        <Content>
          <View>
            <Text style={{ fontSize: 18, paddingHorizontal: 15 }}>
              {' '}
              Wykonywane usługi:{' '}
            </Text>
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

export default connect(mapStateToProps, { createEmployee })(CreateEmployee);
