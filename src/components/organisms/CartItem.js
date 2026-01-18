import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../atoms/AppText';
import Button from '../atoms/Button';
import PriceTag from '../molecules/PriceTag';

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  showDates = false,
  style,
}) => {
  const {
    id,
    name,
    brand,
    image,
    pricePerDay,
    quantity,
    startDate,
    endDate,
  } = item;

  const calculateDays = () => {
    if (!startDate || !endDate) return quantity || 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const totalPrice = pricePerDay * days * (quantity || 1);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.info}>
            <AppText variant="caption" color="#666">{brand}</AppText>
            <AppText variant="h4" style={styles.name} numberOfLines={1}>
              {name}
            </AppText>
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(id)}
          >
            <AppText variant="h4" color="#ff6b6b">✕</AppText>
          </TouchableOpacity>
        </View>

        {showDates && startDate && endDate && (
          <View style={styles.datesContainer}>
            <AppText variant="bodySmall" color="#666">
              📅 {formatDate(startDate)} → {formatDate(endDate)} ({days} dia{days > 1 ? 's' : ''})
            </AppText>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(id, (quantity || 1) - 1)}
            >
              <AppText variant="h4">-</AppText>
            </TouchableOpacity>

            <AppText variant="body" style={styles.quantity}>
              {quantity || 1}
            </AppText>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(id, (quantity || 1) + 1)}
            >
              <AppText variant="h4">+</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <PriceTag
              price={totalPrice}
              period={days > 1 ? `${days} dias` : 'total'}
              size="small"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  datesContainer: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f5f5f5',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quantity: {
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
});

export default CartItem;