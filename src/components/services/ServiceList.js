import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Content,
  Body,
  Left,
  Right,
  Card,
  Item,
  // Thumbnail,
  Text,
  Button,
  CardItem,
  View
} from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchServices } from '../../actions/ServiceActions';
// import { Confirm } from '../common';

class ServiceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      showModal: false,
      servicesData: []
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () =>
      this.props.fetchServices()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.services !== this.props.serivces) {
      this.setState({ servicesData: nextProps.services });
    }
  }

  renderAddButton() {
    if (this.props.user.isAdmin) {
      return (
        <Button
          IconLeft
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('CreateService')}
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

  renderRightButton(item) {
    if (this.props.user && !this.props.user.isAdmin) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{item.price} zł</Text>
          <Button transparent>
            <Text
              style={{ fontSize: 14, textAlign: 'right', color: '#2bb3c0' }}
              onPress={() =>
                this.props.navigation.navigate('BookAppoint', {
                  service: item._id
                })
              }
            >
              Rezerwuj
            </Text>
          </Button>
        </View>
      );
    }
    if (this.props.user.isAdmin) {
      return (
        <Button
          transparent
          onPress={() =>
            this.props.navigation.navigate('ServiceDetail', {
              serviceId: item._id,
              name: item.name,
              description: item.description,
              price: JSON.stringify(item.price),
              duration: JSON.stringify(item.duration)
            })
          }
        >
          <Text style={{ fontSize: 14, textAlign: 'right', color: '#2bb3c0' }}>
            Szczegóły
          </Text>
        </Button>
      );
    }
  }

  render() {
    console.log(this.props.services);
    return (
      <Container>
        <Item style={{ justifyContent: 'flex-end', padding: 5 }}>
          {this.renderAddButton()}
        </Item>
        {this.state.servicesData.length === 0 ? null : (
          <Content>
            <FlatList
              data={this.state.servicesData}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.description}</Text>
                      </Body>
                    </Left>
                    {/* <Body>
                                        <Text note numberOfLines={1}>
                                            {item.description}
                                        </Text> 
                                    </Body> */}
                    <Right>{this.renderRightButton(item)}</Right>
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
    services: state.service.services,
    loading: state.service.loading,
    error: state.service.error
  };
};
export default connect(mapStateToProps, { fetchServices })(ServiceList);
