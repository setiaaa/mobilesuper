import React, { useState } from 'react'
import { Image, Modal, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react'
import { useRef } from 'react'
import { Search } from '../../components/Search'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { CardPilihMember } from '../../components/CardPilihMember'


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


export const TambahGrup = () => {
    const bottomSheetModalMemberRef = useRef(null);
    const navigation = useNavigation()

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

    const [modalVisible, setModalVisible] = useState(false);
    const [value, onChangeValue] = useState('');

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
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Grup Baru</Text>
                        </View>

                    </View>
                    <View style={styles.Card}>
                        <View style={{ marginTop: 20, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Nama Grup</Text>
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
                                placeholder='Dirjen 4'
                                style={{ padding: 10 }}
                                onChangeText={onChangeValue}
                                value={value}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 17, backgroundColor: COLORS.primary, width: '90%', height: 30, justifyContent: 'center', borderRadius: 4 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3, color: COLORS.white, marginLeft: 4 }}>Akses Kontrol</Text>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Grup Admin</Text>
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

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Grup Editor</Text>
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

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Grup Penulis</Text>
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

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 17 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3 }}>Grup Anggota</Text>
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

                        <View style={{ marginTop: 10, marginLeft: 17, backgroundColor: COLORS.primary, width: '90%', height: 30, justifyContent: 'center', borderRadius: 4 }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H3, color: COLORS.white, marginLeft: 4 }}>Parameter</Text>
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
                            marginBottom: 20,
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
                    </View>

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

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={{ alignItems: 'flex-end', marginRight: 40 }}>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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
