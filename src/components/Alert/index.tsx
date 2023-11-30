import React, {useEffect, useRef} from 'react';

import alarm from './sound';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface AnimatedAlertProps {
  shouldStartAnimation: Boolean;
}

function AnimatedAlert({shouldStartAnimation}: AnimatedAlertProps) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (shouldStartAnimation) {
      animationRef.current?.play();
      alarm.setVolume(1);
      alarm.play().setNumberOfLoops(-1);
    } else {
      animationRef.current?.reset();
      alarm.stop();
    }
  }, [shouldStartAnimation]);

  return (
    <LottieView
      loop
      ref={animationRef}
      style={style.lottieView}
      source={require('../../assets/sirene.json')}
    />
  );
}

export default AnimatedAlert;

const style = StyleSheet.create({
  lottieView: {
    width: '100%',
    height: '100%',
  },
});
