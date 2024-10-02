import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

export default function ColorPicker({ selectedColor , setSelectedColor}) {
console.log(selectedColor);
  return (
    <View style={styles.container}>
      {Colors.COLOR_LIST.map((color, index) => (

        <TouchableOpacity 
          key={index} 
          style={[
            styles.colorBox, 
            { backgroundColor: color }, 
            selectedColor === color && styles.selected
          ]}
          onPress={()=> setSelectedColor(color)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20,
  },
  colorBox: {
    height: 30,
    width: 30,
    margin: 5,
    borderRadius: 99,
  },
  selected: {
    borderWidth: 2,
    borderColor: 'black', // or any other color you prefer for the border
  },
});
