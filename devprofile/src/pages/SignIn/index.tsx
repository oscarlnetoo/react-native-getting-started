import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { Input } from '../../components/Form/Input';
import {
  Container,
  Content,
  CreateAccountButton,
  CreateAccountTitle,
  ForgotPasswordButton,
  ForgotPasswordTitle,
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
import { useAuth } from '../../context/AuthContext';

interface ScreenNavigationProps {
  navigate: (screen: string) => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  email: yup.string().email('Email inválido.').required('Informe o email.'),
  password: yup.string().required('Informe a senha.'),
});

export const SignIn: React.FunctionComponent = () => {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);

  const { navigate } = useNavigation<ScreenNavigationProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleSignIn = (form: IFormInputs) => {
    const data = {
      email: form.email,
      password: form.password,
    };

    setLoading(true);
    auth.signIn(data);
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
            <Title>Please login</Title>
            <InputControl
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email && errors.email.message}
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <Button
              title="Sign in"
              disabled={loading}
              onPress={handleSubmit(handleSignIn)}
            />
            <ForgotPasswordButton>
              <ForgotPasswordTitle>Forgot my password</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccountButton onPress={() => navigate('SignUp')}>
        <Icon name="log-in" />
        <CreateAccountTitle>Create an account</CreateAccountTitle>
      </CreateAccountButton>
    </>
  );
};
