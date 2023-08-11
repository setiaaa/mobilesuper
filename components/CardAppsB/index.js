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
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Repository</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('LiniMasa')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='school-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Pengetahuan</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginRight: '30%' }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyTask')}>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='briefcase-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Task Management</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='clipboard-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: FONTSIZE.H4 }}>Event Management</Text>
                </View>

                {/* <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                    <TouchableOpacity>
                        <View style={[styles.cardApps, { backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', display: 'flex' }]}>
                            <Ionicons name='school-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', fontSize: FONTSIZE.H4 }}>Pengetahuan</Text>
                </View> */}
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