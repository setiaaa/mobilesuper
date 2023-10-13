import React from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'accordion-collapse-react-native'
import { CollapseCardBiodata } from '../../components/CollapseCardBiodata'
import { ScrollView } from 'react-native'
import { CollapseCardLinimasa } from '../../components/CollapseCardLinimasa'
import { removeTokenValue } from '../../service/session'
import { setLogout } from '../../store/LoginAuth'


export const Profile = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { profile, linimasa } = useSelector(state => state.superApps)
    const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge"

    console.log(profile)
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20
                    }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Profile Saya</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        width: 362,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,

                    }}>
                        <Image source={{ uri: BASE_URL + profile.avatar }} style={{ width: 61, height: 61, borderRadius: 30 }} />
                        <Text style={{ marginVertical: 10, color: COLORS.info, fontWeight: FONTWEIGHT.bold }}>{profile.nama}</Text>
                        <Text style={{ color: COLORS.lighter, fontSize: FONTSIZE.H4 }}>{profile.unit_kerja}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>

                    <View style={{
                        backgroundColor: COLORS.white,
                        width: 177,
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        borderRadius: 8,
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>Absensi</Text>

                        <View style={{ paddingBottom: 20 }}>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Text style={{ width: 126, }}>Jumlah hari kerja</Text>
                                <Text>{profile.working_day}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ width: 126, }}>Jumlah hadir</Text>
                                <Text>{profile.present_day}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ width: 126, }}>Terlambat</Text>
                                <Text>{profile.late_day}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ width: 126, }}>Dinas</Text>
                                <Text>{profile.outstation_day}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ width: 126, }}>Cuti</Text>
                                <Text>-</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: COLORS.white,
                        width: 177,
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        borderRadius: 8,
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>IP ASN</Text>

                        <View style={{ paddingBottom: 20 }}>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Text style={{ width: 91, fontSize: 30, fontWeight: FONTWEIGHT.bold }}>{profile.ipasn_nilai}</Text>
                                <View style={{ backgroundColor: '#CED06C', width: 60, height: 18, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>Tinggi</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Kualifikasi</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: '#FF9900', borderRadius: 30 }} />
                                <Text>{profile.ipasn_kualifikasi}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Kompetensi</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: COLORS.success, borderRadius: 30 }} />
                                <Text>{profile.ipasn_kompetensi}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Kinerja</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: '#CED06C', borderRadius: 30 }} />
                                <Text>{profile.ipasn_kinerja}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Disiplin</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: COLORS.success, borderRadius: 30 }} />
                                <Text>{profile.ipasn_disiplin}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <CollapseCardBiodata profile={profile} />
                    {/* <CollapseCardLinimasa linimasa={linimasa} /> */}
                </View>

                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            width: '90%',
                            height: 50,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            removeTokenValue()
                            dispatch(setLogout())
                            navigation.navigate('LoginToken')
                        }}
                    >
                        <Text style={{ color: COLORS.white }}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
