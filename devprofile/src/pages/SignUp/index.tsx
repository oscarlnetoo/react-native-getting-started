import React from 'react';
import { ScrollView } from 'react-native';
import { Input } from '../../components/Form/Input';
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

export const SignUp: React.FunctionComponent = () => {
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
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Button title="Create account" />
          </Content>
        </Container>
      </ScrollView>
      <BackToSignInButton>
        <Icon name="arrow-left" />
        <BackToSignInTitle>Back to login</BackToSignInTitle>
      </BackToSignInButton>
    </>
  );
};
