import React, { useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../../config/SuperAppps'
import { useSelector } from 'react-redux'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import moment from 'moment'
import { Portal } from 'react-native-portalize'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { CardItemMember } from '../../../components/CardItemMember'
import { useState } from 'react'
import ListEmpty from '../../../components/ListEmpty'

const CardListKategori = (id, name) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity>
            <View
                style={{
                    width: '100%',
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    gap: 1,
                    marginVertical: 5,
                    //shadow
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: '#171717',
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                }}>
                <View style={{ marginVertical: 10, marginLeft: 10 }}>
                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H2 }}>{name}</Text>
                </View>
                <View style={{ marginBottom: 10, marginLeft: 10, display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Text>Target Tanggal: </Text>
                    <Text style={{ color: COLORS.danger }}>test</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const DetailProject = (choiceKategori, dataKategori) => {
    const { detailProject, treeView } = useSelector(state => state.task)
    const { profile } = useSelector(state => state.superApps)
    // const [choiceKategori, setChoiceKategori] = useState('')
    const [dataList, setDataList] = useState([])
    const navigation = useNavigation()
    const bottomSheetModalMemberRef = useRef(null);
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

    useEffect(() => {
        let arrList = []
        const index = treeView.map(e => e.id).indexOf(choiceKategori.key)
        treeView[index]?.list_tasks?.map(item => {
            arrList.push({
                key: item.id,
                value: item.name
            })
        })
        // console.log(index)
        // setChoiceList(arrList.length > 0 ? arrList[0] : '')
        setDataList(arrList)
    }, [choiceKategori])

    console.log(dataList)

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 8 }}>
                    <View style={{ marginTop: 20 }}>
                                <FlatList
                                    data={dataList}
                                    renderItem={({ item }) => <CardListKategori
                                        id={item.id}
                                        name={item.value}
                                    />
                                    }
                                    ListEmptyComponent={() =>
                                        <ListEmpty />
                                    }
                            />
                        </View>
                    {/* <View style={{ marginHorizontal: 20, marginVertical: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <Text style={{ fontSize: FONTSIZE.Judul, color: COLORS.lighter, fontWeight: FONTWEIGHT.bold }}>{detailProject.name}</Text>
                            <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>{detailProject.description}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter, width: '40%' }}>Tanggal Dibuat</Text>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter, flex: 1 }}>: {detailProject.created_at}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter, width: '40%' }}>PIC</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>: </Text>
                                    {
                                        detailProject.pic.length > 1 ? (
                                            <>
                                                <View style={{ flexDirection: 'row', flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                    {detailProject.pic.map((data, index) => {
                                                        return (
                                                            <View key={data.nip}>
                                                                <Image source={{ uri: data?.avatar_url }} style={{
                                                                    marginLeft: index === 0 ? 0 : -8,
                                                                    borderWidth: 2,
                                                                    borderRadius: 50,
                                                                    borderColor: COLORS.white,
                                                                    width: 30,
                                                                    height: 30
                                                                }} />
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                                <TouchableOpacity onPress={bottomSheetMember}>
                                                    <View>
                                                        <Ionicons name='chevron-forward-outline' size={24} color={COLORS.grey} />
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <Image source={{ uri: detailProject.pic[0]?.avatar_url }} style={{
                                                    borderWidth: 2,
                                                    borderRadius: 50,
                                                    borderColor: COLORS.white,
                                                    width: 30,
                                                    height: 30
                                                }} />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H4 }}>{detailProject.pic[0]?.title?.name !== '' ? detailProject.pic[0]?.title?.name : detailProject.pic[0]?.nama}</Text>
                                                    {
                                                        detailProject.pic[0]?.title?.name !== '' ? (
                                                            <Text style={{ fontWeight: FONTWEIGHT.normal, fontSize: FONTSIZE.H4 }}> {detailProject.pic[0]?.nama}</Text>
                                                        ) : null
                                                    }
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter, width: '40%' }}>Penanggung Jawab</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>: </Text>
                                    {
                                        detailProject.members.length > 1 ? (
                                            <>
                                                <View style={{ flexDirection: 'row', flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                    {detailProject.members.map((data, index) => {
                                                        return (
                                                            <View key={data.nip}>
                                                                <Image source={{ uri: data?.avatar_url }} style={{
                                                                    marginLeft: index === 0 ? 0 : -8,
                                                                    borderWidth: 2,
                                                                    borderRadius: 50,
                                                                    borderColor: COLORS.white,
                                                                    width: 30,
                                                                    height: 30
                                                                }} />
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                                <TouchableOpacity onPress={bottomSheetMember}>
                                                    <View>
                                                        <Ionicons name='chevron-forward-outline' size={24} color={COLORS.grey} />
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <Image source={{ uri: detailProject.members[0]?.avatar_url }} style={{
                                                    borderWidth: 2,
                                                    borderRadius: 50,
                                                    borderColor: COLORS.white,
                                                    width: 30,
                                                    height: 30
                                                }} />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H4 }}>{detailProject.members[0]?.title?.name !== '' ? detailProject.members[0]?.title?.name : detailProject.members[0]?.nama}</Text>
                                                    {
                                                        detailProject.members[0]?.title?.name !== '' ? (
                                                            <Text style={{ fontWeight: FONTWEIGHT.normal, fontSize: FONTSIZE.H4 }}> {detailProject.members[0]?.nama}</Text>
                                                        ) : null
                                                    }
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter, width: '40%' }}>Pembuat Project</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>: </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <Image source={{ uri: detailProject.creator.avatar_url }} style={{
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: COLORS.white,
                                            width: 30,
                                            height: 30
                                        }} />
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H4 }}>{detailProject.creator.title?.name !== '' ? detailProject.creator.title?.name : detailProject.creator.nama}</Text>
                                            {
                                                detailProject.creator.title?.name !== '' ? (
                                                    <Text style={{ fontWeight: FONTWEIGHT.normal, fontSize: FONTSIZE.H4 }}> {detailProject.creator.nama}</Text>
                                                ) : null
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> */}
                </View>

                {
                    profile.nip === detailProject.creator.nip || profile.nip === detailProject.pic[0].nip ? (
                        <View style={{ marginVertical: 20, flexDirection: 'column', gap: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('EditCategory', { id: detailProject.id })}>
                                <View style={{
                                    marginHorizontal: 20,
                                    backgroundColor: COLORS.lightBrown,
                                    width: Platform.OS === 'ios' ? '90%' : '91%',
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 6,
                                }}>
                                    <Text style={{ color: COLORS.white }}>Ubah</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{
                                    marginHorizontal: 20,
                                    backgroundColor: COLORS.infoDanger,
                                    width: Platform.OS === 'ios' ? '90%' : '91%',
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 6,
                                }}>
                                    <Text style={{ color: COLORS.white }}>Hapus</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
                <Portal>
                    <BottomSheetModalProvider>
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
                                <View style={{ marginTop: 20, marginBottom: 40 }}>
                                    <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Penanggung Jawab</Text>
                                    </View>
                                    <View>
                                        <FlatList
                                            data={detailProject.members}
                                            renderItem={({ item }) =>
                                                <View key={item.nip}>
                                                    <CardItemMember
                                                        item={item}
                                                    />
                                                </View>
                                            }
                                            keyExtractor={item => item.id}
                                        />
                                    </View>
                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                </Portal>

            </ScrollView>
        </View>
    )
}
