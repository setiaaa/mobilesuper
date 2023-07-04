import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function MyTabBar({ props, navigation }) {
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
            <View style={{ flexDirection: 'row', height: 68, backgroundColor: 'white', }}>
                <View style={{ flexDirection: 'row', gap: 35, marginVertical: 20, justifyContent: 'center', marginLeft: 20 }}>
                    <TouchableOpacity
                        key={2}
                        onPress={() => {
                            setTabItemIndex(2)
                            navigation.navigate('Home', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='home' color={tabItemIndex === 2 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 2 ? '#752A2B' : 'grey' }}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={3}
                        onPress={() => {
                            setTabItemIndex(3)
                            navigation.navigate('Satker', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='business-outline' color={tabItemIndex === 3 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 3 ? '#752A2B' : 'grey' }}>Satker</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    key={6}
                    onPress={() => {
                        setTabItemIndex(6)
                        navigation.navigate('Tp', { unread: false })
                        // props.navigation.navigate('Home', { unread: false })
                    }}
                    style={{
                        top: -35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}>
                    <View style={{
                        backgroundColor: '#FEFEFE',
                        height: 70,
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50
                    }}>
                        <View style={{
                            backgroundColor: '#752A2B',
                            width: 51,
                            height: 51,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50
                        }}>
                            <Ionicons name='grid-outline' color={'#FFFFFF'} size={24} />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', gap: 35, marginVertical: 20, justifyContent: 'flex-end', flex: 1, marginRight: 20 }}>
                    <TouchableOpacity
                        key={4}
                        onPress={() => {
                            setTabItemIndex(4)
                            navigation.navigate('FAQ', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='reader' color={tabItemIndex === 4 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 4 ? '#752A2B' : 'grey' }}>FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        key={5}
                        onPress={() => {
                            setTabItemIndex(5)
                            navigation.navigate('Profile', { unread: false })
                            // props.navigation.navigate('Home', { unread: false })
                        }} style={{ alignItems: 'center' }}>
                        <Ionicons name='person' color={tabItemIndex === 5 ? '#752A2B' : 'grey'} size={24} />
                        <Text style={{ color: tabItemIndex === 5 ? '#752A2B' : 'grey' }}>Profile</Text>
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
export default MyTabBar