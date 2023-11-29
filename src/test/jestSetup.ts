export {};

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-sound', () => {
  return {
    MAIN_BUNDLE: 'main_bundle',
    IsAndroid: true, // ou false, dependendo do que você precisa
    setCategory: jest.fn(),
    setMode: jest.fn(),
    setSpeakerphoneOn: jest.fn(),
    setVolume: jest.fn(),
    getVolume: jest.fn(),
    setPan: jest.fn(),
    getPan: jest.fn(),
    getSystemVolume: jest.fn(),
    setSystemVolume: jest.fn(),
    enableInSilenceMode: jest.fn(),
    enableSpeakerphone: jest.fn(),
    setIgnoreSilentSwitch: jest.fn(),
    getDuration: jest.fn(),
    getCurrentTime: jest.fn(),
    getNumberOfChannels: jest.fn(),
    isPlaying: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    reset: jest.fn(),
    enableProgressCallback: jest.fn(),
    enablePlaybackRate: jest.fn(),
    setPlaybackRate: jest.fn(),
    release: jest.fn(),
    seek: jest.fn(),
    setNumberOfLoops: jest.fn(),
    setVolume: jest.fn(),
    setPan: jest.fn(),
    enableVolumeControl: jest.fn(),
    enableProgressCallback: jest.fn(),
    enableRate: jest.fn(),
    setRate: jest.fn(),
    enableMetering: jest.fn(),
    getMetering: jest.fn(),
    getFS: jest.fn(),
    setFS: jest.fn(),
    enableLooping: jest.fn(),
    setSpeed: jest.fn(),
  };
});

jest.mock('lottie-react-native', () => {
  return jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    reset: jest.fn(),
  }));
});

jest.mock('react-native-sound', () => {
  const MockSound = jest.fn().mockImplementation((sound, type, callback) => {
    return {
      play: jest.fn(),
      release: jest.fn(),
      // adicione outros métodos necessários aqui
    };
  });

  MockSound.MAIN_BUNDLE = 'main_bundle';
  MockSound.IsAndroid = true; // ou false, dependendo do que você precisa
  MockSound.setCategory = jest.fn();
  MockSound.setMode = jest.fn();
  MockSound.setSpeakerphoneOn = jest.fn();
  MockSound.setVolume = jest.fn();
  MockSound.getVolume = jest.fn();
  MockSound.setPan = jest.fn();
  MockSound.getPan = jest.fn();
  MockSound.getSystemVolume = jest.fn();
  MockSound.setSystemVolume = jest.fn();
  MockSound.enableInSilenceMode = jest.fn();
  MockSound.enableSpeakerphone = jest.fn();
  MockSound.setIgnoreSilentSwitch = jest.fn();
  MockSound.getDuration = jest.fn();
  MockSound.getCurrentTime = jest.fn();
  MockSound.getNumberOfChannels = jest.fn();
  MockSound.isPlaying = jest.fn();
  MockSound.play = jest.fn();
  MockSound.pause = jest.fn();
  MockSound.stop = jest.fn();
  MockSound.reset = jest.fn();
  MockSound.enableProgressCallback = jest.fn();
  MockSound.enablePlaybackRate = jest.fn();
  MockSound.setPlaybackRate = jest.fn();
  MockSound.release = jest.fn();
  MockSound.seek = jest.fn();
  MockSound.setNumberOfLoops = jest.fn();
  MockSound.setVolume = jest.fn();
  MockSound.setPan = jest.fn();
  MockSound.enableVolumeControl = jest.fn();
  MockSound.enableProgressCallback = jest.fn();
  MockSound.enableRate = jest.fn();
  MockSound.setRate = jest.fn();
  MockSound.enableMetering = jest.fn();
  MockSound.getMetering = jest.fn();
  MockSound.getFS = jest.fn();
  MockSound.setFS = jest.fn();
  MockSound.enableLooping = jest.fn();
  MockSound.setSpeed = jest.fn();

  return MockSound;
});
