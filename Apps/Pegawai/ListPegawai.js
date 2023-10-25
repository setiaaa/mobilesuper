import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, TouchableOpacity } from 'react-native'
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
import { CardListPegawai } from '../../components/CardListPegawai';
import { Loading } from '../../components/Loading';
import Spinner from 'react-native-loading-spinner-overlay';
import { StatusBar } from 'expo-status-bar';






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
    const [page, setPage] = useState(0)

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
        dispatch(setPegawai([]))
        setPage(0)
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getPegawai({ token, page }))
            console.log(page, 'page')
        }
    }, [token, page])

    const { pegawai, loading } = useSelector(state => state.Pegawai)
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

    const loadMore = () => {
        if (pegawai.lists.length % 10 === 0) {
            setPage(page + 1)
        }
    }

    const navigation = useNavigation()

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80 }}>
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

            <View
                style={{ flex: 1, paddingBottom: 24 }}
            >
                <FlatList
                    data={pegawai.lists}
                    renderItem={({ item }) => <CardListPegawai
                        item={item}
                        collapse={collapse}
                        setCollapse={setCollapse}
                        navigation={navigation}
                        token={token}
                        loading={loading}
                    />
                    }
                    style={{ flex: 1 }}
                    ListFooterComponent={() => (
                        loading && (
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            </View>
                        )
                    )}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    onEndReached={loadMore}
                    ListEmptyComponent={() => (
                        <ListEmpty />
                    )}
                />
                {/* {loading && <Loading />} */}
            </View>
        </>
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