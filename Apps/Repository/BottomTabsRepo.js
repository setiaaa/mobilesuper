import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native-safe-area-context';

function MyTabBarRepo({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    return (
        <SafeAreaView>
            <BottomSheetModalProvider>
                <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white, justifyContent: 'space-around', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('Dokumen', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{
                            alignItems: 'center',
                            backgroundColor: tabItemIndex === 1 ? COLORS.white : null,
                            height: 65,
                            justifyContent: 'center',
                            width: 80,
                            borderTopLeftRadius: tabItemIndex === 1 ? 16 : null,
                            borderTopRightRadius: tabItemIndex === 1 ? 16 : null,
                            //shadow ios
                            shadowOffset: tabItemIndex === 1 ? { width: -2, height: -2 } : null,
                            shadowColor: tabItemIndex === 1 ? COLORS.primary : null,
                            shadowOpacity: tabItemIndex === 1 ? 0.4 : null,
                            //shadow android
                            elevation: tabItemIndex === 1 ? 2 : null,
                        }}>
                        <Ionicons name='list' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Dokummen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('Dibagikan', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{
                            alignItems: 'center',
                            backgroundColor: tabItemIndex === 2 ? COLORS.white : null,
                            height: 65,
                            justifyContent: 'center',
                            width: 80,
                            borderTopLeftRadius: tabItemIndex === 2 ? 16 : null,
                            borderTopRightRadius: tabItemIndex === 2 ? 16 : null,
                            //shadow ios
                            shadowOffset: tabItemIndex === 2 ? { width: -2, height: -2 } : null,
                            shadowColor: tabItemIndex === 2 ? COLORS.primary : null,
                            shadowOpacity: tabItemIndex === 2 ? 0.4 : null,
                            //shadow android
                            elevation: tabItemIndex === 2 ? 2 : null,
                        }}>
                        <Ionicons name='people-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Dibagikan</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

})
export default MyTabBarRepo