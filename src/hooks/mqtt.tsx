import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import mqtt, {IMqttClient} from 'sp-react-native-mqtt';
import {USERNAME, PASSWORD, CLIENTID, TOPIC_ID} from '@env';

export const MQTT_TOPIC = `channels/${TOPIC_ID}/subscribe`;
export const MQTT_HOST = 'mqtt://mqtt3.thingspeak.com:1883';
export const MQTT_CREDENTIALS = {
  auth: true,
  port: 1883,
  clean: true,
  uri: MQTT_HOST,
  automaticReconnect: true,
  user: USERNAME,
  pass: PASSWORD,
  clientId: CLIENTID,
};

type mqttDataResponse = {
  value: number;
  createdAt: string;
};

export function useMqtt() {
  const [loading, setLoading] = useState(true);
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [data, setData] = useState<mqttDataResponse[]>([]);

  const mqttClientRef = React.useRef<IMqttClient | null>(null);

  useEffect(() => {
    async function connect() {
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
        setLoading(false);
      });

      mqttClient.on('message', payload => {
        setLoading(true);
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
        setLoading(false);
      });

      mqttClient.on('closed', () => {
        Toast.show({
          type: 'error',
          text1: 'MQTT Disconnected',
          text2: MQTT_TOPIC,
          position: 'bottom',
          visibilityTime: 5000,
        });
        setLoading(true);
      });

      mqttClient.on('error', err => {
        console.log(err);
      });

      mqttClient.connect();
      mqttClientRef.current = mqttClient;
    }
    connect();
    const mqttRef = mqttClientRef.current;
    return () => {
      mqttRef?.disconnect();
    };
  }, []);

  function publishAlarmStatus(status: boolean) {
    const publishTopic = `channels/${TOPIC_ID}/publish/fields/field2`;
    mqttClientRef.current?.publish(publishTopic, status.toString(), 0, false);
  }

  return {
    data,
    loading,
    isAlarmOn,
    publishAlarmStatus,
    mqttClient: mqttClientRef.current,
  };
}
