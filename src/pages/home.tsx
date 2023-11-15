import React, {useState, useEffect, useRef} from 'react';
import {USERNAME, PASSWORD, CLIENTID, TOPIC_ID} from '@env';

import Toast from 'react-native-toast-message';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import mqtt, {IMqttClient} from 'sp-react-native-mqtt';
import {LineChart} from 'react-native-chart-kit';
import {getDateFromIsoFormat} from '../utils/datetime';
import Button from '../components/Buttom';

const MQTT_TOPIC = `channels/${TOPIC_ID}/subscribe`;
const MQTT_HOST = 'mqtt://mqtt3.thingspeak.com:1883';
const MQTT_CREDENTIALS = {
  auth: true,
  port: 1883,
  clean: true,
  uri: MQTT_HOST,
  automaticReconnect: true,
  user: USERNAME,
  pass: PASSWORD,
  clientId: CLIENTID,
};

type mqttData = {
  value: number;
  createdAt: string;
};

type chartDataProp = {
  labels: string[];
  datasets: [
    {
      data: number[];
    },
  ];
};

const MQTTComponent = () => {
  const [alarmStatus, setAlarmStatus] = useState<'true' | 'false'>('false');
  const [chartData, setChartData] = useState<chartDataProp>();
  const [loading, setLoading] = useState(true);
  const [dataArray, setDataArray] = useState<mqttData[]>([
    {value: 5679, createdAt: '2021-11-09T00:00:00Z'},
    {value: 3394, createdAt: '2021-11-21T01:33:00Z'},
  ]);
  const mqttClient = useRef<IMqttClient | null>(null);

  useEffect(() => {
    async function connectMQTT() {
      const client = await mqtt.createClient(MQTT_CREDENTIALS);

      client.on('connect', () => {
        console.log('MQTT client connected');
        client.subscribe(MQTT_TOPIC, 0);
        Toast.show({
          type: 'success',
          text1: 'MQTT Connected',
          text2: MQTT_TOPIC,
          position: 'bottom',
          visibilityTime: 5000,
        });
        setLoading(false);
      });

      client.on('message', payload => {
        console.log(`Received message: ${payload.data}`);
        const data = JSON.parse(payload.data);
        setLoading(false);

        if (data.field1 !== null) {
          setDataArray(oldState => [
            ...oldState,
            {
              value: parseInt(data.field1, 10),
              createdAt: data.created_at,
            },
          ]);
        }
        if (data.field2 !== null) {
          const alarm = data.field2 as 'true' | 'false';
          setAlarmStatus(alarm);
          Toast.show({
            type: 'info',
            text1: 'Alarm Status',
            text2: alarm === 'true' ? 'Alarme ligado' : 'Alarme desligado',
            position: 'bottom',
            visibilityTime: 5000,
          });
        }
      });

      client.on('error', err => {
        console.log(err);
      });

      client.connect();
      mqttClient.current = client;
    }
    connectMQTT();

    return () => {
      mqttClient.current?.disconnect();
      Toast.show({
        type: 'error',
        text1: 'MQTT Disconnected',
        text2: MQTT_TOPIC,
        position: 'bottom',
        visibilityTime: 5000,
      });
    };
  }, []);

  function getClientStatus() {
    const clientStatus = loading
      ? 'Conectando'
      : mqttClient.current?.isConnected()
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
    setChartData({
      labels: dataArray.map(item => getDateFromIsoFormat(item.createdAt)),
      datasets: [
        {
          data: dataArray.map(item => item.value),
        },
      ],
    });
  }, [dataArray]);

  function handleAlarmButtom() {
    const publishTopic = `channels/${TOPIC_ID}/publish/fields/field2`;
    mqttClient.current?.publish(publishTopic, 'false', 0, false);
    setLoading(true);
  }

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
      {Boolean(chartData) && (
        <View>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 32}
            height={250}
            formatYLabel={value => `${value.slice(0, -3)}`}
            chartConfig={{
              backgroundColor: '#552586',
              backgroundGradientFrom: '#6A369C',
              backgroundGradientTo: '#B589D6',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '2',
                stroke: '#c3ff00',
              },
            }}
            bezier
            style={style.chart}
          />
        </View>
      )}
      <View style={style.bodyContent}>
        <Button
          title="Desligar alarme"
          onPress={handleAlarmButtom}
          disabled={alarmStatus === 'false' || loading}
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
  chart: {marginVertical: 8, borderRadius: 16},
  bodyContent: {
    flex: 1,
    zIndex: -1,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default MQTTComponent;