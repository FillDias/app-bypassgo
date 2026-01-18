import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../atoms/AppText';
import Button from '../atoms/Button';
import PriceTag from '../molecules/PriceTag';
import RatingStars from '../molecules/RatingStars';
import Badge from '../atoms/Badge';

const ProductCard = ({
  product,
  onPress,
  onAddToCart,
  variant = 'rental', // 'rental' ou 'equipment'
  style,
}) => {
  const {
    name,
    brand,
    image,
    pricePerDay,
    rating,
    category,
    available,
    stock,
  } = product;

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />

        {!available && (
          <View style={styles.unavailableBadge}>
            <AppText variant="caption" color="#fff">Indisponível</AppText>
          </View>
        )}

        {variant === 'equipment' && stock !== undefined && (
          <View style={styles.stockBadge}>
            <AppText variant="caption" color="#fff">
              {stock} disponíveis
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="caption" color="#666" style={styles.brand}>
            {brand || category}
          </AppText>

          {rating && (
            <RatingStars
              rating={rating}
              size={14}
              showNumber={false}
            />
          )}
        </View>

        <AppText variant="h4" style={styles.name} numberOfLines={2}>
          {name}
        </AppText>

        <View style={styles.footer}>
          <PriceTag price={pricePerDay} period="dia" size="small" />

          <Button
            title={available ? "Alugar" : "Indisponível"}
            onPress={onAddToCart}
            variant={available ? "primary" : "outline"}
            disabled={!available}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  unavailableBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  stockBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brand: {
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  name: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default ProductCard;