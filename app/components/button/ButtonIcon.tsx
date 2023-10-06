import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '../../tailwind';

interface ButtonIconProps {
    onPress: () => void;
    title: string;
    leftIconName?: keyof typeof Ionicons.glyphMap;
    rightIconName?: keyof typeof Ionicons.glyphMap;
    variant?: "primary" | "secondary" | "white";
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
    onPress,
    title,
    leftIconName,
    rightIconName,
    variant
}) => {
    return (
        <TouchableOpacity style={tw.style(" rounded-md p-2 py-4 flex items-center justify-between flex-row", 
        variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-secondary" : "bg-white border"
        )} onPress={onPress}>
            {leftIconName && (
                <View style={tw.style("")}>
                    <Ionicons name={leftIconName} size={24} color={
                        variant === "primary" ? "white" : variant === "secondary" ? "white" : "black"
                    } />
                </View>
            )}
            <Text style={tw.style(
                "text-black",
                variant === "primary" ? "text-white" : variant === "secondary" ? "text-white" : "text-black"
            )}>{title}</Text>
            {rightIconName && (
                <View style={tw.style("")}>
                    <Ionicons name={rightIconName} size={24} color={
                        variant === "primary" ? "white" : variant === "secondary" ? "white" : "black"
                    } />
                </View>
            )}
        </TouchableOpacity>
    );
};


export default ButtonIcon;
