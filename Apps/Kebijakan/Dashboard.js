import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { CardKebijakan } from '../../components/CardKebijakan/'
import { getCategory, getCategoryId, getCategoryIdPage } from '../../service/api'
import { Search } from '../../components/Search'
import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { Button } from '../../components/Button'
import { CardKebijakanCard } from '../../components/CardKebijkanCard'
import { useNavigation } from "@react-navigation/native";
import { Divider } from 'react-native-paper';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { useDispatch, useSelector } from 'react-redux';


export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [openTentang, setOpenTentang] = useState(false);
    const [openTahun, setOpenTahun] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [value, setValue] = useState();
    const [dataFilter, setFilterData] = useState([]);
    const [category, setCategory] = useState([])
    const bottomSheetModalRef = useRef(null);
    const [variant, setVariant] = useState('list')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState()

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    function handlePressModal() {
        bottomSheetModalRef.current?.present()
    }

    const handleVariant = (cekVariant) => {
        setVariant(cekVariant)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory())

    }, []);


    const { dokumen, lists } = useSelector(state => state.kebijakan)

    useEffect(() => {
        setCategory(dokumen)
        setValue(dokumen[0]?.value)
    }, [dokumen])

    useEffect(() => {
        dispatch(getCategoryId(value))
        if (lists.count > 5) {
            let mdl = parseInt(lists.count / 5)
            const modulus = lists.count % 5
            if (modulus !== 0) {
                mdl += 1
            }
            setCount(mdl)
        } else {
            setCount(1)
        }
    }, [page, value])

    const filterData = search => {
        const filter = lists.results?.datas.length !== 0 && lists.results?.datas.filter(item => {
            return item.subjek.toLowerCase().includes(search.toLowerCase());
        });
        setFilterData(filter);
    };


    const navigation = useNavigation()

    return (
        <BottomSheetModalProvider>
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
                        <Ionicons name='close-outline' size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Kebijakan</Text>
                </View>
            </View>

            <View style={styles.dropdown}>
                <Text style={styles.subJudul}>Dokumen Hukum</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={category}
                    setOpen={setOpen}
                    setValue={setValue}
                    zIndex={5000}
                    searchable={true}
                    searchPlaceholder='Cari Kategori'
                    containerStyle={{ height: '30%', width: '90%', flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 18 }}
                />
                {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginBottom: 20, gap: 10 }} onPress={handlePressModal}>
                    <Ionicons name='filter-outline' size={25} color={'#499CD7'} />
                    <Text style={styles.judulFilter}>Pencarian lanjut</Text>
                </TouchableOpacity>
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
                    <BottomSheetView onLayout={handleContentLayout}>
                        <View style={styles.contentContainer}>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 30 }}>
                                <Text style={{ fontSize: 20, fontWeight: 600, }}>Pencarian lanjut</Text>
                                <TouchableOpacity>
                                    <Text style={{ textAlign: 'left', color: '#FF5630' }}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                            <BottomSheetTextInput
                                placeholder='Tentang'
                                style={styles.filterInput}
                            />
                            <BottomSheetTextInput
                                placeholder='Nomor'
                                style={styles.filterInput}
                            />
                            <DropDownPicker
                                open={openTentang}
                                value={value}
                                items={category}
                                setOpen={setOpenTentang}
                                setValue={setValue}
                                setItems={setItems}
                                zIndex={5000}
                                bottomOffset={5000}
                                style={{ borderColor: '#959CA9' }}
                                containerStyle={{ marginTop: 10, }}
                                dropDownContainerStyle={{ borderColor: '#959CA9' }}
                            />

                            <DropDownPicker
                                open={openTahun}
                                value={value}
                                items={category}
                                setOpen={setOpenTahun}
                                setValue={setValue}
                                setItems={setItems}
                                zIndex={5000}
                                bottomOffset={5000}
                                style={{ borderColor: '#959CA9' }}
                                containerStyle={{ marginTop: 10, }}
                                dropDownContainerStyle={{ borderColor: '#959CA9' }}
                            />

                            <DropDownPicker
                                open={openStatus}
                                value={value}
                                items={category}
                                setOpen={setOpenStatus}
                                setValue={setValue}
                                setItems={setItems}
                                zIndex={5000}
                                style={{ borderColor: '#959CA9' }}
                                containerStyle={{ marginTop: 10, }}
                                dropDownContainerStyle={{ borderColor: '#959CA9' }}
                            />
                        </View>
                        <Button title='Terapkan' textColor={'white'} style={styles.button} />
                    </BottomSheetView>
                </BottomSheetModal> */}
            </View>
            <View style={styles.ContainerCard}>
                <View style={{ marginRight: 20, marginTop: 20, flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ marginLeft: 20, width: '55%' }}>
                        <Search
                            placeholder={'Pencarian Kebijakan'}
                            onSearch={filterData}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, gap: 5 }}>
                        <TouchableOpacity>
                            <View style={styles.circleList}>
                                <Ionicons name='filter-outline' size={25} color={COLORS.grey} onPress={() => handleVariant('list')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.circleList}>
                                <Ionicons name='list-outline' size={25} color={variant === 'list' ? COLORS.primary : COLORS.grey} onPress={() => handleVariant('list')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.circleList}>
                                <Ionicons name='apps-outline' size={25} color={variant === 'card' ? COLORS.primary : COLORS.grey} onPress={() => handleVariant('card')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Divider bold />
                </View>
                {
                    lists.results?.datas.length === 0 ? (
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text>Tidak ada</Text>
                        </View>
                    ) : (
                        <>
                            {
                                variant === 'list' ? (
                                    <FlatList
                                        data={dataFilter && dataFilter.length > 0 ? dataFilter : lists.results?.datas}
                                        renderItem={({ item }) => <CardKebijakan
                                            subjek={item.subjek}
                                            bentuk={item.bentuk}
                                            id_peraturan={item.id_peraturan}
                                            item={item}
                                            nomor={item.nomor}
                                            tahun={item.tahun} />}
                                        keyExtractor={item => item.id_peraturan}
                                    />

                                ) : (
                                    <FlatList
                                        data={dataFilter && dataFilter.length > 0 ? dataFilter : lists.results?.datas}
                                        renderItem={({ item }) => <CardKebijakanCard
                                            subjek={item.subjek}
                                            bentuk={item.bentuk}
                                            id_peraturan={item.id_peraturan}
                                            item={item}
                                            nomor={item.nomor}
                                            tahun={item.tahun}
                                            tgl_penetapan={item.tgl_penetapan}
                                            tgl_diundangkan={item.tgl_diundangkan}
                                            status={item.status}
                                        />}
                                        keyExtractor={item => item.id_peraturan}
                                    />
                                )
                            }
                            {
                                dataFilter.length >= 1 ? (
                                    <></>
                                ) : (
                                    <View style={{ marginVertical: 10, marginBottom: 30, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex', gap: 20, marginRight: 30 }}>
                                        <Text style={{ fontSize: FONTSIZE.H1, marginTop: 10 }}>{page} of {count}</Text>
                                        <TouchableOpacity onPress={() => setPage(page === 1 ? 1 : page - 1)} disabled={lists.previous === null ? true : false}>
                                            <Ionicons name='chevron-back-outline' size={30} color={lists.previous === null ? '#D0D5DD' : COLORS.grey} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setPage(page + 1)} disabled={lists.next === null ? true : false}>
                                            <Ionicons name='chevron-forward-outline' size={30} color={lists.next === null ? '#D0D5DD' : COLORS.grey} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </>
                    )
                }


                <StatusBar style="auto" />
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20,

    },
    ContainerCard: {
        flex: 1,
        zIndex: -1,
        marginTop: 20,
        width: '90%',
        height: 1,
        marginLeft: 20,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        paddingTop: 10,
        marginBottom: 20
    },
    dropdown: {
        borderRadius: 12,
        backgroundColor: COLORS.white,
        width: '90%',
        height: '20%',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginLeft: 20,
        marginTop: 10
    },
    cardList: {
        backgroundColor: COLORS.white,
    },
    judul: {
        fontSize: 20,
        fontWeight: FONTWEIGHT.bold,
        textAlign: 'left',
        paddingLeft: 20,
        paddingTop: 20
    },
    subJudul: {
        fontSize: 16,
        fontWeight: FONTWEIGHT.bold,
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 20
    },
    judulFilter: {
        fontSize: 16,
        fontWeight: FONTWEIGHT.bold,
        textAlign: 'left',
        color: '#499CD7'
    },
    contentContainer: {
        paddingHorizontal: 16,
        margin: 0,
        marginTop: 40
    },
    filterInput: {
        borderWidth: 1,
        borderColor: '#959CA9',
        borderRadius: 10,
        marginTop: 10,
        height: 50,
        paddingLeft: 20
    },
    button: {
        backgroundColor: '#164B78',
        borderRadius: 6,
        marginTop: 20,
        marginBottom: 40,
        width: 360,
        marginLeft: 15,
    },
    circleList: {
        width: 35,
        height: 35,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
