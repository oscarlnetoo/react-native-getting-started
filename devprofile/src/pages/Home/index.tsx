import React from 'react';
import {
  Container,
  Header,
  Icon,
  LogoutButton,
  UserAvatar,
  UserAvatarButton,
  UserGreeting,
  UserInfo,
  UserInfoDetail,
  UserList,
  UserListEmpty,
  UserListHeader,
  UserName,
  UserWrapper,
} from './styles';

import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';
import { Alert } from 'react-native';
import { IUser } from '../../model/user';
import { api } from '../../services/api';
import { User } from '../../components/User';
import { useNavigation } from '@react-navigation/native';

interface ScreenNavigationProp {
  navigate: (screen: string, params?: unknown) => void;
}

export const Home: React.FunctionComponent = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  React.useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get('users');
      setUsers(response.data);
    };
    loadUsers();
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to leave the application?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Logout',
          onPress: () => signOut(),
        },
      ],
    );
  };

  const handleUserDetails = (userId: string) => {
    navigate('UserDetails', { userId });
  };

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar
                source={
                  user.avatar_url ? { uri: user.avatar_url } : avatarDefault
                }
              />
            </UserAvatarButton>
            <UserInfoDetail>
              <UserGreeting>Hi,</UserGreeting>
              <UserName>{user.name}</UserName>
            </UserInfoDetail>
          </UserInfo>

          <LogoutButton onPress={handleSignOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <UserList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <User data={item} onPress={() => handleUserDetails(item.id)} />
        )}
        ListHeaderComponent={<UserListHeader>Users</UserListHeader>}
        ListEmptyComponent={
          <UserListEmpty>Ops! There is no users yet.</UserListEmpty>
        }
      />
    </Container>
  );
};
