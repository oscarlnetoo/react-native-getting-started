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
  Container,
  Content,
  GoBackButton,
  Header,
  HeaderTitle,
  Icon,
  Title,
  UserAvatar,
} from './styles';
import { useAuth } from '../../context/AuthContext';
import avatarDefault from '../../assets/avatar02.png';

interface ScreenNavigationProp {
  goBack: () => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  old_password: yup.string().required('Required.'),
  password: yup.string().required('Required.'),
  password_confirmation: yup
    .string()
    .required('Required.')
    .oneOf([yup.ref('password'), null], 'Confirmation incorrect.'),
});

export const UserProfilePassword: React.FunctionComponent = () => {
  const { user, updateUser } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleUpdatePassword = async (form: IFormInputs) => {
    const data = {
      name: user.name,
      email: user.email,
      old_password: form.old_password,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };

    try {
      const response = await api.put('profile', data);
      console.log(response.data);
      updateUser(response.data);
      Alert.alert('Password updated', 'Password updated successfully.');
      goBack();
    } catch (error) {
      //console.log(JSON.stringify(error));
      Alert.alert(
        'Update error',
        'An error occurred while trying to update password. Try again.',
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
          <Header>
            <GoBackButton onPress={goBack}>
              <Icon name="chevron-left" />
            </GoBackButton>
            <HeaderTitle>Your profile</HeaderTitle>
            <UserAvatar
              source={
                user.avatar_url ? { uri: user.avatar_url } : avatarDefault
              }
            />
          </Header>
          <Content>
            <Title>Alterar senha</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="old_password"
              placeholder="Old password"
              error={errors.old_password && errors.old_password.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="password"
              placeholder="New password"
              error={errors.password && errors.password.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="password_confirmation"
              placeholder="Confirm new password"
              error={
                errors.password_confirmation &&
                errors.password_confirmation.message
              }
            />

            <Button
              title="Save"
              onPress={handleSubmit(handleUpdatePassword)}
              disabled={
                !!errors.old_password ||
                !!errors.password ||
                !!errors.password_confirmation
              }
            />
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
