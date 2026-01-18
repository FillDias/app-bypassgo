import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { filterByCategory, searchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, filteredItems, selectedCategory } = useSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  const displayItems = filteredItems.length > 0 ? filteredItems : items;

  const categories = ['Todos', 'Competição', 'Enduro', 'Motocross'];

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

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          R$ {item.price.toLocaleString('pt-BR')}
        </Text>
        <View style={styles.stockContainer}>
          {item.inStock ? (
            <Text style={styles.inStock}>Em estoque</Text>
          ) : (
            <Text style={styles.outOfStock}>Indisponível</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.addButton, !item.inStock && styles.addButtonDisabled]}
          onPress={() => handleAddToCart(item)}
          disabled={!item.inStock}
        >
          <Text style={styles.addButtonText}>
            {item.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>BypassGo Motos</Text>
        <Text style={styles.headerSubtitle}>Motos de Trilha Premium</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar motos..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={handleSearch}
      />

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
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={displayItems}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
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
  header: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
  searchInput: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoriesContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
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
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  productList: {
    padding: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 15,
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 10,
  },
  stockContainer: {
    marginTop: 10,
  },
  inStock: {
    color: '#28a745',
    fontSize: 12,
    fontWeight: '600',
  },
  outOfStock: {
    color: '#dc3545',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;