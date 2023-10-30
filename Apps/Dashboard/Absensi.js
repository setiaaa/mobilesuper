import React from 'react'
import { Text, View } from 'react-native'
import WebView from 'react-native-webview'

export const Absensi = () => {
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <WebView
                originWhitelist={["*"]}
                source={{ uri: 'https://portal.kubekkp.coofis.com/assets/dashboardExt/DKepegawaian/DAbsensi.html' }}
                style={{ flex: 1, }}
                allowFileAccess={true}
                androidLayerType={"software"}
                mixedContentMode={"always"}
                allowUniversalAccessFromFileURLs={true}
            />
        </View>
    )
}
