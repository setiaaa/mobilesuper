import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { KeyboardAvoidingView } from 'react-native';
import { Image } from 'react-native';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CardPilihMember } from '../../components/CardPilihMember';
import { Search } from '../../components/Search';
import { FlatList } from 'react-native';
import DatePicker from 'react-native-modern-datepicker'
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from '../../components/DropDown';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenValue } from '../../service/session';
import { getlistKalender } from '../../service/api';
import Addressbook from '../../components/AddressbookKKp/Addressbook';

const CardListPeserta = ({ item }) => {
    return (
        <View>
            {item.title === undefined ? (
                null
            ) : (
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 10, marginHorizontal: '5%', gap: 10 }}>
                    <Text>-</Text>
                    <Text style={{ width: '90%' }}>{item.title}</Text>
                </View>
            )}
            {item.fullname === undefined ? (
                null
            ) : (
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 10, marginHorizontal: '5%', gap: 10 }}>
                    <Text>-</Text>
                    <Text style={{ width: '90%' }}>{item.fullname}</Text>
                </View>
            )}
        </View>
    )
}

export const TambahEvent = () => {
    const navigation = useNavigation()
    const richText = useRef(null);
    const [richTextHandle, setRichTextHandle] = useState('');
    const [value, onChangeValue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);

    const [modal, setModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const bottomSheetModalMemberRef = useRef(null);

    const initialSnapPoints = useMemo(() => ['90%', "CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetMember = () => {
        bottomSheetModalMemberRef.current?.present()
    }

    const [dataFilter, setDataFilter] = useState([])
    const handleClickItem = (id, toggle) => {
        if (toggle) {
            const result = items.find(item => item.id === id)
            setDataFilter([...dataFilter, result])
        } else {
            const index = dataFilter.findIndex(item => item.id === id)
            dataFilter.splice(index, 1)
            let result = dataFilter
            setDataFilter(result)
        }
    }

    const [kategori, setKategori] = useState('')

    const [document, setDocument] = useState([])
    const [type, setType] = useState([])

    const [pilihanPimpinanEvent, setPilihanPimpinanEvent] = useState([])
    const [pilihanPesertaEvent, setPilihanPesertaEvent] = useState([])

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        let tipe = result.uri.split('/')
        tipe = tipe[tipe.length - 1]
        tipe = tipe.split('.')
        tipe = tipe[tipe.length - 1]
        setDocument([...document, result])
        setType([...type, tipe])
    };

    const [token, setToken] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getlistKalender(token))
        }
    }, [token])

    const { kalenderLists } = useSelector(state => state.event)
    const [stateConfig, setStateConfig] = useState({})

    const { addressbook } = useSelector(state => state.addressBookKKP)

    useEffect(() => {
        if (stateConfig.title === 'Pimpinan Event') {
            setPilihanPimpinanEvent(addressbook.selected)
        } else if (stateConfig.title === 'Peserta Event') {
            setPilihanPesertaEvent(addressbook.selected)
        }
    }, [addressbook])

    console.log(addressbook.selected)

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView>
                <BottomSheetModalProvider>
                    <ScrollView>
                        <Pressable onPress={() => richText.current?.dismissKeyboard()}>
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
                                    <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Tambah Event</Text>
                                </View>
                            </View>

                            <View style={styles.Card}>

                                <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Group Kalender</Text>
                                </View>
                                <View style={{ marginHorizontal: 17 }}>
                                    <Dropdown
                                        data={kalenderLists}
                                        setSelected={setKategori}
                                        borderWidth={1}
                                        borderColor={COLORS.ExtraDivinder}
                                        borderwidthDrop={1}
                                        borderColorDrop={COLORS.ExtraDivinder}
                                        borderWidthValue={1}
                                        borderColorValue={COLORS.ExtraDivinder}
                                    />
                                </View>


                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Judul Event</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder
                                }}
                                >
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Masukan Judul'
                                        style={{ padding: 10 }}
                                        onChangeText={onChangeValue}
                                        value={value}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 17 }}>
                                    <View>
                                        <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Tanggal Mulai</Text>
                                            <Text style={{ color: COLORS.danger }}>*</Text>
                                        </View>
                                        <View style={{
                                            borderWidth: 1,
                                            width: 155,
                                            borderRadius: 4,
                                            borderColor: COLORS.ExtraDivinder,
                                            flexDirection: 'row'
                                        }}
                                        >
                                            <TextInput
                                                editable
                                                multiline
                                                numberOfLines={4}
                                                maxLength={40}
                                                placeholder='Mulai'
                                                style={{ padding: 10 }}
                                                onChangeText={onChangeValue}
                                                value={value}
                                            />
                                            <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                                <TouchableOpacity onPress={() => setModalVisiblePicker(true)}>
                                                    <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Tanggal Selesai</Text>
                                            <Text style={{ color: COLORS.danger }}>*</Text>
                                        </View>
                                        <View style={{
                                            borderWidth: 1,
                                            width: 155,
                                            borderRadius: 4,
                                            borderColor: COLORS.ExtraDivinder,
                                            flexDirection: 'row'
                                        }}
                                        >
                                            <TextInput
                                                editable
                                                multiline
                                                numberOfLines={4}
                                                maxLength={40}
                                                placeholder='Selesai'
                                                style={{ padding: 10 }}
                                                onChangeText={onChangeValue}
                                                value={value}
                                            />
                                            <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                                <TouchableOpacity onPress={() => setModalVisiblePicker(true)}>
                                                    <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisiblePicker}
                                    onRequestClose={() => {
                                        setModalVisiblePicker(!modalVisiblePicker);
                                    }}
                                >
                                    <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: '90%', height: 500, borderRadius: 10 }}>
                                            <TouchableOpacity onPress={() => setModalVisiblePicker(false)} style={{ paddingRight: '85%', marginBottom: 3, marginLeft: 20 }}>
                                                <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Ionicons name='close-outline' size={24} color={COLORS.white} />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ width: '100%' }}>
                                                <DatePicker
                                                    options={{
                                                        backgroundColor: COLORS.white,
                                                        textHeaderColor: COLORS.primary,
                                                        textDefaultColor: COLORS.primary,
                                                        selectedTextColor: '#fff',
                                                        mainColor: COLORS.primary,
                                                        textSecondaryColor: COLORS.primary,
                                                        borderColor: 'rgba(122, 146, 165, 0.1)',
                                                    }}
                                                    current={moment(Date.now()).format('YYYY-MM-DD')}
                                                    mode="calendar"
                                                    minuteInterval={30}
                                                    style={{ borderRadius: 10 }}
                                                />
                                                <TouchableOpacity onPress={() => setModalVisiblePicker(false)} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                                    <View style={{ backgroundColor: COLORS.primary, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                                        <Text style={{ color: COLORS.white }}>Ok</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Tempat</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row'
                                }}
                                >
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Ketikan sesuatu'
                                        style={{ padding: 10 }}
                                        onChangeText={onChangeValue}
                                        value={value}
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Pimpinan Event</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    marginHorizontal: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row',
                                }}
                                >
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Pilih member'
                                        style={{ padding: 10, width: '80%' }}
                                        value={pilihanPimpinanEvent[0]?.title}
                                    />
                                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            const config = {
                                                title: 'Pimpinan Event',
                                                tabs: {
                                                    jabatan: true,
                                                    pegawai: false
                                                },
                                                multiselect: false,
                                                payload: pilihanPimpinanEvent
                                            }
                                            setStateConfig(config)
                                            navigation.navigate("AddressBook", { config: config });
                                        }}>
                                            <Ionicons name='people-outline' size={24} color={COLORS.grey} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* {pilihanPimpinanEvent.map((item) => {
                                    console.log(item)
                                    return (
                                        <View>
                                            <Text>{item.title}</Text>
                                        </View>
                                    )
                                }
                                )} */}

                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={visible}
                                    onRequestClose={() => {
                                        setVisible(!visible);
                                    }}
                                >
                                    <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: '90%', height: 500, borderRadius: 10 }}>
                                            {/* <TouchableOpacity onPress={() => setVisible(false)} style={{ paddingRight: '85%', marginBottom: 3, marginLeft: 20 }}>
                                                <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Ionicons name='close-outline' size={24} color={COLORS.white} />
                                                </View>
                                            </TouchableOpacity> */}
                                            <View style={{ width: '100%', height: '100%', padding: 16 }}>
                                                <Addressbook />

                                                {/* <TouchableOpacity onPress={() => setVisible(false)} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                                    <View style={{ backgroundColor: COLORS.primary, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                                        <Text style={{ color: COLORS.white }}>Ok</Text>
                                                    </View>
                                                </TouchableOpacity> */}
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Peserta</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row'
                                }}
                                >
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Pilih member'
                                        style={{ padding: 10 }}
                                        value={pilihanPesertaEvent}
                                    />
                                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            const config = {
                                                title: 'Peserta Event',
                                                tabs: {
                                                    jabatan: true,
                                                    pegawai: true
                                                },
                                                multiselect: true,
                                                payload: pilihanPesertaEvent
                                            }
                                            setStateConfig(config)
                                            navigation.navigate("AddressBook", { config: config });
                                        }}
                                        >
                                            <Ionicons name='people-outline' size={24} color={COLORS.grey} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <FlatList
                                    data={pilihanPesertaEvent}
                                    renderItem={({ item }) => <CardListPeserta
                                        item={item}
                                    />
                                    }
                                    scrollEnabled={false}
                                    keyExtractor={index => index}
                                />

                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Notulen</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row'
                                }}
                                >
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Pilih member'
                                        style={{ padding: 10 }}
                                        onChangeText={onChangeValue}
                                        value={value}
                                    />
                                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={bottomSheetMember}>
                                            <Ionicons name='people-outline' size={24} color={COLORS.grey} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Petugas Absen</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row'
                                }}
                                >
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Pilih member'
                                        style={{ padding: 10 }}
                                        onChangeText={onChangeValue}
                                        value={value}
                                    />
                                    <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={bottomSheetMember}>
                                            <Ionicons name='people-outline' size={24} color={COLORS.grey} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Tamu Eksternal</Text>
                                    <View style={{ width: 50, height: 24, backgroundColor: COLORS.primary, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Ionicons name='add-outline' size={24} color={COLORS.white} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: 17, gap: 15 }}>
                                    <View style={{
                                        borderWidth: 1,
                                        flex: 1,
                                        borderRadius: 4,
                                        borderColor: COLORS.ExtraDivinder,
                                        flexDirection: 'row',
                                    }}
                                    >
                                        <TextInput
                                            editable
                                            multiline
                                            numberOfLines={4}
                                            maxLength={40}
                                            placeholder='Ketikan sesuatu'
                                            style={{ padding: 10 }}
                                            onChangeText={onChangeValue}
                                            value={value}
                                        />
                                    </View>

                                    <View style={{
                                        borderWidth: 1,
                                        flex: 1,
                                        borderRadius: 4,
                                        borderColor: COLORS.ExtraDivinder,
                                        flexDirection: 'row',
                                    }}
                                    >
                                        <TextInput
                                            editable
                                            multiline
                                            numberOfLines={4}
                                            maxLength={40}
                                            placeholder='Ketikan sesuatu'
                                            style={{ padding: 10 }}
                                            onChangeText={onChangeValue}
                                            value={value}
                                        />
                                    </View>
                                </View>


                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Catatan</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row'
                                }}
                                >
                                    <KeyboardAvoidingView style={{ flex: 1 }}>
                                        {/* <RichToolbar
                                            editor={richText}
                                            selectedIconTint="#873c1e"
                                            iconTint="#312921"
                                        /> */}
                                        <RichEditor
                                            ref={richText}
                                            onChange={setRichTextHandle}
                                            placeholder="Tulis Pesan..."
                                            androidHardwareAccelerationDisabled={true}
                                            initialHeight={250}
                                        />
                                    </KeyboardAvoidingView>
                                </View>
                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Lampiran</Text>
                                </View>
                                <Pressable onPress={pickDocument}>
                                    <View style={{
                                        borderWidth: 1,
                                        width: '90%',
                                        marginLeft: 17,
                                        borderRadius: 4,
                                        borderColor: COLORS.ExtraDivinder,
                                        height: 250,
                                        marginBottom: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 5
                                    }}
                                    >
                                        <View style={{ marginBottom: 10 }}>
                                            <Ionicons name='md-cloud-upload-outline' size={30} color={'#66656C'} />
                                        </View>
                                        <Text style={{ color: '#66656C' }}>Klik Untuk Unggah</Text>
                                    </View>
                                </Pressable>
                                {/* ) : null} */}
                                {document.length < 1 ? (
                                    null
                                ) : (
                                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, flexWrap: 'wrap', gap: 10 }}>
                                        {document?.map((doc, i) => (
                                            <>
                                                {type[i] === 'doc' || type[i] === 'docx' ? (
                                                    <View style={{ width: 97, height: 97, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 8, borderColor: COLORS.ExtraDivinder }}>
                                                        <Image source={require('../../assets/superApp/word.png')} />
                                                    </View>
                                                ) : type[i] === 'pdf' ? (
                                                    <View style={{ width: 97, height: 97, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 8, borderColor: COLORS.ExtraDivinder }}>
                                                        <Image source={require('../../assets/superApp/pdf.png')} />
                                                    </View>
                                                ) : type[i] === 'ppt' || type[i] === 'pptx' ? (
                                                    <View style={{ width: 97, height: 97, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 8, borderColor: COLORS.ExtraDivinder }}>
                                                        <Image source={require('../../assets/superApp/ppt.png')} />
                                                    </View>
                                                ) : type[i] === 'xls' || type[i] === 'xlsx' ? (
                                                    <View style={{ width: 97, height: 97, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 8, borderColor: COLORS.ExtraDivinder }}>
                                                        <Image source={require('../../assets/superApp/excel.png')} />
                                                    </View>
                                                )
                                                    : (
                                                        <Image key={doc.uri} source={{ uri: doc.uri }}
                                                            style={{ width: 97, height: 97, borderRadius: 8 }}
                                                        />
                                                    )}
                                            </>
                                        ))}
                                    </View>
                                )}
                                <View style={{ marginVertical: 10, marginHorizontal: 17 }}>
                                    <Text style={{ color: COLORS.lighter }}>*) Hanya png, jpg, jpeg, pdf, doc, docx, ppt, pptx, xls, xlsx yang akan diterima dan ukuran file maks 100 MB</Text>
                                </View>

                            </View>
                        </Pressable>

                    </ScrollView>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={{ position: 'absolute', right: 30, bottom: 100 }}>
                            <View style={{ backgroundColor: COLORS.infoDanger, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='checkmark-outline' size={24} color={COLORS.white} />
                            </View>
                        </View>
                    </TouchableOpacity>


                    <BottomSheetModal
                        ref={bottomSheetModalMemberRef}
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
                            <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 500, marginBottom: 50 }}>Pilih Member</Text>
                                </View>
                                {/* <View style={{ width: '90%', marginHorizontal: 20, marginVertical: 20 }}>
                                    <Search
                                        placeholder={'Cari'}
                                    />
                                </View> */}
                                {/* <View>
                                    <FlatList
                                        data={dataFilter}
                                        horizontal={true}
                                        renderItem={({ item }) => <CardPilihMember
                                            nama={item.nama}
                                            avatar={item.avatar}
                                            id={item.id}
                                            handleClickItem={handleClickItem}
                                            filter={true}
                                        />
                                        }
                                    />
                                </View>
                                <View>
                                    <FlatList
                                        data={items}
                                        renderItem={({ item }) => <CardPilihMember
                                            nama={item.nama}
                                            avatar={item.avatar}
                                            id={item.id}
                                            handleClickItem={handleClickItem}
                                            filter={false}
                                        />
                                        }
                                    />
                                </View> */}

                                <Addressbook />

                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    {value === '' ? (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: 325, height: 350 }}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 5, paddingRight: '80%' }}>
                                        <Ionicons name='close-outline' size={24} />
                                    </TouchableOpacity>
                                    <View style={{ marginBottom: 40 }}>
                                        <Image source={require('../../assets/superApp/alertGagal.png')} />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                            <Text >Terjadi Kesalahan!</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ backgroundColor: COLORS.danger, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={{ color: COLORS.white }}>Ok</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    ) : (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: 325, height: 350 }}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 5, paddingRight: '80%' }}>
                                        <Ionicons name='close-outline' size={24} />
                                    </TouchableOpacity>
                                    <View style={{ marginBottom: 40 }}>
                                        <Image source={require('../../assets/superApp/alertBerhasil.png')} />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                            <Text >Berhasil Ditambahkan!</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ backgroundColor: COLORS.success, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={{ color: COLORS.white }}>Ok</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    )}
                </BottomSheetModalProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    Card: {
        backgroundColor: COLORS.white,
        width: "90%",
        marginVertical: 20,
        marginLeft: 20,
        borderRadius: 16
    },
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})
