import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import LoginForm from '../../components/organisms/LoginForm';
import AppText from '../../components/atoms/AppText';



const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    // Simulação de login (em produção seria uma chamada API)
    setTimeout(() => {
      const userData = {
        id: '1',
        name: 'Usuário Demo',
        email: email,
        phone: '(27) 99999-9999',
        avatar: 'https://via.placeholder.com/150',
      };

      dispatch(login(userData));
      setLoading(false);

      // Navegação será automática via AppNavigator quando isAuthenticated = true
    }, 1500);
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text variant="h1" color="#fff">🏍️</Text>
          </View>
          <Text variant="h1" style={styles.appName}>
            Pass by Go
          </Text>
          <Text variant="body" color="#666" style={styles.tagline}>
            Aluguel de Motos para Trilha
          </Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm
            onLogin={handleLogin}
            onNavigateToRegister={handleNavigateToRegister}
            loading={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text variant="caption" color="#999" align="center">
            Ao continuar, você concorda com nossos{'\n'}
            Termos de Uso e Política de Privacidade
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    marginBottom: 8,
  },
  tagline: {
    marginBottom: 8,
  },
  formContainer: {
    flex: 1,
  },
  footer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default LoginScreen;