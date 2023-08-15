import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native-safe-area-context';


const data = [
    {
        image: require('../../assets/superApp/gambar.png'),
        judul: 'Kesekretariatan'
    },
    {
        image: require('../../assets/superApp/gambar2.png'),
        judul: 'Pengelolaan Ruang Laut',
    },
    {
        image: require('../../assets/superApp/gambar3.png'),
        judul: 'Perikanan Tangkap',
    },
    {
        image: require('../../assets/superApp/gambar4.png'),
        judul: 'Perikanan Budidaya',
    },
    {
        image: require('../../assets/superApp/gambar5.png'),
        judul: 'Penguatan Daya Saing Produk Kelautan dan Perikanan',
    },
    {
        image: require('../../assets/superApp/gambar6.png'),
        judul: 'Pengawasan Sumber Daya Kelautan dan Perikanan',
    },
    {
        image: require('../../assets/superApp/gambar7.png'),
        judul: 'Pengawasan Internal',
    },
    {
        image: require('../../assets/superApp/gambar8.png'),
        judul: 'Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
    },
    {
        image: require('../../assets/superApp/gambar9.png'),
        judul: 'Karantina Ikan, Pengendalian Mutu dan Hasil Keamanan',
    }
];

const DataGrid = ({ judul, item }) => {

    return (
        <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
            <View style={styles.cardNo}>
                <Image source={item.image} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: FONTWEIGHT.normal,
                            marginBottom: 10,
                            width: 100,
                            textAlign: 'center'
                        }}
                    // numberOfLines={2}
                    >
                        {judul}
                    </Text>
                </View>
            </View>
        </View>
    )
}


export const Tematik = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
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
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Tematik</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: COLORS.white, width: '95%', borderRadius: 16, marginLeft: 10, marginVertical: 20 }}>
                    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Peraturan Tematik</Text>
                        <Text style={{ fontSize: FONTSIZE.H3, fontWeight: FONTWEIGHT.normal, marginTop: 20 }}>Kumpulan Peraturan Perundang-undangan Bidang Kelautan dan Perikanan</Text>
                    </View>
                    <FlatList
                        key={'#'}
                        data={data}
                        renderItem={({ item }) => <DataGrid
                            judul={item.judul}
                            tanggal={item.tanggal}
                            item={item}
                        />
                        }
                        numColumns={3}
                        keyExtractor={item => "#" + item.id}
                        style={{ height: 460 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardNo: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginBottom: 10
    },
})