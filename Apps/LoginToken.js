import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../config/SuperAppps";
import Checkbox from "expo-checkbox";
import { setTokenValue } from "../service/session";
import { useDispatch, useSelector } from "react-redux";
import { Login, getProfileMe } from "../service/api";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { setLogout } from "../store/LoginAuth";
import * as Linking from "expo-linking";

export const LoginToken = () => {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState("");
  const [onChange, setOnChange] = useState("");
  const [token, setToken] = useState("");
  const [username, setUserName] = useState("");
  const [validasi, setValidasi] = useState({
    nip: false,
    pass: false,
  });
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const loginAuth = useSelector((state) => state.login);
  const url = Linking.useURL();

  useEffect(() => {
    if (loginAuth.error !== null && loginAuth.error && isSelected == true) {
      Alert.alert("Terjadi kesalahan", "NIP/Email atau Kata Sandi salah!");
    } else if (
      loginAuth.error !== null &&
      !loginAuth.error &&
      isSelected == true
    ) {
      dispatch(getProfileMe(loginAuth?.token?.token));
      if (url?.includes("apps/KnowledgeManagement/detail")) {
        Linking.openURL(url);
      } else {
        navigation.replace("Main");
      }
    } else {
      setUserName("");
      setPassword("");
    }
  }, [loginAuth]);

  const handleSubmit = () => {
    let nipField = false;
    let passField = false;
    if (username === "") nipField = true;
    else nipField = false;
    if (password === "") passField = true;
    else passField = false;
    setValidasi({
      ...validasi,
      nip: nipField,
      pass: passField,
    });
    if (username === "" || password === "" || isSelected === false) {
      Alert.alert("Terjadi Kesalahan", "Harap Lengkapi Form");
    } else if ((username !== "" || password !== "") && isSelected === false) {
      Alert.alert("Terjadi Kesalahan", "Harap Lengkapi Form");
    } else if (isSelected === true) {
      dispatch(Login({ username, password }));
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, padding: 0 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            // borderRadius: 8,
            gap: 20,
            height: "100%",
          }}
        >
          <Pressable
            onPress={() => {
              setCount((prev) => prev + 1);
            }}
          >
            <Image
              source={require("../assets/logokkp.png")}
              style={{ width: 150, height: 150 }}
            />
          </Pressable>

          <View style={{ flexDirection: "row", gap: 5, marginTop: 20 }}>
            <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: 500 }}>
              SSO
            </Text>
            <Text style={{ fontSize: FONTSIZE.Judul }}>
              Kementerian Kelautan & Perikanan
            </Text>
          </View>
          <View style={{ width: "90%" }}>
            <Text>NIP / Email</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                height: 40,
                marginTop: 5,
                borderColor: COLORS.ExtraDivinder,
                padding: 10,
              }}
              onChangeText={(e) => {
                setUserName(e);
              }}
              value={username}
            />
          </View>
          <View style={{ width: "90%", marginTop: 5 }}>
            <Text>Kata Sandi</Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: COLORS.ExtraDivinder,
                flexDirection: "row",
                height: 40,
                marginTop: 5,
              }}
            >
              <TextInput
                style={{ padding: 10, width: "70%" }}
                onChangeText={(e) => {
                  setPassword(e);
                }}
                value={password}
                secureTextEntry={show}
              />
              <View
                style={{
                  alignItems: "flex-end",
                  flex: 1,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                {show == false ? (
                  <TouchableOpacity
                    onPress={() => {
                      setShow(true);
                    }}
                  >
                    <Ionicons
                      name="eye-off-sharp"
                      size={24}
                      color={COLORS.grey}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setShow(false);
                    }}
                  >
                    <Ionicons name="eye-sharp" size={24} color={COLORS.grey} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                maxWidth: "90%",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                color={isSelected === true ? COLORS.lighter : null}
              />
              <Text>
                Saya menyetujui Ketentuan Penggunaan dan Ketentuan Layanan BSrE
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: "90%",
              height: 45,
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ color: COLORS.white }}>Masuk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="help-circle-outline" size={24} color={"#1868AB"} />
            <Text style={{ fontWeight: FONTWEIGHT.bold, color: "#1868AB" }}>
              Service Desk Collaboration Office
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 50, alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Ionicons
                style={{ color: COLORS.lighter }}
                name="calendar-outline"
                size={24}
                color={COLORS.yourColor}
              />
              <View>
                <Text style={{ color: COLORS.lighter }}>Senin - Jumat</Text>
                <Text style={{ color: COLORS.lighter }}>08.00 - 17.00 WIB</Text>
              </View>
            </View>
            <TouchableOpacity style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="call-outline" size={24} color={COLORS.lighter} />
              <View
                style={{
                  borderRadius: 10,
                  padding: 5,
                  borderColor: "#E4EEF5",
                  borderWidth: 1,
                }}
              >
                <Text style={{ color: COLORS.lighter }}>Support Coofis</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              gap: 10,
              marginVertical: 25,
              marginBottom: 100,
            }}
          >
            <Text style={{ color: COLORS.lighter }}>Terintegrasi</Text>
            <Image source={require("../assets/superApp/bse.png")} />
          </View>

          {/* {count >= 5 ? (
                                <View style={{ borderWidth: 1, marginTop: 20, padding: 20, borderRadius: 8, borderColor: COLORS.ExtraDivinder, width: '80%' }}>
                                    <Text>FORM KODE ADMIN</Text>
                                    <View>
                                        <TextInput
                                            style={{ borderWidth: 1, borderRadius: 5, height: 35, marginTop: 5, borderColor: COLORS.ExtraDivinder, padding: 10 }}
                                            onChangeText={(e) => setOnChange(e)}
                                        />
                                        {password === onChange ? (
                                            <View style={{ marginTop: 10 }}>
                                                <Text>INPUT TOKEN</Text>
                                                <View>
                                                    <TextInput
                                                        style={{ borderWidth: 1, borderRadius: 5, height: 35, marginTop: 5, borderColor: COLORS.ExtraDivinder, padding: 10 }}
                                                        onChangeText={(e) => {
                                                            setToken(e)
                                                        }}
                                                    />
                                                </View>
                                                <TouchableOpacity onPress={() => {
                                                    if (token !== '') {
                                                        setTokenValue(token)
                                                        navigation.navigate('Main')
                                                    }
                                                }}
                                                    style={{
                                                        backgroundColor: COLORS.primary,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 20,
                                                        borderRadius: 8,
                                                        height: 35
                                                    }}
                                                >
                                                    <Text style={{ color: COLORS.white }}>Masuk</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <></>
                                        )}
                                    </View>
                                </View>
                            ) : (
                                null
                            )} */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
