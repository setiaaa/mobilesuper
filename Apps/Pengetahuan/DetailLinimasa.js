import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'


const CardLampiran = ({ lampiran }) => {
    return (
        <View>
            <Image source={lampiran} style={{ width: 174, height: 97, borderRadius: 6, marginTop: 10 }} />
        </View>
    )
}


export const DetailLinimasa = ({ route }) => {
    const navigation = useNavigation()
    const { item } = route.params
    const [like, setLike] = useState(0)

    const handleLike = () => {
        if (like === 0) {
            setLike(1)
        } else {
            setLike(0)
        }
    }
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
                    <View style={{ backgroundColor: COLORS.white, }}>
                        <Text style={{ paddingBottom: 20, paddingHorizontal: 25, fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>

                        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 25 }}>
                            <View>
                                <Image source={item.avatar} style={{ borderRadius: 50 }} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.nama}</Text>
                                <Text style={{ color: COLORS.grey, marginVertical: 5, fontSize: 13, }}>{item.tanggal}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', paddingHorizontal: 25, marginTop: 20 }}>
                            <View style={{
                                backgroundColor: COLORS.warningLight,
                                width: 100,
                                height: 30,
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 5
                            }}>
                                <Ionicons name='document-outline' size={18} color={COLORS.warning} />
                                <Text style={{ color: COLORS.warning }}>{item.jenis}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ paddingHorizontal: 25, textAlign: 'justify' }}>{item.deskripsi}</Text>
                        </View>

                        {/* <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row' }}>
                            <Ionicons name='calendar-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>ccc</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='person-circle-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>ccc</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                            <Ionicons name='eye-outline' size={24} color={COLORS.primary} />
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                                <Text>Dilihat: </Text>
                            </View>
                        </View> */}



                        <FlatList
                            key={'#'}
                            data={item.lampiran}
                            renderItem={({ item }) => <CardLampiran
                                lampiran={item.gambar}
                            />
                            }
                            style={{ marginTop: 20 }}
                            columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 15 }}
                            numColumns={2}
                            keyExtractor={item => "#" + item.id}
                        />
                        {/* divider custom */}
                        <View style={{ height: 1, width: '90%', backgroundColor: '#DBDADE', marginTop: 20, marginHorizontal: 20 }} />

                        <View style={{ flexDirection: 'row', gap: 10, marginVertical: 20, marginHorizontal: 20 }}>

                            <TouchableOpacity style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }} onPress={handleLike}>
                                <Ionicons name='thumbs-up-outline' size={18} color={like !== 0 ? COLORS.primary : null} />
                                <Text style={{ color: like !== 0 ? COLORS.primary : null }}>{item.suka}</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <Ionicons name='chatbox-outline' size={18} />
                                <Text>{item.komentar}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <Ionicons name='eye-outline' size={18} />
                                <Text>{item.dilihat}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <Ionicons name='information-circle-outline' size={18} />
                            </View>

                        </View>

                        <View style={{
                            height: 105,
                            width: 357,
                            backgroundColor: COLORS.danger,
                            borderRadius: 8,
                            marginHorizontal: 15,
                            marginBottom: 20,
                            //shadow ios
                            shadowOffset: { width: -2, height: 4 },
                            shadowColor: '#171717',
                            shadowOpacity: 0.2,
                            //shadow android
                            elevation: 5
                        }}>
                            <View style={{ height: 96, width: 357, backgroundColor: COLORS.white, borderRadius: 8, position: 'absolute', bottom: 0 }}>
                                <Text style={{ fontWeight: 600, marginHorizontal: 20, marginTop: 20 }}>Selanjutnya</Text>
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
        height: 260,
        resizeMode: 'cover'
    },
    imageAndroid: {
        width: 420,
        height: 260,
        resizeMode: 'Cover'
    }
})
