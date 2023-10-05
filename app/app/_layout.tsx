import { Slot, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
       
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#537b2f',
                
            }}>
               
 <Slot />
                
               
            </SafeAreaView>
      

            
  
    );
}
