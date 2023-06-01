import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export const CardProfile = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 20, gap: 5, display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/Avatar.png')} />
                    <Text style={styles.profile}>Azis Faisal Muharam{"\n"}azissfm@gmail.com</Text>
                    <Ionicons name='chevron-forward-outline' size={25} color={'white'} style={{ left: 75, marginTop: 8 }} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#37809e",
        flexDirection: "column",
        margin: 5,
        width: '90%',
        height: 100,
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