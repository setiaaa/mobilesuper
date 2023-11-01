import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, DATETIME, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Search } from '../../components/Search'
import { setAbsen } from '../../store/Event'
import ListEmpty from '../../components/ListEmpty'
import { getTokenValue } from '../../service/session'
import { getlistAbsen } from '../../service/api'
import moment from 'moment'
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

const CardListAbsen = ({ item, loading }) => {
    const [user, setUser] = useState('member')
    const [checkIn, setCheckin] = useState('')
    const navigation = useNavigation()
    const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={
                {
                    width: '90%',
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    marginTop: 10,
                    padding: 20
                }}
            >
                {loading ? (
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                ) : (

                    <Text>{item.member?.nama}</Text>
                )}
                <View style={{ marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={{ width: 110 }}>Status</Text>
                        {loading ? (
                            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                        ) : (
                            <View style={{
                                width: 80,
                                height: 24,
                                borderRadius: 30,
                                backgroundColor: item.status === 'hadir' ? COLORS.successLight : item.status === 'waiting' ? COLORS.infoLight : null,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: item.status === 'hadir' ? COLORS.success : item.status === 'waiting' ? COLORS.info : null,
                                }}>{item.status}</Text>
                            </View>
                        )}
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
                            <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                                <Text style={{ width: 120, }}>Waktu Check In</Text>
                                {loading ? (
                                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} height={20} />
                                ) : (
                                    <View style={{ width: 200, height: 24, borderRadius: 30, backgroundColor: COLORS.ExtraDivinder, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{moment(item.updated_at, 'HH:mm:ss').format(DATETIME.LONG_DATETIME)}</Text>
                                    </View>
                                )}
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
    const [token, setToken] = useState('')

    const { absen, agenda, loading } = useSelector(state => state.event)
    const idagenda = agenda.detail?.id
    const absenLists = absen.lists
    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getlistAbsen({ token, idagenda }))
        }
    }, [token])

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }


  useEffect(() => {
    setFilterData(absen.lists)
  }, [absen])

  useEffect(() => {
    if (search !== '') {
      const data = absen.lists?.filter((item) => {
        return item.member?.nama.toLowerCase().includes(search.toLowerCase());
      })
      setFilterData(data)
    } else {
      setFilterData(absen.lists)
    }
  }, [search])

    // useEffect(() => {
    //     setFilterData(absen)
    // }, [absen])

    // useEffect(() => {
    //     if (search !== '') {
    //         const data = absen.filter((item) => {
    //             return item.nama.toLowerCase().includes(search.toLowerCase());
    //         })
    //         setFilterData(data)
    //     } else {
    //         setFilterData(absen)
    //     }
    // }, [search])

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

            {/* <View style={{ width: '90%', marginTop: 20, marginHorizontal: 20 }}>
                <Search
                    placeholder={"Cari"}
                // onSearch={filter}
                />
            </View> */}

            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
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
                </View> */}

            {/* {checkIn === '' ? (

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
                )} */}


            {/* </View> */}

            <View style={{ padding: 20}}>
                <View style={{ }}>
                        <Search
                            placeholder={'Cari'}
                            onSearch={filter}
                        />
                </View>
            </View>

            <FlatList
                data={filterData}
                renderItem={({ item }) => <CardListAbsen
                    item={item}
                    loading={loading}
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
