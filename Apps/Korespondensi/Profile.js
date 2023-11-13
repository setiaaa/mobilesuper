import React from 'react'
import { View, Text, Image } from 'react-native'
import { COLORS } from '../../config/SuperAppps'

export const Profile = () => {
  return (
    <View style={{ flex: 1, padding: 25, }}>
        <View style={{ borderRadius: 15, backgroundColor: COLORS.white, height: 475, gap: 10 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../assets/superApp/Card-Background-Blue.png")} style={{ width: "100%", borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
                <View style={{ alignItems: "center", gap: 10, position: "absolute", }}>
                    <Image source={require("../../assets/superApp/AvatarA.png")} style={{ width: 75, height: 75, borderRadius: 36, borderWidth: 2, borderColor: COLORS.white }}  />
                    <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>ANTAM NOVAMBAR</Text>
                    <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.white }}>Sekertaris Jenderal</Text>
                </View>
            </View>
            <View style={{ gap: 20, padding: 25 }}>
                <View>
                    <Text style={{ fontSize: 13, fontWeight: 400, }}>NIP</Text>
                    <Text style={{ fontSize: 13, fontWeight: 600, }}>197406261999031004</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 13, fontWeight: 400, }}>Jabatan</Text>
                    <Text style={{ fontSize: 13, fontWeight: 600, }}>Sekretaris Jenderal</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 13, fontWeight: 400, }}>Departemen</Text>
                    <Text style={{ fontSize: 13, fontWeight: 600, }}>Sekertaris Jenderal</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 13, fontWeight: 400, }}>Division</Text>
                    <Text style={{ fontSize: 13, fontWeight: 600, }}>Sekertaris Jenderal</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 13, fontWeight: 400, }}>Organization</Text>
                    <Text style={{ fontSize: 13, fontWeight: 600, }}>Kementrian Kelautan dan Perikanan</Text>
                </View>
            </View>
        </View>
    </View>
  )
}
