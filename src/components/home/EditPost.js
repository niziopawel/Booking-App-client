import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button } from 'native-base';
import { CardSection, Input, MultilineInput, Spinner } from '../common';
import { updatePost } from '../../actions/NewsActions';
import Styles from '../../styles';

class EditPost extends React.Component {
  state = {
    _id: this.props.navigation.getParam('postId'),
    title: this.props.navigation.getParam('title'),
    description: this.props.navigation.getParam('description'),
    url: this.props.navigation.getParam('url')
  };

  onButtonPress() {
    this.props.updatePost(
      this.state._id,
      this.state.title,
      this.state.description,
      this.state.url,
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
    console.log(this.state._id);
    return (
      <View>
        <CardSection>
          <Input
            label='Tytuł'
            onChangeText={text => this.setState({ title: text })}
            value={this.state.title}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Treść'
            multilineWithLabel
            onChangeText={text => this.setState({ description: text })}
            value={this.state.description}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Adres URL zdjęcia'
            onChangeText={text => this.setState({ url: text })}
            value={this.state.url}
          />
        </CardSection>
        {this.renderError()}
        <View style={{ paddingTop: 20 }}>{this.renderButton()}</View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.news.loading,
    error: state.news.error
  };
};

export default connect(mapStateToProps, { updatePost })(EditPost);
