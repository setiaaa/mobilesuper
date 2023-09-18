import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'react-native'
import { COLORS } from '../config/SuperAppps'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenValue } from '../service/session'
import { getDivision, getDivisionTree, getEmployee } from '../service/api'
import { useNavigation } from '@react-navigation/native'
import { TopAddressBook } from './Korespondensi/AppNavigator'
import { setAddressbookSelected } from '../store/AddressbookKKP'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native'
import { Portal } from 'react-native-portalize'


const CardListPilih = ({ item }) => {
    return (
        <View>
            {item.title === undefined ? (
                null
            ) : (
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 10, marginHorizontal: '5%', gap: 10 }}>
                    <Text>-</Text>
                    <Text style={{ width: '85%' }}>{item.title}</Text>
                    <Ionicons name='trash-outline' size={24} />
                </View>
            )}
            {item.fullname === undefined ? (
                null
            ) : (
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 10, marginHorizontal: '5%', gap: 10 }}>
                    <Text>-</Text>
                    <Text style={{ width: '85%' }}>{item.fullname}</Text>
                    <Ionicons name='trash-outline' size={24} />
                </View>
            )}
        </View>
    )
}


export const AddressBook = ({ route }) => {
    const [token, setToken] = useState('')
    const { config } = route.params

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            // dispatch(getDivision(token))
            dispatch(getEmployee(token))
            // dispatch(getDivisionTree({ token: token, id: kategori.key }))
        }
    }, [token])

    const { addressbook } = useSelector(state => state.addressBookKKP)

    const navigation = useNavigation()

    useEffect(() => {
        dispatch(setAddressbookSelected(config.payload))
    }, [config])

    const bottomSheetModalMemberRef = useRef(null);

    const initialSnapPoints = useMemo(() => ['10%', "90%"], [])
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
        bottomSheetMember()
    }, [])

    console.log(addressbook.selected)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>


                    </View>
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>AddressBook</Text>
                    </View>

                    <TouchableOpacity style={{
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Ionicons name='checkmark-outline' size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: '83%' }}>
                    <TopAddressBook config={config} />
                </View>
                {/* <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, width: '100%' }}>
                        <Text>selected {addressbook.selected.length}</Text>
                    </View> */}

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
                    >
                        <BottomSheetView onLayout={handleContentLayout}>
                            <View>
                                <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Text style={{ fontWeight: 500, marginBottom: 50 }}>Daftar ({addressbook.selected.length} Pilihan)</Text>
                                    <Text>Hapus Semua</Text>
                                </View>
                                <View>
                                    <FlatList
                                        data={addressbook.selected}
                                        renderItem={({ item }) => <CardListPilih
                                            item={item}
                                        />
                                        }
                                        keyExtractor={item => item.id}
                                    />
                                </View>

                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}
