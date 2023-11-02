import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
// import profile from '../../store/profile';
import { ScrollView } from 'react-native-gesture-handler';

export const Personal = () => {
    const navigation = useNavigation();

    const [collapse, setCollapse] = useState({
        toggle: false
    })

    return (
        < >
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
                    <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Perjalanan Dinas</Text>
                </View>
            </View>

            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: "#171717",
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Image
                            source={require("../../assets/superApp/Card-Background-Red.png")}
                            style={{
                                width: "100%",
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                //shadow ios
                                shadowOffset: { width: -2, height: 4 },
                                shadowColor: "#171717",
                                shadowOpacity: 0.2,
                                //shadow android
                                elevation: 2,
                            }} />
                        <View style={{ alignItems: "center", gap: 10, position: "absolute", }}>
                            <Image source={require("../../assets/superApp/AvatarN.png")} style={{ width: 75, height: 75, borderRadius: 36, borderWidth: 2, borderColor: COLORS.white }} />
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>NILAM AMALIA PUSPARANI</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.white }}>198505042009122001</Text>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: "#171717",
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <TouchableOpacity onPress={() => setCollapse({ toggle: true })} style={{ height: 50, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, justifyContent: "center" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 13, fontWeight: 600 }}>Profil</Text>
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
                                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Posisi</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 600 }}>PRANATA KOMPUTER MADYA</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Golongan</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 600 }}>IV</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Satuan Kerja</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 600 }}>KELOMPOK FUNGSIONAL</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Unit Kerja</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 600 }}>SEKRETARIAT JENDERAL</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Kota Kantor</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 600 }}>KOTA ADMINISTRASI JAKARTA PUSAT</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            null
                        )}
                    </View>

                    <Text style={{ fontSize: 13, fontWeight: 700, marginVertical: 20 }}>Status</Text>

                    <View style={{ gap: 10, marginBottom: 30 }}>
                        <View style={{
                            flexDirection: "row",
                            height: 110,
                            //shadow ios
                            shadowOffset: { width: -2, height: 4 },
                            shadowColor: "#171717",
                            shadowOpacity: 0.2,
                            //shadow android
                            elevation: 2,
                        }}>
                            <View style={{
                                backgroundColor: "#EAEAEA",
                                width: "20%",
                                borderBottomLeftRadius: 8,
                                borderTopLeftRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <View style={{ backgroundColor: "#474747", width: 35, height: 35, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
                                    <Ionicons name='file-tray-full-outline' size={30} color="#EAEAEA" />
                                </View>
                            </View>
                            <View style={{
                                backgroundColor: COLORS.white,
                                width: "80%",
                                borderBottomRightRadius: 8,
                                borderTopRightRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 5
                            }}>
                                <Text style={{ fontSize: 24, fontWeight: 600, color: COLORS.primary }}>4</Text>
                                <Text style={{ fontSize: 13, fontWeight: 600, }}>Jumlah Perjalanan Dinas</Text>
                                <Text style={{ fontSize: 11, fontWeight: 400, textAlign: "center", width: 250, color: "#6B7280" }}>Kegiatan Terakhir: UAT Collaboration Office modul employee self service</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            height: 110,
                            //shadow ios
                            shadowOffset: { width: -2, height: 4 },
                            shadowColor: "#171717",
                            shadowOpacity: 0.2,
                            //shadow android
                            elevation: 2,
                        }}>
                            <View style={{
                                backgroundColor: "#EAEAEA",
                                width: "20%",
                                borderBottomLeftRadius: 8,
                                borderTopLeftRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <View style={{ backgroundColor: "#474747", width: 35, height: 35, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
                                    <Ionicons name='map-outline' size={30} color="#EAEAEA" />
                                </View>
                            </View>
                            <View style={{
                                backgroundColor: COLORS.white,
                                width: "80%",
                                borderBottomRightRadius: 8,
                                borderTopRightRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 5
                            }}>
                                <Text style={{ fontSize: 24, fontWeight: 600, color: COLORS.primary }}>3</Text>
                                <Text style={{ fontSize: 13, fontWeight: 600, }}>Jumlah Provinsi Didatangi</Text>
                                <Text style={{ fontSize: 11, fontWeight: 400, textAlign: "center", width: 250, color: "#6B7280" }}>Provinsi Terakhir Didatangi: BALI, NUSA TENGGARA TIMUR</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            height: 110,
                            //shadow ios
                            shadowOffset: { width: -2, height: 4 },
                            shadowColor: "#171717",
                            shadowOpacity: 0.2,
                            //shadow android
                            elevation: 2,
                        }}>
                            <View style={{
                                backgroundColor: "#EAEAEA",
                                width: "20%",
                                borderBottomLeftRadius: 8,
                                borderTopLeftRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <View style={{ backgroundColor: "#474747", width: 35, height: 35, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
                                    <Ionicons name='location-outline' size={30} color="#EAEAEA" />
                                </View>
                            </View>
                            <View style={{
                                backgroundColor: COLORS.white,
                                width: "80%",
                                borderBottomRightRadius: 8,
                                borderTopRightRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 5
                            }}>
                                <Text style={{ fontSize: 24, fontWeight: 600, color: COLORS.primary }}>5</Text>
                                <Text style={{ fontSize: 13, fontWeight: 600, }}>Jumlah Kota Tujuan</Text>
                                <View>
                                    <Text style={{ fontSize: 11, fontWeight: 400, textAlign: "center", width: 250, color: "#6B7280" }}>Kota Terakhir Didatangi: Kota Denpasar</Text>
                                    <Text style={{ fontSize: 11, fontWeight: 400, textAlign: "center", width: 250, color: "#6B7280" }}>Pada Tanggal 03 Oktober 2023</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ >
    )
}
