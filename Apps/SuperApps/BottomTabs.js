import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native-safe-area-context';

function MyTabBar({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    return (
        <BottomSheetModalProvider>
            <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white, justifyContent: 'center', paddingRight: 15 }}>
                <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'center', gap: 30 }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('Home', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='home' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('Satker', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='business-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Satker</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={4}
                        onPress={() => {
                            setTabItemIndex(4)
                            navigation.navigate('Tp', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }}
                        style={{
                            top: -35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            height: 70,
                            width: 70,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50
                        }}>
                            <View style={{
                                backgroundColor: COLORS.primary,
                                width: 51,
                                height: 51,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50
                            }}>
                                <Ionicons name='grid-outline' color={COLORS.white} size={24} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={5}
                        onPress={() => {
                            setTabItemIndex(5)
                            navigation.navigate('FAQ', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='reader' color={tabItemIndex === 5 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 5 ? COLORS.primary : COLORS.grey }}>FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={6}
                        onPress={() => {
                            setTabItemIndex(6)
                            navigation.navigate('Profile', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='person' color={tabItemIndex === 6 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 6 ? COLORS.primary : COLORS.grey }}>Profile</Text>
                    </TouchableOpacity>
                </View>
                {/* 
                
                
                <View style={{ flexDirection: 'row', gap: 35, marginVertical: 20, justifyContent: 'flex-end', flex: 1, marginRight: 20 }}>
                
                
                
            </View> */}
            </View>
        </BottomSheetModalProvider>
    )
}


const styles = StyleSheet.create({

})
export default MyTabBar