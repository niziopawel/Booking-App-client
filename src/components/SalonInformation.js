import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView from 'react-native-maps';
import { Card, Container, Text, Content, CardItem } from 'native-base';
import { CardSection } from './common';

class SalonInformation extends React.Component {
  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoord={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <Container>
          <Content>
            <Card>
              <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={{ fontSize: 15, color: 'grey' }}>
                  {' '}
                  Dane kontaktowe:
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 10
                }}
              >
                <Text>Adres: Dąbrowskiego 1/1, 35-040 Rzeszów</Text>
                <Text>Numer kontaktowy: 511 543 421</Text>
                <Text>E-mail: kontakt@newlook.pl</Text>
              </View>
            </Card>
            <Card>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderBottomColor: 'grey'
                }}
              >
                <Text style={{ fontSize: 15, color: 'grey' }}>
                  Godziny otwarcia:
                </Text>
              </View>
              <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>Poniedziałek</Text>
                <Text>9:00 - 17:00</Text>
              </CardItem>
              <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>Wtorek</Text>
                <Text>9:00 - 17:00</Text>
              </CardItem>
              <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>Środa</Text>
                <Text>9:00 - 17:00</Text>
              </CardItem>
              <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>Czwartek</Text>
                <Text>9:00 - 17:00</Text>
              </CardItem>
              <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>Piątek</Text>
                <Text>9:00 - 17:00</Text>
              </CardItem>
              <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>Sobota</Text>
                <Text>9:00 - 14:00</Text>
              </CardItem>
              <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>Niedziela</Text>
                <Text>Zamknięte</Text>
              </CardItem>
            </Card>
            <Card>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderBottomColor: 'grey'
                }}
              >
                <Text style={{ fontSize: 15, color: 'grey' }}>Lokalizacja</Text>
              </View>
              <CardItem style={styles.container}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 50.03376844,
                    longitude: 22.00007915,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                >
                  <MapView.Marker
                    coordinate={{
                      latitude: 50.03376844,
                      longitude: 22.00007915
                    }}
                  />
                </MapView>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 800,
    alignItems: 'center'
    // justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default SalonInformation;
