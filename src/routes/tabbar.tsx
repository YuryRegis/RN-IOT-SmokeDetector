/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import * as Icon from 'react-native-feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../pages/home';
import AboutUS from '../pages/about';
import {NavigationContainer} from '@react-navigation/native';

function TabBar() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#B589D6',
          tabBarInactiveTintColor: '#c9c9c9',
          tabBarStyle: {
            height: 46,
            backgroundColor: '#efeeee',
          },
          tabBarIcon: ({size, color}) => {
            let IconName;
            switch (route.name) {
              case 'Detector':
                IconName = Icon.Radio;
                break;
              default:
                IconName = Icon.Info;
                break;
            }
            return <IconName fontSize={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Detector" component={Home} />
        <Tab.Screen name="Sobre" component={AboutUS} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabBar;
