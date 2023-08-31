import React, { useMemo, useRef, useState } from 'react'
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
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CardPilihMember } from '../../components/CardPilihMember';
import { Search } from '../../components/Search';
import { FlatList } from 'react-native';
import DatePicker from 'react-native-modern-datepicker'
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';

const items = [
    {
        id: "1",
        nama: 'Rizky Novriansyah',
        avatar: (AVATAR.U2)
    },
    {
        id: "2",
        nama: 'Azis Faisal',
        avatar: (AVATAR.U2)
    },
    {
        id: "3",
        nama: 'Faisal Azis',
        avatar: (AVATAR.U2)
    },
    {
        id: "4",
        nama: 'Sulthan',
        avatar: (AVATAR.U2)
    },
    {
        id: "5",
        nama: 'Noor',
        avatar: (AVATAR.U2)
    },
    {
        id: "6",
        nama: 'Rizky Novriansyah',
        avatar: (AVATAR.U2)
    },
    {
        id: "7",
        nama: 'Rizky Novriansyah',
        avatar: (AVATAR.U2)
    },

]


export const TambahAgenda = () => {
    const navigation = useNavigation()
    const richText = useRef(null);
    const [richTextHandle, setRichTextHandle] = useState('');
    const [value, onChangeValue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const bottomSheetModalMemberRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
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
                                    <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Agenda Baru</Text>
                                </View>
                            </View>

                            <View style={styles.Card}>
                                <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Judul Agenda Baru</Text>
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
                                        placeholder='Ketikan Sesuatu'
                                        style={{ padding: 10 }}
                                        onChangeText={onChangeValue}
                                        value={value}
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Waktu</Text>
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
                                        <TouchableOpacity onPress={() => setModalVisiblePicker(true)}>
                                            <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                                        </TouchableOpacity>
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
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>PIC</Text>
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
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Pengingat</Text>
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
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Ketentuan Busana</Text>
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
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Lokasi</Text>
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
                                        <RichToolbar
                                            editor={richText}
                                            selectedIconTint="#873c1e"
                                            iconTint="#312921"
                                        />
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
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Foto Cover</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                {image && <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 12, marginHorizontal: 20, marginBottom: 20 }} />}
                                {!image ? (
                                    <Pressable onPress={pickImage}>
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
                                            <Text style={{ color: '#66656C' }}>*.jpeg, *jpg, dan *.png</Text>
                                        </View>
                                    </Pressable>
                                ) : null}
                            </View>
                        </Pressable>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={{ alignItems: 'flex-end', marginRight: 40, marginBottom: 40 }}>
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
                                        <Text style={{ fontWeight: 500 }}>Pilih Member</Text>
                                    </View>
                                    <View style={{ width: '90%', marginHorizontal: 20, marginVertical: 20 }}>
                                        <Search
                                            placeholder={'Cari'}
                                        />
                                    </View>
                                    <View>
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
                                    </View>
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
                    </ScrollView>
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
