import React from 'react'
import { Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { COLORS, PADDING } from '../../config/SuperAppps'

export const Demografi = () => {
    return (
        <View style={{ height: '90%', width: '100%', padding:PADDING.Page }}>
            <WebView
                originWhitelist={["*"]}
                source={{ uri: 'https://portal.kubekkp.coofis.com/assets/dashboardExt/DTunggal/DKepegawaian.html' }}
                style={{ flex: 1, }}
                allowFileAccess={true}
                androidLayerType={"software"}
                mixedContentMode={"always"}
                allowUniversalAccessFromFileURLs={true}
            />
            <Text style={{color:COLORS.primary}}>*) Cubit dengan 2 jari untuk menyesuaikan zoom</Text>
        </View>
    )
}
