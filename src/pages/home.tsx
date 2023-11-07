import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import mqtt, {IMqttClient} from 'sp-react-native-mqtt';

const MQTT_TOPIC = 'channels/2334858/subscribe';
const MQTT_HOST = 'mqtt://mqtt3.thingspeak.com:1883';
const MQTT_CREDENTIALS = {
  auth: true,
  port: 1883,
  clean: true,
  uri: MQTT_HOST,
  automaticReconnect: true,
  user: 'NRY5KAAIIRoBDSIEKzodLC0',
  pass: 'pQ4OMgQxGq5ifrcpL8rRmDxF',
  clientId: 'NRY5KAAIIRoBDSIEKzodLC0',
};

const MQTTComponent = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mqttClient: IMqttClient | null;

    async function connectMQTT() {
      const client = await mqtt.createClient(MQTT_CREDENTIALS);

      client.on('connect', () => {
        console.log('MQTT client connected');
        client.subscribe(MQTT_TOPIC, 0);
        setLoading(false);
      });

      client.on('message', (topic, payload) => {
        console.log(`Received message: ${payload.toString()}`);
        setMessage(payload.toString());
      });

      client.on('error', err => {
        console.log(err);
      });

      client.connect();
      mqttClient = client;
    }
    connectMQTT();
    return () => {
      mqttClient?.disconnect();
    };
  }, []);

  return (
    <View>{loading ? <Text>loading...</Text> : <Text>{message}</Text>}</View>
  );
};

export default MQTTComponent;
