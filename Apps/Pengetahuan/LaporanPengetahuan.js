import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from '../../components/DropDown';
import { useNavigation } from "@react-navigation/native";

export const LaporanPengetahuan = () => {
    const navigation = useNavigation();

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
                    <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Laporan</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 20, gap: 5 }}>
                <View style={styles.dropdown}>
                    <Dropdown
                        // data={listYear}
                        placeHolder={'Pilih Tahun'}
                        backgroundColor={COLORS.white}
                        // selected={year}
                        // setSelected={setYear}
                        style={styles.dropdown}
                    />
                </View>

                <View style={styles.dropdown}>
                    <Dropdown
                        // data={dataKuartal}
                        placeHolder={'Pilih Triwulan'}
                        backgroundColor={COLORS.white}
                        // selected={quarter}
                        // setSelected={setQuarter}
                        style={styles.dropdown}
                    />
                </View>
            </View>
            <View style={{ 
                backgroundColor: COLORS.white, 
                marginHorizontal: 20, 
                marginStart: 20, 
                padding: 20, 
                borderRadius: 16,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,

            }}>
                <Text style={{ fontSize: 14, fontWeight: 600 }}>Jumlah Postingan pada Triwulan Kedua Tahun 2023</Text>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", padding: 20, }}>
                        <View style={{ 
                            backgroundColor: COLORS.warningLight, 
                            width: 42, height: 42, 
                            borderRadius: 21,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                        }}>
                            <Ionicons name='clipboard-outline' size={24} color={COLORS.warning} />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>2.300</Text>
                        <Text style={{ fontSize: 12, fontWeight: 400, width: 60, textAlign: "center" }}>Post Masuk</Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", padding: 20, }}>
                        <View style={{ 
                            backgroundColor: COLORS.successLight, 
                            width: 42, height: 42, 
                            borderRadius: 21,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                        }}>
                            <Ionicons name='clipboard-outline' size={24} color={COLORS.success} />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>8.540</Text>
                        <Text style={{ fontSize: 12, fontWeight: 400, width: 60, textAlign: "center" }}>Post Sudah Dinilai</Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", padding: 20, }}>
                        <View style={{ 
                            backgroundColor: COLORS.infoDangerLight, 
                            width: 42, height: 42, 
                            borderRadius: 21,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                        }}>
                            <Ionicons name='clipboard-outline' size={24} color={COLORS.infoDanger} />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>8.540</Text>
                        <Text style={{ fontSize: 12, fontWeight: 400, width: 60, textAlign: "center" }}>Post Belum Dinilai</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 20, justifyContent: "space-between" }}>
                <View style={{ 
                    width: "48%",
                    height: 176,
                    backgroundColor: COLORS.white,
                    padding: 20,
                    borderRadius: 16,
                    //shadow ios
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: "#171717",
                    shadowOpacity: 0.2,
                    //shadow android
                    elevation: 2,
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View style={{ backgroundColor: "#F0F0F0", width: 26, height: 26, borderRadius: 13, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name='person-outline' size={18} color={COLORS.infoDanger} />
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 600, color: COLORS.primary }}>125</Text>
                    </View>
                    <Text style={{ fontWeight: 400, marginTop: 10 }}>Jumlah pegawai belum memenuhi nilai minimum triwulan Kedua Tahun 2023</Text>
                </View>
                
                <View style={{ 
                    width: "48%",
                    backgroundColor: COLORS.white,
                    padding: 20,
                    borderRadius: 16,
                    //shadow ios
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: "#171717",
                    shadowOpacity: 0.2,
                    //shadow android
                    elevation: 2,
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View style={{ backgroundColor: "#F0F0F0", width: 26, height: 26, borderRadius: 13, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name='document-outline' size={18} color={COLORS.grey} />
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 600, }}>Report</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 12, fontWeight: 400 }}>Pegawai</Text>
                        <TouchableOpacity>
                            <View style={{ width: 24, height: 24, backgroundColor: COLORS.primary, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                                <Ionicons name='download-outline' size={18} color={COLORS.white} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 12, fontWeight: 400 }}>Triwulan</Text>
                        <TouchableOpacity>
                            <View style={{ width: 24, height: 24, backgroundColor: COLORS.primary, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                                <Ionicons name='download-outline' size={18} color={COLORS.white} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    dropdown: {
        width: "50%",
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        //shadow android
        elevation: 2,
    }
})
