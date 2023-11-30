/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  ModalProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useConfigMQTTStore, useGlobalState} from '../context';
import {Button} from '../components';
import {useMqtt} from '../hooks';
import Toast from 'react-native-toast-message';

interface IConfigModalProps extends ModalProps {
  callback: () => void;
}

export const ConfigModal = ({callback, visible}: IConfigModalProps) => {
  const configData = useConfigMQTTStore(state => state);
  const [username, setUsername] = useState(configData.username);
  const [password, setPassword] = useState(configData.password);
  const [topicId, setTopicId] = useState(configData.topicID);
  const [clientId, setClientId] = useState(configData.clientID);

  const {mqttClient, connect, disconnect} = useMqtt();
  const {isConnected, isLoading} = useGlobalState();

  const handleOnPress = () => {
    configData.setTopicID(topicId);
    configData.setUsername(username);
    configData.setPassword(password);
    configData.setClientID(clientId);
    try {
      if (mqttClient && isConnected) {
        disconnect();
      } else {
        connect();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'MQTT Client not found',
        // @ts-ignore
        text2: error?.message || error || 'Please, try again',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const handleCloseModal = () => {
    callback();
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={$style.modal}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={{fontSize: 20, textAlign: 'right'}}>X</Text>
          </TouchableOpacity>

          <Text>Username</Text>
          <TextInput value={username} onChangeText={setUsername} />

          <Text>Client ID</Text>
          <TextInput value={clientId} onChangeText={setClientId} />

          <Text>Topic ID</Text>
          <TextInput value={topicId} onChangeText={setTopicId} />

          <Text>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Button
            disabled={isLoading}
            onPress={handleOnPress}
            title={isConnected ? 'Desconectar' : 'Conectar'}
          />
        </View>
      </View>
    </Modal>
  );
};

const $style = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
