import React from 'react';
import { View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button } from 'native-base';
import { CardSection, Input, Spinner, MultilineInput } from '../common';
import { createService } from '../../actions/ServiceActions';
import Styles from '../../styles';

class CreateService extends React.Component {
  state = {
    name: '',
    description: '',
    price: '',
    duration: '1'
  };

  onSaveButtonPress() {
    this.props.createService(
      this.state.name,
      this.state.description,
      this.state.price,
      this.state.duration,
      this.props.token
    );
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

  renderSaveButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        style={Styles.formButtonStyle}
        onPress={this.onSaveButtonPress.bind(this)}
      >
        <Text style={{ alignSelf: 'center' }}>Dodaj</Text>
      </Button>
    );
  }
  render() {
    return (
      <View>
        <CardSection>
          <Input
            // label='Nazwa:'
            placeholder='Nazwa usługi'
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
          />
        </CardSection>
        <CardSection>
          <Input
            multiline
            // label='Opis:'
            placeholder='Opis'
            onChangeText={text => this.setState({ description: text })}
            value={this.state.description}
          />
        </CardSection>
        <CardSection>
          <Input
            // label='Cena:'
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
              <Picker.Item label='30 minut' value='1' />
              <Picker.Item label='60 minut' value='2' />
              <Picker.Item label='90 minut' value='3' />
              <Picker.Item label='120 minut' value='4' />
            </Picker>
          </View>
        </CardSection>
        {this.renderError()}
        <View style={{ paddingTop: 20 }}>{this.renderSaveButton()}</View>
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

export default connect(mapStateToProps, { createService })(CreateService);
