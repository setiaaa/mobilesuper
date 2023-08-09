import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';

export const CardSatker = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: COLORS.primary, fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.Judul }}>DIREKTORAT JENDRAL PERIKANAN TANGKAP</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        width: '90%',
        height: 76,
        marginLeft: 20,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    profile: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        left: 16,
    },
    cardApps: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
})