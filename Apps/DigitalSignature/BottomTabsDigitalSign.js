import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native-safe-area-context';

function MyTabDigitalSign({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    return (
        <SafeAreaView>
            <BottomSheetModalProvider>
                <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white }}>
                    <View style={{ flexDirection: 'row', gap: 60, marginVertical: 20, justifyContent: 'space-around', display: 'flex', flex: 1 }}>
                        <TouchableOpacity
                            key={1}
                            onPress={() => {
                                setTabItemIndex(1)
                                navigation.navigate('Bankom', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='briefcase-outline' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Bankom</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={2}
                            onPress={() => {
                                setTabItemIndex(2)
                                navigation.navigate('DokumenLain', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='attach-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Dokumen Lain</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

})
export default MyTabDigitalSign