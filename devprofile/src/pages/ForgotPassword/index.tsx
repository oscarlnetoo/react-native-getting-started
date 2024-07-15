import React from 'react';
import { Alert, ScrollView } from 'react-native';
import {
  BackToSignInButton,
  BackToSignInTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
} from './styles';
import { Button } from '../../components/Form/Button';
import logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { InputControl } from '../../components/Form/InputControl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '../../services/api';

interface ScreenNavigationProps {
  goBack: () => void;
  navigate: (screen: string) => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  email: yup.string().email('Invalid email.').required('Email required.'),
});

export const ForgotPassword: React.FunctionComponent = () => {
  const { goBack, navigate } = useNavigation<ScreenNavigationProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForgotPassword = async (form: IFormInputs) => {
    const data = {
      email: form.email,
    };

    try {
      await api.post('password/forgot', data);
      Alert.alert(
        'Email sent ',
        'You will receive an email with instructions to redefine your password.',
      );
      navigate('ResetPassword');
    } catch (error) {
      Alert.alert(
        'Error sending the email',
        'An error happened while sending the email. Try again.',
      );
    }
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo} />
            <Title>Forgot my password</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <Button title="Send" onPress={handleSubmit(handleForgotPassword)} />
          </Content>
        </Container>
      </ScrollView>
      <BackToSignInButton onPress={() => goBack()}>
        <Icon name="arrow-left" />
        <BackToSignInTitle>Back to login</BackToSignInTitle>
      </BackToSignInButton>
    </>
  );
};
