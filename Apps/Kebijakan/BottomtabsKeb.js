import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function MyTabBarKeb({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);

    return (
        <BottomSheetModalProvider>
            <View style={{ flexDirection: 'row', height: 68, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', gap: 60, marginVertical: 20, justifyContent: 'center', display: 'flex', flex: 1 }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('Dashboard', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='list' color={tabItemIndex === 1 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 1 ? '#752A2B' : 'grey' }}>Kebijakan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('Tematik', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='pencil-outline' color={tabItemIndex === 2 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 2 ? '#752A2B' : 'grey' }}>Tematik</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={3}
                        onPress={() => {
                            setTabItemIndex(3)
                            // navigation.navigate('Tematik', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='document-text-outline' color={tabItemIndex === 3 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 3 ? '#752A2B' : 'grey' }}>Dok.Hukum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModalProvider>
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})
export default MyTabBarKeb