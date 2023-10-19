import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import populateDb from '../services/db/populateDb';
import { useQuery } from '../models';
import { User } from '../models/User';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const users = useQuery(User);

  if (!users.length) {
    return (
      <View style={styles.populateDbView}>
        <Button
          mode="contained"
          loading={loading}
          onPress={() => {
            setLoading(true);
            populateDb().finally(() => {
              setLoading(false);
            });
          }}>
          Populate DB
        </Button>
      </View>
    );
  }

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  populateDbView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
  },
});
