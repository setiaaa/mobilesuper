import React, { useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { Modal } from 'react-native'
import { StyleSheet } from 'react-native'

const CardLampiran = ({ lampiran, onClick, type }) => {
    const navigation = useNavigation()
    console.log(lampiran)
    return (
        type === 'png' || type === 'jpg' || type === 'jpeg' ? (
            <TouchableOpacity onPress={onClick}>
                <Image source={lampiran} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10 }} />
            </TouchableOpacity>
        ) : type === 'mp4' ? (
            <TouchableOpacity onPress={onClick} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/mp4.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'doc' || type === 'docx' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/word.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'xls' || type === 'xlsx' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/excel.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'pdf' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/pdf.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : type === 'ppt' || type === 'pptx' ? (
            <TouchableOpacity onPress={() => navigation.navigate('FileViewer', {
                lampiran: lampiran,
                type: type
            })} style={{ width: 97, height: 97, borderRadius: 6, marginTop: 10, backgroundColor: COLORS.secondaryLighter, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/ppt.png')} style={{ width: 70, height: 70 }} />
            </TouchableOpacity>
        ) : null
    )
}


export const DetailAgenda = () => {
    const navigation = useNavigation()
    const { agenda } = useSelector(state => state.event)

    const [visibleModal, setVisibleModal] = useState(false);
    const [lampiranById, setLampiranById] = useState(null)

    const getFileExtension = (lampiran) => {
        let jenis = lampiran.split('.')
        jenis = jenis[jenis.length - 1]
        return jenis
    }

    const video = useRef(null);
    const [status, setStatus] = useState({});

    const data = agenda.detail

    console.log(data)
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
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Detail Agenda</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16 }}>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>{data.judul}</Text>
                            <View
                                style={{
                                    width: 80,
                                    height: 24,
                                    backgroundColor: COLORS.lighter,
                                    borderRadius: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: COLORS.white }}>{data.jenis}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text>{data.deskripsi}</Text>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Tanggal</Text>
                            <Text>{data.tanggal}</Text>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Waktu</Text>
                            <Text>{data.jam}</Text>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Tempat</Text>
                            <Text style={{ width: 156 }}>{data.tempat}</Text>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>PIC</Text>
                            <Text style={{ width: 156 }}>{data.pic}</Text>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Peserta Event</Text>
                            {data.pesertaevent?.map((data, index) =>
                                <View style={{ position: 'relative' }}>
                                    <Image source={data.image} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0 }} />
                                </View>
                            )}
                            <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Peserta Agenda</Text>
                            {data.pesertaagenda?.map((data, index) =>
                                <View style={{ position: 'relative' }}>
                                    <Image source={data.image} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0 }} />
                                </View>
                            )}
                            <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity>
                        </View>

                        {/* custom divider */}
                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Tamu Agenda</Text>
                            {data.tamuagenda?.map((data, index) =>
                                <View style={{ position: 'relative' }}>
                                    <Image source={data.image} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0 }} />
                                </View>
                            )}
                            <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16, marginTop: 20 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Petugas Absensi</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: 10 }}>
                            <Ionicons name='people-outline' size={24} />
                            <Text>0/15</Text>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.infoDanger,
                            width: 326,
                            height: 50,
                            borderRadius: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10
                        }}>
                            <Ionicons name='document-outline' size={24} color={COLORS.white} />
                            <Text style={{ color: COLORS.white }}>Info Approval</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16, marginTop: 20 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Lihat Notulensi</Text>
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.infoDanger,
                            width: 326,
                            height: 50,
                            borderRadius: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            marginTop: 10
                        }}>
                            <Ionicons name='document-outline' size={24} color={COLORS.white} />
                            <Text style={{ color: COLORS.white }}>Info Approval</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16, marginTop: 20 }}>
                        <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Lampiran</Text>

                        <FlatList
                            key={'*'}
                            data={data.lampiran}
                            renderItem={({ item }) => <CardLampiran
                                lampiran={item.gambar}
                                type={getFileExtension(item.nama)}
                                onClick={() => {
                                    setVisibleModal(true)
                                    setLampiranById(item)
                                }}
                            />
                            }
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

                    <TouchableOpacity style={{
                        width: '90%',
                        height: 50,
                        backgroundColor: COLORS.primary,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20
                    }}>
                        <Text style={{ color: COLORS.white }}>Approve Agenda</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
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
        width: 390,
        height: 260,
        resizeMode: 'cover'
    },
    imageAndroid: {
        width: 420,
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
