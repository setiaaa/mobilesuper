import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { FONTWEIGHT } from '../../config/SuperAppps';

export const CardLiburTahunan = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View>
                <Ionicons name='ellipse-outline' size={24} />
            </View>
            <View>
                <Text style={{ marginTop: 10, }}>{item.tanggal_libur}</Text>
                <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold }}>{item.informasi}</Text>
            </View>
        </View>
    )
}
