import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setViewMode, filterByCategory, searchProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import Header from '../../components/organisms/Header';
import SearchBar from '../../components/molecules/SearchBar';
import ProductCard from '../../components/organisms/ProductCard';
import AppText from '../../components/atoms/AppText';



const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    motorcycles,
    equipment,
    filteredItems,
    selectedCategory,
    viewMode
  } = useSelector(state => state.products);

  const [searchTerm, setSearchTerm] = useState('');

  // Determina quais items mostrar
  const displayItems = filteredItems.length > 0
    ? filteredItems
    : (viewMode === 'motorcycles' ? motorcycles : equipment);

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
          <Text
            variant="body"
            color={viewMode === 'motorcycles' ? '#fff' : '#333'}
            style={styles.toggleText}
          >
            🏍️ Motos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'equipment' && styles.toggleButtonActive
          ]}
          onPress={() => dispatch(setViewMode('equipment'))}
        >
          <Text
            variant="body"
            color={viewMode === 'equipment' ? '#fff' : '#333'}
            style={styles.toggleText}
          >
            🎽 Equipamentos
          </Text>
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
            <Text
              variant="bodySmall"
              color={selectedCategory === item ? '#fff' : '#333'}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Informações */}
      <View style={styles.infoContainer}>
        <Text variant="h4" style={styles.infoTitle}>
          {displayItems.length} {viewMode === 'motorcycles' ? 'motos' : 'itens'} disponíveis
        </Text>
        <Text variant="bodySmall" color="#666">
          Alugue por dia • Sem taxas ocultas
        </Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayItems}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
});

export default HomeScreen;