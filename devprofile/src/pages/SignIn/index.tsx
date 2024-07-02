import React from 'react';
import { ScrollView } from 'react-native';
import { Input } from '../../components/Form/Input';
import { Container, Content, Title } from './styles';
import { Button } from '../../components/Form/Button';

export const SignIn: React.FunctionComponent = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Please login</Title>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button title="Sign in" />
        </Content>
      </Container>
    </ScrollView>
  );
};
