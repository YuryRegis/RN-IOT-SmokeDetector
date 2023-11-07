import React, {useState, useEffect, useRef} from 'react';
import {USERNAME, PASSWORD, CLIENTID, TOPIC_ID} from '@env';

import Toast from 'react-native-toast-message';
import {StyleSheet, Text, View} from 'react-native';
import mqtt, {IMqttClient} from 'sp-react-native-mqtt';

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
  value?: string;
  createdAt?: string;
  alarmStatus?: 'true' | 'false';
};

const MQTTComponent = () => {
  const [message, setMessage] = useState('');
  const [dataArray, setDataArray] = useState<mqttData[]>([]);
  const [loading, setLoading] = useState(true);
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
        setDataArray(oldState => [
          ...oldState,
          {
            value: data.field1,
            createdAt: data.created_at,
            alarmStatus: data.field2,
          },
        ]);
        setMessage(`Field1: ${data.field1}`);
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

  return (
    <View>
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
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <Text>{`${JSON.stringify(dataArray[0])}`}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  statusBar: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
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
});

export default MQTTComponent;
