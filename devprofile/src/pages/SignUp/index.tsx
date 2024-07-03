import React from 'react';
import { ScrollView } from 'react-native';
import { Input } from '../../components/Form/Input';
import { Container, Content, Title } from './styles';
import { Button } from '../../components/Form/Button';

export const SignUp: React.FunctionComponent = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Create your account</Title>
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button title="Sign up" />
        </Content>
      </Container>
    </ScrollView>
  );
};
