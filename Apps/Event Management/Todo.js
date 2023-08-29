import React from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Search } from '../../components/Search'



const CardListTodo = ({ item }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <View style={{
                width: 358,
                height: 102,
                backgroundColor: COLORS.white,
                borderRadius: 8,
                justifyContent: 'center',
                padding: 20,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}>
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.lighter }}>Due Date :</Text>
                    <Text style={{ marginVertical: 10, color: COLORS.lighter }}>{item.tanggal}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.lighter }}>Agenda</Text>
                    <Text style={{ color: COLORS.lighter }}>{item.agenda}</Text>
                </View>
            </View>
        </View>
    )
}


export const Todo = () => {
    const { agenda } = useSelector(state => state.event)
    const data = agenda.detail

    const navigation = useNavigation()
    return (
        <SafeAreaView>
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
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>ToDo</Text>
                </View>
            </View>

            <View style={{ width: '90%', marginTop: 20, marginHorizontal: 20 }}>
                <Search
                    placeholder={"Cari ToDO"}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='filter-outline' size={24} />
                    </View>

                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='menu-outline' size={24} />
                    </View>
                </View>
            </View>

            <FlatList
                data={data.todo}
                renderItem={({ item }) => <CardListTodo
                    item={item}
                />
                }
                keyExtractor={item => item.id}
                style={{ marginTop: 10 }}
            />

        </SafeAreaView>
    )
}
