// var Sound = require('react-native-sound');
import Sound from 'react-native-sound';

var Alert = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

export default Alert;
