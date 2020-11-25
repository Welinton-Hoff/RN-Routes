import React from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import styles from './styles';

export default function Home({ navigation }) {

  function navigateToMap() {
    navigation.navigate("Maps");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.Button} onPress={navigateToMap} >
        <Text style={styles.TextButton}>
          prosseguir
        </Text>
      </TouchableOpacity>
    </View>
  );
}