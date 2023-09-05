import React, { useMemo, useRef } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { Modal } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import PdfReader from 'rn-pdf-reader-js-improved'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


const CardLampiran = ({ lampiran, onClick, type }) => {
    const navigation = useNavigation()
    console.log(lampiran)
    return (
        type === 'png' || type === 'jpg' || type === 'jpeg' ? (
            <TouchableOpacity onPress={onClick}>
                <Image source={lampiran} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10 }} />
            </TouchableOpacity>
        ) : type === 'mp4' ? (
            <TouchableOpacity onPress={onClick} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/mp4.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'doc' || type === 'docx' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/word.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'xls' || type === 'xlsx' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/excel.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'pdf' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/pdf.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'ppt' || type === 'pptx' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/ppt.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : null
    )
}


export const DetailLinimasa = ({ route }) => {
    const navigation = useNavigation()
    const { item } = route.params
    const [like, setLike] = useState(0)
    const bottomSheetModalRef = useRef(null);
    const initialSnapPoints = useMemo(() => ["95%"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttachComment = () => {
        bottomSheetModalRef.current?.present()
    }
    const bottomSheetAttachCommentClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    const [komen, setKomen] = useState('')

    const [toggleComment, setToggleComment] = useState({
        toggle: false,
        // id: data[0].Komentar[0].id
    })
    const clickBalas = (id, temp) => {
        setToggleComment({
            toggle: temp,
            id: id
        })
        console.log(id)
    }

    const handleLike = () => {
        if (like === 0) {
            setLike(1)
        } else {
            setLike(0)
        }
    }

    const [visibleModal, setVisibleModal] = useState(false);
    const [lampiranById, setLampiranById] = useState(null)

    const [document, setDocument] = useState([])

    const getFileExtension = (lampiran) => {
        let jenis = lampiran.split('.')
        jenis = jenis[jenis.length - 1]
        return jenis
    }

    const video = useRef(null);
    const [status, setStatus] = useState({});

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <ScrollView>
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', zIndex: 1 }}>
                                <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                                    <Ionicons name='chevron-back' size={24} color={COLORS.primary} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ position: 'relative' }}>
                                <Image source={item.image} style={Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid} />
                                <View style={{ backgroundColor: COLORS.white, height: 50, position: 'absolute', width: '100%', bottom: 0, borderTopLeftRadius: 100, borderTopRightRadius: 100 }} />
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.primary,
                                    width: 42,
                                    height: 42,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50,
                                    position: 'absolute',
                                    right: 10,
                                    bottom: 30

                                }}>
                                    <Ionicons name='share-social-outline' size={20} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: COLORS.white, }}>
                                <Text style={{ paddingBottom: 20, paddingHorizontal: 25, fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>

                                <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 25 }}>
                                    <View>
                                        <Image source={item.avatar} style={{ borderRadius: 50 }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.nama}</Text>
                                        <Text style={{ color: COLORS.grey, marginVertical: 5, fontSize: 13, }}>{item.tanggal}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', paddingHorizontal: 25, marginTop: 20 }}>
                                    <View style={{
                                        backgroundColor: COLORS.warningLight,
                                        width: 100,
                                        height: 30,
                                        borderRadius: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        gap: 5
                                    }}>
                                        <Ionicons name='document-outline' size={18} color={COLORS.warning} />
                                        <Text style={{ color: COLORS.warning }}>{item.jenis}</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ paddingHorizontal: 25, textAlign: 'justify' }}>{item.deskripsi}</Text>
                                </View>

                                {/* <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row' }}>
                            <Ionicons name='calendar-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>ccc</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='person-circle-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>ccc</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='eye-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>Dilihat: </Text>
                            </View>
                        </View> */}


                                {/* Lampiran */}
                                <FlatList
                                    key={'#'}
                                    data={item.lampiran}
                                    renderItem={({ item }) => <CardLampiran
                                        lampiran={item.gambar}
                                        type={getFileExtension(item.nama)}
                                        onClick={() => {
                                            setVisibleModal(true)
                                            setLampiranById(item)
                                        }}
                                    />
                                    }
                                    style={{ marginTop: 20 }}
                                    columnWrapperStyle={{ justifyContent: 'space-evenly', }}
                                    numColumns={2}
                                    keyExtractor={item => "#" + item.id}
                                />

                                {
                                    lampiranById !== null ? (
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={visibleModal}
                                            onRequestClose={() => {
                                                setVisibleModal(false);
                                                setLampiranById(null)
                                            }}

                                        >
                                            <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                                            <View style={{ alignItems: 'center', flex: 1, display: 'flex', justifyContent: 'center' }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setVisibleModal(false)
                                                        setLampiranById(null)
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '15%',
                                                        left: 20
                                                    }}>

                                                    <View style={{
                                                        backgroundColor: COLORS.primary,
                                                        width: 51,
                                                        height: 51,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: 50
                                                    }}>
                                                        <Ionicons name='close-outline' color={COLORS.white} size={24} />
                                                    </View>
                                                </TouchableOpacity>
                                                {getFileExtension(lampiranById.nama) === 'png' || getFileExtension(lampiranById.nama) === 'jpg' || getFileExtension(lampiranById.nama) === 'jpeg' ? (
                                                    <View>
                                                        <Image source={lampiranById.gambar} style={{ width: 390, height: 283 }} />
                                                    </View>
                                                ) : getFileExtension(lampiranById.nama) === 'mp4' ? (
                                                    <Video
                                                        ref={video}
                                                        style={{ width: 390, height: 283 }}
                                                        source={lampiranById.gambar}
                                                        useNativeControls
                                                        resizeMode={ResizeMode.CONTAIN}
                                                        isLooping
                                                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </View>
                                        </Modal>
                                    ) : null
                                }

                                {/* divider custom */}
                                <View style={{ height: 1, width: '90%', backgroundColor: '#DBDADE', marginTop: 20, marginHorizontal: 20 }} />

                                <View style={{ flexDirection: 'row', gap: 10, marginVertical: 20, marginHorizontal: 20 }}>

                                    <TouchableOpacity style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }} onPress={handleLike}>
                                        <Ionicons name='thumbs-up-outline' size={18} color={like !== 0 ? COLORS.primary : null} />
                                        <Text style={{ color: like !== 0 ? COLORS.primary : null }}>{item.suka}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                                        onPress={bottomSheetAttachComment}
                                    >
                                        <Ionicons name='chatbox-outline' size={18} />
                                        <Text>{item.komentar}</Text>
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
                                        <BottomSheetView onLayout={handleContentLayout} style={{}}>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 20 }}>
                                                    <Ionicons name='thumbs-up-outline' size={20} color={COLORS.primary} />
                                                    <Text style={{ color: COLORS.primary }}>{item.disukai}</Text>
                                                    <Text style={{ color: COLORS.primary }}>Disukai</Text>
                                                    <TouchableOpacity onPress={() => {
                                                        bottomSheetAttachCommentClose()
                                                        navigation.navigate('ListSukaLinimasa', { item: item })
                                                    }
                                                    }>
                                                        <Ionicons name='chevron-forward-outline' size={20} color={COLORS.primary} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ marginLeft: 20, marginVertical: 20 }}>
                                                    <Text style={{ color: COLORS.ExtraDivinder }}>Komentar({item.jmlKomentar})</Text>
                                                </View>
                                                <ScrollView style={{ flex: 1 }}>
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        //shadow ios
                                                        shadowOffset: { width: -2, height: 4 },
                                                        shadowColor: '#171717',
                                                        shadowOpacity: 0.2,
                                                    }}>
                                                        {item.Komentar?.map((listData) => (
                                                            <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '90%', marginVertical: 5, elevation: 5 }}>
                                                                <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
                                                                    <View>
                                                                        <Image source={listData.avatarKomen} />
                                                                    </View>
                                                                    <View style={{ marginLeft: 10 }}>
                                                                        <Text style={{
                                                                            fontSize: FONTSIZE.H2,
                                                                            fontWeight: FONTWEIGHT.bold,
                                                                            lineHeight: 20,
                                                                            wordWrap: 'break-word'
                                                                        }}>
                                                                            {listData.nama}
                                                                        </Text>
                                                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                                                            <Text style={{
                                                                                color: COLORS.lighter,
                                                                                fontSize: FONTSIZE.H5,
                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                lineHeight: 18,
                                                                                wordWrap: 'break-word',
                                                                                marginBottom: 10
                                                                            }}>
                                                                                {listData.tanggal}
                                                                            </Text>
                                                                            <View style={{ height: '70%', width: 1, backgroundColor: '#DBDADE' }} />
                                                                            <Text style={{
                                                                                color: COLORS.lighter,
                                                                                fontSize: FONTSIZE.H5,
                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                lineHeight: 18,
                                                                                wordWrap: 'break-word'
                                                                            }}>
                                                                                {listData.jam}
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={{
                                                                            color: COLORS.lighter,
                                                                            fontSize: FONTSIZE.H5,
                                                                            fontWeight: FONTWEIGHT.normal,
                                                                            lineHeight: 18,
                                                                            wordWrap: 'break-word',
                                                                        }}>
                                                                            {listData.isi}
                                                                        </Text>
                                                                        {listData.jmlhBalas === '' ? (
                                                                            null
                                                                        ) : (
                                                                            <View>
                                                                                {
                                                                                    (!toggleComment.toggle && toggleComment.id === listData.id) || toggleComment.id !== listData.id && listData.jmlhBalas > 0 ? (
                                                                                        <TouchableOpacity
                                                                                            key={listData.id}
                                                                                            onPress={() => clickBalas(listData.id, true)}>
                                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
                                                                                                <View style={{ height: 1, width: 20, backgroundColor: '#DBDADE' }} />
                                                                                                <Text style={{
                                                                                                    color: COLORS.lighter,
                                                                                                    fontSize: FONTSIZE.H5,
                                                                                                    fontWeight: FONTWEIGHT.normal,
                                                                                                    lineHeight: 18,
                                                                                                    wordWrap: 'break-word',
                                                                                                }}>
                                                                                                    Tampilkan {listData.jmlhBalas} Balasan
                                                                                                </Text>
                                                                                            </View>
                                                                                        </TouchableOpacity>
                                                                                    ) : (
                                                                                        null
                                                                                    )
                                                                                }

                                                                                {listData.id === toggleComment.id && toggleComment.toggle ? (
                                                                                    <View>
                                                                                        {listData.balas?.map((listKomen, index) =>
                                                                                            <>
                                                                                                <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
                                                                                                    <View>
                                                                                                        <Image source={listKomen.avatarBalas} />
                                                                                                    </View>
                                                                                                    <View style={{ marginLeft: 10 }}>
                                                                                                        <Text style={{
                                                                                                            fontSize: FONTSIZE.H2,
                                                                                                            fontWeight: FONTWEIGHT.bold,
                                                                                                            lineHeight: 20,
                                                                                                            wordWrap: 'break-word'
                                                                                                        }}>
                                                                                                            {listKomen.nama}
                                                                                                        </Text>
                                                                                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                                                                                            <Text style={{
                                                                                                                color: COLORS.lighter,
                                                                                                                fontSize: FONTSIZE.H5,
                                                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                                                lineHeight: 18,
                                                                                                                wordWrap: 'break-word',
                                                                                                                marginBottom: 10
                                                                                                            }}>
                                                                                                                {listKomen.tanggal}
                                                                                                            </Text>
                                                                                                            <View style={{ height: '70%', width: 1, backgroundColor: '#DBDADE' }} />
                                                                                                            <Text style={{
                                                                                                                color: COLORS.lighter,
                                                                                                                fontSize: FONTSIZE.H5,
                                                                                                                fontWeight: FONTWEIGHT.normal,
                                                                                                                lineHeight: 18,
                                                                                                                wordWrap: 'break-word'
                                                                                                            }}>
                                                                                                                {listKomen.jam}
                                                                                                            </Text>
                                                                                                        </View>
                                                                                                        <Text style={{
                                                                                                            color: '#999999',
                                                                                                            fontSize: FONTSIZE.H5,
                                                                                                            fontWeight: FONTWEIGHT.normal,
                                                                                                            lineHeight: 18,
                                                                                                            wordWrap: 'break-word',
                                                                                                        }}>
                                                                                                            {listKomen.isi}
                                                                                                        </Text>
                                                                                                        {
                                                                                                            listData.balas.length - 1 === index ? (
                                                                                                                <TouchableOpacity
                                                                                                                    key={listKomen.id}
                                                                                                                    onPress={() => clickBalas(listData.id, false)}>
                                                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
                                                                                                                        <View style={{ height: 1, width: 20, backgroundColor: '#DBDADE' }} />
                                                                                                                        <Text style={{
                                                                                                                            color: COLORS.lighter,
                                                                                                                            fontSize: FONTSIZE.H5,
                                                                                                                            fontWeight: FONTWEIGHT.normal,
                                                                                                                            lineHeight: 18,
                                                                                                                            wordWrap: 'break-word',
                                                                                                                        }}>
                                                                                                                            Tutup {listData.jmlhBalas} Balasan
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                            ) : null
                                                                                                        }
                                                                                                    </View>
                                                                                                    {/* {console.log(items.Komentar[0].balas[0].idBalas)} */}
                                                                                                </View>
                                                                                            </>
                                                                                        )}
                                                                                        {/* {console.log(items.Komentar[0].balas[0].idBalas)} */}
                                                                                    </View>
                                                                                ) : (
                                                                                    null
                                                                                )}
                                                                            </View>

                                                                        )}
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        )
                                                        )}
                                                    </View>
                                                </ScrollView>
                                                <View style={{ justifyContent: 'flex-end' }}>
                                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                                    <View style={{
                                                        borderWidth: 1,
                                                        width: '90%',
                                                        marginLeft: 17,
                                                        borderRadius: 16,
                                                        borderColor: COLORS.ExtraDivinder,
                                                        flexDirection: 'row',
                                                        backgroundColor: COLORS.ExtraDivinder,
                                                        marginTop: 10
                                                    }}
                                                    >
                                                        <BottomSheetTextInput
                                                            numberOfLines={1}
                                                            maxLength={40}
                                                            placeholder='Ketik Komentar Disini'
                                                            style={{ padding: 10 }}
                                                            onChangeText={setKomen}
                                                            value={komen}
                                                        />
                                                        <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                                            <TouchableOpacity >
                                                                <Ionicons name='send-sharp' size={20} color={COLORS.primary} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </BottomSheetView>
                                    </BottomSheetModal>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                        <Ionicons name='eye-outline' size={18} />
                                        <Text>{item.dilihat}</Text>
                                    </View>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                                    // onPress={() => }
                                    >
                                        <Ionicons name='information-circle-outline' size={18} />
                                    </TouchableOpacity>

                                </View>

                                <View style={{
                                    height: 105,
                                    width: '90%',
                                    backgroundColor: COLORS.danger,
                                    borderRadius: 8,
                                    marginHorizontal: 15,
                                    marginBottom: 20,
                                    //shadow ios
                                    shadowOffset: { width: -2, height: 4 },
                                    shadowColor: '#171717',
                                    shadowOpacity: 0.2,
                                    //shadow android
                                    elevation: 5
                                }}>
                                    <View style={{ height: 96, width: '100%', backgroundColor: COLORS.white, borderRadius: 8, position: 'absolute', bottom: 0 }}>
                                        <Text style={{ fontWeight: 600, marginHorizontal: 20, marginTop: 20 }}>Selanjutnya</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: FONTSIZE.H4, marginHorizontal: 20, marginTop: 10, width: 300 }}>Kementrian Kelautan dan Perikanan (KKP) bersama dengan Dewan...</Text>
                                            <TouchableOpacity style={{ position: 'absolute', right: 10 }}>
                                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        width: '100%',
        height: 260,
        resizeMode: 'cover'
    },
    imageAndroid: {
        width: '100%',
        height: 260,
        resizeMode: 'cover'
    },
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.7
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.7
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})
