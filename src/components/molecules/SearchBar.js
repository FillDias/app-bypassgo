import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Buscar...',
  onClear,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>🔍</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 20,
    color: '#999',
  },
});

export default SearchBar;