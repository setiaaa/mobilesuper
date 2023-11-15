import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { COLORS, DATETIME, PADDING } from '../../config/SuperAppps'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummaryCount, getSummaryList } from '../../service/api';
import { useEffect } from 'react';
import { getTokenValue } from '../../service/session';
import moment from 'moment';

const CardLaporanList = ( {item, token} ) => {
    return (
        <View style={styles.cardList}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>{moment(item.tanggalSertif).format(DATETIME.LONG_DATE)}</Text>
                <Text style={{ fontSize: 13, fontWeight: 600 }}>{item.noSertif}</Text>
            </View>
            <Text style={{ textAlign: "right", fontSize: 13, fontWeight: 400 }}>{item.jenis_sertifikat}</Text>
            <Text style={{ fontSize: 15, fontWeight: 600 }}>{item.subject}</Text>
            <Text style={{ fontSize: 14, fontWeight: 400 }}>{item.pelatihan}</Text>
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: 400, color: COLORS.lighter }}>Penerima :</Text>
                <Text style={{ fontSize: 13, fontWeight: 500 }}>{item.composer}</Text>
            </View>
        </View>
    )
}

export const LaporanDigitalSign = () => {
    const navigation = useNavigation();

    const [token, setToken] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        getTokenValue().then((val) => {
          setToken(val);
        });
      }, []);

    useEffect(() => {
        if (token !== "") {
        dispatch(getSummaryCount(token));
        dispatch(getSummaryList(token));
        }
    }, [token]);

    const { summary } = useSelector((state) => state.digitalsign)

    let charA = 0;
    const klasikal = summary?.count?.pelatihan_klasikal_counts;
    let tmpKlasikal = [];
    let tmpKetKlasikal = [];

    for (const key in klasikal) {
        if (klasikal.hasOwnProperty(key)) {
            tmpKlasikal.push({
                actualKey: key,
                name: String.fromCharCode(charA),
                jumlah: klasikal[key]
            })
            tmpKetKlasikal.push({
                id: String.fromCharCode(charA),
                name: key
            })
            charA++
        }
    }

    const nonKlasikal = summary?.count?.pelatihan_non_klasikal_counts;
    let tmpNonKlasikal = [];
    let tmpKetNonKlasikal = [];

    for (const key in nonKlasikal) {
        if (nonKlasikal.hasOwnProperty(key)) {
            tmpNonKlasikal.push({
                actualKey: key,
                name: String.fromCharCode(charA),
                jumlah: nonKlasikal[key]
            })
            tmpKetNonKlasikal.push({
                id: String.fromCharCode(charA),
                name: key
            })
            charA++
        }
    }

    console.log(summary)

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            backgroundColor: COLORS.primary,
            height: 80,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <TouchableOpacity style={{}} onPress={() => navigation.navigate("Home")}>
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
            <Text
              style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}
            >
              Laporan
            </Text>
          </View>
        </View>
        <ScrollView>
        <View style={{ padding: PADDING.Page }}>
            <View>
                <View style={{...styles.card, alignItems: "center"}}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{...styles.circle, backgroundColor: COLORS.successLight}}>
                            <Ionicons name="clipboard-outline" size={24} color={COLORS.success} />
                        </View>
                        <View style={{ justifyContent: "center", marginLeft: 15, gap: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: 700 }}>{summary?.count.total_count}</Text>
                            <Text style={{ fontSize: 13, fontWeight: 400 }}>Total Pelatihan</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                    <View style={styles.card}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{...styles.circle, backgroundColor: COLORS.infoLight}}>
                                <Ionicons name="clipboard-outline" size={24} color={COLORS.info} />
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: 15, gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 700 }}>{summary?.count.jenis_sertifikat?.klasikal}</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: 72 }}>Total Klasikal</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{...styles.circle, backgroundColor: COLORS.warningLight}}>
                                <Ionicons name="clipboard-outline" size={24} color={COLORS.warning} />
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: 15, gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 700 }}>{summary?.count.jenis_sertifikat?.non_klasikal}</Text>
                                <Text style={{ fontSize: 13, fontWeight: 400, width: 72 }}>Total Non Klasikal</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{...styles.card, marginTop: 20}}>
                <Text style={{ fontSize: 14, fontWeight: 600 }}>Jumlah pelatihan Klasikal</Text>
                <BarChart 
                    data = {{
                        labels : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
                        datasets : [
                            {
                                data: [
                                    [tmpKlasikal[0]?.jumlah],
                                    [tmpKlasikal[1]?.jumlah],
                                    [tmpKlasikal[2]?.jumlah],
                                    [tmpKlasikal[3]?.jumlah],
                                    [tmpKlasikal[4]?.jumlah],
                                    [tmpKlasikal[5]?.jumlah],
                                    [tmpKlasikal[6]?.jumlah],
                                    [tmpKlasikal[7]?.jumlah],
                                    [tmpKlasikal[8]?.jumlah],
                                    [tmpKlasikal[9]?.jumlah],
                                    [tmpKlasikal[10]?.jumlah],
                                ]
                            }
                        ],
                    }}
                    hide legend
                    width={350}
                    height={300}
                    chartConfig={{
                        backgroundGradientFrom: COLORS.white,
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: COLORS.white,
                        backgroundGradientToOpacity: 1,
                        color: () => COLORS.lighter,
                        barPercentage: 0.2,
                        propsForBackgroundLines: {
                          x1: 60,
                        },
                        fillShadowGradientFromOffset:1,
                        fillShadowGradientFrom: COLORS.info,
                        fillShadowGradientFromOpacity:1
                    }}
                    style={{ marginHorizontal: -20, marginTop: 20 }}
                    withInnerLines={false}
                />
                <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Keterangan:</Text>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>A</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pelatihan Struktural Kepemimpinan</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>B</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pelatihan Manajerial</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>C</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pelatihan Teknis</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>D</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pelatihan Fungsional</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>E</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pelatihan Sosial Kultural</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>F</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Seminar/Konferensi/Sarasehan</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>G</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Workshop atau Lokarya</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>H</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Kursus</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>I</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Penataran</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>J</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Bimbingan Teknis</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>K</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Sosialisasi</Text>
                    </View>
                </View>
            </View>
            <View style={{...styles.card, marginTop: 20}}>
                <Text style={{ fontSize: 14, fontWeight: 600 }}>Jumlah pelatihan Non Klasikal</Text>
                <BarChart 
                    data = {{
                        labels : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
                        datasets : [
                            {
                                data: [
                                    [tmpNonKlasikal[0]?.jumlah],
                                    [tmpNonKlasikal[1]?.jumlah],
                                    [tmpNonKlasikal[2]?.jumlah],
                                    [tmpNonKlasikal[3]?.jumlah],
                                    [tmpNonKlasikal[4]?.jumlah],
                                    [tmpNonKlasikal[5]?.jumlah],
                                    [tmpNonKlasikal[6]?.jumlah],
                                    [tmpNonKlasikal[7]?.jumlah],
                                    [tmpNonKlasikal[8]?.jumlah],
                                    [tmpNonKlasikal[9]?.jumlah],
                                    [tmpNonKlasikal[10]?.jumlah],
                                ]
                            }
                        ],
                    }}
                    hide legend
                    width={350}
                    height={300}
                    chartConfig={{
                        backgroundGradientFrom: COLORS.white,
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: COLORS.white,
                        backgroundGradientToOpacity: 1,
                        color: () => COLORS.lighter,
                        barPercentage: 0.2,
                        propsForBackgroundLines: {
                          x1: 60,
                        },
                        fillShadowGradientFromOffset:1,
                        fillShadowGradientFrom: COLORS.warning,
                        fillShadowGradientFromOpacity:1
                    }}
                    style={{ marginHorizontal: -15, marginTop: 20 }}
                    withInnerLines={false}
                />
                <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Keterangan:</Text>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>A</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Coaching</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>B</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Mentoring</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>C</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>e-learning</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>D</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pelatihan Jarak Jauh</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>E</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Detasering (Secondment)</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>F</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pembelajaran Alam Terbuka (Outbond)</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>G</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Patok Banding (Benchmarking)</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>H</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Pertukanan antara PNS dengan Pegawai</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>I</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Swasta/BUMN/BUMD</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>J</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Belajar Mandiri (Self Learning)</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>K</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Komunitas Belajar (Community of Practices)</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>L</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Bimbingan di Tempat Kerja</Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, fontWeight: 400, width: 15 }}>M</Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>=   </Text>
                        <Text style={{ fontSize: 13, fontWeight: 400 }}>Magang/Praktik</Text>
                    </View>
                </View>
            </View>
            <View style={{...styles.card, marginTop: 20, height: 500}}>
                <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 15 }}>List Laporan</Text>
                <FlatList 
                data={summary?.lists}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <CardLaporanList 
                            item={item}
                            token={token}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.id}
                />
            </View>
        </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 16,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        //shadow android
        elevation: 2,
    },
    cardList: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        //shadow ios
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        //shadow android
        elevation: 2,
    },
    circle: {
        width: 50, 
        height: 50, 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: 25
    }
})
