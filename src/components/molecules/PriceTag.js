import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';

const PriceTag = ({
  price,
  period = 'dia',
  oldPrice,
  size = 'medium',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {oldPrice && (
        <AppText
          variant="bodySmall"
          color="#999"
          style={styles.oldPrice}
        >
          R$ {oldPrice.toLocaleString('pt-BR')}
        </AppText>
      )}

      <View style={styles.priceRow}>
        <AppText
          variant={size === 'large' ? 'h2' : size === 'medium' ? 'h3' : 'h4'}
          color="#1a1a1a"
          style={styles.price}
        >
          R$ {price.toLocaleString('pt-BR')}
        </AppText>

        <AppText
          variant="bodySmall"
          color="#666"
          style={styles.period}
        >
          /{period}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
  },
  period: {
    marginLeft: 4,
    marginBottom: 2,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
});

export default PriceTag;