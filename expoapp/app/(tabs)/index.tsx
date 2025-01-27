import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  // Explicitly type intervalRef for React Native (number | null)
  const intervalRef = useRef<number | null>(null);

  const toggleTimer = () => {
    if (isRunning) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Reset the reference
      }
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000) as unknown as number; // Ensure correct typing
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset the reference
    }
    setIsRunning(false);
    setTime(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time: {time} seconds</Text>
      <View style={styles.buttonContainer}>
        <Button title={isRunning ? 'Stop' : 'Start'} onPress={toggleTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  timer: {
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
