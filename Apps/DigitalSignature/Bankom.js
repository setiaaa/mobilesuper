import React, { useMemo, useRef } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Search } from '../../components/Search'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from 'expo-checkbox'
import { useState } from 'react'
import { useEffect } from 'react'
import ListEmpty from '../../components/ListEmpty'
import { getDetailDigisign, getListCompleted, getListComposer, getListDraft, getListInProgress } from '../../service/api'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { getTokenValue } from '../../service/session'
import { setDigitalSignLists } from '../../store/DigitalSign'


const ListBankom = ({item, tipe, token}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isSelected, setSelection] = useState(false);
    
    const getDetail = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailDigisign(params));
      };
    return (
        <View 
            key={item.id}
            style={{
                backgroundColor: 'white',
                borderRadius: 16,
                width: '90%',
                flex: 1,
                marginTop: 10,
                marginHorizontal: 20,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            marginVertical: 10
        }}>
            <TouchableOpacity 
                
                onPress={(e) => {
                    getDetail(item.id)
                    navigation.navigate('DetailSertifikat')
            }}>
            {tipe === 'inprogress'?(
                <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        color={isSelected === true ? COLORS.lighter : null}
                />
            ):(
                null
            )}
                <View style={{ marginVertical: 20, marginHorizontal: 20, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    
                    <Text style={{ marginVertical: 5, fontSize: 13, width:300, textAlign:'justify', fontWeight: FONTWEIGHT.bold, }}>{item.subject}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export const Bankom = () => {
    const [token, setToken] = useState('')
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [tipe, setTipe] = useState('')
    // const [type, setType] = useState('bankom')
    const [filterData, setFilterData] = useState([])
    
    const bottomSheetModalMemberRef = useRef(null);
    
    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)
    
    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        setTipe('')
        dispatch(getListComposer({token:token, tipe:'bankom'}));
    }, [tipe])

    const filterHandlerComposer = () => {
        setTipe('')
        dispatch(getListComposer({token:token, tipe:'bankom'}));
    }
    const filterHandlerInProgress = () => {
        setTipe('inprogress')
        dispatch(getListInProgress({token:token, tipe:'bankom'}));
    }
    const filterHandlerCompleted = () => {
        setTipe('')
        dispatch(getListCompleted({token:token, tipe:'bankom'}));
    }
    const filterHandlerDraft = () => {
        setTipe('')
        dispatch(getListDraft({token:token, tipe:'bankom'}));
    }

    
    const { digitalsign } = useSelector((state) => state.digitalsign)
    


    const bottomSheetMember = () => {
        bottomSheetModalMemberRef.current?.present()
    }

    const filter = (event) => {
        setSearch(event)
    }
    
    useEffect(() => {
        setFilterData(digitalsign.lists)
    }, [digitalsign])
    
    useEffect(() => {
        const item = digitalsign.lists
        if (search !== '') {
            const data = item.filter((item) => {
                return item.subject.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(item)
        }
    }, [search])


    // console.log(digitalsign.lists)
    // console.log(filterData)
    return (
        <GestureHandlerRootView>
                <SafeAreaView style={{ position: 'relative' }}>
                {filterData !== null?(
                    <><View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80,  }}>
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
                    </View><View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '75%', marginLeft: 20, marginTop: 20, }}>
                                <Search
                                    placeholder={'Cari'}
                                    iconColor={COLORS.primary}
                                    onSearch={filter} />
                            </View>
                            <TouchableOpacity style={{ marginTop: 20, width: '15%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { bottomSheetMember() } }>
                                <Icon name="filter-list" size={24} color="black" />
                            </TouchableOpacity>
                        </View><View>
                            <FlatList
                                data={filterData}
                                renderItem={({ item }) => (
                                    <View key={item.id}>
                                        <ListBankom
                                            item={item}
                                            token={token}
                                            tipe={tipe} />
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                                ListEmptyComponent={() => <ListEmpty />}
                                style={{ height: '80%' }} />
                        </View><TouchableOpacity onPress={() => {
                            navigation.navigate('TambahSertifikat')
                        } }
                            style={{ position: 'absolute', bottom: 40, right: 30, zIndex: 99 }}
                        >
                            <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='add-outline' size={24} color={COLORS.white} />
                            </View>
                        </TouchableOpacity></>
                ):(
                    <Text>Loading</Text>
                )}
                    
                </SafeAreaView>
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalMemberRef}
                        snapPoints={animatedSnapPoints}
                        handleHeight={animatedHandleHeight}
                        contentHeight={animatedContentHeight}
                        index={0}
                        style={{ borderRadius: 50, }}
                        keyboardBlurBehavior="restore"
                        android_keyboardInputMode="adjust"
                        backdropComponent={({ style }) => (
                            <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                        )}
                    >
                        <BottomSheetView onLayout={handleContentLayout}>
                            <View>
                                <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                        }}
                                    >
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginHorizontal: 20, gap: 30, alignItems: "center"}}>
                                    <TouchableOpacity onPress={filterHandlerComposer} style={{
                                        borderWidth: 1,
                                        padding: 15,
                                        width: "100%",
                                        borderRadius: 4,
                                        borderColor: COLORS.ExtraDivinder,
                                        alignItems: 'center'
                                    }}>
                                        <Text>Composer</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={filterHandlerInProgress} style={{
                                        borderWidth: 1,
                                        padding: 15,
                                        width: "100%",
                                        borderRadius: 4,
                                        borderColor: COLORS.ExtraDivinder,
                                        alignItems: 'center'
                                    }}>
                                        <Text>Inprogress</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={filterHandlerCompleted} style={{
                                        borderWidth: 1,
                                        padding: 15,
                                        width: "100%",
                                        borderRadius: 4,
                                        borderColor: COLORS.ExtraDivinder,
                                        alignItems: 'center'
                                    }}>
                                        <Text>Completed</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={filterHandlerDraft} style={{
                                        borderWidth: 1,
                                        padding: 15,
                                        width: "100%",
                                        borderRadius: 4,
                                        borderColor: COLORS.ExtraDivinder,
                                        alignItems: 'center',
                                        marginBottom: 200
                                    }}>
                                        <Text>Draft</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
