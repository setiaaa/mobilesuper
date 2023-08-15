import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native-safe-area-context';

function MyTabBarDetailRepo({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    return (
        <SafeAreaView>
            <BottomSheetModalProvider>
                <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white }}>
                    <View style={{ flexDirection: 'row', gap: 35, marginVertical: 20, justifyContent: 'space-around', marginLeft: 20, display: 'flex', flex: 1 }}>
                        <TouchableOpacity
                            key={1}
                            onPress={() => {
                                setTabItemIndex(1)
                                navigation.navigate('DetailActivity', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='information-circle-outline' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Info</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={2}
                            onPress={() => {
                                setTabItemIndex(2)
                                navigation.navigate('Lampiran', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='attach-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Lampiran</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={3}
                            onPress={() => {
                                setTabItemIndex(3)
                                navigation.navigate('Komentar', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='chatbox-outline' color={tabItemIndex === 3 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 3 ? COLORS.primary : COLORS.grey }}>Komentar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

})
export default MyTabBarDetailRepo