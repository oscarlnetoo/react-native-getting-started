import React from 'react';
import { ScrollView } from 'react-native';
import { Input } from '../../components/Form/Input';
import {
  Container,
  Content,
  ForgotPasswordButton,
  ForgotPasswordTitle,
  Logo,
  Title,
} from './styles';
import { Button } from '../../components/Form/Button';
import logo from '../../assets/logo.png';

export const SignIn: React.FunctionComponent = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Logo source={logo} />
          <Title>Please login</Title>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button title="Sign in" />
          <ForgotPasswordButton>
            <ForgotPasswordTitle>Forgot my password</ForgotPasswordTitle>
          </ForgotPasswordButton>
        </Content>
      </Container>
    </ScrollView>
  );
};
