import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setAddressbookSelected } from '../../../store/AddressbookKKP'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal } from 'react-native'
import { Image } from 'react-native'
import { setStatus } from '../../../store/Task'
import { getTokenValue } from '../../../service/session'
import { postCategoryTM } from '../../../service/api'
import DatePicker from 'react-native-modern-datepicker'
import moment from 'moment'
import { Dropdown } from '../../../components/DropDown'
import { Pressable } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';

const dataPrioritas = [
    {
        key: 'high',
        value: 'High'
    },
    {
        key: 'normal',
        value: 'Normal'
    },
    {
        key: 'low',
        value: 'Low'
    },
]

const dataPengingat = [
    {
        key: '1 hari',
        value: '1 Hari'
    },
    {
        key: '3 hari',
        value: '3 Hari'
    },
    {
        key: '5 hari',
        value: '5 Hari'
    },
]

export const AddTask = ({ route }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { id_project, id_list } = route.params
    const { status } = useSelector(state => state.task)
    const [token, setToken] = useState('')
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);
    const [dataKategori, setDataKategori] = useState({
        judulTask: '',
        targetTanggal: '',
        member: [],
        deskripsi: '',
    })
    const [prioritas, setPrioritas] = useState('')
    const [pengingat, setPengingat] = useState('')

    const handleInputTask = (key, value) => {
        setDataKategori({
            ...dataKategori,
            [key]: value
        })
    }

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    const handleSubmit = () => {
        const pic = []
        dataKategori.pic?.map(item => {
            if (item?.code) {
                pic.push(item?.code)
            } else {
                pic.push(item.nip)
            }
        })

        const member = []
        dataKategori?.member.map(item => {
            if (item?.code) {
                member.push(item?.code)
            } else {
                member.push(item.nip)
            }
        })

        const payload = {
            name: dataKategori.namaProject,
            description: dataKategori.deskripsi,
            pic_objid: pic[0],
            members_list: member,
        }
        const data = {
            token: token,
            payload: payload
        }
        dispatch(postCategoryTM(data))
    }

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // const file = convertFileToObject(result)
        let tipe = result.uri.split('/')
        tipe = tipe[tipe.length - 1]
        tipe = tipe.split('.')
        tipe = tipe[tipe.length - 1]
        setDocument([...document, result])
        setType([...type, tipe])
        console.log(result)
        const data = {
            token: token,
            result: result
        }
        dispatch(postAttachment(data))
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
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
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Tambah Tugas</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.Card}>
                        <View style={{ flexDirection: 'column', gap: 6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Project</Text>
                                <Text style={{ flex: 1, fontSize: FONTSIZE.H3 }}>Testing Mobile</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{ width: 100, fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>List</Text>
                                <Text style={{ flex: 1, fontSize: FONTSIZE.H3 }}>Testing Mobile</Text>
                            </View>
                        </View>

                        <View style={styles.input}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Judul Tugas</Text>
                                <Text style={{ color: COLORS.danger }}>*</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: COLORS.ExtraDivinder
                            }}
                            >
                                <TextInput
                                    editable
                                    multiline
                                    placeholder='Ketikan Sesuatu'
                                    style={{ padding: 10 }}
                                    onChangeText={(e) => handleInputTask('judulTask', e)}
                                    value={dataKategori.judulTask}
                                />
                            </View>
                        </View>

                        <View style={styles.input}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Target Tanggal</Text>
                                <Text style={{ color: COLORS.danger }}>*</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    borderColor: COLORS.ExtraDivinder,
                                    flexDirection: 'row',
                                }}
                                onPress={() => setModalVisiblePicker(true)}>
                                <TextInput
                                    editable={false}
                                    multiline
                                    placeholder='Pilih Target Tanggal'
                                    style={{ padding: 10 }}
                                    value={dataKategori.targetTanggal}
                                />
                                <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                    <Ionicons name='calendar-outline' size={24} color={COLORS.grey} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.input}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Prioritas</Text>
                                <Text style={{ color: COLORS.danger }}>*</Text>
                            </View>
                            <Dropdown
                                placeHolder={'Pilih prioritas'}
                                borderWidth={1}
                                data={dataPrioritas}
                                setSelected={setPrioritas}
                                borderColor={COLORS.ExtraDivinder}
                                borderwidthDrop={1}
                                borderColorDrop={COLORS.ExtraDivinder}
                                borderWidthValue={1}
                                borderColorValue={COLORS.ExtraDivinder}
                            />
                        </View>

                        <View style={styles.input}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Pengingat</Text>
                                <Text style={{ color: COLORS.danger }}>*</Text>
                            </View>
                            <Dropdown
                                placeHolder={'Pilih pengingat'}
                                borderWidth={1}
                                data={dataPengingat}
                                setSelected={setPengingat}
                                borderColor={COLORS.ExtraDivinder}
                                borderwidthDrop={1}
                                borderColorDrop={COLORS.ExtraDivinder}
                                borderWidthValue={1}
                                borderColorValue={COLORS.ExtraDivinder}
                            />
                        </View>

                        <View style={styles.input}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Detail Tugas</Text>
                                <Text style={{ color: COLORS.danger }}>*</Text>
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: COLORS.ExtraDivinder
                            }}
                            >
                                <TextInput
                                    editable
                                    multiline
                                    placeholder='Ketikan Sesuatu'
                                    style={{ padding: 10, minHeight: 150 }}
                                    onChangeText={(e) => handleInputTask('deskripsi', e)}
                                    value={dataKategori.deskripsi}
                                />
                            </View>
                        </View>

                        <View style={styles.input}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Lampiran</Text>
                                <Text style={{ color: COLORS.danger }}>*</Text>
                            </View>
                            <Pressable onPress={pickDocument}>
                                <View style={{
                                    borderWidth: 1,
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
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>

            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='checkmark-outline' size={24} color={COLORS.white} />
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={status === '' ? false : true}
                onRequestClose={() => {
                    dispatch(setStatus(''))
                }}
            >
                <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', width: 325, height: 350 }}>
                        <TouchableOpacity onPress={() => dispatch(setStatus(''))} style={{ marginTop: 5, paddingRight: '80%' }}>
                            <Ionicons name='close-outline' size={24} />
                        </TouchableOpacity>
                        {
                            status === 'berhasil' ? (
                                <>
                                    <View style={{ marginBottom: 40 }}>
                                        <Image source={require('../../../assets/superApp/alertBerhasil.png')} />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                            <Text >Berhasil Ditambahkan!</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            dispatch(setStatus(''))
                                            navigation.goBack()
                                        }} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ backgroundColor: COLORS.success, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={{ color: COLORS.white }}>Ok</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ) : (
                                <View style={{ marginBottom: 40 }}>
                                    <Image source={require('../../../assets/superApp/alertGagal.png')} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                        <Text >Terjadi Kesalahan!</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => dispatch(setStatus(''))} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ backgroundColor: COLORS.danger, width: 217, height: 39, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ color: COLORS.white }}>Ok</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisiblePicker}
                onRequestClose={() => {
                    setModalVisiblePicker(false);
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
                                onSelectedChange={date => {
                                    const [year, month, day] = date.split('/').map(Number)
                                    const formattedDate = new Date(year, month - 1, day)
                                    handleInputTask('targetTanggal', moment(formattedDate).format('YYYY-MM-DD'))
                                }
                                }
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
        </GestureHandlerRootView>
    )
}

const CardListPeserta = ({ item, addressbook }) => {
    const dispatch = useDispatch()
    const deleteItem = (id, state) => {
        let data;
        if (state === "jabatan") {
            data = addressbook.selected.filter(data => data.id !== id)
            dispatch(setAddressbookSelected(data))
        } else {
            data = addressbook.selected.filter(data => data.nip !== id)
            dispatch(setAddressbookSelected(data))
        }
    }
    return (
        <View>
            {item.title === undefined ? (
                null
            ) : (
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 10, marginHorizontal: '5%', gap: 10 }}>
                    <Text>-</Text>
                    <Text style={{ width: '80%' }}>{item.title}</Text>
                    <TouchableOpacity onPress={() => {
                        deleteItem(item.id, 'jabatan')
                    }}>
                        <Ionicons name='trash-outline' size={24} />
                    </TouchableOpacity>
                </View>
            )}
            {item.fullname === undefined ? (
                null
            ) : (
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 10, marginHorizontal: '5%', gap: 10 }}>
                    <Text>-</Text>
                    <Text style={{ width: '80%' }}>{item.fullname}</Text>
                    <TouchableOpacity onPress={() => {
                        deleteItem(item.nip, 'pegawai')
                    }}>
                        <Ionicons name='trash-outline' size={24} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    Card: {
        backgroundColor: COLORS.white,
        margin: 20,
        padding: 20,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        borderRadius: 16
    },
    input: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
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
