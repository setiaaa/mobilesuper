import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { COLORS } from '../../../config/SuperAppps'

export const PSemua = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        {/* <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Image source={require ("../../../assets/superApp/SearchLetter.png")} />
            <View style={{ alignItems: "center", gap: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 600, color: COLORS.lighter }}>Find your letter</Text>
                <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.lighter }}>type keyword in the input text</Text>
            </View>
        </View> */}

        <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>Hasil (3)</Text>
        </View>
        <ScrollView>
            <TouchableOpacity style={{
                backgroundColor: COLORS.white,
                borderRadius: 8, 
                padding: 15,
                marginTop: 16,
                //shadow ios
                shadowOffset: { width: 0, height: 1 },
                shadowColor: "#171717",
                shadowOpacity: 0.1,
                //shadow android
                elevation: 2,
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ gap: 10, width: "70%" }}>
                        <Text style={{ fontSize: 13, fontWeight: 600 }}>Kepala Pusat Data Statistik Dan Informasi</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400 }}>Survei Data Spasial Tata Ruang Laut</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.lighter }}>28 September 2023 15:37:37</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", width: "30%" }}>
                        <View style={{ gap: 10, alignItems: "center", }}>
                            <View style={{ backgroundColor: COLORS.grey, width: 64, height: 24, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.white }}>Incoming</Text>
                            </View>
                            <Image source={require ("../../../assets/superApp/AvatarKomen1.png")} style={{ width: 32, height: 32 }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{
                backgroundColor: COLORS.white,
                borderRadius: 8, 
                padding: 15,
                marginTop: 16,
                //shadow ios
                shadowOffset: { width: 0, height: 1 },
                shadowColor: "#171717",
                shadowOpacity: 0.1,
                //shadow android
                elevation: 2,
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ gap: 10, width: "70%" }}>
                        <Text style={{ fontSize: 13, fontWeight: 600 }}>Kepala Pusat Data Statistik Dan Informasi</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400 }}>Survei Data Spasial Tata Ruang Laut</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.lighter }}>28 September 2023 15:37:37</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", width: "30%" }}>
                        <View style={{ gap: 10, alignItems: "center", }}>
                            <View style={{ backgroundColor: COLORS.infoDanger, width: 64, height: 24, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.white }}>Submitted</Text>
                            </View>
                            <Image source={require ("../../../assets/superApp/AvatarKomen1.png")} style={{ width: 32, height: 32 }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{
                backgroundColor: COLORS.white,
                borderRadius: 8, 
                padding: 15,
                marginTop: 16,
                //shadow ios
                shadowOffset: { width: 0, height: 1 },
                shadowColor: "#171717",
                shadowOpacity: 0.1,
                //shadow android
                elevation: 2,
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ gap: 10, width: "70%" }}>
                        <Text style={{ fontSize: 13, fontWeight: 600 }}>Kepala Pusat Data Statistik Dan Informasi</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400 }}>Survei Data Spasial Tata Ruang Laut</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.lighter }}>28 September 2023 15:37:37</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", width: "30%" }}>
                        <View style={{ gap: 10, alignItems: "center", }}>
                            <View style={{ backgroundColor: COLORS.grey, width: 64, height: 24, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.white }}>Incoming</Text>
                            </View>
                            <Image source={require ("../../../assets/superApp/AvatarKomen1.png")} style={{ width: 32, height: 32 }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{
                backgroundColor: COLORS.white,
                borderRadius: 8, 
                padding: 15,
                marginTop: 16,
                //shadow ios
                shadowOffset: { width: 0, height: 1 },
                shadowColor: "#171717",
                shadowOpacity: 0.1,
                //shadow android
                elevation: 2,
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ gap: 10, width: "70%" }}>
                        <Text style={{ fontSize: 13, fontWeight: 600 }}>Kepala Pusat Data Statistik Dan Informasi</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400 }}>Survei Data Spasial Tata Ruang Laut</Text>
                        <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.lighter }}>28 September 2023 15:37:37</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", width: "30%" }}>
                        <View style={{ gap: 10, alignItems: "center", }}>
                            <View style={{ backgroundColor: COLORS.infoDanger, width: 64, height: 24, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.white }}>Submitted</Text>
                            </View>
                            <Image source={require ("../../../assets/superApp/AvatarKomen1.png")} style={{ width: 32, height: 32 }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </View>
  )
}
