import React from 'react'
import { Text, View } from 'react-native'

export const CardMemberSPPD = ({item}) => {
  return (
    <View style={{flexDirection: 'row', gap: 5, marginHorizontal: 20,marginVertical: 5}}>
        <Text>-</Text>
        <Text>{item.person}</Text>
    </View>
  )
}
