import React from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Search } from '../../components/Search'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useSelector } from 'react-redux'
import Checkbox from 'expo-checkbox'
import { useState } from 'react'
import { useEffect } from 'react'
import ListEmpty from '../../components/ListEmpty'


const ListBankom = ({ judul, item }) => {
    const navigation = useNavigation()
    const [isSelected, setSelection] = useState(false);
    return (
        <View style={{
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
            <TouchableOpacity onPress={() => navigation.navigate('DetailSertifikat', {
                item: item
            })}>

                <View style={{ marginVertical: 20, marginHorizontal: 20, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        color={isSelected === true ? COLORS.lighter : null}
                    />
                    <Text style={{ marginVertical: 5, fontSize: 13 }}>{item.judul}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export const Bankom = () => {
    const navigation = useNavigation()
    const { digitalsign } = useSelector(state => state.digitalsign)

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }

    useEffect(() => {
        setFilterData(digitalsign.lists)
    }, [digitalsign])

    useEffect(() => {
        if (search !== '') {
            const data = digitalsign.lists.filter((item) => {
                return item.judul.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(digitalsign.lists)
        }
    }, [search])

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <SafeAreaView style={{ position: 'relative' }}>
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

                    <View style={{ width: '90%', marginLeft: 20, marginTop: 20 }}>
                        <Search
                            placeholder={'Cari'}
                            iconColor={COLORS.primary}
                            onSearch={filter}
                        />
                    </View>
                    <FlatList
                        data={filterData}
                        renderItem={({ item }) => <ListBankom
                            judul={item.judul}
                            item={item}
                        />
                        }
                        keyExtractor={item => item.id}
                        ListEmptyComponent={() =>
                            <ListEmpty />
                        }
                        style={{ height: '100%' }}
                    />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('TambahSertifikat')
                    }}
                        style={{ position: 'absolute', bottom: 300, right: 30, zIndex: 99 }}
                    >
                        <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='add-outline' size={24} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
