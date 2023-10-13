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
import { Platform } from 'react-native';
import { getTokenValue } from '../../service/session';
import { getDetailPegawai, getPegawai } from '../../service/api';



const CardListPegawai = ({ item, collapse, setCollapse, token }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const getDetail = (nip) => {
        const params = { token, nip }
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailPegawai(params))
    }
    return (
        <View style={{
            flexDirection: 'column', display: 'flex',
            backgroundColor: COLORS.white,
            width: '90%',
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
                <View style={{ width: Platform.OS === 'ios' ? '92%' : '93%' }}>
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
                        <Text style={{ marginTop: 5 }}>{item.nama_jabatan}</Text>

                        <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold }}>SATKER</Text>
                        <Text style={{ marginTop: 5 }}>{item.unit_kerja}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: COLORS.danger,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        borderRadius: 8,
                    }}
                        onPress={() => {
                            getDetail(item.nip)
                            navigation.navigate('DetailProfile')
                        }}
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
    // useEffect(() => {
    //     dispatch(setPegawai(dataPegawai))
    // }, []);
    const [token, setToken] = useState('')

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getPegawai(token))
        }
    }, [token])

    const { pegawai } = useSelector(state => state.Pegawai)
    // const filter = (event) => {
    //     setSearch(event)
    // }

    // useEffect(() => {
    //     setFilterData(pegawai.lists)
    // }, [pegawai])

    // useEffect(() => {
    //     if (search !== '') {
    //         const data = pegawai.lists.filter((item) => {
    //             return item.nama.toLowerCase().includes(search.toLowerCase());
    //         })
    //         setFilterData(data)
    //     } else {
    //         setFilterData(pegawai.lists)
    //     }
    // }, [search])

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
                    // onSearch={filter}
                    />
                </View>

                <FlatList
                    data={pegawai.lists}
                    renderItem={({ item }) => <CardListPegawai
                        item={item}
                        collapse={collapse}
                        setCollapse={setCollapse}
                        navigation={navigation}
                        token={token}
                    />
                    }
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
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