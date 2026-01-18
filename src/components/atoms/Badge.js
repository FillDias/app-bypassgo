import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ count, variant = 'primary', size = 'medium' }) => {
  if (!count || count === 0) return null;

  return (
    <View style={[
      styles.badge,
      styles[variant],
      styles[size],
    ]}>
      <Text style={[styles.text, styles[`${size}Text`]]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  primary: {
    backgroundColor: '#ff6b6b',
  },
  success: {
    backgroundColor: '#28a745',
  },
  warning: {
    backgroundColor: '#ffa500',
  },
  small: {
    minWidth: 16,
    height: 16,
  },
  medium: {
    minWidth: 20,
    height: 20,
  },
  large: {
    minWidth: 24,
    height: 24,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
});

export default Badge;