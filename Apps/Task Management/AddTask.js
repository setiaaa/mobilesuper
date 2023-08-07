import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Modal } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import moment from 'moment'
import { useMemo } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { Pressable } from 'react-native'
import { Dropdown } from '../../components/DropDown'
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux'
import { setAddTask } from '../../store/Task'


export const AddTask = () => {
    const navigation = useNavigation()
    const [value, onChangeValue] = useState('');
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


    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);

    const richText = useRef(null);
    const [richTextHandle, setRichTextHandle] = useState('');

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

    const kategori = [
        { key: 'HG', value: 'High' },
        { key: 'NR', value: 'Normal' },
        { key: 'LW', value: 'Low' },
    ]

    const [kategoriField, setKategoriField] = useState('')

    const [document, setDocument] = useState([])
    const [type, setType] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAddTask(kategori))
    }, []);

    const { addTask } = useSelector(state => state.task)

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // console.log(result.uri);
        // console.log(result);
        let tipe = result.uri.split('/')
        tipe = tipe[tipe.length - 1]
        tipe = tipe.split('.')
        tipe = tipe[tipe.length - 1]
        setDocument([...document, result])
        setType([...type, tipe])
        console.log(document)
    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
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
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Task Management</Text>
                        </View>
                    </View>

                    <View style={styles.Card}>
                        <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Judul Task</Text>
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
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Due Date</Text>
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
                                placeholder='Pilih Tanggal'
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
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Prioritas</Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>
                        <View style={{ width: '90%', marginLeft: 17 }}>
                            <Dropdown
                                data={addTask}
                                setSelected={setKategoriField}
                                placeHolder={'Pilih Prioritas'}
                                borderWidth={1}
                                borderColor={COLORS.ExtraDivinder}
                                borderwidthDrop={1}
                                borderColorDrop={COLORS.ExtraDivinder}
                                borderWidthValue={1}
                                borderColorValue={COLORS.ExtraDivinder}
                            />
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Detail Task</Text>
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
                        {/* {image && <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 12, marginHorizontal: 20, marginBottom: 20 }} />}
                        {!image ? ( */}
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
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='checkmark-outline' size={24} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheetModalProvider>
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
