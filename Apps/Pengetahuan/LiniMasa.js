import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setLiniMasa } from '../../store/Pengetahuan'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { useState } from 'react'

const listsLinimasa = [
    {
        avatar: require('../../assets/superApp/AvatarA.png'),
        image: require('../../assets/superApp/linimasa1.png'),
        nama: 'Drs. ANTAM NOVAMBAR, S.H., M.Hum.',
        tanggal: '12 Juni 2023',
        jenis: 'Penelitian',
        suka: '324',
        komentar: '12',
        dilihat: '45',
        judul: 'Judul Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',

    },
    {
        avatar: require('../../assets/superApp/AvatarA.png'),
        image: require('../../assets/superApp/linimasa2.png'),
        nama: 'Drs. ANTAM NOVAMBAR, S.H., M.Hum.',
        tanggal: '12 Juni 2023',
        jenis: 'Penelitian',
        suka: '324',
        komentar: '12',
        dilihat: '45',
        judul: 'Judul Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',

    },
    {
        avatar: require('../../assets/superApp/AvatarA.png'),
        image: require('../../assets/superApp/linimasa1.png'),
        nama: 'Drs. ANTAM NOVAMBAR, S.H., M.Hum.',
        tanggal: '12 Juni 2023',
        jenis: 'Penelitian',
        suka: '324',
        komentar: '12',
        dilihat: '45',
        judul: 'Judul Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
        deskripsi: 'JAKARTA (17/9) - Menteri Kelautan dan Perikanan Sakti Wahyu Trenggono meluncurkan logo baru kementerian sesuai Peraturan Menteri Kelautan dan Perikanan Nomor 36 Tahun 2021 tentang Logo Kementerian Kelautan dan Perikanan dan Penggunaannya. Peluncuran logo baru berlangsung di Gedung Mina Bahari III, Jakarta Pusat pada Jumat (17/9/2021). Alhamdulillah, setelah melalui proses panjang dan segala macam sensitivitasnya semua sudah dilalui dan akhirnya hari ini diresmikan logo baru. KKP harus bangkit, KKP harus hebat. Mari bekerja dengan semangat baru dengan logo baru untuk NKRI maju, ujar Menteri Trenggono dalam sambutannya. Logo baru terdiri dari enam elemen, terdiri dari lambang Garuda Pancasila, matahari terbit, jangkar, trisula, ombak laut, dan infiniti. Filosofi logo baru tersebut sejalan dengan tiga program terobosan KKP periode 2021 - 2024 yang bermuara pada keseimbangan ekologi dan ekonomi. Meliputi peningkatan PNBP dari sumber daya alam perikanan tangkap untuk peningkatan kesejahteraan neyalan melalui kebijakan penangkapan terukur di setiap Wilayah Pengelolaan Perikanan Negara Republik Indonesia. Kemudian pengembangan perikanan budidaya untuk peningkatan ekspor yang didukung riset kelautan dan perikanan. Serta pembangunan kempung-kampung perikanan budidaya tawar, payau dan laut berbasis kearifan lokal. Proses perubahan logo menurut Menteri Trenggono mencerminkan inklusivitas sebab melibatkan seluruh tingkatan, dari jajaran pimpinan hingga petugas lapangan Kementerian Kelautan dan Perikanan. Sebelum pergantian logo, Menteri Trenggono lebih dulu menggagas tagline KKP Rebound yang berarti menciptakan semangat kebangkitan, pembenahan tata kelola, dan peningkatan kinerja secara berkesinambungan. Logo baru KKP dibuat dengan semangat mewujudkan masyarakat kelautan dan perikanan yang sejahtera dan pengelolaan sumber daya kelautan dan perikanan yang berdaulat, mandiri, berkepribadian, serta berlandaskan gotong royong sesuai dengan prinsip ekonomi biru, terangnya. Sementara itu, Sekretaris Jenderal KKP Antam Novambar memaparkan penetapan logo baru melalui berbagai tahapan sejak beberapa bulan lalu. Mulai dari beauty contest yang diikuti seluruh perwakilan eselon I lingkup KKP yang berhasil memperoleh 39 usulan logo.',

    }
]


const CardLiniMasa = ({ item }) => {
    const navigation = useNavigation()
    const [like, setLike] = useState(0)

    const handleLike = () => {
        if (like === 0) {
            setLike(1)
        } else {
            setLike(0)
        }
    }

    return (
        <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            width: '90%',
            flex: 1,
            marginTop: 10,
            marginHorizontal: 20,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: '#171717',
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailLinimasa', {
                item: item
            })}>

                <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View>
                            <Image source={item.avatar} style={{ borderRadius: 50 }} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.nama}</Text>
                            <Text style={{ color: COLORS.grey, marginVertical: 5, fontSize: 13, }}>{item.tanggal}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Image source={item.image} style={{ width: 326, height: 160, borderRadius: 8 }} />
                    </View>

                    <Text style={{ textAlign: 'justify', color: COLORS.lighter, fontSize: FONTSIZE.H3 }}>{item.judul}</Text>

                    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', marginTop: 10 }}>
                        <View style={{
                            backgroundColor: COLORS.warningLight,
                            width: 100,
                            height: 30,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Ionicons name='document-outline' size={18} color={COLORS.warning} />
                            <Text style={{ color: COLORS.warning }}>{item.jenis}</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }} onPress={handleLike}>
                            <Ionicons name='thumbs-up-outline' size={18} color={like !== 0 ? COLORS.primary : null} />
                            <Text style={{ color: like !== 0 ? COLORS.primary : null }}>{item.suka}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Ionicons name='chatbox-outline' size={18} />
                            <Text>{item.komentar}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Ionicons name='eye-outline' size={18} />
                            <Text>{item.dilihat}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Ionicons name='information-circle-outline' size={18} />
                        </View>
                    </View>
                </View >
            </TouchableOpacity >
        </View >
    );
}

export const LiniMasa = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLiniMasa(listsLinimasa))
    }, []);

    const { linimasa } = useSelector(state => state.pengetahuan)
    return (
        <SafeAreaView>
            <View>
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
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Linimasa Pengetahuan</Text>
                    </View>
                </View>

                <FlatList
                    data={linimasa.lists}
                    renderItem={({ item }) => <CardLiniMasa
                        item={item}
                    />
                    }
                    keyExtractor={item => item.id}
                />

            </View>
        </SafeAreaView>
    )
}
