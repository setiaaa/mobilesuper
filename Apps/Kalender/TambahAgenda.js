import React, { useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const TambahAgenda = () => {
    const navigation = useNavigation()
    const richText = useRef(null);
    const [richTextHandle, setRichTextHandle] = useState('');
    const [value, onChangeValue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
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


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                                    <TouchableOpacity >
                                        <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                                    <TouchableOpacity >
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
                                    <TouchableOpacity >
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
                                    <TouchableOpacity >
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
