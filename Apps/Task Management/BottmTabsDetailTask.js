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


function MyTabBarDetailTask({ props, navigation }) {
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
                <View style={{ flexDirection: 'row', marginVertical: 20, gap: 150 }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('DetailTask', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='information-circle-outline' color={tabItemIndex === 1 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 1 ? COLORS.primary : COLORS.grey }}>Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('LampiranTask', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='attach-outline' color={tabItemIndex === 2 ? COLORS.primary : COLORS.grey} size={24} />
                        <Text style={{ color: tabItemIndex === 2 ? COLORS.primary : COLORS.grey }}>Lampiran</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModalProvider>
    )
}


const styles = StyleSheet.create({

})
export default MyTabBarDetailTask