import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import AppText from '../../components/atoms/AppText';
import Button from '../../components/atoms/Button';
import PriceTag from '../../components/molecules/PriceTag';
import RatingStars from '../../components/molecules/RatingStars';
import DateRangePicker from '../../components/molecules/DateRangePicker';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isMotorcycle = product.minDays !== undefined;

  const calculateTotal = () => {
    if (!startDate || !endDate) return product.pricePerDay;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return product.pricePerDay * days;
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };

    dispatch(addToCart(cartItem));
    alert(`${product.name} adicionado ao carrinho!`);
    navigation.goBack();
  };

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoContent}>
        <Text variant="caption" color="#666">{label}</Text>
        <Text variant="body" style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text variant="caption" color="#666" style={styles.brand}>
                {product.brand}
              </Text>
              <Text variant="h2" style={styles.name}>
                {product.name}
              </Text>
            </View>

            {product.rating && (
              <View style={styles.ratingContainer}>
                <RatingStars rating={product.rating} size={16} />
              </View>
            )}
          </View>

          {/* Preço */}
          <View style={styles.priceContainer}>
            <PriceTag
              price={product.pricePerDay}
              period="dia"
              size="large"
            />
            {product.available !== false && (
              <View style={styles.availableBadge}>
                <Text variant="bodySmall" color="#28a745">
                  ✓ Disponível
                </Text>
              </View>
            )}
          </View>

          {/* Informações */}
          <View style={styles.infoSection}>
            <Text variant="h3" style={styles.sectionTitle}>
              Informações
            </Text>

            <InfoRow
              icon="📦"
              label="Categoria"
              value={product.category}
            />

            {isMotorcycle && (
              <>
                <InfoRow
                  icon="📅"
                  label="Período mínimo"
                  value={`${product.minDays} dia(s)`}
                />
                <InfoRow
                  icon="💰"
                  label="Caução"
                  value={`R$ ${product.deposit?.toLocaleString('pt-BR')}`}
                />
              </>
            )}

            {product.stock !== undefined && (
              <InfoRow
                icon="📊"
                label="Estoque"
                value={`${product.stock} unidade(s)`}
              />
            )}
          </View>

          {/* Descrição */}
          <View style={styles.descriptionSection}>
            <Text variant="h3" style={styles.sectionTitle}>
              Descrição
            </Text>
            <Text variant="body" color="#666" style={styles.description}>
              {product.description}
            </Text>
          </View>

          {/* Características */}
          <View style={styles.featuresSection}>
            <Text variant="h3" style={styles.sectionTitle}>
              Características
            </Text>
            {isMotorcycle ? (
              <>
                <Text style={styles.feature}>✓ Motor de alta performance</Text>
                <Text style={styles.feature}>✓ Suspensão ajustável</Text>
                <Text style={styles.feature}>✓ Freios de última geração</Text>
                <Text style={styles.feature}>✓ Revisão completa antes da locação</Text>
                <Text style={styles.feature}>✓ Seguro incluso</Text>
              </>
            ) : (
              <>
                <Text style={styles.feature}>✓ Material de alta qualidade</Text>
                <Text style={styles.feature}>✓ Higienizado após cada uso</Text>
                <Text style={styles.feature}>✓ Tamanhos variados disponíveis</Text>
                <Text style={styles.feature}>✓ Certificado de segurança</Text>
              </>
            )}
          </View>

          {/* Seletor de Datas (apenas para motos) */}
          {isMotorcycle && (
            <View style={styles.dateSection}>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </View>
          )}

          {/* Resumo do Valor */}
          {startDate && endDate && (
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text variant="body" color="#666">Subtotal:</Text>
                <Text variant="h4">R$ {calculateTotal().toLocaleString('pt-BR')}</Text>
              </View>
              {product.deposit && (
                <View style={styles.summaryRow}>
                  <Text variant="bodySmall" color="#666">+ Caução (devolvível):</Text>
                  <Text variant="bodySmall" color="#666">
                    R$ {product.deposit.toLocaleString('pt-BR')}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Botão Fixo */}
      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text variant="caption" color="#666">Total</Text>
          <PriceTag
            price={calculateTotal()}
            period={startDate && endDate ? 'total' : 'dia'}
            size="medium"
          />
        </View>

        <Button
          title={product.available !== false ? "Adicionar ao Carrinho" : "Indisponível"}
          onPress={handleAddToCart}
          disabled={product.available === false || (isMotorcycle && (!startDate || !endDate))}
          style={styles.addButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  brand: {
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    marginBottom: 4,
  },
  ratingContainer: {
    marginLeft: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  availableBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 32,
  },
  infoContent: {
    flex: 1,
  },
  infoValue: {
    marginTop: 2,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 24,
  },
  feature: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
  dateSection: {
    marginBottom: 24,
  },
  summarySection: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerPrice: {
    marginRight: 16,
  },
  addButton: {
    flex: 1,
  },
});

export default ProductDetailScreen;