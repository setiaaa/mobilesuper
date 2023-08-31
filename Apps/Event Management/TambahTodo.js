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
import { Dropdown } from '../../components/DropDown';
import { useDispatch, useSelector } from 'react-redux';

const kategories = [
    { key: 'q', value: 'satu' },
    { key: 'e', value: 'dua' },
    { key: 'r', value: 'tiga' },
    { key: 't', value: 'empat' },
]

export const TambahTodo = () => {
    const navigation = useNavigation()
    const richText = useRef(null);
    const [richTextHandle, setRichTextHandle] = useState('');
    const [value, onChangeValue] = useState('');
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);
    const [kategori, setKategori] = useState('')

    const { agenda } = useSelector(state => state.event)
    const data = agenda.detail
    console.log(data)
    return (
        <GestureHandlerRootView>
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
                                    <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>ToDo Baru</Text>
                                </View>
                            </View>

                            <View style={styles.Card}>
                                <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Event</Text>
                                </View>
                                <View style={{ marginHorizontal: 17 }}>
                                    <Dropdown
                                        data={kategories}
                                        setSelected={setKategori}
                                        placeHolder={'Pilih Status'}
                                        borderWidth={1}
                                        borderColor={COLORS.ExtraDivinder}
                                        borderwidthDrop={1}
                                        borderColorDrop={COLORS.ExtraDivinder}
                                        borderWidthValue={1}
                                        borderColorValue={COLORS.ExtraDivinder}
                                    />
                                </View>

                                <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Agenda</Text>
                                </View>
                                <View style={{ marginHorizontal: 17 }}>
                                    <Dropdown
                                        data={kategories}
                                        setSelected={setKategori}
                                        placeHolder={'Pilih Status'}
                                        borderWidth={1}
                                        borderColor={COLORS.ExtraDivinder}
                                        borderwidthDrop={1}
                                        borderColorDrop={COLORS.ExtraDivinder}
                                        borderWidthValue={1}
                                        borderColorValue={COLORS.ExtraDivinder}
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Judul ToDo</Text>
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

                                <View style={{ marginTop: 10, marginBottom: 5, marginLeft: 17, flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>PIC</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 17, gap: 10 }}>
                                    <Image source={data.avatar} />
                                    <View style={{ width: 250 }}>
                                        <Text style={{ color: COLORS.info }}>{data.pic}</Text>
                                        <Text style={{ color: COLORS.lighter }}>{data.unit}</Text>
                                    </View>
                                    <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                                </View>

                                <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', marginHorizontal: 17 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Due Date</Text>
                                    <Text style={{ color: COLORS.danger }}>*</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row',
                                    marginHorizontal: 17
                                }}
                                >
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Masukan Tanggal'
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

                                {/* datepicker */}
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
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Komentar</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    width: '90%',
                                    marginLeft: 17,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row',
                                    marginBottom: 20
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
                                            initialHeight={150}
                                        />
                                    </KeyboardAvoidingView>
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

