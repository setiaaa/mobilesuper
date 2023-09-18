import React from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { StyleSheet } from 'react-native'


export const ScannerBarCode = ({ scanData, setScanData }) => {
    const handleBarCodeScanned = ({ type, data }) => {
        setScanData(true)
        console.log(`data: ${data}`)
        console.log(`type: ${type}`)
    }

    return (
        <BarCodeScanner
            onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
    )
}
