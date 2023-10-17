import React, { useEffect, useMemo, useRef } from 'react'
import { FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'
import { COLORS, DATETIME, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
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
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { getDetailLinimasa, getListsLike, patchLike, patchUnlike, postComment } from '../../service/api'
import { getTokenValue } from '../../service/session'
import { setRefresh } from '../../store/Pengetahuan'


const CardLampiran = ({ lampiran, onClick, type, id }) => {
    const navigation = useNavigation()
    return (
        type === 'png' || type === 'jpg' || type === 'jpeg' ? (
            <TouchableOpacity key={id} onPress={onClick}>
                <Image source={{ uri: lampiran }} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10 }} />
            </TouchableOpacity>
        ) : type === 'mp4' ? (
            <TouchableOpacity key={id} onPress={onClick} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/mp4.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'doc' || type === 'docx' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/word.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'xls' || type === 'xlsx' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/excel.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'pdf' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/pdf.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'ppt' || type === 'pptx' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/ppt.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : null
    )
}


const CardKomen = ({ listData, inputRef, setParentId }) => {
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

    const handleClickBalas = () => {
        if (inputRef.current) {
            inputRef.current.focus()
            setParentId(listData.id)
        }
    }
    return (
        <View style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: '#171717',
            shadowOpacity: 0.2,
        }}>
            <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '90%', marginVertical: 5, elevation: 5 }}>
                <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
                    <View>
                        <Image source={{ uri: listData.creator_avatar }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{
                            fontSize: FONTSIZE.H2,
                            fontWeight: FONTWEIGHT.bold,
                            lineHeight: 20,
                            wordWrap: 'break-word'
                        }}>
                            {listData.creator}
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
                                {listData.created_at}
                            </Text>
                        </View>
                        <Text style={{
                            color: COLORS.lighter,
                            fontSize: FONTSIZE.H3,
                            fontWeight: FONTWEIGHT.normal,
                            wordWrap: 'break-word',
                        }}>
                            {listData.message}
                        </Text>

                        <TouchableOpacity style={{
                            color: COLORS.lighter,
                            fontSize: FONTSIZE.H3,
                            fontWeight: FONTWEIGHT.normal,
                            wordWrap: 'break-word',
                            marginTop: 10
                        }}
                            onPress={() => {
                                handleClickBalas()
                            }}
                        >
                            <Text style={{ color: COLORS.primary, fontWeight: FONTWEIGHT.bold }}>Balas</Text>
                        </TouchableOpacity>

                        {listData.child.length === 0 ? (
                            null
                        ) : (
                            <View>
                                {
                                    (!toggleComment.toggle && toggleComment.id === listData.id) || toggleComment.id !== listData.id && listData.child.length > 0 ? (
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
                                                    Tampilkan {listData.child?.length} Balasan
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        null
                                    )
                                }

                                {listData.id === toggleComment.id && toggleComment.toggle ? (
                                    <View>
                                        {listData.child?.map((listKomen, index) =>
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }}>
                                                    <View>
                                                        <Image source={{ uri: listData.creator_avatar }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{
                                                            fontSize: FONTSIZE.H2,
                                                            fontWeight: FONTWEIGHT.bold,
                                                            lineHeight: 20,
                                                            wordWrap: 'break-word'
                                                        }}>
                                                            {listKomen.creator}
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
                                                                {listKomen.created_at}
                                                            </Text>
                                                        </View>
                                                        <Text style={{
                                                            color: '#999999',
                                                            fontSize: FONTSIZE.H3,
                                                            fontWeight: FONTWEIGHT.normal,
                                                            lineHeight: 18,
                                                            wordWrap: 'break-word',
                                                        }}>
                                                            {listKomen.message}
                                                        </Text>
                                                        {
                                                            listData.child.length - 1 === index ? (
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
                                                                            Tutup {listData.child.length} Balasan
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            ) : null
                                                        }
                                                    </View>
                                                </View>
                                            </>
                                        )}
                                    </View>
                                ) : (
                                    null
                                )}
                            </View>

                        )}
                    </View>
                </View>
            </View>
        </View>
    )

}

export const DetailLinimasa = () => {
    const navigation = useNavigation()
    const [like, setLike] = useState(0)
    const [token, setToken] = useState('')
    const dispatch = useDispatch()
    const [visibleModalInfo, setVisibleModalInfo] = useState(false);
    const [visibleModalView, setVisibleModalView] = useState(false);
    const inputRef = useRef(null)
    const [parentId, setParentId] = useState('')
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

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])


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

    const { linimasa, refresh } = useSelector(state => state.pengetahuan)
    const detail = linimasa.detail
    const listsView = linimasa.view
    const source = {
        html: detail.content,
    };
    const { width } = useWindowDimensions();

    const handleLike = () => {
        const data = {
            token: token,
            id: detail.id
        }
        if (detail.liked == false) {
            dispatch(patchLike(data))
        } else {
            dispatch(patchUnlike(data))
        }
    }

    const handleComment = () => {
        const payload = {
            article_id: detail.id,
            parent_id: parentId !== '' ? parentId : '',
            message: komen
        }
        const data = {
            token: token,
            payload: payload
        }
        dispatch(postComment(data))
        setKomen('')
    }

    useEffect(() => {
        const data = {
            token: token,
            id: detail.id
        }
        if (refresh) {
            console.log('masukkkkkkk')
            dispatch(getDetailLinimasa(data))
            dispatch(setRefresh(false))
        }
    }, [refresh])

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
                                <Image source={{ uri: detail.cover }} style={Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid} />
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
                                <Text style={{ paddingBottom: 20, paddingHorizontal: 25, fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>{detail.title}</Text>

                                <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 25 }}>
                                    <View>
                                        <Image source={{ uri: detail.creator_avatar }} style={{ borderRadius: 50, width: 50, height: 50 }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{detail.creator?.name}</Text>
                                        <Text style={{ color: COLORS.grey, marginVertical: 5, fontSize: 13, }}>{moment(detail.published_date, "DD MMMM YYYY HH:mm:ss").format(DATETIME.LONG_DATE)}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', paddingHorizontal: 25, marginTop: 20 }}>
                                    <View style={{
                                        backgroundColor: detail.category === 'Video / Jurnal' ? COLORS.successLight : detail.category === 'Infografis' ? COLORS.warningLight : COLORS.infoLight,
                                        width: 130,
                                        height: 30,
                                        borderRadius: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        gap: 5
                                    }}>
                                        {detail.category === 'Infografis' ? (
                                            <Ionicons name='document-outline' color={'#F6AD1D'} style={{ marginTop: 2 }} />
                                        ) : detail.category === 'Kegiatan' ? (
                                            <Ionicons name='analytics-outline' color={'#1868AB'} style={{ marginTop: 3 }} />
                                        ) : (
                                            <Ionicons name='videocam-outline' color={'#11C15B'} style={{ marginTop: 2 }} />
                                        )}
                                        <Text style={{ color: detail.category === 'Infografis' ? COLORS.warning : detail.category === 'Kegiatan' ? COLORS.info : COLORS.success }}>{detail.category}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    marginTop: 20,
                                    backgroundColor: COLORS.infoLight,
                                    padding: 20,
                                    marginHorizontal: 20,
                                    borderRadius: 20
                                }}>
                                    <Text>{detail.summary}</Text>
                                </View>

                                <View style={{ marginHorizontal: 20 }}>
                                    <RenderHTML
                                        source={source}
                                        contentWidth={width}
                                    />
                                </View>

                                <View style={{ marginHorizontal: 20 }}>
                                    <Text style={{
                                        fontSize: FONTSIZE.Judul,
                                        fontWeight: FONTWEIGHT.bold
                                    }}>Lampiran</Text>
                                </View>

                                {/* Lampiran */}
                                <FlatList
                                    key={'#'}
                                    data={detail.attachments}
                                    renderItem={({ item }) =>
                                        <View key={item.id}>
                                            <CardLampiran
                                                lampiran={item.file}
                                                id={item.id}
                                                type={getFileExtension(item.name)}
                                                onClick={() => {
                                                    setVisibleModal(true)
                                                    setLampiranById(item)
                                                }}
                                            />
                                        </View>
                                    }
                                    scrollEnabled={true}
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
                                                {getFileExtension(lampiranById.name) === 'png' || getFileExtension(lampiranById.name) === 'jpg' || getFileExtension(lampiranById.name) === 'jpeg' ? (
                                                    <View>
                                                        <Image source={{ uri: lampiranById.file }} style={{ width: 390, height: 283 }} />
                                                    </View>
                                                ) : getFileExtension(lampiranById.name) === 'mp4' ? (
                                                    <Video
                                                        ref={video}
                                                        style={{ width: 390, height: 283 }}
                                                        source={{ uri: lampiranById.file }}
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
                                        <Ionicons name='thumbs-up-outline' size={18} color={detail.liked == true ? COLORS.primary : null} />
                                        <Text style={{ color: detail.liked == true ? COLORS.primary : null }}>{detail.likes_count}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                                        onPress={bottomSheetAttachComment}
                                    >
                                        <Ionicons name='chatbox-outline' size={18} />
                                        <Text>{detail.comment_count}</Text>
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
                                            <KeyboardAvoidingView
                                                behavior={Platform.OS === 'ios' ? 'height' : 'height'}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 20 }}>
                                                    <Ionicons name='thumbs-up-outline' size={20} color={COLORS.primary} />
                                                    <Text style={{ color: COLORS.primary }}>{detail.likes_count}</Text>
                                                    <Text style={{ color: COLORS.primary }}>Disukai</Text>
                                                    <TouchableOpacity onPress={() => {
                                                        bottomSheetAttachCommentClose()
                                                        dispatch(getListsLike({ token: token, id: detail.id }))
                                                        navigation.navigate('ListSukaLinimasa',)
                                                    }
                                                    }>
                                                        <Ionicons name='chevron-forward-outline' size={20} color={COLORS.primary} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ marginLeft: 20, marginVertical: 20 }}>
                                                    <Text style={{ color: COLORS.ExtraDivinder }}>Komentar({detail.comment_count})</Text>
                                                </View>

                                                <FlatList
                                                    data={detail.comments}
                                                    renderItem={({ item }) => <CardKomen
                                                        listData={item}
                                                        inputRef={inputRef}
                                                        setParentId={setParentId}
                                                    />
                                                    }
                                                    style={{ height: 500 }}
                                                />

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
                                                        marginTop: 10,
                                                        marginBottom: 40
                                                    }}
                                                    >
                                                        <BottomSheetTextInput
                                                            numberOfLines={1}
                                                            maxLength={40}
                                                            placeholder='Ketik Komentar Disini'
                                                            ref={inputRef}
                                                            style={{ padding: 10 }}
                                                            onChangeText={setKomen}
                                                            value={komen}
                                                        />
                                                        <View style={{ alignItems: 'flex-end', flex: 1, marginRight: 10, justifyContent: 'center' }}>
                                                            <TouchableOpacity onPress={() => {
                                                                handleComment()
                                                            }}>
                                                                <Ionicons name='send-sharp' size={20} color={COLORS.primary} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </KeyboardAvoidingView>
                                        </BottomSheetView>
                                    </BottomSheetModal>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                                        onPress={() => {
                                            setVisibleModalView(true)
                                        }}
                                    >
                                        <Ionicons name='eye-outline' size={18} />
                                        <Text>{detail.views_count}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                                        onPress={() =>
                                            setVisibleModalInfo(true)
                                        }
                                    >
                                        <Ionicons name='information-circle-outline' size={18} />
                                    </TouchableOpacity>

                                </View>

                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={visibleModalInfo}
                                    onRequestClose={() => {
                                        setVisibleModalInfo(!visibleModalInfo);
                                    }}
                                >
                                    <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                                    <View style={{ alignItems: 'center', flex: 1 }}>
                                        <View style={{ backgroundColor: COLORS.white, width: '90%', borderRadius: 10, marginTop: '40%' }}>

                                            <TouchableOpacity
                                                style={{ alignItems: 'flex-end', marginHorizontal: 20, marginTop: 20 }}
                                                onPress={() => {
                                                    setVisibleModalInfo(false)
                                                }}
                                            >
                                                <Ionicons name='close-outline' size={24} color={COLORS.lighter} />
                                            </TouchableOpacity>

                                            <View style={{
                                                backgroundColor: COLORS.primary,
                                                padding: 10,
                                                width: 179,
                                                height: 40,
                                                marginHorizontal: 20,
                                                borderTopLeftRadius: 4,
                                                borderTopRightRadius: 12,
                                                borderBottomLeftRadius: 12,
                                                borderBottomRightRadius: 4
                                            }}>
                                                <Text style={{ color: COLORS.white }}>Informasi Pengetahuan</Text>
                                            </View>

                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                                    <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Judul</Text>
                                                    <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[What]</Text>
                                                </View>

                                                <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{detail.title}</Text>
                                            </View>

                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                                    <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Anggota Angenda</Text>
                                                    <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[Who]</Text>
                                                </View>

                                                <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{detail.members_agenda}</Text>
                                            </View>

                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                                    <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Rangkuman</Text>
                                                    <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[Why]</Text>
                                                </View>

                                                <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{detail.summary}</Text>
                                            </View>

                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                                    <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Tempat Agenda</Text>
                                                    <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[Where]</Text>
                                                </View>

                                                <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10 }}>{detail.place_agenda}</Text>
                                            </View>

                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', marginHorizontal: 40 }}>
                                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: COLORS.primary }} />
                                                    <Text style={{ fontWeight: FONTWEIGHT.bold, marginLeft: 10 }}>Waktu Mulai</Text>
                                                    <Text style={{ color: COLORS.lighter, marginLeft: 5 }}>[When]</Text>
                                                </View>

                                                <Text style={{ width: 260, marginHorizontal: 60, marginTop: 10, marginBottom: 20 }}>{moment(detail.start_date_agenda, "DD MMMM YYYY HH:mm:ss").format(DATETIME.LONG_DATE)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={visibleModalView}
                                    onRequestClose={() => {
                                        setVisibleModalView(!visibleModalView);
                                    }}
                                >
                                    <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} />
                                    <View style={{ alignItems: 'center', flex: 1 }}>
                                        <View style={{ backgroundColor: COLORS.white, width: '90%', borderRadius: 10, marginTop: '40%' }}>

                                            <View style={{
                                                marginTop: 20,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginHorizontal: 20
                                            }}>

                                                <View>
                                                    <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>Dilihat Oleh</Text>
                                                </View>

                                                <TouchableOpacity
                                                    style={{}}
                                                    onPress={() => {
                                                        setVisibleModalView(false)
                                                    }}
                                                >
                                                    <Ionicons name='close-outline' size={24} color={COLORS.lighter} />
                                                </TouchableOpacity>

                                            </View>
                                            {/* custom divider */}
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ height: 1, width: '90%', backgroundColor: '#DBDADE', marginVertical: 10 }} />
                                            </View>

                                            <ScrollView style={{ marginBottom: 40 }}>
                                                {listsView?.map(data => {
                                                    return (
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 10,
                                                            marginHorizontal: 20,
                                                            marginTop: 20,
                                                        }}>
                                                            <Image source={{ uri: data.avatar_url }} style={{ width: 50, height: 50, borderRadius: 30 }} />
                                                            <Text>{data.name}</Text>
                                                        </View>
                                                    )
                                                })}
                                            </ScrollView>

                                        </View>
                                    </View>
                                </Modal>

                                {/* <View style={{
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
                                </View> */}
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
