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
import { Image } from 'react-native';


const DataLampiran = ({ item }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ backgroundColor: COLORS.white, borderRadius: 10, width: '80%', marginVertical: 10, }}>
                <View style={{ alignItems: 'center', marginHorizontal: 10, marginVertical: 15 }}>
                    <Image source={require('../../assets/superApp/pdf.png')} />
                    <Text style={{ width: '100%', fontSize: FONTSIZE.H4, fontWeight: FONTWEIGHT.normal, textAlign: 'center', marginVertical: 10 }}>{item.file}</Text>
                    <Text style={{ width: '100%', color: COLORS.lighter, fontSize: 10, fontWeight: FONTWEIGHT.normal, textAlign: 'center' }}>{item.size}</Text>
                </View>
            </View>
        </View >
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
                key={'#'}
                data={detail.lampiran}
                renderItem={({ item }) =>
                    <View key={item.id}>
                        <DataLampiran
                            item={item} />
                    </View>
                }
                numColumns={2}
                keyExtractor={item => "#" + item.id}
                style={{ marginTop: 20 }}
            />
        </SafeAreaView>
    )
}
