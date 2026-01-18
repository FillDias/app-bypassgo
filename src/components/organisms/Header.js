import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import AppText from '../atoms/AppText';
import Badge from '../atoms/Badge';

const Header = ({
  title,
  subtitle,
  showCart = true,
  onCartPress,
  onBackPress,
  showBack = false,
  style,
}) => {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      <View style={styles.content}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
          >
            <AppText variant="h3" color="#fff">←</AppText>
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <AppText variant="h2" color="#fff" style={styles.title}>
            {title}
          </AppText>
          {subtitle && (
            <AppText variant="bodySmall" color="#aaa" style={styles.subtitle}>
              {subtitle}
            </AppText>
          )}
        </View>

        {showCart && (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={onCartPress}
          >
            <AppText style={styles.cartIcon}>🛒</AppText>
            {cartCount > 0 && (
              <View style={styles.badgeContainer}>
                <Badge count={cartCount} size="small" />
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 4,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default Header;