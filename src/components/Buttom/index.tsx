import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonProps {
  disabled: boolean;
  onPress: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({disabled, onPress, title}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[style.button, disabled && style.disabled]}>
      <Text style={[style.text, disabled && style.textDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#a36cce',
  },
  disabled: {
    opacity: 0.3,
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  textDisabled: {
    color: 'black',
  },
});

export default Button;
