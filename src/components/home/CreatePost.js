import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Text, Button } from 'native-base';
import { CardSection, Input, MultilineInput, Spinner } from '../common';
import { createPost } from '../../actions/NewsActions';
import Styles from '../../styles';

class CreatePost extends React.Component {
  state = {
    title: '',
    description: '',
    url: ''
  };

  onButtonPress() {
    this.props.createPost(
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
    return (
      <KeyboardAwareScrollView
        resetScrollToCoord={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <CardSection>
          <Input
            placeholder='Tytuł'
            onChangeText={text => this.setState({ title: text })}
          />
        </CardSection>
        <CardSection>
          <MultilineInput
            placeholder='Treść'
            onChangeText={text => this.setState({ description: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder='Adres URL zdjęcia'
            onChangeText={text => this.setState({ url: text })}
          />
        </CardSection>
        {this.renderError()}
        <View style={{ paddingTop: 20 }}>{this.renderButton()}</View>
      </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, { createPost })(CreatePost);
