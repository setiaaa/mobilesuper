import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setDokumentlists } from '../../store/Repository';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Portal } from 'react-native-portalize';
import ListEmpty from '../../components/ListEmpty'

const DataList = ({ item, bottomSheetAttach }) => {
    return (
        <BottomSheetModalProvider>
            <View key={item.id} style={{ flexDirection: 'row', marginVertical: 20, }}>
                <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                    <View style={styles.cardNo}>
                        <Ionicons name='document-outline' size={30} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>
                <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                            <Text style={{ fontSize: 13, fontWeight: FONTWEIGHT.normal, marginBottom: 10 }}>{item.judul}</Text>
                            <Text style={{ fontSize: 11, fontWeight: FONTWEIGHT.normal, marginBottom: 10, color: COLORS.lighter }}>{item.tanggal}</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginRight: 20 }}>
                            <Ionicons name='ellipsis-vertical-outline' size={24} color={COLORS.grey} />
                        </View>
                    </View>
                </View>
            </View>
        </BottomSheetModalProvider>
    )
}

const DataGrid = ({ item, bottomSheetAttach }) => {

    return (
        <View key={item.id} style={{ marginVertical: 20, marginHorizontal: 25 }}>
            <View style={styles.cardNo}>
                <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                    <Ionicons name='document-outline' size={30} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => bottomSheetAttach(item)}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: FONTWEIGHT.normal,
                                marginBottom: 10,
                                width: 100,
                                textAlign: 'center'
                            }}
                            numberOfLines={2}
                        >
                            {item.judul}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', }}>
                        <Ionicons name='ellipsis-vertical-outline' size={24} color={COLORS.grey} />
                    </View>
                </View>
            </View>
        </View>
    )
}


export const Dokumen = () => {
    const [variant, setVariant] = useState('list')
    const [dataM, setDataM] = useState([])

    const handleVariant = (cekVariant) => {
        setVariant(cekVariant)
    }
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = (item) => {
        bottomSheetModalRef.current?.present()
        setDataM(item)
    }

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    const { dokumen } = useSelector(state => state.repository)

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }

    useEffect(() => {
        setFilterData(dokumen.lists)
    }, [dokumen])

    useEffect(() => {
        if (search !== '') {
            const data = dokumen.lists.filter((item) => {
                return item.judul.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(dokumen.lists)
        }
    }, [search])

    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 20,
                            width: 28,
                            height: 28,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 20
                        }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={'#800000'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>Repositori</Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', marginLeft: 20, marginVertical: 20 }}>
                        <Search
                            placeholder={'Cari'}
                            onSearch={filter}
                        />
                    </View>
                    <View style={styles.card}>
                        <View style={{ marginRight: 40, marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => handleVariant('list')}>
                                <View style={styles.circleList}>
                                    <Ionicons name='list-outline' size={24} color={variant === 'list' ? COLORS.primary : COLORS.grey} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleVariant('grid')}>
                                <View style={styles.circleList}>
                                    <Ionicons name='apps-outline' size={24} color={variant === 'grid' ? COLORS.primary : COLORS.grey} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Divider bold />
                        {variant === 'list' ? (
                            <FlatList
                                key={"_"}
                                data={filterData}
                                renderItem={({ item }) => <DataList
                                    bottomSheetAttach={bottomSheetAttach}
                                    // judul={item.judul}
                                    // tanggal={item.tanggal}
                                    item={item}
                                />
                                }
                                keyExtractor={item => "_" + item.id}
                                style={{ height: 400 }}
                                ListEmptyComponent={() => (
                                    <ListEmpty />
                                )}
                            />

                        ) : (
                            <FlatList
                                key={'#'}
                                data={filterData}
                                renderItem={({ item }) => <DataGrid
                                    bottomSheetAttach={bottomSheetAttach}
                                    // judul={item.judul}
                                    // tanggal={item.tanggal}
                                    item={item}
                                />
                                }
                                numColumns={2}
                                keyExtractor={item => "#" + item.id}
                                style={{ height: 400 }}
                            />
                        )}
                        <View style={{ marginBottom: 40 }}>
                            <Divider bold />
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
                                        <View style={{ marginVertical: 20, }}>
                                            <View style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                <Ionicons name='document-outline' size={32} color={COLORS.primary} />
                                                <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal }}>{dataM.judul}</Text>
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Divider bold />
                                            </View>
                                            <TouchableOpacity>
                                                <View style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}>
                                                    <Ionicons name='download-outline' size={32} color={'#6B7280'} />
                                                    <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal }}>Download</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate('MainDetailRepo')
                                                bottomSheetAttachClose()
                                            }
                                            }>
                                                <View style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}>
                                                    <Ionicons name='information-circle-outline' size={32} color={'#6B7280'} />
                                                    <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.normal }}>Details & activity</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </BottomSheetView>
                                </BottomSheetModal>
                            </BottomSheetModalProvider>
                        </Portal>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        flexDirection: "column",
        width: '90%',
        marginLeft: 20,
        borderRadius: 16,
    },
    profile: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        left: 16,
    },
    cardApps: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    cardNo: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginBottom: 10
    },
    circleList: {
        width: 35,
        height: 35,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})