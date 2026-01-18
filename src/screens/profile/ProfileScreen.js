import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import AppText from '../../components/atoms/AppText';
import Button from '../../components/atoms/Button';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const rentals = useSelector(state => state.auth.rentals);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <AppText variant="body">{title}</AppText>
      </View>
      <AppText variant="h4" color="#999">›</AppText>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <AppText variant="h2" style={styles.name}>{user?.name}</AppText>
        <AppText variant="body" color="#666">{user?.email}</AppText>
        <AppText variant="bodySmall" color="#666" style={styles.phone}>
          {user?.phone}
        </AppText>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <AppText variant="h3">{rentals?.length || 0}</AppText>
          <AppText variant="caption" color="#666">Aluguéis</AppText>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <AppText variant="h3">⭐ 4.8</AppText>
          <AppText variant="caption" color="#666">Avaliação</AppText>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <AppText variant="h3">R$ 0</AppText>
          <AppText variant="caption" color="#666">Economia</AppText>
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3" style={styles.sectionTitle}>Minha Conta</AppText>

        <MenuItem
          icon="📋"
          title="Meus Aluguéis"
          onPress={() => alert('Em desenvolvimento')}
        />
        <MenuItem
          icon="❤️"
          title="Favoritos"
          onPress={() => alert('Em desenvolvimento')}
        />
        <MenuItem
          icon="💳"
          title="Pagamentos"
          onPress={() => alert('Em desenvolvimento')}
        />
        <MenuItem
          icon="🎫"
          title="Cupons"
          onPress={() => alert('Em desenvolvimento')}
        />
      </View>

      <View style={styles.section}>
        <AppText variant="h3" style={styles.sectionTitle}>Configurações</AppText>

        <MenuItem
          icon="👤"
          title="Editar Perfil"
          onPress={() => alert('Em desenvolvimento')}
        />
        <MenuItem
          icon="🔔"
          title="Notificações"
          onPress={() => alert('Em desenvolvimento')}
        />
        <MenuItem
          icon="🔒"
          title="Privacidade"
          onPress={() => alert('Em desenvolvimento')}
        />
        <MenuItem
          icon="❓"
          title="Ajuda"
          onPress={() => alert('Em desenvolvimento')}
        />
      </View>

      <View style={styles.section}>
        <Button
          title="Sair da Conta"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>

      <View style={styles.footer}>
        <AppText variant="caption" color="#999" align="center">
          Pass by Go v1.0.0
        </AppText>
        <AppText variant="caption" color="#999" align="center">
          © 2026 Todos os direitos reservados
        </AppText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    marginBottom: 4,
  },
  phone: {
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  logoutButton: {
    borderColor: '#ff6b6b',
  },
  footer: {
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
});

export default ProfileScreen;