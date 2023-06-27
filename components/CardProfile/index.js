import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';

export const CardProfile = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20, gap: 5, display: 'flex', alignItems: 'center' }}>
                    <Text style={styles.profile}>Jhon Alex{"\n"}demo@example.com</Text>
                    <Image source={require('../../assets/superApp/Avatar.png')} style={{ left: 75 }} />
                    {/* <Ionicons name='chevron-forward-outline' size={25} color={'white'} style={{ left: 75, marginTop: 8 }} /> */}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        width: '90%',
        height: 100,
        borderRadius: 12,
    },
    profile: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        left: 16,
    }
})