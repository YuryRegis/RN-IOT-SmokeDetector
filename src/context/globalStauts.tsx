import {create} from 'zustand';
import {IMqttClient} from 'sp-react-native-mqtt';

type mqttDataResponse = {
  value: number;
  createdAt: string;
};
export interface IGlobalStateStore {
  isLoading: Boolean;
  isAlarmOn: Boolean;
  isConnected: Boolean;
  mqttRef: any;
  data: mqttDataResponse[];
}
interface Actions {
  reset: () => void;
  setIsConnected: (val: Boolean) => void;
  setIsAlarmOn: (val: Boolean) => void;
  setIsLoading: (val: Boolean) => void;
  setMqttRef: (val: IMqttClient) => void;
  setData: (val: mqttDataResponse[]) => void;
}

export const useGlobalState = create<IGlobalStateStore & Actions>(set => ({
  data: [],
  mqttRef: null,
  isLoading: false,
  isAlarmOn: false,
  isConnected: false,

  setData: val => set(({data}) => ({data: [...data, ...val]})),
  setIsConnected: val => set(() => ({isConnected: val})),
  setIsAlarmOn: val => set(() => ({isAlarmOn: val})),
  setIsLoading: val => set(() => ({isLoading: val})),
  setMqttRef: val =>
    set(() => ({
      mqttRef: {
        current: val,
      },
    })),

  reset: () => set({isLoading: false, isConnected: false}),
}));
