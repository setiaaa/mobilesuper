import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PdfReader from 'rn-pdf-reader-js-improved';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { useNavigation } from "@react-navigation/native";
import { Button } from '../../components/Button';
import { CollapseCard } from '../../components/CollapseCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { TouchableOpacity } from 'react-native';


export default function DetailDashboard({ route }) {
    const { data } = route.params
    const [active, setactive] = useState(null)
    const navigation = useNavigation()
    const refresh = () => window.location.reload(true)

    let judul = data.subjek.replace(/\s/g, '-')

    const downloadFromUrl = async () => {
        const filename = judul + ".pdf"
        const result = await FileSystem.downloadAsync(
            data.link,
            FileSystem.documentDirectory + filename
        );
        console.log(result);

        save(result.uri);
    };
    const save = (uri) => {
        shareAsync(uri)
    }


    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <StatusBar style="auto" />
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
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Detail</Text>
                    </View>
                </View>
                <View style={styles.cardTop}>
                    <View>
                        <Text style={styles.judul}>{data.bentuk}</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.subJudul}>{data.subjek}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Text style={styles.subJudul}>Nomor {data.nomor}/{data.tahun}</Text>
                            <View style={{ flex: 1, marginRight: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
                                <Text style={styles.subJudul}>Status</Text>
                                <View style={{ backgroundColor: data.status === 'Berlaku' ? '#d9f5e5' : 'red', borderRadius: 16, height: 30, width: 70, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={styles.subJudul}>{data.status}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* {
                    active ? (
                        <PdfReader style={{ width: '90%', marginLeft: 20, height: 500, marginTop: 30 }}
                            source={{
                                uri: item.link
                            }}
                            webviewProps={{
                                startInLoadingState: true,
                            }}
                        />
                    ) : null
                } */}
                </View>
                <CollapseCard
                    teu_badan={data.teu_badan}
                    singkatan_peraturan_cat={data.singkatan_peraturan_cat}
                    tempat_penetapan={data.tempat_penetapan}
                    tgl_penetapan={data.tgl_penetapan}
                    tgl_diundangkan={data.tgl_diundangkan}
                    subjek={data.subjek}
                    sumber_peraturan={data.sumber_peraturan}
                    bahasa={data.bahasa}
                    bidanghukum={data.bidanghukum}
                />
                <View style={{ flexDirection: 'row', gap: 20, marginLeft: 40 }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Dilihat</Text>
                        <View style={{ marginTop: 5, flexDirection: 'row', gap: 5, display: 'flex', alignItems: 'center' }}>
                            <Ionicons name='eye-outline' size={15} color={'black'} />
                            <Text style={styles.text}>{data.jumlah_view}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Diunduh</Text>
                        <View style={{ marginTop: 5, flexDirection: 'row', gap: 5, display: 'flex', alignItems: 'baseline' }}>
                            <Ionicons name='download-outline' size={15} color={'black'} />
                            <Text style={styles.text}>{data.jumlah_download}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <View>
                        <Button title='Unduh File PDF' style={styles.buttonUnduh} onClick={downloadFromUrl} />
                    </View>
                    <View>
                        <Button title='Buka File PDF' textColor={'white'} style={styles.buttonBuka} onClick={() => navigation.navigate('PdfViewer', {
                            data: data
                        })}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    judul: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'left',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    subJudul: {
        fontSize: 16,
        fontWeight: '300',
    },
    buttonBuka: {
        backgroundColor: '#800000',
        borderRadius: 12,
        marginTop: 20,
        width: 350,
        marginBottom: 20,
    },
    buttonUnduh: {
        backgroundColor: '#e3efb5',
        borderRadius: 12,
        marginTop: 20,
        width: 350,
    },
    cardTop: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    text: {
        fontSize: 13,
        fontWeight: '300',
    },
});
