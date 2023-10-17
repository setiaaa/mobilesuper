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
import { CardListPegawai } from '../../components/CardListPegawai';






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