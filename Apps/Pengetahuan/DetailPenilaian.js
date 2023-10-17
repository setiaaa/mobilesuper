import React, { useEffect, useState } from 'react'
import { FlatList, Modal, ScrollView, Text, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, DATETIME, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'
import { Dropdown } from '../../components/DropDown';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import RenderHTML from 'react-native-render-html'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { getDetailLinimasa, getViewLinimasa, putAddApprove, putCancelApprove, putTakeDown } from '../../service/api'
import { getTokenValue } from '../../service/session'

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


export const DetailPenilaian = () => {

    const [visibleModal, setVisibleModal] = useState(false)
    const [lampiranById, setLampiranById] = useState(null)
    const navigation = useNavigation()

    const getFileExtension = (lampiran) => {
        let jenis = lampiran.split('.')
        jenis = jenis[jenis.length - 1]
        return jenis
    }

    // const nilai = [
    //     { key: 'q', value: '0.0 (Tidak Sesuai)' },
    //     { key: 'w', value: '0.5 (Kegitan)' },
    //     { key: 'w', value: '1.0 (infografis)' },
    //     { key: 'w', value: '3.0 (video)' },
    // ]

    const [Nilai, setNilai] = useState('')
    const [tanggal, setTanggal] = useState('')
    var year = new Date().getFullYear()


    const { penilaian, nilai, error } = useSelector(state => state.pengetahuan)
    const { profile } = useSelector(state => state.superApps)
    const data = penilaian.detail !== null ? penilaian.detail : null
    console.log(data)

    useEffect(() => {
        var date = new Date().getDate()
        var month = new Date().getMonth()
        var year = new Date().getFullYear()
        setTanggal(
            date + '-' + month + '-' + year
        )
        if (data !== null) {
            setNilai({
                key: data.category_id,
                value: `${data.score} (${data.category})`
            })
        }
    }, [])

    const dataNilai = () => {
        const arry = []
        nilai.map(item => {
            arry.push({
                key: item.id,
                value: `${item.point_recomendation} (${item.name})`
            })
        })
        return arry
    }

    const periode = [
        { id: 'q1', title: `JANUARI ${year} - MARET ${year}` },
        { id: 'q2', title: `APRIL ${year} - JUNI ${year}` },
        { id: 'q3', title: `JULI ${year} - SEPTEMBER ${year}` },
        { id: 'q4', title: `OKTOBER ${year} - DESEMBER ${year}` }
    ]

    const getPeriode = (id) => {
        const data = periode.filter(list => { return list.id === id })
        return data[0]?.title
    }

    const source = {
        html: data?.content
    };
    const { width } = useWindowDimensions();

    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    const getDetail = (id) => {
        const params = { token, id }
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailLinimasa(params))
        dispatch(getViewLinimasa(params))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Detail Penilaian</Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: COLORS.white,
                    width: '90%',
                    marginHorizontal: 20,
                    marginVertical: 20,
                    paddingHorizontal: 20,
                    borderRadius: 8
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}>
                        <Image source={require('../../assets/superApp/logoKecil.png')} style={{ width: 37, height: 37 }} />
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Formulir Penilaian Pengetahuan</Text>
                    </View>


                    <View key={data?.id} style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Periode: </Text>
                            <Text>{getPeriode(data?.quarter)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text>PJ: </Text>
                            <Text>{profile.nama}</Text>
                        </View>

                        <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Jenis</Text>
                            <Text>: {data?.category}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Terbuat</Text>
                            <Text>: {moment(data?.published_date, 'HH:mm:ss').format(DATETIME.LONG_DATE)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Foto Cover</Text>
                            <Text>: </Text>
                            <Image source={{ uri: data?.cover }} style={{ width: 100, height: 71 }} />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Judul [What]</Text>
                            <Text style={{ width: 186 }}>: {data?.title}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Tempat Agenda [Where]</Text>
                            <Text>: {data?.place_agenda}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Anggota Agenda [Who]</Text>
                            <Text style={{ width: 200 }}>: {data?.members_agenda}</Text>
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Rangkuman [Why]</Text>
                                <Text>:</Text>
                            </View>
                            <Text style={{ marginTop: 10, marginHorizontal: 10 }}>{data?.summary}</Text>
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Deskripsi [How]</Text>
                                <Text>:</Text>
                            </View>
                            <View style={{ height: 100, marginHorizontal: 10 }}>
                                <ScrollView>
                                    <RenderHTML
                                        source={source}
                                        contentWidth={width}
                                    />
                                    {/* <Text style={{ marginTop: 5, marginHorizontal: 10 }}>{data.deskripsi}</Text> */}
                                </ScrollView>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ width: 130, fontWeight: FONTWEIGHT.bold }}>Lampiran</Text>
                            <Text>: </Text>
                        </View>
                        <FlatList
                            key={'#'}
                            data={data?.attachments}
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
                            style={{ marginTop: 10, marginBottom: 20 }}
                            // columnWrapperStyle={{ justifyContent: 'space-evenly', }}
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

                    </View>
                </View>

                <View style={{
                    backgroundColor: COLORS.white,
                    width: '90%',
                    marginHorizontal: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginBottom: 20,
                }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>Nilai</Text>
                            <Text style={{ color: COLORS.danger }}>*</Text>
                        </View>


                        <View style={{ width: 170 }}>
                            <Dropdown
                                data={dataNilai()}
                                placeHolder={'Nilai'}
                                setSelected={setNilai}
                                selected={Nilai}
                                borderWidth={1}
                                borderColor={COLORS.ExtraDivinder}
                                borderWidthValue={1}
                                borderwidthDrop={1}
                                borderColorDrop={COLORS.ExtraDivinder}
                                borderColorValue={COLORS.ExtraDivinder}
                            />
                        </View>

                        <View>
                            <Text style={{ fontWeight: FONTWEIGHT.bold, marginBottom: 5 }}>Tanggal Nilai :</Text>
                            <Text>{tanggal}</Text>
                        </View>
                    </View>

                </View>

                {data?.log_approve?.length === 0 || data?.log_approve[0]?.action !== 'score' || (data?.log_approve?.length == 0 && data?.score == 0) ? (

                    <TouchableOpacity style={{
                        width: '90%',
                        height: 50,
                        backgroundColor: COLORS.info,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginHorizontal: 20,
                        marginTop: 10
                    }}
                        onPress={() => {
                            dispatch(putAddApprove({ token: token, id: data?.id, body: { category_id: Nilai.key } }))
                            navigation.navigate('PenilaianPenggetahaun')
                        }}
                    >
                        <Text style={{ color: COLORS.white }}>Approve</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{
                        width: '90%',
                        height: 50,
                        backgroundColor: COLORS.danger,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginHorizontal: 20,
                        marginTop: 10
                    }}
                        onPress={() => {
                            dispatch(putCancelApprove({ token: token, id: data?.id, body: { category_id: Nilai.key } }))
                            navigation.navigate('PenilaianPenggetahaun')
                        }}
                    >
                        <Text style={{ color: COLORS.white }}>Cancel Approve</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={{
                    width: '90%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginHorizontal: 20,
                    marginTop: 10,
                    borderColor: COLORS.infoDanger,
                    borderWidth: 1
                }}
                    onPress={() => {
                        dispatch(putTakeDown({ token: token, id: data?.id }))
                        if (error !== '' && error == false) navigation.navigate('PenilaianPenggetahaun')
                        else if (error !== '' && error) alert('gagal takedown')
                    }}
                >
                    <Text style={{ color: COLORS.infoDanger }}>Take Down Artikel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: '90%',
                    height: 50,
                    borderColor: COLORS.info,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginHorizontal: 20,
                    marginVertical: 10
                }}
                    onPress={() => {
                        getDetail(data?.id)
                        navigation.navigate("DetailLinimasa")
                    }}
                >
                    <Text style={{ color: COLORS.info }}>Lihat Pengetahuan</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView >
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