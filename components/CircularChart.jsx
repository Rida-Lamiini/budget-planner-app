import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CircularChart({ categoryList }) {
  const widthAndHeight = 150;
  const [series, setSeries] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    calculateTotalCost();
  }, [categoryList]);

  const calculateTotalCost = () => {
    let totalCost = 0;
    const costs = [];
    const colors = [];

    categoryList.forEach(category => {
      const categoryCost = category.CategoryItems.reduce((sum, item) => sum + item.coast, 0);
      totalCost += categoryCost;
      costs.push(categoryCost);
      colors.push(category.color || Colors.GRAY); // Ensure a color is always present
    });

    setTotalCost(totalCost);
    console.log('Coast',costs);
    console.log('Colors',colors);
    setSeries(costs.length > 0 ? costs : [1]);
    setSliceColor(colors.length > 0 ? colors : [Colors.GRAY]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Total Estimate: <Text style={styles.amount}>${totalCost}</Text>
      </Text>
      <View style={styles.chartAndLegendContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={Colors.WHITE}
        />
        <View style={styles.legend}>
          {categoryList.map((category, index) => (
            <View key={index} style={styles.legendItem}>
              <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={category.color || Colors.GRAY} />
              <Text style={styles.legendText}>{category.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    fontFamily: 'outfit',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  amount: {
    fontWeight: 'normal',
    color: Colors.GRAY,
  },
  chartAndLegendContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  legend: {
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.BLACK,
  },
});
