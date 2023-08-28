import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setAgendaDetail, setAgendaLists } from '../../store/Event'
import { useNavigation } from '@react-navigation/native'


const listsAgenda = [
    {
        id: '1',
        judul: 'Bug Fixing Aplikasi',
        tanggal: '12 Juli 2023',
        jam: '08.00 - 09.00',
        ruangan: 'Ruangan 1',
        jmltodo: '3',
        anggota: '12',
        jenis: 'Agenda',
        deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
        pic: 'Rizky Novriansyah',
        pesertaevent: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        pesertaagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        tamuagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 3,
                gambar: 'https://www.africau.edu/images/default/sample.pdf',
                nama: 'linimasa1.pdf'
            },
            {
                id: 4,
                gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                nama: 'linimasa2.xls'
            }
        ],
    },
    {
        id: '2',
        judul: 'Bug Fixing Aplikasi',
        tanggal: '12 Juli 2023',
        jam: '08.00 - 09.00',
        ruangan: 'Ruangan 1',
        jmltodo: '3',
        anggota: '12',
        jenis: 'Agenda',
        deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
        pic: 'Rizky Novriansyah',
        pesertaevent: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        pesertaagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        tamuagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 3,
                gambar: 'https://www.africau.edu/images/default/sample.pdf',
                nama: 'linimasa1.pdf'
            },
            {
                id: 4,
                gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                nama: 'linimasa2.xls'
            }
        ],
    },
    {
        id: '2',
        judul: 'Bug Fixing Aplikasi',
        tanggal: '12 Juli 2023',
        jam: '08.00 - 09.00',
        ruangan: 'Ruangan 1',
        jmltodo: '3',
        anggota: '12',
        jenis: 'Agenda',
        deskripsi: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        tempat: 'Hotel Tebu arcamanik kabupaten bandung jawa barat',
        pic: 'Rizky Novriansyah',
        pesertaevent: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        pesertaagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        tamuagenda: [
            { image: AVATAR.U2 },
            { image: AVATAR.U2 },
        ],
        lampiran: [
            {
                id: 1,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 2,
                gambar: require('../../assets/superApp/linimasa1.png'),
                nama: 'linimasa1.png'
            },
            {
                id: 3,
                gambar: 'https://www.africau.edu/images/default/sample.pdf',
                nama: 'linimasa1.pdf'
            },
            {
                id: 4,
                gambar: 'https%3A%2F%2Fdownload.microsoft.com%2Fdownload%2F1%2F4%2FE%2F14EDED28-6C58-4055-A65C-23B4DA81C4DE%2FFinancial%2520Sample.xlsx&wdOrigin',
                nama: 'linimasa2.xls'
            }
        ],
    },
]

const CardListDetail = ({ item }) => {
    const navigation = useNavigation()
    const { agenda } = useSelector(state => state.event)
    const dispatch = useDispatch()

    const getDetail = (id) => {
        const data = agenda.lists.find(item => item.id === id)
        dispatch(setAgendaDetail(data))
    }
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{
                width: 358,
                backgroundColor: COLORS.white,
                marginTop: 10,
                borderRadius: 8,
                padding: 20,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}
                onPress={() => {
                    getDetail(item.id)
                    navigation.navigate('MainDetailAgenda')
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>
                    <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text>{item.tanggal}</Text>
                        <Text style={{ marginTop: 5 }}>{item.jam}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='list-circle-outline' size={24} color={COLORS.lighter} />
                        <Text>{item.jmltodo}</Text>
                        <Text>Todo</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>{item.ruangan}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='people-outline' size={24} color={COLORS.lighter} />
                        <Text>{item.anggota}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const AgendaEvent = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setAgendaLists(listsAgenda))
    }, [])

    const { agenda } = useSelector(state => state.event)
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Agenda</Text>
                </View>
            </View>

            <View style={{ width: 358, marginHorizontal: 15, marginVertical: 20 }}>
                <Search placeholder={'Cari Agenda'} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='filter-outline' size={24} />
                    </View>

                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='menu-outline' size={24} />
                    </View>
                </View>

                <TouchableOpacity style={{
                    width: 157,
                    backgroundColor: COLORS.infoDanger,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8
                }}>
                    <Text style={{ color: COLORS.white }}>Tambah Agenda</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={agenda.lists}
                renderItem={({ item }) => <CardListDetail
                    item={item}
                />
                }
                style={{ marginVertical: 10 }}
            />

        </SafeAreaView>
    )
}
