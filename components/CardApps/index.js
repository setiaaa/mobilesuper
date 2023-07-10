import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE } from '../../config/SuperAppps';

export const CardApps = ({ handlePressModal }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', gap: 28, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='document-text-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Korespondensi</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainKeb')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='business-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kebijakan</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='mail-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Email</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={handlePressModal}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='ellipsis-horizontal-outline' size={24} color={'#6B7280'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>More</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        width: '90%',
        height: 150,
        borderRadius: 12,
        marginLeft: 20
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