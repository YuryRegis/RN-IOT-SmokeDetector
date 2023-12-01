import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useConfigMQTTStore, useGlobalState} from '../context';
import {Button} from '../components';
import {useMqtt} from '../hooks';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');
const $modalContentWidth = width - 48;
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
    } finally {
      callback();
    }
  };

  const handleCloseModal = () => {
    callback();
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={$style.modal}>
        <View style={$style.modalContent}>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={$style.IconText}>x</Text>
          </TouchableOpacity>

          <Text style={$style.Text}>Username</Text>
          <TextInput
            value={username}
            style={$style.TextInput}
            onChangeText={setUsername}
          />

          <Text style={$style.Text}>Client ID</Text>
          <TextInput
            value={clientId}
            style={$style.TextInput}
            onChangeText={setClientId}
          />

          <Text style={$style.Text}>Topic ID</Text>
          <TextInput
            value={topicId}
            style={$style.TextInput}
            onChangeText={setTopicId}
          />

          <Text style={$style.Text}>Password</Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            style={$style.TextInput}
            onChangeText={setPassword}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: $modalContentWidth,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  TextInput: {
    color: 'gray',
    borderWidth: 1,
    paddingLeft: 9,
    borderRadius: 9,
    marginBottom: 15,
    borderColor: '#B589D6',
  },
  IconText: {
    fontSize: 18,
    color: '#6A369C',
    textAlign: 'right',
  },
  Text: {
    fontSize: 14,
    color: '#6A369C',
  },
});
