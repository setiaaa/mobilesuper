import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import PdfReader from 'rn-pdf-reader-js-improved'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps';


export const FileViewer = ({ route }) => {
    const navigation = useNavigation()
    const { lampiran, type } = route.params
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                <View style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 20,
                    width: 28,
                    height: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Detail</Text>
            </View> */}
            </View>
            <View style={{ width: '100%', height: '100%' }}>
                {type === 'ppt' || type === 'pptx' || type === 'xls' || type === 'xlsx' || type === 'doc' || type === 'docx' ? (
                    <PdfReader
                        source={{
                            uri: lampiran,
                        }}
                        webviewProps={{
                            startInLoadingState: true,
                        }}
                    />

                ) : type === 'pdf' ? (
                    <PdfReader
                        source={{
                            uri: lampiran
                        }}
                        webviewProps={{
                            startInLoadingState: true,
                        }}
                    />
                ) : (
                    null
                )}
            </View>
        </SafeAreaView>
    )
}
