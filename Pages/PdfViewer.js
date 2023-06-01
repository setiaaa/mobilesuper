import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import PdfReader from 'rn-pdf-reader-js-improved'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

const PdfViewer = ({ route }) => {
    const { data } = route.params
    const navigation = useNavigation()
    useEffect(() => {
        console.log(data)
    }, [])
    return (
        <View>
            <View style={{ width: '100%', height: '100%' }}>
                <PdfReader
                    source={{
                        uri: data.link,
                    }}
                    webviewProps={{
                        startInLoadingState: true,
                    }}
                />
            </View>
        </View>
    )
}

export default PdfViewer

const styles = StyleSheet.create({
    pdf: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000'
    },
})