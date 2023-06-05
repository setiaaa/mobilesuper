import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomDrawer = (props) => {
    const [drawerItemIndex, setDrawerItemIndex] = useState(1)
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ marginLeft: 20 }}>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <Image source={require('../../assets/superApp/Avatar.png')} />
                    <Text style={{ marginTop: 8, left: 16, color: 'black' }}>Azis Faisal {"\n"}T0002</Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Manajemen Kebijakan</Text>
                </View>

                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        setDrawerItemIndex(1)
                        props.navigation.navigate('Dashboard', { unread: false })
                    }}
                    style={{ marginTop: 30, flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <Ionicons name={'home-outline'} color={'black'} size={24} />
                    <Text style={{ color: 'black', marginLeft: 12 }}>{'Dashboard'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={2}
                    onPress={() => {
                        setDrawerItemIndex(2)
                        props.navigation.navigate('Main', { unread: false })
                    }}
                    style={{ marginTop: 20, flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <Ionicons name={'map-outline'} color={'black'} size={24} />
                    <Text style={{ color: 'black', marginLeft: 12 }}>Halaman Utama</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={3}
                    onPress={() => {
                        setDrawerItemIndex(2)
                        // props.navigation.navigate('Dashboard', { unread: false })
                    }}
                    style={{ height: '100%', bottom: 0, justifyContent: 'flex-end', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name={'log-out-outline'} color={'black'} size={24} />
                        <Text style={{ color: 'black', marginLeft: 12 }}>Keluar</Text>

                    </View>

                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer
const styles = StyleSheet.create({})