import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: '#161c2c'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto'
  },
  headerButton: {
    height: 44,
    width: 44,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomTabStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: 'white'
  },
  formButtonStyle: {
    alignSelf: 'center',
    height: 40,
    backgroundColor: '#161c2c',
    width: 300,
    justifyContent: 'center',
    borderRadius: 10
  },
  loginButtonStyle: {
    height: 40,
    backgroundColor: '#2bb3c0',
    width: 300,
    justifyContent: 'center',
    borderRadius: 10
  },
  inputStyle: {
    flexDirection: 'row',
    marginTop: 30,
    height: 40,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  inputErrorStyle: {
    flexDirection: 'row',
    marginTop: 30,
    height: 40,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  },
  imageStyle: {
    width: undefined,
    height: undefined,
    flex: 1
  },
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  }
});
