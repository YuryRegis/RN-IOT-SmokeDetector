import {create} from 'zustand';
import {USERNAME, PASSWORD, CLIENTID, TOPIC_ID} from '@env';

export interface IConfigStore {
  topicID: string;
  username: string;
  clientID: string;
  password: string;
}

interface Actions {
  reset: () => void;
  setTopicID: (newtopicID: string) => void;
  setClientID: (newclientID: string) => void;
  setUsername: (newusername: string) => void;
  setPassword: (newpassword: string) => void;
}

export const useConfigMQTTStore = create<IConfigStore & Actions>(set => ({
  topicID: TOPIC_ID || '',
  username: USERNAME || '',
  clientID: CLIENTID || '',
  password: PASSWORD || '',

  setTopicID: newtopicID => set(() => ({topicID: newtopicID})),
  setClientID: newclientID => set(() => ({clientID: newclientID})),
  setUsername: newusername => set(() => ({username: newusername})),
  setPassword: newpassword => set(() => ({password: newpassword})),
  reset: () => set({topicID: '', username: '', clientID: '', password: ''}),
}));
