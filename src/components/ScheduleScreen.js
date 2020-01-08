import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Text, View, Picker, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, Button, CardItem, Body, Right } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { CardSection, Confirm } from './common';
import Styles from '../styles';
import URL from '../config/server';

class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      employees: this.props.employees,
      selectedEmployee: this.props.employees[0]._id,
      appointments: [],
      selectedDate: this.setInitialDate(),
      error: '',
      scheduledAppoints: [],
      oldAppoints: []
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      if (this.props.user.isAdmin) {
        this.fetchEmployeeAppointments(
          this.state.selectedEmployee,
          this.state.selectedDate
        );
      }
      this.fetchUserAppointments(this.props.user._id);
    });
  }

  onAccept() {
    this.cancelAppointment(this.state.id);
    this.fetchUserAppointments(this.props.user._id);
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
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

  setBeginHour(date, slot) {
    date.setTime(date.getTime() + 3600000 * this.mapSlotsToHourNumber(slot));
    return date;
  }

  mapSlotsToHourNumber(slot) {
    if (slot % 2 === 1) {
      return Math.floor(slot / 2) + 8;
    }
    return Math.floor(slot / 2) + 7;
  }

  mapSlotsToHourString(slot) {
    if (slot % 2 === 1) {
      return `${Math.floor(slot / 2) + 9}:00`;
    }
    return `${Math.floor(slot / 2) + 8}:30`;
  }

  fetchEmployeeAppointments(selectedEmployee, selectedDate) {
    axios
      .get(`${URL}/api/employees/${selectedEmployee}/${selectedDate}`)
      .then(response => {
        this.setState({ appointments: response.data });
      })
      .catch(err => console.log(err.response.data));
  }

  fetchUserAppointments(userID) {
    axios
      .get(`${URL}/api/appointments/user/${userID}`)
      .then(response => {
        const today = new Date();
        const scheduled = [];
        const old = [];
        response.data.forEach(element => {
          const date = new Date(element.date);
          const dateToCompare = this.setBeginHour(date, element.slot[0]);
          if (today.getTime() < date.getTime()) {
            scheduled.push(element);
          } else {
            old.push(element);
          }
        });
        this.setState({ scheduledAppoints: scheduled });
        this.setState({ oldAppoints: old });
      })
      .catch(err => console.log(err));
  }
  cancelAppointment(appointID) {
    axios
      .delete(`${URL}/api/appointments/${appointID}`)
      .then(response => console.log(response.data))
      .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <View>
        {!this.props.user.isAdmin ? (
          <Card>
            <CardSection>
              <Text>Zaplanowane wizyty</Text>
            </CardSection>
            <FlatList
              data={this.state.scheduledAppoints}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Body>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          color: 'black'
                        }}
                      >{`Data: ${item.date.substring(0, 10)}`}</Text>
                      <Text>
                        {`godz: ${this.mapSlotsToHourString(item.slot[0])}`}
                      </Text>
                      <Text>{item.service.name}</Text>
                      <Text>{`Fryzjer: ${item.employee.name}`}</Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text
                          style={{
                            fontSize: 15,
                            textAlign: 'right',
                            color: '#2bb3c0'
                          }}
                          onPress={() =>
                            this.setState({ showModal: true, id: item._id })
                          }
                        >
                          Anuluj wizytę
                        </Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item._id}
            />
            <Confirm
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
            >
              Czy anulować wiytę?
            </Confirm>
          </Card>
        ) : (
          <Card>
            <CardSection>
              <Text>Wybierz pracownika</Text>
            </CardSection>
            <CardSection>
              <Picker
                itemStyle={{ justifyContent: 'space-between' }}
                style={{ width: '90%', backgroundColor: 'white' }}
                selectedValue={this.state.selectedEmployee}
                onValueChange={value =>
                  this.setState({ selectedEmployee: value }, () =>
                    this.fetchEmployeeAppointments(
                      this.state.selectedEmployee,
                      this.state.selectedDate
                    )
                  )
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
                  this.setState({ selectedDate: date }, () =>
                    this.fetchEmployeeAppointments(
                      this.state.selectedEmployee,
                      this.state.selectedDate
                    )
                  );
                }}
                locale='pl_pl'
              />
            </CardSection>
            <FlatList
              data={this.state.appointments}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Body>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: 'black'
                        }}
                      >
                        {item.user.name}
                      </Text>
                      <Text note>{`Telefon: ${item.user.phone}`}</Text>
                      <Text style={{ paddingTop: 10 }}>
                        {`godz: ${this.mapSlotsToHourString(item.slot[0])}`}
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text
                          style={{
                            fontSize: 15,
                            textAlign: 'right',
                            color: '#2bb3c0'
                          }}
                          onPress={() =>
                            this.setState({ showModal: true, id: item._id })
                          }
                        >
                          Anuluj wizytę
                        </Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item._id}
            />
          </Card>
        )}
      </View>
    );

    // return (

    // );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    employees: state.employee.employees
  };
};

export default connect(mapStateToProps)(ScheduleScreen);
