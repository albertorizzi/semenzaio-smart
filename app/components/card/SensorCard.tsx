import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '../../tailwind';

type SensorCardProps = {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    value: string;
};

const SensorCard: React.FC<SensorCardProps> = ({ iconName, title, value }) => {
    return (
        <View style={tw.style('flex flex-row items-center w-max border rounded p-4')}>
            <Ionicons name={iconName} size={60} color="black" />
            <View>
                <Text style={tw.style('text-black')}>{title}</Text>
                <Text style={tw.style('text-2xl text-black font-bold')}>{value}</Text>
            </View>
        </View>
    );
};

export default SensorCard;
