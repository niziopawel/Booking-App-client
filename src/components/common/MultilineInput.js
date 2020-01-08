import React from 'react';
import { TextInput, View } from 'react-native';

const MultilineInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        multiline
        numberOfLines={6}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'grey'}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 200,
    textAlignVertical: 'top'
    // flex: 1,
  },
  containerStyle: {
    colorBackground: '#5c93ed',
    height: 150,
    width: 300,
    flex: 1,
    alignItems: 'stretch'
  }
};

export { MultilineInput };
