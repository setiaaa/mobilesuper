import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search';
import { StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const Item = ({ image, tanggal, subtitle, title, id, data, item }) => {
    const navigation = useNavigation()
    return (
        <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            width: 361,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginLeft: 15
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailBerita', {
                item: item
            })}>
                <View style={styles.item}>
                    <Image source={image} style={{ height: 193, width: 361, borderRadius: 16 }} />
                </View>
                <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <Text style={{ color: '#6B7280', marginVertical: 5, fontSize: 10, fontWeight: 400 }}>{tanggal}</Text>
                    <Text style={{ color: '#6B7280', marginVertical: 5, fontSize: 10, fontWeight: 400 }}>{subtitle}</Text>
                    <Text style={{ color: '#111827', marginVertical: 5, fontSize: 10, fontWeight: 400 }}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const datas = [
    {
        id: 1,
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan1.. ',
        title: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/Card.png'),
        pembuat: 'Firman Hidranto',
        dilihat: '219'
    },
    {
        id: 2,
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan2.. ',
        title: 'Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan..',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/Card.png'),
        pembuat: 'Firman Hidranto',
        dilihat: '219'
    },
    {
        id: 3,
        tanggal: 'Senin, 5 Juni 2023',
        subtitle: 'Jakarta, (20/2) - Kementerian Kelautan dan Perikanan (KKP) bersama dengan dewan.. ',
        title: 'KKP RESMI PUNYA LOGO BARU',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        image: require('../../assets/superApp/logobaru.png'),
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',
        pembuat: 'Firman Hidranto',
        dilihat: '219'
    },
];

// const renderItem = ({ item }) => (
//     <Item
//         image={item.image}
//         tanggal={item.tanggal}
//         subtitle={item.subtitle}
//         dari={item.dari}
//         id={item.id}
//         item={item}
//     />
// );


export const ListBerita = () => {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
            <View style={{ backgroundColor: '#752A2B', height: '10%', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                        <Ionicons name='chevron-back' size={24} color={'#752A2B'} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 40 }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>Berita</Text>
                </View>
            </View>
            <View style={{ width: '90%', marginLeft: 20, marginTop: 20 }}>
                <Search
                    placeholder={'Pencarian'}
                />
            </View>
            <FlatList
                data={datas}
                renderItem={({ item }) => <Item
                    image={item.image}
                    tanggal={item.tanggal}
                    subtitle={item.subtitle}
                    title={item.title}
                    id={item.id}
                    item={item}
                />
                }
                keyExtractor={item => item.id}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    item: {
    }
})
