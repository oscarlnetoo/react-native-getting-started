import React from 'react';
import { Container } from './styles';
import { Input } from '../Input';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

interface InputControlProps extends TextInputProps {
  control: Control;
  name: string;
}

export const InputControl: React.FunctionComponent<InputControlProps> = ({
  control,
  name,
  ...otherProps
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...otherProps} />
        )}
        name={name}
      />
    </Container>
  );
};
