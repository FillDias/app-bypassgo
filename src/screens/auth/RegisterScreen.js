import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import AppText from '../../components/atoms/AppText';


const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validate()) {
      setLoading(true);

      // Simulação de registro (em produção seria uma chamada API)
      setTimeout(() => {
        const userData = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          avatar: 'https://via.placeholder.com/150',
        };

        dispatch(register(userData));
        setLoading(false);

        // Navegação será automática via AppNavigator quando isAuthenticated = true
      }, 1500);
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text variant="h3">←</Text>
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text variant="h2" style={styles.title}>
              Criar Conta
            </Text>
            <Text variant="body" color="#666" style={styles.subtitle}>
              Preencha seus dados para começar
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome Completo"
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
            placeholder="João Silva"
            error={errors.name}
            icon={<Text style={styles.inputIcon}>👤</Text>}
          />

          <Input
            label="E-mail"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="seu@email.com"
            keyboardType="email-address"
            error={errors.email}
            icon={<Text style={styles.inputIcon}>📧</Text>}
          />

          <Input
            label="Telefone"
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            error={errors.phone}
            icon={<Text style={styles.inputIcon}>📱</Text>}
          />

          <Input
            label="Senha"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
            icon={<Text style={styles.inputIcon}>🔒</Text>}
          />

          <Input
            label="Confirmar Senha"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            placeholder="••••••••"
            secureTextEntry
            error={errors.confirmPassword}
            icon={<Text style={styles.inputIcon}>🔒</Text>}
          />

          <Button
            title="Criar Conta"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />
        </View>

        <View style={styles.footer}>
          <Text variant="body" color="#666" align="center">
            Já tem uma conta?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text variant="body" color="#1a1a1a" style={styles.loginLink}>
              Entrar
            </Text>
          </TouchableOpacity>
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
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  headerContent: {
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  form: {
    flex: 1,
  },
  inputIcon: {
    fontSize: 20,
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  loginLink: {
    fontWeight: 'bold',
  },
});

export default RegisterScreen;