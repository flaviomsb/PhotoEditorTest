import React from 'react';
import { Button } from 'react-native-paper';
import populateDb from '../services/db/populateDb';

export default function PopulateDbButton() {
  const [loading, setLoading] = React.useState(false);

  return (
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
  );
}
