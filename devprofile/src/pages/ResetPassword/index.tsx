import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '../../services/api';
import { Button } from '../../components/Form/Button';
import { InputControl } from '../../components/Form/InputControl';
import {
  BackToSignInButton,
  BackToSignInTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
} from './styles';
import logo from '../../assets/logo.png';

interface ScreenNavigationProp {
  goBack: () => void;
  navigate(screen: string): void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  token: yup.string().uuid('Invalid code.').required('Code required.'),
  password: yup.string().required('Password required.'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation incorrect.'),
});

export const ResetPassword: React.FunctionComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { goBack, navigate } = useNavigation<ScreenNavigationProp>();

  const handleResetPassword = async (form: IFormInputs) => {
    const data = {
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };

    try {
      await api.post('password/reset', data);
      Alert.alert(
        'Password reset',
        'The password has been redefined successfully. Login to access the application.',
      );
      navigate('SignIn');
    } catch (error) {
      Alert.alert(
        'Reset error',
        'An error happened while trying to reset your password. Try again.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo} />
            <Title>Reset your password</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="token"
              placeholder="Code"
              error={errors.token && errors.token.message}
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <InputControl
              control={control}
              name="password_confirmation"
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry
              error={
                errors.password_confirmation &&
                errors.password_confirmation.message
              }
            />

            <Button title="Send" onPress={handleSubmit(handleResetPassword)} />
          </Content>
        </Container>
      </ScrollView>
      <BackToSignInButton onPress={() => goBack()}>
        <Icon name="arrow-left" />
        <BackToSignInTitle>Back to login</BackToSignInTitle>
      </BackToSignInButton>
    </KeyboardAvoidingView>
  );
};
