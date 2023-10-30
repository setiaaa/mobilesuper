import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../../../config/SuperAppps";
import { useNavigation } from '@react-navigation/native';

export const FileOutgoingDetail = () => {
  return (
    <View style={{ padding: 20 }}>
        <View style={{ 
            backgroundColor: COLORS.white, 
            width: 80, height: 80, 
            borderRadius: 16, 
            justifyContent: "center", 
            alignItems: "center", 
            alignSelf: "center",
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
        }}>
            <Ionicons name="document-outline" size={48} color={COLORS.primary} />
        </View>

        <TouchableOpacity style={{ 
            backgroundColor: COLORS.infoDanger, 
            height: 50, borderRadius: 8, 
            flexDirection: "row", 
            gap: 20, 
            justifyContent: "center", 
            alignItems: "center",
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
        }}>
            <Ionicons name="eye-outline" size={15} color={COLORS.white} />
            <Text style={{ fontSize: 13, fontWeight: 500, color: COLORS.white }}>Lihat Surat</Text>
        </TouchableOpacity>
    </View>
  )
}
