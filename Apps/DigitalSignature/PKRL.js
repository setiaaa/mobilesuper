import React from "react";
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../config/SuperAppps";

export const PKRL = () => {
  const navigation = useNavigation();

  const handleNavigateTo = (url) => {
    navigation.navigate(url)
  }

  return (
    <View>
      {/* <Pressable style={styles.container}
        onPress={() => handleNavigateTo('TambahDokumenPerizinan')}>
        <Text style={styles.title}>Tambah Dokumen</Text>
      </Pressable> */}

      <TouchableOpacity
        style={{ position: "absolute", right: 30, top: 600 }}
        onPress={() => handleNavigateTo('TambahDokumenPerizinan')}
      >
        <View
          style={{
            backgroundColor: COLORS.infoDanger,
            borderRadius: 50,
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="add"
            size={24}
            color={COLORS.white}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    right: 40,
    backgroundColor: "#26653A",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});