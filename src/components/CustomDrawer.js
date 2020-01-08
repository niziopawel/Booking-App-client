import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Header, Body } from 'native-base';
import { DrawerItems } from 'react-navigation';
import LogoutButton from './auth/LogoutButton';

export default CustomDrawer = props => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('../../assets/image/logo_1.png')}
          resizeMode='stretch'
        />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
      <LogoutButton />
    </Content>
  </Container>
);

const styles = {
  container: {
    paddingLeft: 20,
    height: 55,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'grey'
  },
  drawerImage: {
    flex: 1,
    width: 280,
    alignSelf: 'center'
  }
};
