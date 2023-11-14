import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { COLORS, DATETIME, FONTWEIGHT } from '../../config/SuperAppps';
import moment from 'moment';

export const CardKegiatanTerbaru = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View>
                <Ionicons name='ellipse-outline' size={24} />
            </View>
            <View>
                <Text style={{ marginTop: 10, color: COLORS.lighter }}>{moment(item.start_date, "DD-MM-YYYY").format(DATETIME.LONG_DATE)} - {moment(item.end_date, "DD-MM-YYYY").format(DATETIME.LONG_DATE)}</Text>
                <Text style={{ marginTop: 5, fontWeight: FONTWEIGHT.bold , width: 250}}>{item.fullname}</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{color: COLORS.infoDanger}}>*</Text>    
                <Text style={{ marginTop: 5 , width: 250}}>{item.fullname}</Text>
                </View>
            </View>
        </View>
    )
}
