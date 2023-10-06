import React from 'react';
import { Text, StyleSheet } from 'react-native';
import tw from '../../tailwind';

interface Props {
    children: string;
}

const Title: React.FC<Props> = ({ children }) => {
    return (
        <Text style={tw.style('text-4xl font-bold text-white py-6')}>{children}</Text>
    );
};

export default Title;
