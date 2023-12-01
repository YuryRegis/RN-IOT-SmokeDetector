/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import Toast from 'react-native-toast-message';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDateFromIsoFormat} from '../utils/datetime';

import {useMqtt} from '../hooks';
import {ConfigModal} from './modal';
// import {useConfigMQTTStore} from '../context';
import {AnimatedAlert, Button, Chart} from '../components';
import {StatusInfo} from './components/StatusInfo';
import {useGlobalState} from '../context';

const initialChartData = {
  labels: [''],
  datasets: [
    {
      data: [0],
    },
  ],
};

const MQTTComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chartData, setChartData] = useState(initialChartData);
  const {data, publishAlarmStatus} = useMqtt();

  const {isLoading, isAlarmOn} = useGlobalState();

  function closeModal() {
    setModalVisible(false);
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

      <ConfigModal visible={modalVisible} callback={closeModal} />

      <View style={style.statusBar}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{color: 'black'}}>Configurar MQTT</Text>
        </TouchableOpacity>

        <StatusInfo />
      </View>

      <Chart data={chartData} />

      <View style={style.bodyContent}>
        <View style={[style.AnimatedBox, !isAlarmOn && style.WithOpacity]}>
          <AnimatedAlert shouldStartAnimation={isAlarmOn} />
        </View>
        <Button
          title="Desligar alarme"
          disabled={!isAlarmOn || isLoading}
          onPress={() => publishAlarmStatus(false)}
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
    marginTop: 24,
    marginBottom: 8,
    justifyContent: 'space-between',
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
  bodyContent: {
    flex: 1,
    zIndex: -1,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  AnimatedBox: {
    flex: 1,
    zIndex: -3,
    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '100%',
    paddingBottom: 32,
  },
  WithOpacity: {
    opacity: 0.3,
  },
});

export default MQTTComponent;
