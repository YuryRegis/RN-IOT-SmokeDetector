import React, {useEffect, useRef} from 'react';

import alarm from './sound';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface AnimatedAlertProps {
  shouldStartAnimation: boolean;
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
      ref={animationRef}
      style={style.lottieView}
      source={require('../../assets/sirene.json')}
      autoPlay={shouldStartAnimation}
      loop
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
