import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function MyTabBarRepo({ props, navigation }) {
    const [tabItemIndex, setTabItemIndex] = useState(1);
    const TabArr = [
        {
            route: 'Home',
            label: 'Home',
            icon: 'home',
            key: 2,
        },
        {
            route: 'Notification',
            label: 'Notification',
            icon: 'notification-outline',
            key: 3,
        },
        {
            route: 'FAQ',
            label: 'FAQ',
            icon: 'home',
            key: 4,
        },
        {
            route: 'Profile',
            label: 'Profile',
            icon: 'home',
            key: 5,
        }

    ];

    return (
        <BottomSheetModalProvider>
            <View style={{ flexDirection: 'row', height: 68, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', gap: 35, marginVertical: 20, justifyContent: 'space-around', marginLeft: 20, display: 'flex', flex: 1 }}>
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            setTabItemIndex(1)
                            navigation.navigate('Dokumen', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='list' color={tabItemIndex === 1 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 1 ? '#752A2B' : 'grey' }}>Dokummen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('Dibagikan', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='people-outline' color={tabItemIndex === 2 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 2 ? '#752A2B' : 'grey' }}>Dibagikan</Text>
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
export default MyTabBarRepo