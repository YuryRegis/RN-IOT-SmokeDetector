import mqtt from 'sp-react-native-mqtt';
import Toast from 'react-native-toast-message';

import {localStorage} from '../services';
import {useConfigMQTTStore, useGlobalState} from '../context';

const MQTT_HOST = 'mqtt://mqtt3.thingspeak.com:1883';

export function useMqtt() {
  const {
    data,
    mqttRef,
    setData,
    setMqttRef,
    setIsLoading,
    setIsAlarmOn,
    setIsConnected,
  } = useGlobalState();

  const {topicID, clientID, password, username} = useConfigMQTTStore();

  const MQTT_TOPIC = `channels/${topicID}/subscribe`;

  const MQTT_CREDENTIALS = {
    auth: true,
    port: 1883,
    clean: true,
    uri: MQTT_HOST,
    automaticReconnect: false,
    user: username,
    pass: password,
    clientId: clientID,
  };

  async function disconnect() {
    if (mqttRef.current) {
      setIsLoading(true);
      await mqttRef.current.disconnect();
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
      loadStorageData()
        .then()
        .finally(() => {
          setIsConnected(true);
          setIsLoading(false);
        });
    });

    mqttClient.on('message', payload => {
      setIsLoading(true);
      console.log(`Received message: ${payload.data}`);
      const response = JSON.parse(payload.data);

      if (response.field1 !== null) {
        const newData = [
          {
            value: parseInt(response.field1, 10),
            createdAt: response.created_at,
          },
        ];
        try {
          setData(newData);
        } catch (error) {
          console.log('error', error);
        } finally {
          console.log('saving data', newData);
          saveStorageData(newData);
        }
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
      Toast.show({
        type: 'error',
        text1: 'Unexpected error',
        text2: err.toString(),
        position: 'bottom',
        visibilityTime: 3000,
      });
    });

    mqttClient.connect();
    setMqttRef(mqttClient);
  }

  function saveStorageData(newData: {value: number; createdAt: string}[]) {
    try {
      console.log('saving data on function', newData);
      const storagedDatSerialized = localStorage.getString('@mqttData');
      if (storagedDatSerialized) {
        const storagedData = JSON.parse(storagedDatSerialized);
        localStorage.set(
          '@mqttData',
          JSON.stringify([...storagedData, ...newData]),
        );
      } else {
        localStorage.set('@mqttData', JSON.stringify(newData));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Storage data not saved',
        text2: 'Please, check mmkv storage',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  }

  async function loadStorageData() {
    try {
      const storagedDatSerialized = localStorage.getString('@mqttData');
      if (storagedDatSerialized) {
        const storagedData = JSON.parse(storagedDatSerialized) as typeof data;
        if (data.length === 0) {
          setData(storagedData.slice(-5));
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Storage data not found',
        text2: 'Please, check mmkv storage',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  }

  function publishAlarmStatus(status: boolean) {
    const publishTopic = `channels/${topicID}/publish/fields/field2`;
    mqttRef.current?.publish(publishTopic, status.toString(), 0, false);
  }

  return {
    data,
    connect,
    disconnect,
    publishAlarmStatus,
    mqttClient: mqttRef?.current,
  };
}
