import React from 'react'
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, screenWidth, Dimensions } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from '../../components/DropDown';
import { useNavigation } from "@react-navigation/native";
import { StackedBarChart, ProgressChart, } from "react-native-chart-kit";
import PieChart from 'react-native-pie-chart';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'

const dataKuartal = [
    {
        key: '1',
        value: 'TW1'
    },
    {
        key: '2',
        value: 'TW2'
    },
    {
        key: '3',
        value: 'TW3'
    },
    {
        key: '4',
        value: 'TW4'
    },
]

export const LaporanPengetahuan = () => {
    const navigation = useNavigation();

    const [quarter, setQuarter] = useState()
    // const [kuartal, setKuartal] = useState(dataKuartal)
    const [listYear, setListYear] = useState()

    const [year, setYear] = useState({ key: new Date().getFullYear(), value: new Date().getFullYear() })

    const month = new Date().getMonth() + 1

    useEffect(() => {
        let q = ''
        if (1 <= month && month <= 3) {
            q = '1'
        } else if (4 <= month && month <= 6) {
            q = '2'
        } else if (7 <= month && month <= 9) {
            q = '3'
        } else {
            q = '4'
        }
        setQuarter({
            key: q,
            value: q == 1 ? 'TW1' : q == 2 ? 'TW2' : q == 3 ? 'TW3' : 'TW4'
        })

        let thn = []
        for (let i = 2023; i <= year; i++) {
            thn.push({
                key: i,
                value: i
            })
        }

        setListYear(thn)
    }, [])

    const widthAndHeight = 200
    const dataPie = [5300, 3360, 1300, 3360]
    const sliceColor = [COLORS.info, COLORS.success, COLORS.warning, COLORS.infoDanger]

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
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
                        data={listYear}
                        placeHolder={'Pilih Tahun'}
                        backgroundColor={COLORS.white}
                        selected={year}
                        setSelected={setYear}
                        style={styles.dropdown}
                    />
                </View>

                <View style={styles.dropdown}>
                    <Dropdown
                        data={dataKuartal}
                        placeHolder={'Pilih Triwulan'}
                        backgroundColor={COLORS.white}
                        selected={quarter}
                        setSelected={setQuarter}
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
                        <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: COLORS.primary, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name='download-outline' size={18} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 12, fontWeight: 400 }}>Triwulan</Text>
                        <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: COLORS.primary, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name='download-outline' size={18} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ 
                width: "90%", 
                alignSelf: "center", 
                backgroundColor: COLORS.white,
                borderRadius: 16,
                padding: 20,
                marginBottom: 10,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}>
                <Text style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Capaian Mingguan Triwulan 2 Tahun 2023</Text>
                <StackedBarChart 
                    data={{
                        labels: ["Apr W1", "Apr W2", "Apr W3", "Apr W4", "May W1", "May W2", "May W3", "May W4", "Jun W1", "Jun W2", "Jun W3", "Jun W4"],
                        legend: ["Posting Masuk", "Jumlah Posting belum dinilai"],
                        data: [
                            [40, 60],
                            [30, 70],
                            [50, 50],
                            [80, 20],
                            [90, 10],
                            [40, 60],
                            [30, 70],
                            [50, 50],
                            [80, 20],
                            [90, 10],
                            [40, 60],
                            [30, 70],
                        ],
                        barColors: [COLORS.primary, COLORS.warning]
                    }}
                    hideLegend
                    yAxisLabel=''
                    yAxisSuffix=''
                    yAxisInterval={2}
                    width={380}  
                    // width={Dimensions.get("window").width}
                    height={350}
                    chartConfig={{
                        backgroundGradientFrom: "#F0F0F0",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: COLORS.white,
                        backgroundGradientToOpacity: 1,
                        color:() => "black",
                        barPercentage: 0.2,
                        propsForBackgroundLines: {
                            x1: 60
                        },
                        propsForVerticalLabels: {
                            // rotation: 90,
                            // rotate: -90,
                            // letterSpacing: 3,
                            // dy: 10,
                            // dx: 20,
                        }
                    }}
                    withHorizontalLabels={false}
                    style={{ marginHorizontal: -55 }}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.warning }} />
                        <Text style={{ fontSize: 12, fontWeight: 400 }}>Posting Masuk</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary }} />
                        <Text style={{ fontSize: 12, fontWeight: 400 }}>Jumlah Posting belum dinilai</Text>
                    </View>
                </View>
                <View style={{ width: "100%", height: 2, backgroundColor: COLORS.grey, marginVertical: 20 }} />
                <View style={{ alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 400, width: "50%", textAlign: "center" }}>Jumlah yang berlum dinilai triwulan 2 Tahun 2023</Text>
                    <Text style={{ fontSize: 28, fontWeight: 600, color: COLORS.primary, marginVertical: 10 }}>1.265</Text>
                    <TouchableOpacity style={{ backgroundColor: COLORS.primary, width: 226, height: 32, borderRadius: 8, justifyContent: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: 500, textAlign: "center", color: COLORS.white }}>Nilai Sekarang</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{
                width: "90%", 
                alignSelf: "center", 
                backgroundColor: COLORS.white,
                borderRadius: 16,
                padding: 20,
                marginVertical: 10,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}>
                <Text style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Postingan Masuk Triwulan Kedua 2023</Text>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={dataPie}
                    sliceColor={sliceColor}
                    coverRadius={0.75}
                    coverFill={'#FFF'}
                    style={{ alignSelf: "center", marginVertical: 20 }}
                />
                <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <Text style={{ fontSize: 38, fontWeight: 600, marginBottom: 10 }}>9.960</Text>
                    <Text style={{ fontSize: 12, fontWeight: 400, width: "50%", textAlign: "center" }}>Jumlah seluruh postingan masuk di triwulan Kedua Tahun 2023</Text>
                </View>
                <View style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 16,
                    padding: 20,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                }}>
                    <View style={{ flexDirection: "row", gap: "30%" }}>
                        <View style={{ flexDirection: "column"}}>
                            <View style={{ marginBottom: 20, alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <View style={{ backgroundColor: COLORS.infoLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name='pulse-outline' size={22} color={COLORS.info} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: 600 }}>Kegiatan</Text>
                                </View>
                                <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>5.300</Text>
                                <Progress.Bar progress={0.398} width={130} color={COLORS.info} />
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <View style={{ backgroundColor: COLORS.successLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name='videocam-outline' size={22} color={COLORS.success} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: 600 }}>Video/Jurnal</Text>
                                </View>
                                <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>3.360</Text>
                                <Progress.Bar progress={0.252} width={130} color={COLORS.success} />
                            </View>
                        </View>

                        <View style={{ flexDirection: "column" }}>
                            <View style={{ marginBottom: 20, alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <View style={{ backgroundColor: COLORS.warningLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name='clipboard-outline' size={22} color={COLORS.warning} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: 600 }}>Penelitian</Text>
                                </View>
                                <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>1.300</Text>
                                <Progress.Bar progress={0.098} width={130} color={COLORS.warning} />
                            </View>
                            
                            <View style={{ marginBottom: 10, }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <View style={{ backgroundColor: COLORS.infoDangerLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                        <Ionicons name='search-outline' size={22} color={COLORS.infoDanger} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: 600 }}>Tidak Sesuai</Text>
                                </View>
                                <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>3.360</Text>
                                <Progress.Bar progress={0.252} width={130} color={COLORS.infoDanger} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{
                width: "90%", 
                alignSelf: "center", 
                backgroundColor: COLORS.white,
                borderRadius: 16,
                padding: 20,
                marginVertical: 10,
                marginBottom: 20,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}>
                <Text style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>Post Sudah Dinilai</Text>
                <Text style={{ fontSize: 12, fontWeight: 400, marginBottom: 10, color: COLORS.grey }}>Dari Keseluruhan Post Triwulan Kedua Tahun 2023</Text>
                <View style={{ alignSelf: "center", marginVertical: 20 }}>
                    <ProgressCircle
                        percent={85}
                        radius={100}
                        borderWidth={15}
                        color={COLORS.success}
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{'85%'}</Text>
                    </ProgressCircle>
                </View>
                <View style={{ marginVertical: 10, alignItems: "center" }}>
                    <Text style={{ fontSize: 38, fontWeight: 600, marginBottom: 10 }}>8.540</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>*) Yang belum dinilai :</Text>
                <View style={{ flexDirection: "row", gap: "50%" }}>
                    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <View style={{ backgroundColor: COLORS.infoLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                <Ionicons name='pulse-outline' size={22} color={COLORS.info} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontSize: 13, fontWeight: 600 }}>Kegiatan</Text>
                                <Text style={{ fontSize: 12, fontWeight: 400, color: COLORS.grey }}>500</Text>
                            </View>
                        </View>
                        
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                            <View style={{ backgroundColor: COLORS.successLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                <Ionicons name='videocam-outline' size={22} color={COLORS.success} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontSize: 13, fontWeight: 600 }}>Video/Jurnal</Text>
                                <Text style={{ fontSize: 12, fontWeight: 400, color: COLORS.grey }}>420</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <View style={{ backgroundColor: COLORS.warningLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                <Ionicons name='clipboard-outline' size={22} color={COLORS.warning} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontSize: 13, fontWeight: 600 }}>Penelitian</Text>
                                <Text style={{ fontSize: 12, fontWeight: 400, color: COLORS.grey }}>500</Text>
                            </View>
                        </View>
                        
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                            <View style={{ backgroundColor: COLORS.infoDangerLight, width: 34, height: 34, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                <Ionicons name='search-outline' size={22} color={COLORS.infoDanger} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontSize: 13, fontWeight: 600 }}>Tidak Sesuai</Text>
                                <Text style={{ fontSize: 12, fontWeight: 400, color: COLORS.grey }}>420</Text>
                            </View>
                        </View>
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
