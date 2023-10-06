import React from 'react';
import { Text, StyleSheet } from 'react-native';
import tw from '../../tailwind';

interface Props {
    children: string;
}

const Subtitle: React.FC<Props> = ({ children }) => {
    return (
        <Text style={tw.style('text-2xl font-semibold text-black')}>{children}</Text>
    );
};


export default Subtitle;
