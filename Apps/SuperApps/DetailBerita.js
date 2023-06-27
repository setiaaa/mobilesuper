import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'

export const DetailBerita = ({ route }) => {
    const { item } = route.params
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', zIndex: 1 }}>
                        <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                            <Ionicons name='chevron-back' size={24} color={'#752A2B'} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ position: 'relative' }}>
                        <Image source={item.image} style={{ width: 390, height: 260 }} />
                        <View style={{ backgroundColor: '#FFFFFF', height: 50, position: 'absolute', width: '100%', bottom: 0, borderTopLeftRadius: 100, borderTopRightRadius: 100 }} />
                    </View>
                    <View style={{ backgroundColor: '#FFFFFF' }}>
                        <Text style={{ paddingBottom: 20, paddingHorizontal: 20 }}>{item.title}</Text>
                        <Text style={{ paddingHorizontal: 20, textAlign: 'justify' }}>{item.deskripsi}</Text>
                        <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row' }}>
                            <Ionicons name='calendar-outline' size={24} color={'#752A2B'} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>{item.tanggal}</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='person-circle-outline' size={24} color={'#752A2B'} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>{item.pembuat}</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='eye-outline' size={24} color={'#752A2B'} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>Dilihat: {item.dilihat}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
})
