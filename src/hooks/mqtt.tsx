import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import mqtt, {IMqttClient} from 'sp-react-native-mqtt';

import {useConfigMQTTStore, useGlobalState} from '../context';

const MQTT_HOST = 'mqtt://mqtt3.thingspeak.com:1883';

type mqttDataResponse = {
  value: number;
  createdAt: string;
};

export function useMqtt() {
  const {setIsConnected, setIsLoading, setIsAlarmOn} = useGlobalState();
  const {topicID, clientID, password, username} = useConfigMQTTStore();
  const [data, setData] = useState<mqttDataResponse[]>([]);

  const MQTT_TOPIC = `channels/${topicID}/subscribe`;

  const MQTT_CREDENTIALS = {
    auth: true,
    port: 1883,
    clean: true,
    uri: MQTT_HOST,
    automaticReconnect: true,
    user: username,
    pass: password,
    clientId: clientID,
  };

  const mqttClientRef = React.useRef<IMqttClient | null>(null);

  async function disconnect() {
    if (mqttClientRef.current) {
      setIsLoading(true);
      await mqttClientRef.current.disconnect();
      Toast.show({
        type: 'error',
        text1: 'MQTT Disconnected',
        text2: MQTT_TOPIC,
        position: 'bottom',
        visibilityTime: 5000,
      });
      setIsLoading(false);
    }
  }

  async function connect() {
    setIsLoading(true);
    const mqttClient = await mqtt.createClient(MQTT_CREDENTIALS);

    mqttClient.on('connect', () => {
      console.log('MQTT client connected');
      mqttClient.subscribe(MQTT_TOPIC, 0);
      Toast.show({
        type: 'success',
        text1: 'MQTT Connected',
        text2: MQTT_TOPIC,
        position: 'bottom',
        visibilityTime: 5000,
      });
      setIsConnected(true);
      setIsLoading(false);
    });

    mqttClient.on('message', payload => {
      setIsLoading(true);
      console.log(`Received message: ${payload.data}`);
      const response = JSON.parse(payload.data);

      if (response.field1 !== null) {
        setData(oldState => [
          ...oldState,
          {
            value: parseInt(response.field1, 10),
            createdAt: response.created_at,
          },
        ]);
      }
      if (response.field2 !== null) {
        const alarmStatusOn = response.field2 === 'true';
        setIsAlarmOn(alarmStatusOn);
        Toast.show({
          type: 'info',
          text1: 'Alarm Status',
          text2: alarmStatusOn ? 'Alarme ligado' : 'Alarme desligado',
          position: 'bottom',
          visibilityTime: 5000,
        });
      }
      setIsLoading(false);
    });

    mqttClient.on('closed', () => {
      Toast.show({
        type: 'error',
        text1: 'MQTT Disconnected',
        text2: MQTT_TOPIC,
        position: 'bottom',
        visibilityTime: 5000,
      });
      setIsLoading(false);
      setIsConnected(false);
    });

    mqttClient.on('error', err => {
      console.log(err);
      setIsLoading(false);
      setIsConnected(false);
      throw new Error(err);
    });

    mqttClient.connect();
    mqttClientRef.current = mqttClient;
  }

  function publishAlarmStatus(status: boolean) {
    const publishTopic = `channels/${topicID}/publish/fields/field2`;
    mqttClientRef.current?.publish(publishTopic, status.toString(), 0, false);
  }

  return {
    data,
    connect,
    disconnect,
    publishAlarmStatus,
    mqttClient: mqttClientRef.current,
  };
}
