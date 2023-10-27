import React from 'react'
import { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS,FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
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
            <SafeAreaView style={{ position: 'relative' }}>
            <ScrollView>
            
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80,  }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center',}}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Cuti</Text>
                    </View>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 20
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Libur')}>
                            <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                                       
                </View>

                <View style={{padding:20, gap: 10}}>
                    <View style={{flexDirection:"row", padding:5, columnGap:10}}>

                        <Ionicons name='document-outline' size={18} color={COLORS.primary} />
                        <Text style={{fontWeight:FONTWEIGHT.bold}}>Jenis Cuti</Text>
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
                            <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20, color:COLORS.info }}>Melangsungkan Pernikahan</Text>
                        </View>

                        <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                            <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Maksimal Hari</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20}}>30</Text>
                        </View>
                        <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                            <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Status Dokumen</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20}}>Disetujui</Text>
                        </View>

                        <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                            <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tipe Dokumen</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Pembatalan Cuti</Text>
                        </View>
                    </View>
                </View>
                <View style={{padding:20}}>
                    <View style={{flexDirection:"row", padding:5, columnGap:10}}>
                        <Ionicons name='document-outline' size={18} color={COLORS.primary} />
                        <Text style={{fontWeight:FONTWEIGHT.bold}}>Status Dokumen Cuti</Text>
                    </View>
                    <View>
                        <View style={{
                                backgroundColor: COLORS.white,
                                padding: 15,
                                borderBottomRightRadius: 8,
                                borderBottomLeftRadius: 8,
                        }}>
                        <TouchableOpacity onPress={() => setCollapse({ nip: profile.nip, toggle: true })}>
                            <View style={{flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <Text>Muhammad Zaini</Text>
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

                                        <Text style={{ marginTop: 10, }}>Golongan</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>IV</Text>

                                        <Text style={{ marginTop: 10, }}>Jabatan</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>Pengelola Produksi</Text>

                                        <Text style={{ marginTop: 10, }}>Unit Kerja</Text>
                                        <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold}}>Kelompok Fungsional Direktorat</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                null
                            )}
                        </View>
                        <View style={{paddingTop:10, gap: 10}}>
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
                        <View style={{paddingLeft:20}}>
                    <Text style={{fontWeight:FONTWEIGHT.bold}}>Lampiran</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection:"row"}}>
                            <View style={styles.cardStatus}>
                                <View style={{width:"30%", alignItems:"center", rowGap:20}}>
                                    <Ionicons name='document-outline' size={50} color={COLORS.grey} />
                                    <Text>Draft</Text>
                                    <Text>3</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                    </View>
                </View>
                
                <View style={{paddingLeft:20}}>
                    <View style={{padding:20, gap: 10}}>
                        <Text style={{fontWeight:FONTWEIGHT.bold}}>Yang Menyetujui</Text>
                        <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>

                            <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Yang Menyetujui</Text>
                                <View style={{ gap: 10, width: "60%", paddingRight: 20}}>
                                    <Text style={{ fontSize: 13, fontWeight: 400, }}>Admin KKP : NILAM AMALIA PUSPARANI / 198505042009122001</Text>
                                    <Text style={{ fontSize: 13, fontWeight: 400, }}>KETUT ADI WIRANATA / 19812312312421132122</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{paddingLeft:20}}>
                    <View style={{padding:20, gap: 10}}>
                        <Text style={{fontWeight:FONTWEIGHT.bold}}>Periode Pembatalan</Text>
                        <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>

                            <View style={{ flexDirection: "row", paddingVertical: 10, borderBottomWidth:2, borderBottomColor: "#DBDADE" }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Periode Pembatalan</Text>
                                <View style={{ gap: 10, width: "60%", paddingRight: 20}}>
                                    <Text style={{ fontSize: 13, fontWeight: 400, }}>01/01/2023 - 03/01/2023</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Durasi Pembatalan</Text>
                                <View style={{ gap: 10, width: "60%", paddingRight: 20}}>
                                    <Text style={{ fontSize: 13, fontWeight: 400, }}>3</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                    

                <View style={{padding: 20}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}}>
                            <Text style={{fontWeight:FONTWEIGHT.bold}}>History Komentar</Text>
                            <TouchableOpacity style={{ justifyContent: 'flex-end'}}>
                                <Text style={{ color: COLORS.primary, borderRadius:5, backgroundColor:COLORS.white, padding:15, paddingHorizontal:25}}>Lihat Komentar</Text>
                            </TouchableOpacity>
                        </View>

                        <View >
                    

                    </View>
                </View>
                <View style={{padding:20, gap: 10}}>
                        <View style={{}}>
                            <View style={{alignItems: 'center', gap: 10}}>
                                <TouchableOpacity onPress={()=>navigation.navigate('TambahCutiTahunan')} style={{
                                    backgroundColor: COLORS.infoDanger,
                                    padding: 15,
                                    borderRadius: 30,
                                    height: 55,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: "100%"

                                }}>
                                    <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    cardStatus: {
        width:175,
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        margin:10,
        backgroundColor:COLORS.white,
        alignItems:"center",
    },
    cardKouta:{
        width:360,
        // padding: 1,
        borderRadius: 8,
        // marginHorizontal: 5,
        // margin:10,
        marginVertical: 10,
        flexDirection:"row",
    }

})