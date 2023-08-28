import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native';

function MyTabDetailAgenda({ props, navigation }) {
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
                                navigation.navigate('DetailAgenda', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='information-circle-outline' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Detail</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={2}
                            onPress={() => {
                                setTabItemIndex(2)
                                navigation.navigate('Todo', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='reorder-four-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Todo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            key={3}
                            onPress={() => {
                                setTabItemIndex(3)
                                navigation.navigate('Absen', { unread: false })
                                // props.navigation.navigate('Home', { unread: false })
                            }} style={{ alignItems: 'center' }}>
                            <Ionicons name='people-outline' color={tabItemIndex === 3 ? COLORS.primary : COLORS.grey} size={24} />
                            <Text style={{ color: tabItemIndex === 3 ? COLORS.primary : COLORS.grey }}>Absen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

})
export default MyTabDetailAgenda