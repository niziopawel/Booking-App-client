import React from 'react';
import { View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button } from 'native-base';
import { CardSection, Input, Spinner, Confirm } from '../common';
import { updateService, deleteService } from '../../actions/ServiceActions';
import Styles from '../../styles';

class ServiceDetail extends React.Component {
  state = {
    showModal: false,
    _id: this.props.navigation.getParam('serviceId'),
    name: this.props.navigation.getParam('name'),
    description: this.props.navigation.getParam('description'),
    price: this.props.navigation.getParam('price'),
    duration: this.props.navigation.getParam('duration')
  };

  onSaveButtonPress() {
    this.props.updateService(
      this.state._id,
      this.state.name,
      this.state.description,
      this.state.price,
      this.state.duration,
      this.props.token
    );
  }

  onDelAccept() {
    this.props.deleteService(this.state._id, this.props.token);
    this.setState({ showModal: false });
  }

  onDelDecline() {
    this.setState({ showModal: false });
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
  renderDelButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        style={Styles.formButtonStyle}
        onPress={() => this.setState({ showModal: true })}
      >
        <Text style={{ alignSelf: 'center' }}>Usuń usługę</Text>
      </Button>
    );
  }

  renderSaveButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        style={Styles.formButtonStyle}
        onPress={this.onSaveButtonPress.bind(this)}
      >
        <Text style={{ alignSelf: 'center' }}>Zapisz zmiany</Text>
      </Button>
    );
  }
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label='Nazwa:'
            placeholder='Nazwa usługi'
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Opis:'
            multilineWithLabel
            placeholder='Opis'
            onChangeText={text => this.setState({ description: text })}
            value={this.state.description}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Cena:'
            placeholder='Cena'
            onChangeText={text => this.setState({ price: text })}
            value={this.state.price}
          />
        </CardSection>
        <CardSection>
          <View style={styles.containerPickerStyle}>
            <Text style={styles.labelStyle}>Czas trwania:</Text>
            <Picker
              selectedValue={this.state.duration}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ duration: itemValue })
              }
            >
              <Picker.Item label='30 min' value='1' />
              <Picker.Item label='60 min' value='2' />
              <Picker.Item label='90 min' value='3' />
              <Picker.Item label='120 min' value='4' />
            </Picker>
          </View>
          <Confirm
            visible={this.state.showModal}
            onAccept={this.onDelAccept.bind(this)}
            onDecline={this.onDelDecline.bind(this)}
          >
            Czy na pewno chcesz usunąć ten element?
          </Confirm>
        </CardSection>
        {this.renderError()}
        <View style={{ paddingTop: 20 }}>{this.renderSaveButton()}</View>
        <View style={{ paddingTop: 20 }}>{this.renderDelButton()}</View>
      </View>
    );
  }
}
const styles = {
  containerPickerStyle: {
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
    flex: 2
  }
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.service.loading,
    error: state.service.error
  };
};

export default connect(mapStateToProps, { updateService, deleteService })(
  ServiceDetail
);
