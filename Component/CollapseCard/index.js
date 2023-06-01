import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, View, Text, Touchable } from 'react-native'
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList
} from 'accordion-collapse-react-native'
import { Divider } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const CollapseCard = ({
    teu_badan,
    singkatan_peraturan_cat,
    tempat_penetapan,
    tgl_penetapan,
    tgl_diundangkan,
    subjek,
    sumber_peraturan,
    bahasa,
    bidanghukum
}) => {

    const [collapse, setCollapse] = useState(false)
    return (
        <View>
            <Collapse>
                <CollapseHeader>
                    <TouchableOpacity onPress={() => setCollapse(!collapse)}>
                        <View style={[styles.card, { borderRadius: collapse === true ? 0 : 16 }]} >
                            <View style={{ backgroundColor: '#D1DEFC', hegiht: '30%', paddingHorizontal: 20, paddingVertical: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16, flexDirection: 'row' }}>
                                <Text>Informasi Detail</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                    {collapse === true ?
                                        <Ionicons name='chevron-up-outline' size={20} />
                                        :
                                        <Ionicons name='chevron-down-outline' size={20} />}

                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                                <Text>T.E.U</Text>
                                <Text style={{ flex: 1, textAlign: 'right', marginLeft: 100 }}>{teu_badan}</Text>
                            </View>
                            <Divider bold />
                            <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                                <Text>Singkatan Jenis</Text>
                                <Text style={{ flex: 1, textAlign: 'right' }}>{singkatan_peraturan_cat}</Text>
                            </View>
                            <Divider bold />
                            <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                                <Text>Tempat Terbit</Text>
                                <Text style={{ flex: 1, textAlign: 'right' }}>{tempat_penetapan}</Text>
                            </View>
                            <Divider bold />
                            <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                                <Text>Tanggal Penetapan</Text>
                                <Text style={{ flex: 1, textAlign: 'right' }}>{tgl_penetapan}</Text>
                            </View>
                            <Divider bold />
                            <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                                <Text>Tanggal Pengundangan</Text>
                                <Text style={{ flex: 1, textAlign: 'right' }}>{tgl_diundangkan}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </CollapseHeader>
                <CollapseBody>
                    <View style={styles.cardCollapse}>
                        <Divider bold />
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text>Subjek</Text>
                            <Text style={{ flex: 1, textAlign: 'right', marginLeft: 100 }}>{subjek}</Text>
                        </View>
                        <Divider bold />
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text>Sumber</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>{sumber_peraturan}</Text>
                        </View>
                        <Divider bold />
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text>Bahasa</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>{bahasa}</Text>
                        </View>
                        <Divider bold />
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text>Lokasi</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>-</Text>
                        </View>
                        <Divider bold />
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text>Bidang Hukum</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>{bidanghukum}</Text>
                        </View>
                        <Divider bold />
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text>Keterangan</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>-</Text>
                        </View>
                        <Divider bold />
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text>Abstrak</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>-</Text>
                        </View>
                    </View>
                </CollapseBody>
            </Collapse>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F7FE',
        gap: 20,
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        height: 300
    },
    cardCollapse: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
    }
})
