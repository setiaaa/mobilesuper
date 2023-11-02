import React from 'react'
import { Text, View } from 'react-native'
import { } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { CollapseCardBiodata } from '../../components/CollapseCardBiodata';
import { CollapseCardLinimasa } from '../../components/CollapseCardLinimasa';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export const DetailProfile = () => {
    const { pegawai, loading } = useSelector(state => state.Pegawai)
    const navigation = useNavigation()
    const item = pegawai.detail
    console.log(pegawai.detail)

    const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge"
    const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)
    return (
        < >
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80 }}>
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
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Profil Pegawai</Text>
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
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 30 }} width={61} height={61} />
                        ) : (

                            <Image source={{ uri: BASE_URL + item.avatar }} style={{ width: 61, height: 61, borderRadius: 30 }} />
                        )}
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4, marginVertical: 10 }} width={200} height={20} />
                        ) : (
                            <Text style={{ marginVertical: 10, color: COLORS.info, fontWeight: FONTWEIGHT.bold }}>{item.nama}</Text>
                        )}
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                        ) : (

                            <Text style={{ color: COLORS.lighter, fontSize: FONTSIZE.H4 }}>{item.satuan_kerja_nama}</Text>
                        )}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 7, justifyContent: 'center', marginBottom: 20 }}>

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
                                <Text>{pegawai.detail.working_day}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ width: 126, }}>Jumlah hadir</Text>
                                <Text>{pegawai.detail.present_day}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ width: 126, }}>Terlambat</Text>
                                <Text>{pegawai.detail.late_day}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ width: 126, }}>Dinas</Text>
                                <Text>{pegawai.detail.outstation_day}</Text>
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
                                <Text style={{ width: 91, fontSize: 30, fontWeight: FONTWEIGHT.bold }}>{pegawai.detail.ipasn_nilai}</Text>
                                <View style={{ backgroundColor: '#CED06C', width: 60, height: 25, borderRadius: 30, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text>Tinggi</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Kualifikasi</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: '#FF9900', borderRadius: 30 }} />
                                <Text>{pegawai.detail.ipasn_kualifikasi}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Kompetensi</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: COLORS.success, borderRadius: 30 }} />
                                <Text>{pegawai.detail.ipasn_kompetensi}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Kinerja</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: '#CED06C', borderRadius: 30 }} />
                                <Text>{pegawai.detail.ipasn_kinerja}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 5 }}>
                                <Text style={{ width: 85, }}>Disiplin</Text>
                                <View style={{ width: 10, height: 10, backgroundColor: COLORS.success, borderRadius: 30 }} />
                                <Text>{pegawai.detail.ipasn_disiplin}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {loading ? (
                        <View style={{
                            width: '90%',
                            backgroundColor: COLORS.white,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                            //shadow ios
                            shadowOffset: { width: -2, height: 4 },
                            shadowColor: '#171717',
                            shadowOpacity: 0.2,
                            //shadow android
                            elevation: 2,
                        }}>
                            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={200} height={20} />
                        </View>
                    ) : (
                        <CollapseCardBiodata profile={item} />
                    )}
                    {/* <CollapseCardLinimasa linimasa={item.dataLinimasa} /> */}
                </View>

            </ScrollView>
        </ >
    )
}
