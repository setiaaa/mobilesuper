import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { Search } from '../../components/Search'
import { Portal } from 'react-native-portalize';
import ListEmpty from '../../components/ListEmpty';
import { Dropdown } from '../../components/DropDown';
import { getTokenValue } from '../../service/session';
import { getDetailLinimasa, getDetailPenilaian, getListPenilaian, getNilai, getTotalPenilaian } from '../../service/api';
import moment from 'moment';
import { } from 'react-native-safe-area-context';
import { Loading } from '../../components/Loading';
import { RefreshControl } from 'react-native';


const CardPenilaian = ({ item, token }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const getDetail = (id) => {
        console.log(token)
        // const data = { token: token, id: id }
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailLinimasa({ token, id }))
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                width: '90%',
                gap: 10,
                marginTop: 10,
                backgroundColor: COLORS.white,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,

            }}
                onPress={() => {
                    dispatch(getDetailPenilaian({ token: token, id: item.id }))
                    dispatch(getNilai({ token: token }))
                    navigation.navigate('DetailPenilain')
                }}
            >
                <View>
                    <Image source={{ uri: item.cover }} style={{ width: 70, height: 50 }} />
                </View>
                <View style={{ width: '75%' }}>
                    <Text>{item.title}</Text>
                    <View style={{ gap: 10, marginTop: 10, }}>
                        <Text style={{ color: COLORS.lighter }}>Tanggal: {moment(item.published_date, 'HH:mm:ss').format('DD MMM YYYY')}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                            <Text style={{ color: COLORS.lighter }}>Poin:</Text>
                            {item.is_scored !== true ? (
                                <View style={{
                                    borderWidth: 1,
                                    width: 80,
                                    padding: 5,
                                    borderColor: COLORS.primary,
                                    borderRadius: 16,
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.primary }}>Waiting</Text>
                                </View>
                            ) : (
                                <View style={{
                                    padding: 5,
                                    width: 80,
                                    backgroundColor: COLORS.success,
                                    borderRadius: 16,
                                    alignItems: 'center'

                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.white }}>{item.score}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const dataKuartal = [
    {
        key: '1',
        value: 'TW1'
    },
    {
        key: '2',
        value: 'TW2'
    },
    {
        key: '3',
        value: 'TW3'
    },
    {
        key: '4',
        value: 'TW4'
    },
]

export const PenilaianPenggetahaun = () => {
    const navigation = useNavigation()
    const [quarter, setQuarter] = useState()
    // const [kuartal, setKuartal] = useState(dataKuartal)
    const [listYear, setListYear] = useState()
    const [token, setToken] = useState('')
    const isFocused = useIsFocused()

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)


    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present()
    }

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }
    useEffect(() => {
        setFilterData(penilaian.lists)
    }, [penilaian])

    useEffect(() => {
        if (search !== '') {
            const data = penilaian.lists.filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(penilaian.lists)
        }
    }, [search])

    const [year, setYear] = useState({ key: new Date().getFullYear(), value: new Date().getFullYear() })

    const month = new Date().getMonth() + 1

    useEffect(() => {
        let q = ''
        if (1 <= month && month <= 3) {
            q = '1'
        } else if (4 <= month && month <= 6) {
            q = '2'
        } else if (7 <= month && month <= 9) {
            q = '3'
        } else {
            q = '4'
        }
        setQuarter({
            key: q,
            value: q == 1 ? 'TW1' : q == 2 ? 'TW2' : q == 3 ? 'TW3' : 'TW4'
        })

        let thn = []
        for (let i = 2023; i <= year; i++) {
            thn.push({
                key: i,
                value: i
            })
        }

        setListYear(thn)
    }, [])

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '' && isFocused) {
            let data = {
                token: token,
                tahun: year.value,
                TW: quarter.key
            }
            // dispatch(getDivision(token))
            dispatch(getListPenilaian(data))
            dispatch(getTotalPenilaian(data))
            // dispatch(getDivisionTree({ token: token, id: kategori.key }))
        }
    }, [token, quarter, year, isFocused])

    const { penilaian, loading } = useSelector(state => state.pengetahuan)

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        try {
            if (token !== '' && isFocused) {
                let data = {
                    token: token,
                    tahun: year.value,
                    TW: quarter.key
                }
                // dispatch(getDivision(token))
                dispatch(getListPenilaian(data))
                dispatch(getTotalPenilaian(data))
                // dispatch(getDivisionTree({ token: token, id: kategori.key }))
            }
            console.log('Refresh Berhasil')
        } catch (error) {
            console.log('Refresh gagal:', error)
        }

        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, [token, quarter, year, isFocused]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                null
            )}
            <View style={{ flex: 1 }}>

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
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate("Home")}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Penilaian</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={{
                        height: 43,
                        width: "91%",
                        backgroundColor: COLORS.white,
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingLeft: 10
                    }}
                        onPress={() => {
                            bottomSheetAttach()
                        }}
                    >
                        <Ionicons name='search-outline' size={24} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 20, gap: 5 }}>
                    <View style={{
                        width: '50%',
                    }}>
                        <Dropdown
                            data={listYear}
                            placeHolder={'Pilih Tahun'}
                            backgroundColor={COLORS.white}
                            selected={year}
                            setSelected={setYear}
                        />
                    </View>

                    <View style={{
                        width: "50%",
                    }}>
                        <Dropdown
                            data={dataKuartal}
                            placeHolder={'Pilih Kuartal'}
                            backgroundColor={COLORS.white}
                            selected={quarter}
                            setSelected={setQuarter}
                        />
                    </View>

                    {/* <TouchableOpacity style={{
                        height: 43,
                        width: "12%",
                        backgroundColor: COLORS.white,
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingLeft: 10
                    }}
                        onPress={() => {
                            bottomSheetAttach()
                        }}
                    >
                        <Ionicons name='search-outline' size={24} />
                    </TouchableOpacity> */}
                </View>

                <Portal>
                    <BottomSheetModalProvider>
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            snapPoints={animatedSnapPoints}
                            handleHeight={animatedHandleHeight}
                            contentHeight={animatedContentHeight}
                            index={0}
                            style={{ borderRadius: 50 }}
                            keyboardBlurBehavior="restore"
                            android_keyboardInputMode="adjust"
                            backdropComponent={({ style }) => (
                                <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                            )}
                        >
                            <BottomSheetView onLayout={handleContentLayout} >
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                        {/* <TouchableOpacity onPress={() => bottomSheetAttachClose()}>
                                    <Ionicons name='chevron-back-outline' size={24} />
                                </TouchableOpacity> */}
                                        <View style={{ width: '85%' }}>
                                            <Search
                                                placeholder={'Cari'}
                                                onSearch={filter}
                                            />
                                        </View>

                                        <TouchableOpacity onPress={() => {
                                            bottomSheetAttachClose()
                                        }}>
                                            <Text style={{ color: COLORS.danger }}>Batal</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* custom divider */}
                                    <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 20 }} />

                                    <View style={{ marginBottom: 50 }}>
                                        <FlatList
                                            data={filterData}
                                            renderItem={({ item }) =>
                                                <CardPenilaian
                                                    item={item}
                                                />
                                            }
                                            keyExtractor={item => item.id}
                                            ListEmptyComponent={() =>
                                                <ListEmpty />
                                            }
                                        />
                                    </View>

                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                </Portal>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 5 }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        width: "49.5%",
                        height: 130,
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}>
                            <Image source={require('../../assets/superApp/unreviewed.png')} />
                            <Text style={{ fontSize: 25, fontWeight: FONTWEIGHT.bold, marginTop: 10 }}>{penilaian?.total?.total_unreviewed}</Text>
                        </View>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, marginVertical: 5 }}>BELUM DINILAI</Text>
                        <Text style={{ color: COLORS.lighter }}>pada triwulan terakhir</Text>
                    </View>

                    <View style={{
                        backgroundColor: COLORS.white,
                        width: "49.5%",
                        height: 130,
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}>
                            <Image source={require('../../assets/superApp/reviewed.png')} />
                            <Text style={{ fontSize: 25, fontWeight: FONTWEIGHT.bold, marginTop: 10 }}>{penilaian?.total?.total_reviewed}</Text>
                        </View>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, marginVertical: 5 }}>TELAH DINILAI</Text>
                        <Text style={{ color: COLORS.lighter }}>pada triwulan terakhir</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={penilaian.lists}
                        renderItem={({ item }) => <CardPenilaian
                            item={item}
                            token={token}
                        />
                        }
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        style={{ height: 400 }}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        height: 193, width: 350, borderRadius: 16
    },
    imageAndroid: {
        height: 193, width: 369, borderRadius: 16
    },
})