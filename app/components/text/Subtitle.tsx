import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
    children: string;
}

const Subtitle: React.FC<Props> = ({ children }) => {
    return (
        <Text style={styles.title}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 8,
        color: '#000',
    },
});

export default Subtitle;
