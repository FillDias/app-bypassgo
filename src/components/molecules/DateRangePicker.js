import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import AppText from '../atoms/AppText';
import Button from '../atoms/Button';

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  style,
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Selecionar';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <View style={[styles.container, style]}>
      <Text variant="h4" style={styles.title}>Período do Aluguel</Text>

      <View style={styles.datesContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Text variant="caption" color="#666">Retirada</Text>
          <Text variant="body" style={styles.dateText}>
            📅 {formatDate(startDate)}
          </Text>
        </TouchableOpacity>

        <View style={styles.arrow}>
          <Text variant="h3">→</Text>
        </View>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Text variant="caption" color="#666">Devolução</Text>
          <Text variant="body" style={styles.dateText}>
            📅 {formatDate(endDate)}
          </Text>
        </TouchableOpacity>
      </View>

      {startDate && endDate && (
        <View style={styles.summary}>
          <Text variant="bodySmall" color="#666">
            Total: <Text variant="bold">{calculateDays()} dia(s)</Text>
          </Text>
        </View>
      )}

      {/* Modal simples - em produção usaria DateTimePicker */}
      <Modal
        visible={showStartPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStartPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text variant="h3" style={styles.modalTitle}>
              Selecionar Data de Retirada
            </Text>
            <Text variant="body" color="#666" style={styles.modalInfo}>
              (Em produção, aqui teria um calendário interativo)
            </Text>
            <Button
              title="OK"
              onPress={() => {
                onStartDateChange(new Date());
                setShowStartPicker(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showEndPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEndPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text variant="h3" style={styles.modalTitle}>
              Selecionar Data de Devolução
            </Text>
            <Text variant="body" color="#666" style={styles.modalInfo}>
              (Em produção, aqui teria um calendário interativo)
            </Text>
            <Button
              title="OK"
              onPress={() => {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 3);
                onEndDateChange(futureDate);
                setShowEndPicker(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    marginBottom: 12,
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    marginTop: 4,
  },
  arrow: {
    marginHorizontal: 8,
  },
  summary: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: {
    marginBottom: 8,
  },
  modalInfo: {
    marginBottom: 20,
  },
});

export default DateRangePicker;