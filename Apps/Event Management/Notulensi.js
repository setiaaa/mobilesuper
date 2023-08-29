import React from 'react'
import { Text, View } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';

export const Notulensi = ({ route }) => {
    const { data } = route.params

    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Notulensi</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16 }}>
                        <View>
                            <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: FONTWEIGHT.bold }}>{data.judul}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <Image source={data.avatar} style={{ width: 26, height: 26, borderRadius: 50 }} />
                            <Text style={{ fontSize: 13, color: COLORS.info }}>{data.pic}</Text>
                            {/* custom divider */}
                            <View style={{ height: '100%', width: 1, backgroundColor: '#DBDADE', marginVertical: 10 }} />
                            <Text style={{ fontSize: 13 }}>{data.unit}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                            <Text style={{ width: 120, color: COLORS.lighter }}>Tanggal Acara</Text>
                            <Text>:</Text>
                            <Text>{data.tanggal}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                            <Text style={{ width: 120, color: COLORS.lighter }}>Waktu Acara</Text>
                            <Text>:</Text>
                            <Text>{data.jam}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                            <Text style={{ width: 120, color: COLORS.lighter }}>Tempat Acara</Text>
                            <Text>:</Text>
                            <Text style={{ width: 186 }}>{data.tempat}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ width: 150, fontWeight: FONTWEIGHT.bold }}>Peserta</Text>
                            {data.pesertaevent?.map((data, index) =>
                                <View style={{ position: 'relative' }}>
                                    <Image source={data.image} style={{ width: 26, height: 26, marginLeft: index !== 0 ? -7 : 0 }} />
                                </View>
                            )}
                            <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text>{data.deskripsi}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 16, borderRadius: 16 }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>Notulensi</Text>
                        <View style={{ width: 326, height: 330, backgroundColor: COLORS.ExtraDivinder, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text>Notulensi Viewer</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, marginTop: 20 }}>
                    <TouchableOpacity style={{
                        width: 171,
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: COLORS.infoDanger,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: COLORS.white }}>Tolak Notulensi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: 171,
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: COLORS.primary,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: COLORS.white }}>Approve Notulensi</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
