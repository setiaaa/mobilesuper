import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export const CardMenu = () => {
    const navigation = useNavigation()
    return (
        <View>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/Avatar.png')} />
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ justifyContent: 'center', marginLeft: 5 }}>TEST</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#37809e",
        margin: 5,
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    profile: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        left: 16
    }
})