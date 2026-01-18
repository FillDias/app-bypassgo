import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setViewMode, filterByCategory, searchProducts, fetchMotocrossBikes  } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import Header from '../../components/organisms/Header';
import SearchBar from '../../components/molecules/SearchBar';
import ProductCard from '../../components/organisms/ProductCard';
import AppText from '../../components/atoms/AppText';
import { fetchAllMakes } from '../../redux/slices/productsSlice';



const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    motorcycles = [],
    equipment = [],
    filteredItems = [],
    selectedCategory = 'Todos',
    viewMode = 'motorcycles',
    loading = false,
    error = null,
  } = useSelector(state => state.products || {});

  console.log('🏍️ Estado do Redux:', {
    motorcycles,
    loading,
    error,
    filteredItems,
    viewMode,
    totalMotos: motorcycles.length
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 🔍 TESTE: Primeiro vamos descobrir quais categorias existem
    const testCategories = async () => {
      try {
        const { motorcycleService } = require('../../services/motorcycleApi');
        const categories = await motorcycleService.getAllCategories();
        console.log('📂 CATEGORIAS DISPONÍVEIS NA API:', categories);
      } catch (error) {
        console.error('❌ Erro ao buscar categorias:', error);
      }
    };

    testCategories();

    console.log('🚀 Iniciando busca de motos Honda (ID: 100)...');
    dispatch(fetchMotocrossBikes(100)); // 100 = Honda
  }, [dispatch]);

  useEffect(() => {
    console.log('📊 Motorcycles atualizadas:', motorcycles.length, 'motos');
    if (motorcycles.length > 0) {
      console.log('🏍️ Primeira moto:', motorcycles[0]);
    }
  }, [motorcycles]);

  // Determina quais items mostrar
  const displayItems = filteredItems.length > 0
    ? filteredItems
    : (viewMode === 'motorcycles' ? motorcycles : equipment);

  console.log('📺 Items para exibir:', displayItems.length);

  // Categorias dinâmicas baseadas no modo
  const categories = viewMode === 'motorcycles'
    ? ['Todos', 'Competição', 'Enduro', 'Motocross']
    : ['Todos', 'Capacetes', 'Roupas', 'Botas', 'Acessórios'];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text.trim() === '') {
      dispatch(filterByCategory(selectedCategory));
    } else {
      dispatch(searchProducts(text));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    dispatch(filterByCategory(selectedCategory));
  };

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      onAddToCart={() => handleAddToCart(item)}
      variant={viewMode}
      style={styles.productCard}
    />
  );

  const renderHeader = () => (
    <>
      <Header
        title="Pass by Go"
        subtitle={viewMode === 'motorcycles' ? 'Aluguel de Motos' : 'Equipamentos'}
        showCart={true}
        onCartPress={() => navigation.navigate('CartTab')}
      />

      {/* Toggle entre Motos e Equipamentos */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'motorcycles' && styles.toggleButtonActive
          ]}
          onPress={() => dispatch(setViewMode('motorcycles'))}
        >
          <AppText
            variant="body"
            color={viewMode === 'motorcycles' ? '#fff' : '#333'}
            style={styles.toggleText}
          >
            🏍️ Motos
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'equipment' && styles.toggleButtonActive
          ]}
          onPress={() => dispatch(setViewMode('equipment'))}
        >
          <AppText
            variant="body"
            color={viewMode === 'equipment' ? '#fff' : '#333'}
            style={styles.toggleText}
          >
            🎽 Equipamentos
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Barra de Busca */}
      <SearchBar
        value={searchTerm}
        onChangeText={handleSearch}
        onClear={handleClearSearch}
        placeholder={`Buscar ${viewMode === 'motorcycles' ? 'motos' : 'equipamentos'}...`}
        style={styles.searchBar}
      />

      {/* Categorias */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        style={styles.categoriesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.categoryButtonActive
            ]}
            onPress={() => {
              dispatch(filterByCategory(item));
              setSearchTerm('');
            }}
          >
            <AppText
              variant="bodySmall"
              color={selectedCategory === item ? '#fff' : '#333'}
            >
              {item}
            </AppText>
          </TouchableOpacity>
        )}
      />

      {/* Informações */}
      <View style={styles.infoContainer}>
        {loading ? (
          <AppText variant="h4" style={styles.infoTitle}>
            ⏳ Carregando motos...
          </AppText>
        ) : error ? (
          <>
            <AppText variant="h4" style={styles.infoTitle} color="#dc3545">
              ❌ Erro ao carregar
            </AppText>
            <AppText variant="bodySmall" color="#666">
              {error}
            </AppText>
          </>
        ) : (
          <>
            <AppText variant="h4" style={styles.infoTitle}>
              {displayItems.length} {viewMode === 'motorcycles' ? 'motos' : 'itens'} disponíveis
            </AppText>
            <AppText variant="bodySmall" color="#666">
              Alugue por dia • Sem taxas ocultas
            </AppText>
          </>
        )}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayItems}
        renderItem={renderProduct}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <AppText variant="h3" style={styles.emptyText}>
                {error ? '😔 Erro ao carregar motos' : '🏍️ Nenhuma moto encontrada'}
              </AppText>
              <AppText variant="body" color="#666" style={styles.emptySubtext}>
                {error ? 'Tente novamente mais tarde' : 'Tente ajustar os filtros'}
              </AppText>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#1a1a1a',
  },
  toggleText: {
    fontWeight: '600',
  },
  searchBar: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  categoriesContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  infoContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  infoTitle: {
    marginBottom: 4,
  },
  productCard: {
    marginHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
  },
});

export default HomeScreen;