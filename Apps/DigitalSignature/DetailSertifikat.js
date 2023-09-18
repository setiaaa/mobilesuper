import React, { useMemo, useRef } from 'react'
import { TextInput, View } from 'react-native'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'


export const DetailSertifikat = ({ route }) => {
    const { item } = route.params
    const navigation = useNavigation()
    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present()
    }

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                            <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Digital Signature</Text>
                        </View>
                    </View>

                    <View style={{ width: '90%', backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 8, marginTop: 20 }}>
                        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>

                            <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>

                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                                <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>No Sertifikat</Text>
                                <Text>:</Text>
                                <Text>{item.nosertifikat}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                                <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>Penerima Sertifikat</Text>
                                <Text>:</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={item.avatarpenerima} />
                                    <View>
                                        <Text style={{ fontWeight: FONTWEIGHT.bold, color: COLORS.info }}>{item.namapenerima}</Text>
                                        <Text style={{ color: COLORS.lighter }}>{item.jabatanpenerima}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                                <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>Tanggal Dibuat</Text>
                                <Text>:</Text>
                                <Text>{item.tanggal}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                                <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>Judul Course</Text>
                                <Text>:</Text>
                                <Text>{item.judulcourse}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                                <Text style={{ width: 140, fontWeight: FONTWEIGHT.bold }}>keterangan</Text>
                                <Text>:</Text>
                                <Text style={{ width: 189 }}>{item.keterangan}</Text>
                            </View>
                        </View>

                        <View style={{ borderWidth: 1, borderRadius: 4, width: '95%', marginHorizontal: 10, marginBottom: 20, borderColor: '#DBDADE' }}>
                            <View style={{ backgroundColor: COLORS.primary, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Approval</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                                {item.panandatangansatu?.map((data) => {
                                    return (
                                        <View key={data.id} style={{ alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10, alignItems: 'center', }}>
                                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Penamdatangan 1</Text>

                                                {data.status === "terima" ? (
                                                    <View style={{ backgroundColor: COLORS.success, borderRadius: 50, height: 20, width: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Ionicons name='checkmark-outline' color={COLORS.white} />
                                                    </View>
                                                ) : (
                                                    <></>
                                                )}
                                            </View>

                                            <Image source={data.avatar} style={{ marginTop: 10 }} />
                                            <Text style={{ marginTop: 10, color: COLORS.info, fontWeight: FONTWEIGHT.bold }}>{data.namajabatan}</Text>

                                            <Text style={{ marginTop: 5, color: COLORS.lighter }}>{data.nama}</Text>

                                            <Text style={{ color: COLORS.lighter, marginTop: 5 }}>Disetujui :</Text>

                                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 5, marginBottom: 10 }}>
                                                <Text style={{ color: COLORS.lighter }}>{data.tanggal}</Text>
                                                {/* divider custom */}
                                                <View style={{ height: '100%', width: 1, backgroundColor: COLORS.lighter }} />
                                                <Text style={{ color: COLORS.lighter }}>{data.jam}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                {/* divider custom */}
                                <View style={{ height: '100%', width: 1, backgroundColor: '#DBDADE' }} />

                                {item.panandatangandua?.map((data) => {
                                    return (
                                        <View key={data.id} style={{ alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10, alignItems: 'center' }}>
                                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>Penamdatangan 2</Text>
                                                {/* <Text>{data.status}</Text> */}
                                                {data.status === "terima" ? (
                                                    <View style={{ backgroundColor: COLORS.success, borderRadius: 50, height: 20, width: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Ionicons name='checkmark-outline' color={COLORS.white} />
                                                    </View>
                                                ) : (
                                                    <></>
                                                )}
                                            </View>

                                            <Image source={data.avatar} style={{ marginTop: 10 }} />
                                            <Text style={{ marginTop: 10, color: COLORS.info, fontWeight: FONTWEIGHT.bold }}>{data.namajabatan}</Text>

                                            <Text style={{ marginTop: 5, color: COLORS.lighter }}>{data.nama}</Text>

                                            <Text style={{ color: COLORS.lighter, marginTop: 5 }}>Disetujui :</Text>

                                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 5, marginBottom: 10 }}>
                                                <Text style={{ color: COLORS.lighter }}>{data.tanggal}</Text>
                                                {/* divider custom */}
                                                <View style={{ height: '100%', width: 1, backgroundColor: COLORS.lighter }} />
                                                <Text style={{ color: COLORS.lighter }}>{data.jam}</Text>
                                            </View>
                                        </View>
                                    )
                                })}

                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        width: '90%',
                        backgroundColor: COLORS.info,
                        borderRadius: 6,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginHorizontal: 20,
                        position: 'absolute',
                        bottom: -100
                    }}>
                        <Text style={{ color: COLORS.white, marginVertical: 15 }}>Lihat Sertifikat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: '90%',
                        backgroundColor: COLORS.infoDanger,
                        borderRadius: 6,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginHorizontal: 20,
                        position: 'absolute',
                        bottom: -160
                    }}
                        onPress={() =>
                            bottomSheetAttach()
                        }
                    >
                        <Text style={{ color: COLORS.white, marginVertical: 15 }}>Sign</Text>
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
                        <BottomSheetView onLayout={handleContentLayout} >
                            <View style={{ flex: 1 }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
                                    <TouchableOpacity onPress={() => bottomSheetAttachClose()}>
                                        <Ionicons name='chevron-back-outline' size={24} />
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>Tanda Tangan Sertifikat</Text>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Masukan Passphrase'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Masukan Passphrase'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <TouchableOpacity style={{
                                    width: '90%',
                                    backgroundColor: COLORS.danger,
                                    height: 50,
                                    marginVertical: 40,
                                    borderRadius: 6,
                                    alignItems: 'center',
                                    marginHorizontal: 20,
                                    justifyContent: 'center'
                                }}
                                    onPress={() => {
                                        bottomSheetAttachClose()
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, fontSize: FONTSIZE.H1, fontWeight: 500 }}>Tanda Tangan</Text>
                                </TouchableOpacity>

                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                </ScrollView>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}
