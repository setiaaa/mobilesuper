import React from 'react'
import { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS,FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'

export const DokumenCuti = () => {
    const navigation = useNavigation()

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{ position: 'relative' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80,  }}>
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
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Cuti</Text>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
