import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export const Search = ({ onSearch, placeholder }) => {
    return (
        <View style={styles.input}>
            <TextInput
                placeholder={placeholder}
                style={{ fontSize: 16, flex: 1 }}
                maxLength={30}
                onChangeText={onSearch}
                clearButtonMode='always'
            />
            <Ionicons name='search' size={20} color={'grey'} />
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
})
