import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export const CardMenu = () => {
    const navigation = useNavigation()
    return (
        <View>
            <View style={{ flexDirection: 'row', gap: 37 }}>
                <View style={styles.card}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/superApp/Avatar.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={() => navigation.navigate('Kebijakan')}>
                        <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/superApp/Avatar.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity >
                        <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/superApp/Avatar.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                </View>
            </View>
            <Text style={{ justifyContent: 'center', marginLeft: 5 }}>TEST</Text>
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