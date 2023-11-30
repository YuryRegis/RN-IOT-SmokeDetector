import {create} from 'zustand';

export interface IGlobalStateStore {
  isLoading: Boolean;
  isAlarmOn: Boolean;
  isConnected: Boolean;
}

interface Actions {
  reset: () => void;
  setIsConnected: (val: Boolean) => void;
  setIsAlarmOn: (val: Boolean) => void;
  setIsLoading: (val: Boolean) => void;
}

export const useGlobalState = create<IGlobalStateStore & Actions>(set => ({
  isLoading: false,
  isAlarmOn: false,
  isConnected: false,

  setIsConnected: val => set(() => ({isConnected: val})),
  setIsAlarmOn: val => set(() => ({isAlarmOn: val})),
  setIsLoading: val => set(() => ({isLoading: val})),
  reset: () => set({isLoading: false, isConnected: false}),
}));
