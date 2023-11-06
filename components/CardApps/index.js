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
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/korespondensi-ikon3.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Korespondensi</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainKeb')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/kebijakan-ikon.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kebijakan</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/email-ikon.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Email</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainPengetahuan')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/pengetahuan-ikon.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Pengetahuan</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 28, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('GrupKalender')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/kalender-ikon.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kalender</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainRepo')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/preparing-ikon.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Repositori</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('HalamanUtama')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/agenda-ikon.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Agenda</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <TouchableOpacity onPress={handlePressModal}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                        <Image style={{ width: 28, height: 28}} source={require('../../assets/superApp/more-ikon.png')} />
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
        height: 220,
        borderRadius: 12,
        marginLeft: 20,
        marginTop: 60,
        padding: 5,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: COLORS.primary,
        shadowOpacity: 0.2,
        // shadow android
        elevation: 1
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