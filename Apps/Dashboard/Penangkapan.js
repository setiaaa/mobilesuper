import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { COLORS, PADDING } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export const Penangkapan = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <View style={{ backgroundColor: COLORS.primary, height: '10%', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={[styles.backIcon, { justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 20 }]}>
                        <Ionicons name='chevron-back' size={24} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 40 }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>Produksi Budidaya</Text>
                </View>
            </View>
            <View style={{height: '90%', width: '100%', padding:PADDING.Page }}>
                <WebView
                    originWhitelist={["*"]}
                    source={{ uri: 'https://portal.kubekkp.coofis.com/assets/dashboardExt/DProduksiTangkap/DProduksiTangkap.html' }}
                    style={{ flex: 1 }}
                    allowFileAccess={true}
                    androidLayerType={"software"}
                    mixedContentMode={"always"}
                    allowUniversalAccessFromFileURLs={true}
                />
                <Text style={{color:COLORS.primary}}>*) Cubit dengan 2 jari untuk menyesuaikan zoom</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        height: 193, width: 350, borderRadius: 16
    },
    imageAndroid: {
        height: 193, width: 369, borderRadius: 16
    },
})
