import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import AppText from '../atoms/AppText';

const LoginForm = ({ onLogin, onNavigateToRegister, loading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onLogin({ email, password });
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h2" align="center" style={styles.title}>
        Bem-vindo de volta!
      </Text>

      <Text variant="body" color="#666" align="center" style={styles.subtitle}>
        Entre para alugar motos incríveis
      </Text>

      <View style={styles.form}>
        <Input
          label="E-mail"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          placeholder="seu@email.com"
          keyboardType="email-address"
          error={errors.email}
          icon={<Text style={styles.inputIcon}>📧</Text>}
        />

        <Input
          label="Senha"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          placeholder="••••••••"
          secureTextEntry
          error={errors.password}
          icon={<Text style={styles.inputIcon}>🔒</Text>}
        />

        <Button
          title="Entrar"
          onPress={handleSubmit}
          loading={loading}
          style={styles.loginButton}
        />

        <Button
          title="Esqueci minha senha"
          onPress={() => alert('Funcionalidade em desenvolvimento')}
          variant="outline"
          style={styles.forgotButton}
        />
      </View>

      <View style={styles.footer}>
        <Text variant="body" color="#666">
          Não tem uma conta?{' '}
        </Text>
        <Button
          title="Cadastre-se"
          onPress={onNavigateToRegister}
          variant="outline"
          style={styles.registerButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  inputIcon: {
    fontSize: 20,
  },
  loginButton: {
    marginTop: 8,
  },
  forgotButton: {
    marginTop: 12,
  },
  footer: {
    alignItems: 'center',
  },
  registerButton: {
    marginTop: 8,
  },
});

export default LoginForm;