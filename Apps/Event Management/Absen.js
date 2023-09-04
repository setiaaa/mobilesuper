import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Search } from '../../components/Search'
import { setAbsen } from '../../store/Event'
import ListEmpty from '../../components/ListEmpty'


const listAbsen = [
    {
        nama: 'Yani Dama Putera',
        status: 'Menunggu',
        waktu: '-',

    },
    {
        nama: 'Yani Dama Putera',
        status: 'Konfirmasi',
        waktu: '7.30',

    },
    {
        nama: 'Yani Dama Putera',
        status: 'Konfirmasi',
        waktu: '7.30',

    },
    {
        nama: 'Yani Dama Putera',
        status: 'Konfirmasi',
        waktu: '7.30',

    },
    {
        nama: 'Yani Dama Putera',
        status: 'Konfirmasi',
        waktu: '7.30',

    },
]

const CardListAbsen = ({ item }) => {
    const [user, setUser] = useState('member')
    const [checkIn, setCheckin] = useState('')
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={
                {
                    width: 358,
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    marginTop: 10,
                    padding: 20
                }}>
                <Text>{item.nama}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text>Status</Text>
                        <View style={{
                            width: 80,
                            height: 24,
                            borderRadius: 30,
                            backgroundColor: item.status === 'Konfirmasi' ? COLORS.successLight : item.status === 'Menunggu' ? COLORS.infoLight : null,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: item.status === 'Konfirmasi' ? COLORS.success : item.status === 'Menunggu' ? COLORS.info : null,
                            }}>{item.status}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        {user === 'admin' && checkIn === '' ? (
                            <TouchableOpacity style={{
                                width: 97,
                                height: 24,
                                borderRadius: 8,
                                backgroundColor: COLORS.foundation,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onPress={() => setCheckin('1')}
                            >
                                <Text style={{ color: COLORS.white }}>Check In</Text>
                            </TouchableOpacity>
                        ) : user === 'resepsionis' && checkIn === '' ? (
                            <TouchableOpacity style={{
                                width: 97,
                                height: 24,
                                borderRadius: 8,
                                backgroundColor: COLORS.foundation,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onPress={() => setCheckin('1')}
                            >
                                <Text style={{ color: COLORS.white }}>Check In</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                <Text style={{ width: 58, textAlign: 'center' }}>Waktu Check In</Text>
                                <View style={{ width: 47, height: 24, borderRadius: 30, backgroundColor: COLORS.ExtraDivinder, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>{item.waktu}</Text>
                                </View>
                            </View>
                        )}
                    </View>

                </View>
            </View>
        </View>
    )
}

export const Absen = () => {
    const navigation = useNavigation()
    const [checkIn, setCheckin] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAbsen(listAbsen))
    }, [])

    const { absen } = useSelector(state => state.event)

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }

    useEffect(() => {
        setFilterData(absen)
    }, [absen])

    useEffect(() => {
        if (search !== '') {
            const data = absen.filter((item) => {
                return item.nama.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(absen)
        }
    }, [search])

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
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Absensi</Text>
                </View>
            </View>

            <View style={{ width: '90%', marginTop: 20, marginHorizontal: 20 }}>
                <Search
                    placeholder={"Cari"}
                    onSearch={filter}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
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

                {checkIn === '' ? (

                    <TouchableOpacity style={{
                        width: 157,
                        height: 40,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.infoDanger
                    }}
                        onPress={() => {
                            setCheckin('checkin')
                        }}
                    >
                        <Text style={{ color: COLORS.white }}>Check In</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{
                        width: 157,
                        height: 40,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lighter
                    }}
                        onPress={() => {
                            setCheckin('')
                        }}
                    >
                        <Text style={{ color: COLORS.white }}>Sudah Check In</Text>
                    </TouchableOpacity>
                )}


            </View>

            <FlatList
                data={filterData}
                renderItem={({ item }) => <CardListAbsen
                    item={item}
                />
                }
                style={{ marginVertical: 20 }}
                ListEmptyComponent={() => (
                    <ListEmpty />
                )}
            />
        </SafeAreaView>
    )
}
