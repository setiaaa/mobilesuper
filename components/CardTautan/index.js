import React, { useState } from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { COLORS, FONTSIZE } from '../../config/SuperAppps'
import { FlatList } from 'react-native'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


export const CardTautan = ({ setModalVisible }) => {
    return (
        <View style={styles.card}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 10, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/Tp1.png')} style={{ width: 48, height: 48 }} />
                        <Text style={{ fontSize: FONTSIZE.H4 }}>Semar</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/Tp2.png')} style={{ width: 48, height: 48 }} />
                        <Text style={{ fontSize: FONTSIZE.H4 }}>Sistolik</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/Tp3.png')} style={{ width: 48, height: 48 }} />
                        <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Bus Jemputan</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                        <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Lapor.go.id</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                        <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>WBS KKP</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                        <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>Sidak</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                        <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>JDIH</Text>
                    </View>

                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                        <Image source={require('../../assets/superApp/white.png')} style={{ width: 48, height: 48 }} />
                        <View style={{ position: 'absolute', top: 11, right: 13 }}>
                            <Ionicons size={20} name='ellipsis-horizontal' color={COLORS.grey} />
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: FONTSIZE.H4 }}>More</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        borderRadius: 12,
    },

})