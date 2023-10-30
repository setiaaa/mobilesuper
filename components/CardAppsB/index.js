import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE } from '../../config/SuperAppps';

export const CardAppsB = ({ handlePressModal }) => {
    const navigation = useNavigation()
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='document-text-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Korespondensi</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainKeb')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='business-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kebijakan</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='mail-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Email</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20, gap: 20 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('GrupKalender')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='calendar-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Kalender</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainRepo')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='library-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Repositori</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainPengetahuan')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='school-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4, textAlign: 'center' }}>Pengetahuan</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyTask')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='briefcase-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Task Management</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('HalamanUtama')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='clipboard-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>Agenda Rapat</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainDigitalSign')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            {/* <Ionicons name='school-outline' size={24} color={COLORS.primary} /> */}
                            <Image source={require('../../assets/superApp/DigiSign.png')} style={{ width: 24, height: 24 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Digital Sign</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginVertical: 20, }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListPegawai')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='person-circle-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Pegawai</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainSPPD')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='clipboard-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>SPPD</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainCuti')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='school-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Cuti</Text>
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