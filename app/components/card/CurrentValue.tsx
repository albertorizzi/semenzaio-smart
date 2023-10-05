import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Subtitle from '../text/Subtitle';
import useClient from '../../network/client/useClient';
import { Crop } from '../../shared/types';

const CurrentValue = () => {

    const client = useClient()

    const [currentCrop, setCurrentCrop] = useState<Crop | null>(null)

    useEffect(() => {
        client.config.getCurrentCrop().then((c)=>{
            console.log(c.data)
        })
    }, [])


    return (
        <View style={styles.container}>
            <Subtitle>Valori attuali</Subtitle>
            <Text
            style={{
                color: '#000',
            }}
            >{currentCrop?.humidity}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#fff",
  
      },
});


export default CurrentValue;
