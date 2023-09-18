import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'
import { Dropdown } from '../../components/DropDown';


export const DetailPenilaian = ({ route }) => {
    const { item } = route.params

    const nilai = [
        { key: 'q', value: '0.0 (Tidak Sesuai)' },
        { key: 'w', value: '0.5 (Kegitan)' },
        { key: 'w', value: '1.0 (infografis)' },
        { key: 'w', value: '3.0 (video)' },
    ]

    const [Nilai, setNilai] = useState('')
    const [tanggal, setTanggal] = useState('')

    useEffect(() => {
        var date = new Date().getDate()
        var month = new Date().getMonth()
        var year = new Date().getFullYear()
        setTanggal(
            date + '-' + month + '-' + year
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Detail Penilaian</Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: COLORS.white,
                    width: '90%',
                    marginHorizontal: 20,
                    marginVertical: 20,
                    paddingHorizontal: 20,
                    borderRadius: 8
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}>
                        <Image source={require('../../assets/superApp/logoKecil.png')} style={{ width: 37, height: 37 }} />
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Formulir Penilaian Pengetahuan</Text>
                    </View>


                    {item.detail.map((data) =>
                        <View key={data.id} style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Periode: </Text>
                                <Text>{data.periode}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text>PJ: </Text>
                                <Text>{data.pj}</Text>
                            </View>
                            {/* custom divider */}
                            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Jenis</Text>
                                <Text>: {data.jenis}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Terbuat</Text>
                                <Text>: {data.terbuat}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Foto Cover</Text>
                                <Text>: </Text>
                                <Image source={data.cover} style={{ width: 100, height: 71 }} />
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Judul [What]</Text>
                                <Text style={{ width: 186 }}>: {data.judul}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Tempat Agenda [Where]</Text>
                                <Text>: {data.tempat}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Anggota Agenda [Who]</Text>
                                <Text>: {data.anggota}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Kapan [When]</Text>
                                <Text>: {data.kapan}</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Rangkuman [Why]</Text>
                                    <Text>:</Text>
                                </View>
                                <Text style={{ marginTop: 5, marginHorizontal: 10 }}>{data.rangkuman}</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Deskripsi [How]</Text>
                                    <Text>:</Text>
                                </View>
                                <Text style={{ marginTop: 5, marginHorizontal: 10 }}>{data.deskripsi}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 20 }}>
                                <Text style={{ width: 120, fontWeight: FONTWEIGHT.bold }}>Lampiran</Text>
                                <Text>: {data.lampiran}</Text>
                            </View>

                        </View>
                    )}
                </View>

                <View style={{
                    backgroundColor: COLORS.white,
                    width: '90%',
                    marginHorizontal: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginBottom: 20,
                }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>Nilai</Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>


                        <View style={{ width: 170 }}>
                            <Dropdown
                                data={nilai}
                                placeHolder={'Nilai'}
                                setSelected={setNilai}
                                borderWidth={1}
                                borderColor={COLORS.ExtraDivinder}
                            />
                        </View>

                        <View>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, marginBottom: 5 }}>Tanggal Nilai :</Text>
                            <Text>{tanggal}</Text>
                        </View>
                    </View>

                </View>

                <TouchableOpacity style={{
                    width: '90%',
                    height: 50,
                    backgroundColor: COLORS.info,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginHorizontal: 20
                }}>
                    <Text style={{ color: COLORS.white }}>Lihat Pengetahuan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: '90%',
                    height: 50,
                    backgroundColor: COLORS.danger,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginHorizontal: 20,
                    marginVertical: 10
                }}>
                    <Text style={{ color: COLORS.white }}>Approve</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView >
    )
}
