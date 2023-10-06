import { Slot, Stack } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
       
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#537b2f',
                
            }}>
   
                <Stack screenOptions={{
                    headerStyle: {
                        backgroundColor: '#537b2f',
                    },
                    headerTintColor: '#fff',
                }}  />
            </SafeAreaView>
      

            
  
    );
}
