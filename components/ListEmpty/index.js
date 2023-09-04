import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'

const ListEmpty = () => {
    return (
        <View style={{ height: 440, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tidak ada data</Text>
        </View>
    )
}

export default ListEmpty