import React from 'react'
import { Text } from 'react-native'
import WebView from 'react-native-webview'

export const Produksi = () => {
    return (
        <WebView
            originWhitelist={["*"]}
            source={{ uri: 'https://portal.kubekkp.coofis.com/assets/dashboardExt/DProduksiBudidaya/DProduksiBudidaya.html' }}
            style={{ flex: 1 }}
            allowFileAccess={true}
            androidLayerType={"software"}
            mixedContentMode={"always"}
            allowUniversalAccessFromFileURLs={true}
        />
    )
}
