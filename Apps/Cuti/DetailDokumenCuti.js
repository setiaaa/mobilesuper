import React from 'react'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native-svg'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'


export const DetailDokumenCuti = () => {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.superApps)
    const [collapse, setCollapse] = useState({
        nip: '',
        toggle: false
    })
    const navigation = useNavigation()
    const BASE_URL = "https://apigw.kubekkp.coofis.com/bridge"
    console.log(profile)
    return (
        <GestureHandlerRootView>
            <View style={{ position: 'relative' }}>
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
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Detail Cuti</Text>
                        </View>
                    </View>
                    <View style={{ padding: 20, gap: 10 }}>
                        <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>
                            <Ionicons name='document-outline' size={18} color={COLORS.primary} />
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>Jenis Cuti</Text>
                        </View>
                        <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>

                            <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Jenis Cuti</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Cuti Alasan Penting - Kementrian Kelautan dan Perikanan</Text>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tipe Hari</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Hari Kalender</Text>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Sub Jenis Cuti</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, color: COLORS.info }}>Melangsungkan Pernikahan</Text>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Maksimal Hari</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>30</Text>
                            </View>
                            <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Status Dokumen</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Disetujui</Text>
                            </View>

                            <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tipe Dokumen</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, color: COLORS.danger }}>Pembatalan Cuti</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: "row", padding: 5, paddingBottom: 15, columnGap: 10 }}>
                            <Ionicons name='person-outline' size={18} color={COLORS.primary} />
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>Status Dokumen Cuti</Text>
                        </View>
                        <View>
                            <View style={{
                                backgroundColor: COLORS.white,
                                padding: 15,
                                borderBottomRightRadius: 8,
                                borderBottomLeftRadius: 8,
                            }}>
                                <TouchableOpacity onPress={() => setCollapse({ nip: profile.nip, toggle: true })}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ width: "90%" }}>
                                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>Muhammad Zaini</Text>
                                            <Text>NIP. 1923123121213</Text>
                                        </View>
                                        {collapse.nip === profile.nip && collapse.toggle === true ? (
                                            <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>
                                                <Ionicons name='chevron-up' size={24} />
                                            </TouchableOpacity>
                                        ) : (
                                            <Ionicons name='chevron-down' size={24} />
                                        )}
                                    </View>
                                </TouchableOpacity>

                                {collapse.nip === profile.nip && collapse.toggle === true ? (
                                    <View>

                                        <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>

                                            <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>Golongan</Text>
                                            <Text style={{ marginTop: 5, }}>IV</Text>

                                            <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>Jabatan</Text>
                                            <Text style={{ marginTop: 5, }}>Pengelola Produksi</Text>

                                            <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>Unit Kerja</Text>
                                            <Text style={{ marginTop: 5, }}>Kelompok Fungsional Direktorat</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    null
                                )}
                            </View>
                            <View style={{ paddingTop: 10, gap: 10 }}>
                                <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
                                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Periode Cuti</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>08/10/2023 - 09/10/2023</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Durasi Cuti</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>1</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Alamat Cuti</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Villa Bogor Cantik Pisan No 2</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>No Telepon</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>+6289012931</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Alasan Cuti</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Melangsungkan Pernikahan</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{ flexDirection: "row", padding: 5, paddingBottom: 10, paddingTop: 30, columnGap: 10 }}>
                                    <Ionicons name='attach-outline' size={18} color={COLORS.primary} />
                                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>Lampiran</Text>
                                </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={styles.cardStatus}>
                                            <View style={{ width: "30%", alignItems: "center", rowGap: 20 }}>
                                                <Image source={require('../../assets/superApp/pdf.png')} />
                                                <Text>Draft</Text>
                                                <Text>3</Text>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ padding: 20, gap: 10 }}>
                            <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>

                                <Ionicons name='people-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Yang Menyetujui</Text>
                            </View>
                            <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>

                                <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                                    <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Yang Menyetujui</Text>
                                    <View style={{ gap: 10, width: "60%", paddingRight: 20 }}>
                                        <Text style={{ fontSize: 13, fontWeight: 400, }}>Admin KKP : NILAM AMALIA PUSPARANI / 198505042009122001</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 400, }}>KETUT ADI WIRANATA / 19812312312421132122</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ padding: 20, gap: 10 }}>
                            <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>
                                <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Periode Pembatalan</Text>
                            </View>
                            <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>

                                <View style={{ flexDirection: "row", paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: "#DBDADE", }}>
                                    <Text style={{ fontSize: 13, fontWeight: 600, width: "50%", paddingRight: 20 }}>Periode Pembatalan</Text>
                                    <View style={{ gap: 1, width: "50%", paddingRight: 1, }}>
                                        <Text style={{ fontSize: 12.5, fontWeight: 400, }}>01/01/2023 - 03/01/2023</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                                    <Text style={{ fontSize: 13, fontWeight: 600, width: "50%", paddingRight: 20 }}>Durasi Pembatalan</Text>
                                    <View style={{ gap: 10, width: "50%", paddingRight: 20 }}>
                                        <Text style={{ fontSize: 13, fontWeight: 400, }}>3</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', columnGap: 50 }}>
                            <View style={{ flexDirection: "row", padding: 5, columnGap: 10 }}>

                                <Ionicons name='chatbox-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Komentar</Text>
                            </View>
                            <TouchableOpacity style={{
                                justifyContent: 'flex-end',
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                padding: 15,
                                paddingHorizontal: 25,
                                //shadow ios
                                shadowOffset: { width: -2, height: 4 },
                                shadowColor: "#171717",
                                //shadow android
                                elevation: 2,
                            }}>
                                <Text style={{ color: COLORS.primary, }}>Lihat Komentar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ padding: 20, gap: 10 }}>
                        <View style={{}}>
                            <View style={{ alignItems: 'center', gap: 10, }}>
                                <TouchableOpacity onPress={() => navigation.navigate('TambahCutiTahunan')} style={{
                                    backgroundColor: COLORS.infoDanger,
                                    padding: 15,
                                    borderRadius: 5,
                                    height: 55,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: "100%",
                                    flexDirection: "row",

                                }}>
                                    <Ionicons name='print-outline' size={18} color={COLORS.white} paddingRight={10} />
                                    <Text style={{ color: COLORS.white }}>Cetak PDF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        </GestureHandlerRootView >
    )
}

const styles = StyleSheet.create({
    cardStatus: {
        width: 175,
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        backgroundColor: COLORS.white,
        alignItems: "center",
    },
    cardKouta: {
        width: 360,
        // padding: 1,
        borderRadius: 8,
        // marginHorizontal: 5,
        // margin:10,
        marginVertical: 10,
        flexDirection: "row",
    }

})