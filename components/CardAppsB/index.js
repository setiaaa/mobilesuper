import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export const CardAppsB = ({ handlePressModal }) => {
    const navigation = useNavigation()
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginRight: 30 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                        <View style={[styles.cardApps, { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='document-text-outline' size={24} color={'#752A2B'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: 11 }}>Korespondensi</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Kebijakan')}>
                        <View style={[styles.cardApps, { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='business-outline' size={24} color={'#752A2B'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: 11 }}>Kebijakan</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <View style={[styles.cardApps, { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='mail-outline' size={24} color={'#752A2B'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: 11 }}>Email</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 18, marginTop: 30 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity>
                        <View style={[styles.cardApps, { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='calendar-outline' size={24} color={'#752A2B'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: 11 }}>Kalender</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginLeft: 20 }}>
                    <TouchableOpacity>
                        <View style={[styles.cardApps, { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='library-outline' size={24} color={'#752A2B'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: 11 }}>Repository</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginRight: 25 }}>
                    <TouchableOpacity>
                        <View style={[styles.cardApps, { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='school-outline' size={24} color={'#752A2B'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: 11 }}>Pengetahuan</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        width: '90%',
        height: 150,
        borderRadius: 12,
        marginVertical: 30
    },
    cardApps: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
})