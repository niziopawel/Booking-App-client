import React from 'react';
import { Image, FlatList } from 'react-native';
import {
  Container,
  Content,
  Body,
  Card,
  Left,
  Right,
  Item,
  Text,
  Button,
  CardItem
} from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Confirm } from '../common';
import { fetchNews, deletePost } from '../../actions/NewsActions';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      showModal: false,
      postsData: []
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => this.props.fetchNews());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts !== this.props.posts) {
      this.setState({ postsData: nextProps.posts });
    }
  }

  onAccept() {
    this.props.deletePost(this.state.id, this.props.token);
    this.props.fetchNews();
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  renderAddButton() {
    if (this.props.user.isAdmin) {
      return (
        <Button
          IconLeft
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('CreatePost')}
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
  renderDelEditButton(item) {
    if (this.props.user.isAdmin) {
      return (
        <CardItem style={{ height: 40 }}>
          <Left style={{ paddingLeft: 50 }}>
            <Button
              style={styles.buttonStyle}
              onPress={() =>
                this.props.navigation.navigate('EditPost', {
                  postId: item._id,
                  title: item.title,
                  description: item.description,
                  url: item.url
                })
              }
            >
              <Text style={styles.textButtonStyle}>Edytuj</Text>
            </Button>
          </Left>
          <Right style={{ paddingRight: 50 }}>
            <Button
              style={styles.buttonStyle}
              onPress={() => this.setState({ showModal: true, id: item._id })}
            >
              <Text style={styles.textButtonStyle}>Usuń</Text>
            </Button>
          </Right>
        </CardItem>
      );
    }
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Item style={{ justifyContent: 'flex-end', padding: 5 }}>
          {this.renderAddButton()}
        </Item>

        {this.state.postsData.length === 0 ? null : (
          <Content>
            <FlatList
              data={this.state.postsData}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Body>
                      <Text>{item.title}</Text>
                      <Text note>{item.description}</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Image
                      source={{ uri: item.url }}
                      style={styles.imageStyle}
                    />
                  </CardItem>
                  <CardItem style={{ height: 20 }}>
                    <Text note>
                      {`${item.date.substring(
                        0,
                        10
                      )}  godz: ${item.date.substring(12, 16)}`}
                    </Text>
                  </CardItem>
                  {this.renderDelEditButton(item)}
                </Card>
              )}
              keyExtractor={item => item._id}
            />
            <Confirm
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
            >
              Czy na pewno chcesz usunąć ten element?
            </Confirm>
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
    token: state.auth.token,
    user: state.auth.user,
    posts: state.news.posts,
    loading: state.news.loading,
    error: state.news.error
  };
};
export default connect(mapStateToProps, { fetchNews, deletePost })(HomeScreen);
