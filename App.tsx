import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import AppNavigator from './AppNavigator';
import AppContextProvider from './Contexts/app.context';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppContextProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AppContextProvider>
    </ApplicationProvider>
    <FlashMessage position="top" />
  </>
);
