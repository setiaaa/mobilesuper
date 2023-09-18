import React, { useEffect, useState } from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailNotulensi, getlistApprover, getlistNotulensi } from '../../service/api';
import { getTokenValue } from '../../service/session';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import { FlatList } from 'react-native-gesture-handler';

const CardLampiran = ({ lampiran, onClick, type, id }) => {
    const navigation = useNavigation()
    return (
        type === 'png' || type === 'jpg' || type === 'jpeg' ? (
            <TouchableOpacity key={id} onPress={onClick}>
                <Image source={lampiran} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10 }} />
            </TouchableOpacity>
        ) : type === 'mp4' ? (
            <TouchableOpacity key={id} onPress={onClick} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/mp4.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'doc' || type === 'docx' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/word.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'xls' || type === 'xlsx' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/excel.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'pdf' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/pdf.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'ppt' || type === 'pptx' ? (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/ppt.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : null
    )
}

export const Notulensi = () => {
    const [user, setUser] = useState('member')
    const richText = useRef(null);
    const [richTextHandle, setRichTextHandle] = useState('');

    const { agenda, notulensi } = useSelector(state => state.event)
    const data = agenda.detail
    const idagenda = agenda.detail?.id
    const idnotu = notulensi.lists[0]?.id
    const notu = notulensi.lists

    const [token, setToken] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getlistNotulensi({ token, idagenda }))
            dispatch(getDetailNotulensi({ token, idnotu }))
        }
    }, [token])

    const { width } = useWindowDimensions();

    const source = {
        html: notu[0].content
    };


    const [visibleModal, setVisibleModal] = useState(false);
    const [lampiranById, setLampiranById] = useState(null)

    const getFileExtension = (type) => {
        let jenis = type.split('.')
        jenis = jenis[jenis.length - 1]
        return jenis
    }

    const video = useRef(null);

    const navigation = useNavigation()
    return (
        <SafeAreaView>
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
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Notulensi</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16 }}>
                        <View>
                            <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>{data.title}</Text>
                        </View>

                        <Text style={{ marginVertical: 10 }}>{data.note}</Text>

                        {/* <View style={{
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <Image source={data.avatar} style={{ width: 26, height: 26, borderRadius: 50 }} />
                            <Text style={{ fontSize: 13, color: COLORS.info }}>{data.pic}</Text>
                            {/* custom divider */}
                        {/* <View style={{ height: '100%', width: 1, backgroundColor: '#DBDADE', marginVertical: 10 }} />
                            <Text style={{ fontSize: 13 }}>{data.unit}</Text>
                        </View>  */}

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                            <Text style={{ width: 120, color: COLORS.lighter }}>Tanggal Acara</Text>
                            <Text>:</Text>
                            <Text>{data.date}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                            <Text style={{ width: 120, color: COLORS.lighter }}>Waktu Acara</Text>
                            <Text>:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{moment(data.start_time, 'HH:mm:ss').format('HH:mm')} - </Text>
                                <Text>{moment(data.end_time, 'HH:mm:ss').format('HH:mm')}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                            <Text style={{ width: 120, color: COLORS.lighter }}>Tempat Acara</Text>
                            <Text>:</Text>
                            <Text style={{ width: 186 }}>{data.location}</Text>
                        </View>

                        {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Peserta</Text>
                            {data.pesertaevent?.map((data, index) =>
                                <View key={data.id} style={{ position: 'relative' }}>
                                    <Image source={data.image} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0 }} />
                                </View>
                            )}
                            <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity>
                        </View> */}

                        {/* <View style={{ marginTop: 10 }}>
                            <Text>{data.deskripsi}</Text>
                        </View> */}

                        <Text style={{ fontWeight: FONTWEIGHT.bold, marginTop: 20 }}>Lampiran</Text>
                        <FlatList
                            key={'*'}
                            data={data.attachments}
                            renderItem={({ item }) =>
                                <View key={item.id}>
                                    <CardLampiran
                                        lampiran={item.file}
                                        type={getFileExtension(item.name)}
                                        onClick={() => {
                                            setVisibleModal(true)
                                            setLampiranById(item)
                                        }}
                                        id={item.id}
                                    />
                                </View>
                            }
                            scrollEnabled={false}
                            style={{ marginTop: 10 }}
                            columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 15, gap: 5 }}
                            numColumns={3}
                            keyExtractor={item => "*" + item.id}
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
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Notulensi</Text>
                        {user === 'member' ? (
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                {/* <Text>{notu[0].content}</Text> */}
                                <RenderHTML
                                    source={source}
                                    contentWidth={width}
                                />
                            </View>
                        ) : user === 'notulensi' || user === 'admin' ? (
                            <KeyboardAvoidingView style={{
                                flex: 1,
                                marginTop: 20,
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor: COLORS.ExtraDivinder
                            }}>
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
                        ) : (
                            <></>
                        )}
                    </View>
                </View>

                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, marginTop: 20 }}>
                    <TouchableOpacity style={{
                        width: 171,
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: COLORS.infoDanger,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: COLORS.white }}>Tolak Notulensi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: 171,
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: COLORS.primary,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: COLORS.white }}>Approve Notulensi</Text>
                    </TouchableOpacity>
                </View> */}

            </ScrollView>
        </SafeAreaView>
    )
}
