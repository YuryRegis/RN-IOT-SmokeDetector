/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import TabBar from './src/routes/tabbar';
import {SafeAreaView, StatusBar, useColorScheme, LogBox} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TabBar />
    </SafeAreaView>
  );
}

export default App;
