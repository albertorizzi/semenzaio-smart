import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
    children: string;
}

const Title: React.FC<Props> = ({ children }) => {
    return (
        <Text style={styles.title}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        paddingVertical: 16,
        color: '#fff',
    },
});

export default Title;
