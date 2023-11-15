import React, {useState, useEffect} from 'react';

import Toast from 'react-native-toast-message';
import {StyleSheet, Text, View} from 'react-native';
import {getDateFromIsoFormat} from '../utils/datetime';

import {useMqtt} from '../hooks';
import {Button, Chart} from '../components';

const initialChartData = {
  labels: [''],
  datasets: [
    {
      data: [0],
    },
  ],
};

const MQTTComponent = () => {
  const [chartData, setChartData] = useState(initialChartData);
  const {mqttClient, loading, data, isAlarmOn, publishAlarmStatus} = useMqtt();

  function getClientStatus() {
    const clientStatus = loading
      ? 'Conectando'
      : mqttClient?.isConnected()
      ? 'Conectado'
      : 'Disconectado';
    return clientStatus;
  }

  function getStatusColor() {
    const clientStatus = getClientStatus();
    switch (clientStatus) {
      case 'Conectando':
        return 'orange';
      case 'Conectado':
        return 'green';
      case 'Disconectado':
        return 'red';
    }
  }

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    setChartData({
      labels: data.map(item => getDateFromIsoFormat(item.createdAt)),
      datasets: [
        {
          data: data.map(item => item.value),
        },
      ],
    });
  }, [data]);

  return (
    <View style={style.container}>
      <Toast />
      <View style={style.statusBar}>
        <View style={style.statusBarContent}>
          <View
            style={[style.statusBarIcon, {backgroundColor: getStatusColor()}]}
          />
          <Text style={[style.statusBarText, {color: getStatusColor()}]}>
            {getClientStatus()}
          </Text>
        </View>
      </View>

      <Chart data={chartData} />

      <View style={style.bodyContent}>
        <Button
          title="Desligar alarme"
          onPress={() => publishAlarmStatus(false)}
          disabled={!isAlarmOn || loading}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#e9e9e9',
  },
  statusBar: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusBarText: {
    fontSize: 16,
    color: 'orange',
    fontWeight: 'bold',
  },
  statusBarIcon: {
    height: 14,
    width: 14,
    marginHorizontal: 4,
    borderRadius: 14,
  },
  bodyContent: {
    flex: 1,
    zIndex: -1,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default MQTTComponent;
