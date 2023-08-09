import React from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'

export const Kesejahteraan = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 80, marginTop: 20 }}>

            <View style={{ alignItems: 'center', width: 50 }}>
                <Image source={require('../../assets/superApp/Tapera.png')} />
                <Text>Tapera</Text>
            </View>

            <View style={{ alignItems: 'center', width: 50 }}>
                <Image source={require('../../assets/superApp/BPJS.png')} />
                <Text>BPJS</Text>
            </View>

            <View style={{ alignItems: 'center', width: 50 }}>
                <Image source={require('../../assets/superApp/Taspen.png')} />
                <Text>Taspen</Text>
            </View>

        </View>
    )
}
