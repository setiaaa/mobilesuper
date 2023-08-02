import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';


const DataLampiran = ({ item }) => {
    return (
        <View style={{ marginTop: 10, justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '90%', marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 20 }}>
                    <View>
                        <Ionicons name='document-outline' size={24} color={COLORS.lighter} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ width: '100%', fontSize: FONTSIZE.H4, fontWeight: FONTWEIGHT.normal, lineHeight: 14, wordWrap: 'break-word' }}>{item.file}</Text>
                        <Text style={{ width: '100%', color: COLORS.lighter, fontSize: 10, fontWeight: FONTWEIGHT.normal, lineHeight: 18, wordWrap: 'break-word' }}>{item.size}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                        <Ionicons name='download-outline' size={24} color={COLORS.lighter} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export const Lampiran = () => {
    const navigation = useNavigation()
    const { dokumen } = useSelector(state => state.repository)
    const detail = dokumen.detail
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                <View style={{
                    backgroundColor: 'white',
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
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>{detail.judul}</Text>
                </View>
            </View>
            <FlatList
                data={detail.lampiran}
                renderItem={({ item }) =>
                    <DataLampiran
                        item={item} />
                }
                keyExtractor={items => items.id}
                style={{ marginTop: 20 }}
            />
        </SafeAreaView>
    )
}
