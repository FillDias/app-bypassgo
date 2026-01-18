import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMakes } from '../../redux/slices/productsSlice';
import AppText from '../../components/atoms/AppText';
import Header from '../../components/organisms/Header';

const SelectMakeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { makes, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchAllMakes());
  }, []);

  const handleSelectMake = (make) => {
    navigation.navigate('SelectModel', { make });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1a1a1a" />
        <AppText style={styles.loadingText}>Carregando marcas...</AppText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <AppText color="#ff6b6b">Erro: {error}</AppText>
      </View>
    );
  }

  const renderMake = ({ item }) => (
    <TouchableOpacity
      style={styles.makeCard}
      onPress={() => handleSelectMake(item.name)}
    >
      <AppText variant="h3">{item.name}</AppText>
      <AppText variant="bodySmall" color="#666">
        Ver modelos →
      </AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Escolha a Marca" showCart={false} />

      <FlatList
        data={makes}
        renderItem={renderMake}
        keyExtractor={(item) => item.id?.toString() || item.name}
        contentContainerStyle={styles.listContent}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  listContent: {
    padding: 16,
  },
  makeCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
});

export default SelectMakeScreen;