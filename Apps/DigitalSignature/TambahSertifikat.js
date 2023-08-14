import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { Pressable } from 'react-native'
import { useRef } from 'react'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'


export const TambahSertifikat = () => {
    const navigation = useNavigation()
    const richText = useRef(null);
    const [richTextHandle, setRichTextHandle] = useState('');
    const [value, onChangeValue] = useState('');
    return (
        <SafeAreaView>
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
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Sertifikat Baru</Text>
                        </View>
                    </View>

                    <View style={styles.Card}>
                        <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Judul Sertifikat</Text>
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
                                placeholder='Masukan Judul Sertifikat'
                                style={{ padding: 10 }}
                                onChangeText={onChangeValue}
                                value={value}
                            />
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>No Sertifikat</Text>
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
                                placeholder='Masukan Nomor sertifikat'
                                style={{ padding: 10 }}
                                onChangeText={onChangeValue}
                                value={value}
                            />
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Penerima Sertifikat</Text>
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
                                placeholder='Pilih Penerima'
                                style={{ padding: 10 }}
                                onChangeText={onChangeValue}
                                value={value}
                            />
                            <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                <TouchableOpacity>
                                    <Ionicons name='people-outline' size={24} color={COLORS.grey} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Judul Course</Text>
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
                                placeholder='Masukan Judul Course'
                                style={{ padding: 10 }}
                                onChangeText={onChangeValue}
                                value={value}
                            />
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Tanggal</Text>
                            {/* <Text style={{ color: COLORS.danger }}>*</Text> */}
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
                                placeholder=''
                                style={{ padding: 10 }}
                                onChangeText={onChangeValue}
                                value={value}
                            />
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Keterangan</Text>
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

                                <RichEditor
                                    ref={richText}
                                    onChange={setRichTextHandle}
                                    placeholder="Masukan Judul Course"
                                    androidHardwareAccelerationDisabled={true}
                                    initialHeight={100}
                                />
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center' }}>


                        <View style={{ backgroundColor: COLORS.white, width: '46%', justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
                            <Text style={{ marginTop: 20, fontWeight: FONTWEIGHT.bold }}>Penandatangan 1</Text>
                            <Image source={AVATAR.U2} style={{ marginTop: 10, height: 46, width: 46 }} />
                            <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold, color: COLORS.info, fontSize: FONTSIZE.H1 }}>Nama Jabatan</Text>
                            <Text style={{ marginBottom: 20, marginTop: 10, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter, fontSize: FONTSIZE.H3 }}>Rizky Novriansyah</Text>
                        </View>

                        <View style={{ backgroundColor: COLORS.white, width: '40%', justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
                            <Text style={{ marginTop: 20, fontWeight: FONTWEIGHT.bold }}>Penandatangan 1</Text>
                            <Image source={AVATAR.U2} style={{ marginTop: 10, height: 46, width: 46 }} />
                            <Text style={{ marginTop: 10, fontWeight: FONTWEIGHT.bold, color: COLORS.info, fontSize: FONTSIZE.H1 }}>Nama Jabatan</Text>
                            <Text style={{ marginBottom: 20, marginTop: 10, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter, fontSize: FONTSIZE.H3 }}>Rizky Novriansyah</Text>
                        </View>

                    </View>


                    <TouchableOpacity style={{ marginVertical: 30 }}>
                        <View style={{ alignItems: 'flex-end', marginRight: 40, marginBottom: 40 }}>
                            <View style={{ backgroundColor: COLORS.infoDanger, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='checkmark-outline' size={24} color={COLORS.white} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
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
