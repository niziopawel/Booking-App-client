import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  label,
  multiline,
  numberOfLines,
  multilineWithLabel
}) => {
  const {
    inputStyle,
    labelStyle,
    containerStyle,
    containerMultilineStyle,
    multilineInputStyle
  } = styles;

  return (
    <View
      style={
        multiline || multilineWithLabel
          ? containerMultilineStyle
          : containerStyle
      }
    >
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      <TextInput
        multiline={multiline || multilineWithLabel}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={multiline ? multilineInputStyle : inputStyle}
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
    flex: 2
  },
  multilineInputStyle: {
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 20,
    height: 200,
    textAlignVertical: 'top'
  },
  labelStyle: {
    color: 'grey',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    flex: 1
  },
  containerMultilineStyle: {
    colorBackground: '#5c93ed',
    height: 150,
    width: 300,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
    // alignItems: 'stretch'
  },
  containerStyle: {
    colorBackground: '#5c93ed',
    height: 50,
    width: 300,
    flex: 1,
    flexDirection: 'row'
    // alignItems: 'center'
  }
};

export { Input };
