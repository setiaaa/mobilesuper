import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function MyTabBarKal({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);
    const bottomSheetModalAddRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAdd = () => {
        bottomSheetModalAddRef.current?.present()
    }

    return (
        <BottomSheetModalProvider>
            <View style={{ flexDirection: 'row', height: 68, backgroundColor: COLORS.white, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', marginVertical: 20, gap: 70 }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('GrupKalender', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='calendar-outline' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Kalender</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={3}
                        onPress={() => {
                            setTabItemIndex(3)
                            bottomSheetAdd()
                            // props.navigation.navigate('Home', { unread: false })
                        }}
                        style={{
                            top: -35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
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
                                <Ionicons name='add-outline' color={COLORS.white} size={24} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <BottomSheetModal
                        ref={bottomSheetModalAddRef}
                        snapPoints={animatedSnapPoints}
                        handleHeight={animatedHandleHeight}
                        contentHeight={animatedContentHeight}
                        index={0}
                        style={{ borderRadius: 50 }}
                        keyboardBlurBehavior="restore"
                        android_keyboardInputMode="adjust"
                        backdropComponent={({ style }) => (
                            <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                        )}
                    >
                        <BottomSheetView onLayout={handleContentLayout} >
                            <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 40, borderRadius: 8 }}>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Agenda</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Task</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                                    onPress={() => {
                                        navigation.navigate('TambahGrup', { unread: false })
                                        // props.navigation.navigate('Home', { unread: false })
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Grup</Text>
                                </TouchableOpacity>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('Agenda', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='reorder-four-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Agenda</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModalProvider>
    )
}


const styles = StyleSheet.create({

})
export default MyTabBarKal