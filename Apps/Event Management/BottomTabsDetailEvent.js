import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../../config/SuperAppps';
import { SafeAreaView } from 'react-native';

function MyTabDetailEvent({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    return (
        <SafeAreaView>
            <BottomSheetModalProvider>
                <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white, justifyContent: 'space-around', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('DetailEvent', { unread: false })
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
                                <Ionicons name='information-circle-outline' color={COLORS.primary} size={24} />
                                <Text style={{ color: COLORS.primary }}>Detail</Text>
                            </View>
                        ) : (
                            <View style={{
                                alignItems: 'center',
                                height: 65,
                                justifyContent: 'center',
                                width: 80,
                            }}>
                                <Ionicons name='information-circle-outline' color={COLORS.grey} size={24} />
                                <Text style={{ color: COLORS.grey }}>Detail</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('AgendaEvent', { unread: false })
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
                                <Ionicons name='reorder-four-outline' color={COLORS.primary} size={24} />
                                <Text style={{ color: COLORS.primary }}>Agenda</Text>
                            </View>
                        ) : (
                            <View style={{
                                alignItems: 'center',
                                height: 65,
                                justifyContent: 'center',
                                width: 80,
                            }}>
                                <Ionicons name='reorder-four-outline' color={COLORS.grey} size={24} />
                                <Text style={{ color: COLORS.grey }}>Agenda</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

})
export default MyTabDetailEvent