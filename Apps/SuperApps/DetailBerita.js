import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { SafeAreaView } from 'react-native-safe-area-context'

export const DetailBerita = ({ route }) => {
    const { item } = route.params
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', zIndex: 1 }}>
                        <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                            <Ionicons name='chevron-back' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ position: 'relative' }}>
                        <Image source={item.image} style={Platform.OS === "ios" ? styles.imageIos : styles.imageAndroid} />
                        <View style={{ backgroundColor: COLORS.white, height: 50, position: 'absolute', width: '100%', bottom: 0, borderTopLeftRadius: 100, borderTopRightRadius: 100 }} />
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.primary,
                            width: 42,
                            height: 42,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            position: 'absolute',
                            right: 10,
                            bottom: 30

                        }}>
                            <Ionicons name='share-social-outline' size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: COLORS.white, height: '100%' }}>
                        <Text style={{ paddingBottom: 30, paddingHorizontal: 25 }}>{item.title}</Text>
                        <Text style={{ paddingHorizontal: 25, textAlign: 'justify' }}>{item.deskripsi}</Text>
                        <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row' }}>
                            <Ionicons name='calendar-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>{item.tanggal}</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='person-circle-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>{item.pembuat}</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='eye-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>Dilihat: {item.dilihat}</Text>
                            </View>
                        </View>

                        <View style={{
                            height: 105,
                            width: 357,
                            backgroundColor: COLORS.danger,
                            borderRadius: 8,
                            marginHorizontal: 15,
                            marginVertical: 20,
                            //shadow ios
                            shadowOffset: { width: -2, height: 4 },
                            shadowColor: '#171717',
                            shadowOpacity: 0.2,
                            //shadow android
                            elevation: 5
                        }}>
                            <View style={{ height: 96, width: 357, backgroundColor: COLORS.white, borderRadius: 8, position: 'absolute', bottom: 0 }}>
                                <Text style={{ fontWeight: 600, marginHorizontal: 20, marginTop: 20 }}>Berita Selanjutnya</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, marginHorizontal: 20, marginTop: 10, width: 300 }}>Kementrian Kelautan dan Perikanan (KKP) bersama dengan Dewan...</Text>
                                    <TouchableOpacity style={{ position: 'absolute', right: 10 }}>
                                        <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                                    </TouchableOpacity>
                                </View>
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
    imageIos: {
        width: 390,
        height: 260
    },
    imageAndroid: {
        width: 420,
        height: 260
    }
})
