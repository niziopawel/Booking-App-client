import React from 'react';
import { FlatList, View } from 'react-native';
import {
  Container,
  Content,
  Body,
  Left,
  Right,
  Card,
  Item,
  Thumbnail,
  Text,
  Button,
  CardItem
} from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchServices } from '../../actions/ServiceActions';
import { fetchEmployees } from '../../actions/EmployeeActions';

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      showModal: false,
      employeesData: []
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.props.fetchEmployees();
      this.props.fetchServices();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.employees !== this.props.employees) {
      this.setState({ employeesData: nextProps.employees });
    }
  }

  setImage(url) {
    if (url) {
      return <Thumbnail square source={{ uri: url }} />;
    }
    return (
      <Thumbnail
        square
        source={{
          uri:
            'https://pngimage.net/wp-content/uploads/2018/06/photo-profil-png-6.png'
        }}
      />
    );
  }

  renderAddButton() {
    if (this.props.user.isAdmin) {
      return (
        <Button
          IconLeft
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('CreateEmployee')}
        >
          <Icon
            name='md-add'
            color='white'
            size={22}
            style={{ paddingLeft: 10 }}
          />
          <Text style={styles.textButtonStyle}>Dodaj</Text>
        </Button>
      );
    }
  }

  renderEditButton(item) {
    if (this.props.user.isAdmin) {
      return (
        <Button transparent>
          <Text
            style={{ fontSize: 14, textAlign: 'right', color: '#2bb3c0' }}
            onPress={() =>
              this.props.navigation.navigate('EmployeeDetail', {
                employeeID: item._id,
                name: item.name,
                information: item.information,
                email: item.email,
                phone: item.phone,
                url: item.url,
                startTime: JSON.stringify(item.start_work),
                endTime: JSON.stringify(item.end_work),
                employeeServices: item.services
              })
            }
          >
            Szczegóły
          </Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <Container>
        <Item style={{ justifyContent: 'flex-end', padding: 5 }}>
          {this.renderAddButton()}
        </Item>
        {this.state.employeesData.length === 0 ? null : (
          <Content>
            <FlatList
              data={this.state.employeesData}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Left>
                      {this.setImage(item.url)}
                      <View style={{ flexDirection: 'column' }}>
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>{item.information}</Text>
                        </Body>
                      </View>
                    </Left>
                    <Right>{this.renderEditButton(item)}</Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item._id}
            />
          </Content>
        )}
      </Container>
    );
  }
}
const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  buttonStyle: {
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#2bb3c0',
    height: 30,
    width: 100
  },
  textButtonStyle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    employees: state.employee.employees,
    loading: state.employee.loading,
    error: state.employee.error
  };
};
export default connect(mapStateToProps, { fetchEmployees, fetchServices })(
  EmployeeList
);
