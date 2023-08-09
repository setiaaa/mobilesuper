import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { COLORS } from '../../config/SuperAppps'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'

export const Perencanaan = () => {
    return (
        <View style={styles.card}>
            <Image source={require('../../assets/superApp/logoKecil.png')} />
            <Text>Ropeg</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 30,
        height: 48,
        flexDirection: 'row',
        gap: 10,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: COLORS.primary,
        shadowOpacity: 0.2,
        // shadow android
        elevation: 1
    }
})
