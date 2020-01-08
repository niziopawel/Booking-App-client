import React from 'react';
import { TextInput, Text, View } from 'react-native';

const MultilineInputWithLabel = ({
  value,
  onChangeText,
  placeholder,
  label,
  secureTextEntry
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
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
    flex: 2
  },
  labelStyle: {
    color: 'grey',
    fontSize: 18,
    paddingLeft: 10,
    flex: 1
  },
  containerStyle: {
    colorBackground: '#5c93ed',
    height: 50,
    width: 300,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { InputWithLabel };
