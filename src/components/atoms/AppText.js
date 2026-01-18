import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const AppText = ({
  children,
  variant = 'body',
  color = '#333',
  align = 'left',
  style,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default AppText;