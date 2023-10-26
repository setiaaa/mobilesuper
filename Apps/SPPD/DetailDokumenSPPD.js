import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

export const DetailDokumenSPPD = () => {
    const navigation = useNavigation();

    const [collapse, setCollapse] = useState({
        toggle: false
    })

  return (
    <SafeAreaView>
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
                <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Detail Dokumen</Text>
            </View>
        </View>
        
        <View style={{ padding: 20 }}>
            <ScrollView style={{ height: "90%",}}>
                <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: 600, marginVertical: 10 }}>UAT Collaboration Office Modul Employee Self Service</Text>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tanggal Mulai</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>27 September 2023</Text>
                    </View>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tanggal Selesai</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>05 Oktober 2023</Text>
                    </View>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Jumlah Hari</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>9</Text>
                    </View>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tujuan</Text>
                        <View style={{ gap: 10, width: "60%", paddingRight: 20}}>
                            <Text style={{ fontSize: 13, fontWeight: 400, }}>KABUPATEN MANGGARAI BARAT - Labuan Bajo</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400, }}>KOTA KUPANG - Hotel Nusantara</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400, }}>KOTA DENPASAR - Hotel Kempinsky</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Tujuan Provinsi</Text>
                        <View style={{ gap: 10, width: "60%", paddingRight: 20}}>
                            <Text style={{ fontSize: 13, fontWeight: 400, }}>BALI</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400, }}>NUSA TENGGARA TIMUR</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Penanggung Jawab</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>AULIA RIZA FARHAN / 197208122001121002</Text>
                    </View>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Penanggung Jawab Unit Kerja</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>PUSAT DATA, STATISTIK, DAN INFORMASI</Text>
                    </View>

                    <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#DBDADE", paddingVertical: 10, }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, width: "40%", paddingRight: 20 }}>Satker Penanggung Jawab</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: "60%", paddingRight: 20 }}>Biro Umum dan PBJ</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", marginVertical: 10, gap: 10, alignItems: "center" }}>
                    <Ionicons name='people-outline' size={24} />
                    <Text style={{ fontSize: 15, fontWeight: 600 }}>Daftar Pelaksana</Text>
                </View>

                <View style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    //shadow ios
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: "#171717",
                    shadowOpacity: 0.2,
                    //shadow android
                    elevation: 2,
                }}>
                    <TouchableOpacity onPress={() => setCollapse({ toggle: true })} style={{ height: 50, borderRadius: 8, justifyContent: "center" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
                            <View>
                                <Text style={{ fontSize: 13, fontWeight: 600 }}>NILAM AMALIA PUSPARANI</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400 }}>NIP. 198505042009122001</Text>
                            </View>
                            {collapse.toggle === true ? (
                                <TouchableOpacity onPress={() => setCollapse({ toggle: false })}>
                                <Ionicons name='chevron-up-outline' size={24} />
                                </TouchableOpacity>
                            ) : (
                                <Ionicons name='chevron-down-outline' size={24} />
                            )}
                        </View>
                    </TouchableOpacity>

                    {collapse.toggle === true ? (
                        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                            <TouchableOpacity onPress={() => setCollapse({ toggle: false })}>
                                <View style={{ gap: 10 }}>
                                    <View>
                                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Golongan</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 600 }}>IV</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Tempat Kedudukan</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 600 }}>KOTA ADMINISTRASI JAKARTA PUSAT</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        null
                    )}
                </View>

                <View style={{ gap: 10, marginVertical: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: COLORS.info, height: 50, borderRadius: 8, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: COLORS.white }}>Lihat Surat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#752A2B", height: 50, borderRadius: 8, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: COLORS.white }}>Cetak Lembar Belakang</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}
