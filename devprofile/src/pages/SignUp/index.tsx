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
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo.'),
  email: yup.string().email('Email inválido.').required('Informe o email.'),
  password: yup.string().required('Informe a senha.'),
});

export const SignUp: React.FunctionComponent = () => {
  const { goBack } = useNavigation<ScreenNavigationProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleSignUp = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    try {
      await api.post('users', data);
      Alert.alert(
        'Cadastro realizado',
        'Você já pode fazer login na aplicação.',
      );
    } catch (error) {
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer o cadastro. Tente novamente.',
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
            <Title>Create your account</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome completo"
              error={errors.name && errors.name.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <Button
              title="Create account"
              onPress={handleSubmit(handleSignUp)}
            />
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
