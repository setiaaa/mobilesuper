import React from 'react'
import { View, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { CardSatker } from '../../components/CardSatker';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
export const Satker = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#752A2B', flexDirection: 'row', gap: 20, paddingTop: 20, height: 120 }}>
                {/* <View style={{ width: '90%' }}>
                    <Search
                        placeholder={'Pencarian'}
                    />
                </View> */}
                <View style={{ paddingLeft: 20 }}>
                    <Ionicons name='notifications-outline' size={25} color={'white'} />
                </View>
                <View style={{ marginLeft: '23%', marginTop: 5 }}>
                    <Text style={{ color: 'white', textAlign: 'right', fontWeight: 800, marginBottom: 10 }}>YANI DAMA PUTERA</Text>
                    <Text style={{ color: 'white', textAlign: 'right', fontSize: 11 }}>Direktur Utama ARMS</Text>
                </View>
                <View>
                    <Image source={require('../../assets/superApp/img.png')} style={{ width: 50, height: 50 }} />
                </View>
            </View>

            <View>
                <View style={{ height: '40%', backgroundColor: '#752A2B', width: '100%', position: 'absolute' }} />
                <CardSatker />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
})
