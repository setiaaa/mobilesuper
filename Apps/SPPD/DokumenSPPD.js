import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Search } from '../../components/Search';
import { ScrollView } from 'react-native-gesture-handler';

export const DokumenSPPD = () => {
  const navigation = useNavigation();

  return (
    < >
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
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Daftar Dokumen</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Search
          placeholder={'Cari'}
        // onSearch={filter}
        />
        <ScrollView style={{ marginVertical: 20, height: "80%" }}>
          <View style={{ gap: 10, marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailDokumenSPPD")}
              style={{
                backgroundColor: COLORS.white,
                height: 58,
                justifyContent: "center",
                padding: 8,
                gap: 8,
                borderRadius: 8,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
              }}>
              <Text style={{ fontSize: 13, fontWeight: 400 }}>UAT Collaboration Office modul employee self service</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Mulai: 27-09-2023</Text>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Selesai: 05-10-2023</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                height: 58,
                justifyContent: "center",
                padding: 8,
                gap: 8,
                borderRadius: 8,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
              }}>
              <Text style={{ fontSize: 13, fontWeight: 400 }}>UAT employee self service di labuan bajo</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Mulai: 27-09-2023</Text>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Selesai: 05-10-2023</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                height: 58,
                justifyContent: "center",
                padding: 8,
                gap: 8,
                borderRadius: 8,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
              }}>
              <Text style={{ fontSize: 13, fontWeight: 400 }}>UAT Korespondensi Coofis</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Mulai: 27-09-2023</Text>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Selesai: 05-10-2023</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                height: 58,
                justifyContent: "center",
                padding: 8,
                gap: 8,
                borderRadius: 8,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
              }}>
              <Text style={{ fontSize: 13, fontWeight: 400 }}>UAT Real Time Collaboration</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Mulai: 27-09-2023</Text>
                <Text style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>Tanggal Selesai: 05-10-2023</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ >
  )
}
