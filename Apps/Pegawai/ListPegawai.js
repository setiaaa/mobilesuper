import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Search } from '../../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setPegawai } from '../../store/Pegawai';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList
} from 'accordion-collapse-react-native'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import ListEmpty from '../../components/ListEmpty';

const dataPegawai = [
    {
        id: 1,
        avatar: AVATAR.U3,
        nama: 'TRIAN YUNANDA, S.PI, M.SC',
        nip: '197406261999031004',
        unit: 'Unit Pusat Pendidikan Kelautan dan Perikanan',
        harikerja: '17',
        hadir: '13',
        terlambat: '-',
        dinas: '4',
        cuti: '-',
        ipasn: '85',
        jenisipasn: 'Tinggi',
        kualifikasi: '60',
        kompetensi: '100',
        kinerja: '83,3',
        disiplin: '100',
        email: 'trian@kkp.com',
        satker: 'Kepala Biro Sumber Daya Manusia Aparatur Dan Organisasi, Sektretariat Jenderal',
        dataLinimasa: [
            {
                id: '1',
                image: require('../../assets/superApp/ikan.png'),
                judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
                nama: 'Rizky Novriansyah',
                jenis: 'Penelitian',

            },
            {
                id: '2',
                image: require('../../assets/superApp/ikan.png'),
                judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
                nama: 'Rizky Novriansyah',
                jenis: 'Kegiatan',
            },
            {
                id: '3',
                image: require('../../assets/superApp/ikan.png'),
                judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
                nama: 'Rizky Novriansyah',
                jenis: 'Infografis',
            },
            {
                id: '4',
                image: require('../../assets/superApp/ikan.png'),
                judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
                nama: 'Rizky Novriansyah',
                jenis: 'Penelitian',
            },
            {
                id: '5',
                image: require('../../assets/superApp/ikan.png'),
                judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
                nama: 'Rizky Novriansyah',
                jenis: 'Penelitian',
            },
            {
                id: '6',
                image: require('../../assets/superApp/ikan.png'),
                judul: 'Blog Pertama dari Penulis Sepenuh Hati untuk Pembaca',
                nama: 'Rizky Novriansyah',
                jenis: 'Penelitian',
            }
        ]
    },
    {
        id: 2,
        avatar: AVATAR.U3,
        nama: 'TRIAN YUNANDA, S.PI, M.SC',
        nip: '197406261999031005',
        unit: 'Unit Pusat Pendidikan Kelautan dan Perikanan',
        harikerja: '17',
        hadir: '13',
        terlambat: '-',
        dinas: '4',
        cuti: '-',
        ipasn: '85',
        jenisipasn: 'Tinggi',
        kualifikasi: '60',
        kompetensi: '100',
        kinerja: '83,3',
        disiplin: '100',
        email: 'trian@kkp.com',
        satker: 'Kepala Biro Sumber Daya Manusia Aparatur Dan Organisasi, Sektretariat Jenderal'
    },
    {
        id: 3,
        avatar: AVATAR.U3,
        nama: 'TRIAN YUNANDA, S.PI, M.SC',
        nip: '197406261999031006',
        unit: 'Unit Pusat Pendidikan Kelautan dan Perikanan',
        harikerja: '17',
        hadir: '13',
        terlambat: '-',
        dinas: '4',
        cuti: '-',
        ipasn: '85',
        jenisipasn: 'Tinggi',
        kualifikasi: '60',
        kompetensi: '100',
        kinerja: '83,3',
        disiplin: '100',
        email: 'trian@kkp.com',
        satker: 'Kepala Biro Sumber Daya Manusia Aparatur Dan Organisasi, Sektretariat Jenderal'
    },
    {
        id: 4,
        avatar: AVATAR.U3,
        nama: 'TRIAN YUNANDA, S.PI, M.SC',
        nip: '197406261999031007',
        unit: 'Unit Pusat Pendidikan Kelautan dan Perikanan',
        harikerja: '17',
        hadir: '13',
        terlambat: '-',
        dinas: '4',
        cuti: '-',
        ipasn: '85',
        jenisipasn: 'Tinggi',
        kualifikasi: '60',
        kompetensi: '100',
        kinerja: '83,3',
        disiplin: '100',
        email: 'trian@kkp.com',
        satker: 'Kepala Biro Sumber Daya Manusia Aparatur Dan Organisasi, Sektretariat Jenderal'
    },
    {
        id: 5,
        avatar: AVATAR.U3,
        nama: 'TRIAN YUNANDA, S.PI, M.SC',
        nip: '197406261999031008',
        unit: 'Unit Pusat Pendidikan Kelautan dan Perikanan',
        harikerja: '17',
        hadir: '13',
        terlambat: '-',
        dinas: '4',
        cuti: '-',
        ipasn: '85',
        jenisipasn: 'Tinggi',
        kualifikasi: '60',
        kompetensi: '100',
        kinerja: '83,3',
        disiplin: '100',
        email: 'trian@kkp.com',
        satker: 'Kepala Biro Sumber Daya Manusia Aparatur Dan Organisasi, Sektretariat Jenderal'
    },
    {
        id: 6,
        avatar: AVATAR.U3,
        nama: 'cekkk',
        nip: '197406261999031009',
        unit: 'Unit Pusat Pendidikan Kelautan dan Perikanan',
        harikerja: '17',
        hadir: '13',
        terlambat: '-',
        dinas: '4',
        cuti: '-',
        ipasn: '85',
        jenisipasn: 'Tinggi',
        kualifikasi: '60',
        kompetensi: '100',
        kinerja: '83,3',
        disiplin: '100',
        email: 'trian@kkp.com',
        satker: 'Kepala Biro Sumber Daya Manusia Aparatur Dan Organisasi, Sektretariat Jenderal'
    },
]

const CardListPegawai = ({ item, collapse, setCollapse, navigation }) => {
    return (
        <View style={{
            flexDirection: 'column', display: 'flex',
            backgroundColor: COLORS.white,
            width: 358,
            padding: 20,
            marginTop: 10,
            borderRadius: 8,
            marginHorizontal: 15,
        }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
                onPress={() => setCollapse({ nip: item.nip, toggle: true })}
            >
                <View style={{ width: 298 }}>
                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.nama}</Text>
                    <Text style={{ marginTop: 5 }}>{item.nip}</Text>
                </View>
                {collapse.nip === item.nip && collapse.toggle === true ? (
                    <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>
                        <Ionicons name='chevron-up' size={24} />
                    </TouchableOpacity>
                ) : (
                    <Ionicons name='chevron-down' size={24} />
                )}
            </TouchableOpacity>

            {collapse.nip === item.nip && collapse.toggle === true ? (
                <View>

                    <TouchableOpacity onPress={() => setCollapse({ nip: '', toggle: false })}>
                        <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>Unit Kerja</Text>
                        <Text style={{ marginTop: 5 }}>{item.unit}</Text>

                        <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>SATKER</Text>
                        <Text style={{ marginTop: 5 }}>{item.satker}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: 320,
                        height: 50,
                        backgroundColor: COLORS.danger,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        borderRadius: 8,
                    }}
                        onPress={() => navigation.navigate('DetailProfile', { item: item })}
                    >
                        <Text style={{ color: COLORS.white }}>Lihat Detail Pegawai</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                null
            )}
        </View>
    )
}


export const ListPegawai = () => {
    const dispatch = useDispatch()
    const [collapse, setCollapse] = useState({
        nip: '',
        toggle: false
    })
    useEffect(() => {
        dispatch(setPegawai(dataPegawai))
    }, []);

    const { pegawai } = useSelector(state => state.Pegawai)

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }

    useEffect(() => {
        setFilterData(pegawai.lists)
    }, [pegawai])

    useEffect(() => {
        if (search !== '') {
            const data = pegawai.lists.filter((item) => {
                return item.nama.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(pegawai.lists)
        }
    }, [search])

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
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Pegawai</Text>
                    </View>
                </View>

                <View style={{ width: '90%', marginVertical: 20, marginHorizontal: 20, }}>
                    <Search
                        placeholder={'Cari'}
                        onSearch={filter}
                    />
                </View>

                <FlatList
                    data={filterData}
                    renderItem={({ item }) => <CardListPegawai
                        item={item}
                        collapse={collapse}
                        setCollapse={setCollapse}
                        navigation={navigation}
                    />
                    }
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() => (
                        <ListEmpty />
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        borderRadius: 8,
        width: 362
    },
    cardCollapse: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        width: 362
    }
})