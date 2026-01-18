import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../atoms/AppText';

const RatingStars = ({
  rating = 0,
  maxStars = 5,
  onPress,
  size = 20,
  editable = false,
  showNumber = true,
  style,
}) => {
  const handlePress = (index) => {
    if (editable && onPress) {
      onPress(index + 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsContainer}>
        {[...Array(maxStars)].map((_, index) => {
          const StarComponent = editable ? TouchableOpacity : View;
          return (
            <StarComponent
              key={index}
              onPress={() => handlePress(index)}
              disabled={!editable}
            >
              <Text style={{ fontSize: size }}>
                {index < Math.floor(rating) ? '⭐' : '☆'}
              </Text>
            </StarComponent>
          );
        })}
      </View>

      {showNumber && (
        <Text variant="bodySmall" color="#666" style={styles.ratingText}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: 8,
  },
});

export default RatingStars;