import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Text, View, Picker, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Toast } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Card, CardSection, Input } from './common';
import Styles from '../styles';
import URL from '../config/server';

class BookAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      employees: [],
      freeSlots: [],
      selectedService: '',
      selectedEmployee: '',
      selectedDate: this.setInitialDate(),
      selectedHour: '',
      error: ''
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.fetchAllServices();
      this.fetchFreeSlots(
        this.state.selectedEmployee,
        this.state.selectedService,
        this.state.selectedDate
      );
    });
  }
  onButtonPress() {
    const {
      selectedEmployee,
      selectedService,
      selectedDate,
      selectedHour
    } = this.state;
    this.createAppointment(
      selectedEmployee,
      selectedService,
      this.props.user._id,
      selectedDate,
      selectedHour
    );
    // Toast.show({
    //     text: 'Zarejestrowano na wizytę',
    //     buttonText: 'Okay',
    // });
    this.fetchFreeSlots(selectedEmployee, selectedService, selectedDate);
  }

  setInitialDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth();
    const yyyy = today.getFullYear();

    if (dd < 10 && mm < 10) {
      todayDate = `${yyyy}-0${mm + 1}-0${dd}`;
    }
    if (dd > 10 && mm < 10) {
      todayDate = `${yyyy}-0${mm + 1}-${dd}`;
    }
    if (dd < 10 && mm > 10) {
      todayDate = `${yyyy}-${mm + 1}-0${dd}`;
    }
    if (dd > 10 && mm > 10) {
      todayDate = `${yyyy}-${mm + 1}-${dd}`;
    }
    return todayDate;
  }

  mapFreeSlotsToHours() {
    return this.state.freeSlots.map(slot => {
      if (slot % 2 === 1) {
        return `${Math.floor(slot / 2) + 9}:00`;
      }
      return `${Math.floor(slot / 2) + 8}:30`;
    });
  }

  createGuestAppoint(emplyeeID, serviceID, date, slot, guestName, guestPhnoe) {
    const data = JSON.stringify({
      employeeID: employeeID,
      serviceID: serviceID,
      date: date,
      slot: slot,
      guestName: guestName,
      guestPhone: guestPhone
    });

    console.log(data);

    axios
      .post(`${URL}/api/appointments`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      })
      .then(response => this.props.navigation.navigate('Schedule'))
      .catch(err => console.log(err.response.data));
  }

  createAppointment(employeeID, serviceID, userID, date, slot) {
    const data = JSON.stringify({
      employeeID: employeeID,
      serviceID: serviceID,
      userID: userID,
      date: date,
      slot: slot
    });

    console.log(data);
    axios
      .post(`${URL}/api/appointments`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      })
      .then(response => this.props.navigation.navigate('Schedule'))
      .catch(err => console.log(err.response.data));
  }

  fetchFreeSlots(employeeID, serviceID, date) {
    axios
      .get(
        `${URL}/api/employees/${employeeID}/availability/service/${serviceID}/${date}`
      )
      .then(response =>
        this.setState({ freeSlots: response.data }, () => {
          this.setState({ selectedHour: this.state.freeSlots[0] });
          console.log(response.data);
        })
      )
      .catch(err => console.log(err.response.data));
  }

  fetchAllServices() {
    axios
      .get(`${URL}/api/services`)
      .then(response =>
        this.setState({ services: response.data }, () => {
          if (this.state.selectedService === '') {
            this.setState(
              {
                selectedService: this.props.navigation.getParam(
                  'service',
                  response.data[0]._id
                )
              },
              () => {
                console.log(this.state.selectedService);
                this.fetchEmplByServiceId(this.state.selectedService);
              }
            );
          }
        })
      )
      .catch(err => console.log(err.response.data));
  }

  fetchEmplByServiceId(serviceId) {
    axios
      .get(`${URL}/api/services/${serviceId}/employees`)
      .then(response =>
        this.setState({ employees: response.data }, () =>
          this.setState({ selectedEmployee: response.data[0]._id }, () => {
            const {
              selectedDate,
              selectedEmployee,
              selectedService
            } = this.state;
            if (
              selectedDate !== '' &&
              selectedEmployee !== '' &&
              selectedService !== ''
            ) {
              this.fetchFreeSlots(
                selectedEmployee,
                selectedService,
                selectedDate
              );
            }
          })
        )
      )
      .catch(err => console.log(err.response.data));
  }

  renderButton() {
    if (this.state.freeSlots.length !== 0) {
      return (
        <Button
          style={Styles.formButtonStyle}
          onPress={this.onButtonPress.bind(this)}
        >
          <Text style={{ alignSelf: 'center', color: 'white' }}>
            Zarezerwuj
          </Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoord={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <Card>
          <CardSection>
            <Text style={{ textAlign: 'center' }}> Wybierz usługę </Text>
          </CardSection>
          <CardSection>
            <Picker
              itemStyle={{ justifyContent: 'space-between' }}
              style={{ width: '90%', backgroundColor: 'white' }}
              selectedValue={this.state.selectedService}
              onValueChange={value =>
                this.setState({ selectedService: value }, () =>
                  this.fetchEmplByServiceId(value)
                )
              }
            >
              {this.state.services.map((service, i) => {
                return (
                  <Picker.Item
                    key={i}
                    value={service._id}
                    label={`${service.name}     cena: ${service.price} zł`}
                  />
                );
              })}
            </Picker>
          </CardSection>
          <CardSection>
            <Text> Wybierz fryzjera </Text>
          </CardSection>
          <CardSection>
            <Picker
              mode='dropdown'
              style={{ width: '100%' }}
              selectedValue={this.state.selectedEmployee}
              onValueChange={value =>
                this.setState({ selectedEmployee: value }, () => {
                  const {
                    selectedDate,
                    selectedEmployee,
                    selectedService
                  } = this.state;
                  console.log(this.state);
                  this.fetchFreeSlots(
                    selectedEmployee,
                    selectedService,
                    selectedDate
                  );
                })
              }
            >
              {this.state.employees.map((employee, i) => {
                return (
                  <Picker.Item
                    key={i}
                    value={employee._id}
                    label={employee.name}
                  />
                );
              })}
            </Picker>
          </CardSection>
          <CardSection>
            <Text>Wybierz dzień wizyty</Text>
          </CardSection>
          <CardSection style={{ justifyContent: 'center' }}>
            <Icon
              name='md-calendar'
              size={30}
              color='grey'
              style={{ alignSelf: 'center' }}
            />
            <DatePicker
              style={{ width: 200 }}
              date={this.state.selectedDate}
              mode='date'
              placeholder='Wybierz dzień'
              format='YYYY-MM-DD'
              maxDate='2019-12-31'
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 5
                }
              }}
              onDateChange={date => {
                this.setState({ selectedDate: date }, () => {
                  const {
                    selectedDate,
                    selectedEmployee,
                    selectedService
                  } = this.state;
                  this.fetchFreeSlots(
                    selectedEmployee,
                    selectedService,
                    selectedDate
                  );
                });
              }}
              locale='pl_pl'
            />
          </CardSection>
        </Card>
        {this.state.freeSlots.length === 0 ? (
          <View style={{ paddingTop: 30 }}>
            <Text
              style={{ textAlign: 'center', fontSize: 16, fontWeight: '800' }}
            >
              {' '}
              Brak wolnych terminów na ten dzień
            </Text>
          </View>
        ) : (
          <Card>
            <CardSection>
              <Text>Wybierz godzinę</Text>
            </CardSection>
            <CardSection>
              <Picker
                style={{ width: '100%' }}
                selectedValue={this.state.selectedHour}
                onValueChange={value => this.setState({ selectedHour: value })}
              >
                {this.mapFreeSlotsToHours().map((element, i) => {
                  return (
                    <Picker.Item
                      key={element.slot}
                      value={element.slot}
                      label={element.hour}
                    />
                  );
                })}
              </Picker>
            </CardSection>
          </Card>
        )}
        {this.props.user.isAdmin ? (
          <Card>
            <CardSection>
              <Text>Dane klienta</Text>
            </CardSection>
            <CardSection>
              <Input placeholder='Imię i nazwisko' />
            </CardSection>
            <CardSection>
              <Input placeholder='Numer telefonu' />
            </CardSection>
          </Card>
        ) : null}
        <View style={{ paddingVertical: 20 }}>{this.renderButton()}</View>
      </KeyboardAwareScrollView>
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

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    services: state.auth.service
  };
};

export default connect(mapStateToProps)(BookAppointment);
