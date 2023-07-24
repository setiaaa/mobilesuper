import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { CardFileTask } from '../../components/CardFileTask'
import { CardDokumenTask } from '../../components/CardDokumenTask'


export const LampiranTask = () => {
    const navigation = useNavigation()
    return (
        <GestureHandlerRootView>
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
                            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Lampiran</Text>
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        <Text style={{ color: COLORS.lighter, fontWeight: FONTWEIGHT.bold }}>Files</Text>
                    </View>

                    <CardFileTask />

                    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        <Text style={{ color: COLORS.lighter, fontWeight: FONTWEIGHT.bold }}>Dokumen</Text>
                    </View>

                    <CardDokumenTask />

                </ScrollView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
