import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGlobalState} from '../../context';

export function StatusInfo() {
  const [statusText, setStatusText] = useState('Desconectado');
  const [statusColor, setStatusColor] = useState('red');
  const {isConnected, isLoading} = useGlobalState();

  useEffect(() => {
    console.log('StatusInfo: ', isConnected, isLoading);
    if (isLoading) {
      setStatusText('Conectando...');
      setStatusColor('orange');
    } else if (isConnected) {
      setStatusText('Conectado');
      setStatusColor('green');
    } else {
      setStatusText('Desconectado');
      setStatusColor('red');
    }
  }, [isConnected, isLoading]);

  return (
    <View style={$style.statusBarContent}>
      <View
        style={[
          $style.statusBarIcon,
          {
            backgroundColor: statusColor,
          },
        ]}
      />
      <Text style={[$style.statusBarText, {color: statusColor}]}>
        {statusText}
      </Text>
    </View>
  );
}

const $style = StyleSheet.create({
  statusBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusBarIcon: {
    height: 14,
    width: 14,
    marginHorizontal: 4,
    borderRadius: 14,
  },
  statusBarText: {
    fontSize: 16,
    color: 'orange',
    fontWeight: 'bold',
  },
});
