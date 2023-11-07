import React, {useEffect, useState} from 'react';
import Mqtt from 'react-native-mqtt';

type mqttStatus = 'disconnected' | 'connecting' | 'connected';

export const mqttStatusCode = {
  disconnected: 'disconnected' as mqttStatus,
  connecting: 'connecting' as mqttStatus,
  connected: 'connected' as mqttStatus,
};

interface MqttState {
  status: mqttStatus;
  loading: boolean;
  data: string | null;
}

function useMqtt(
  host: string,
  port: number,
  topic?: string,
  username?: string,
  password?: string,
  clientId?: string,
): [
  MqttState,
  (topic: string, message: string) => void,
  (topic: string) => void,
] {
  const [state, setState] = useState<MqttState>({
    status: mqttStatusCode.disconnected,
    loading: false,
    data: null,
  });

  const connect = () => {
    setState({...state, status: mqttStatusCode.connecting, loading: true});

    const client = Mqtt.connect(host, {
      port,
      username,
      password,
      clientId,
    });

    client.on('connect', () => {
      setState({...state, status: mqttStatusCode.connected, loading: false});
    });

    client.on('error', (error: {message: string}) => {
      setState({
        ...state,
        status: mqttStatusCode.disconnected,
        loading: false,
        data: error.message,
      });
    });

    client.on('message', (topic, message) => {
      setState({...state, data: message.toString()});
    });
  };

  const post = (topic: string, message: string) => {
    if (state.status === mqttStatusCode.connected) {
      Mqtt.publish(topic, message, 0, false);
    }
  };

  const subscribe = (topic: string) => {
    if (state.status === mqttStatusCode.connected) {
      Mqtt.subscribe(topic, 0);
    }
  };
  connect();
  return [state, post, subscribe];
}

export default useMqtt;
