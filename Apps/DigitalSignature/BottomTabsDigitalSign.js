import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../../config/SuperAppps';
import { } from 'react-native-safe-area-context';

function MyTabDigitalSign({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    return (
        < >
            <BottomSheetModalProvider>
                <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white, justifyContent: 'space-around', borderTopLeftRadius: 16, borderTopRightRadius: 16, }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('Bankom', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }}>
                        {tabItemIndex === 1 ? (
                            <View style={{
                                alignItems: 'center',
                                height: 65,
                                justifyContent: 'center',
                                width: 80,
                            }}>

                                <View style={{
                                    width: '100%',
                                    height: 3,
                                    backgroundColor: COLORS.primary,
                                    position: 'absolute',
                                    top: 0,
                                    //shadow ios
                                    shadowOffset: { width: -2, height: 5 },
                                    shadowColor: COLORS.primary,
                                    shadowOpacity: 0.4,
                                    //shadow android
                                    elevation: 2,
                                }} />
                                <Ionicons name='briefcase-outline' color={COLORS.primary} size={24} style={{ position: "absolute", top: 5 }} />
                                <Text style={{ color: COLORS.primary, position: "absolute", bottom: 15 }}>Bankom</Text>
                            </View>
                        ) : (
                            <View style={{
                                alignItems: 'center',
                                height: 65,
                                justifyContent: 'center',
                                width: 80,
                            }}>
                                <Ionicons name='briefcase-outline' color={COLORS.grey} size={24} style={{ position: "absolute", top: 5 }} />
                                <Text style={{ color: COLORS.grey, position: "absolute", bottom: 15 }}>Bankom</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('DokumenLain', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }}>
                        {tabItemIndex === 2 ? (
                            <View style={{
                                alignItems: 'center',
                                height: 65,
                                justifyContent: 'center',
                                width: 80,
                            }}>

                                <View style={{
                                    width: '100%',
                                    height: 3,
                                    backgroundColor: COLORS.primary,
                                    position: 'absolute',
                                    top: 0,
                                    //shadow ios
                                    shadowOffset: { width: -2, height: 5 },
                                    shadowColor: COLORS.primary,
                                    shadowOpacity: 0.4,
                                    //shadow android
                                    elevation: 2,
                                }} />
                                <Ionicons name='attach-outline' color={COLORS.primary} size={24} />
                                <Text style={{ color: COLORS.primary, textAlign: 'center' }}>Dokumen Lain</Text>
                            </View>
                        ) : (
                            <View style={{
                                alignItems: 'center',
                                height: 65,
                                justifyContent: 'center',
                                width: 80,
                            }}>
                                <Ionicons name='attach-outline' color={COLORS.grey} size={24} />
                                <Text style={{ color: COLORS.grey, textAlign: 'center' }}>Dokumen Lain</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </BottomSheetModalProvider>
        </ >
    )
}


const styles = StyleSheet.create({

})
export default MyTabDigitalSign