import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  COLORS,
  FONTSIZE,
  FONTWEIGHT,
  fontSizeResponsive,
} from "../config/SuperAppps";
import Checkbox from "expo-checkbox";
import { setTokenValue } from "../service/session";
import { useDispatch, useSelector } from "react-redux";
import { Login, getProfileMe } from "../service/api";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { setLogout } from "../store/LoginAuth";
import * as Linking from "expo-linking";
import { Config } from "../constants/config";
import { getHTTP, handleUpgradeLink } from "../utils/http";
import { Loading } from "../components/Loading";

export const LoginToken = () => {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(true);
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [onChange, setOnChange] = useState("");
  const [version, setVersion] = useState("");
  const [username, setUserName] = useState("");
  const [validasi, setValidasi] = useState({
    nip: false,
    pass: false,
  });
  const [show, setShow] = useState(true);
  const [modalLog, setModalLog] = useState(false);
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
        navigation.replace("Main");
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
    console.log(username, password, isSelected);
    if (username === "" || password === "" || isSelected === false) {
      Alert.alert("Terjadi Kesalahan", "Harap Lengkapi Form");
    } else if (username !== "" && password !== "" && isSelected === false) {
      Alert.alert("Peringatan", "Harap Menyetujui Ketentuan");
    } else if (username !== "" && password !== "" && isSelected === true) {
      dispatch(Login({ username, password }));
    }
  };
  const { device } = useSelector((state) => state.apps);

  // console.log(loginAuth);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, padding: 0 }}
    >
      {loginAuth.loading ? <Loading /> : null}
      <ScrollView>
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
          <Image
            source={require("../assets/logokkp.png")}
            style={{ width: 150, height: 150 }}
          />

          <View style={{ flexDirection: "row", gap: 5, marginTop: 20 }}>
            <Text style={{fontSize: fontSizeResponsive("Judul", device), fontWeight: 500 }}>
              SSO
            </Text>
            <Text style={{ fontSize: fontSizeResponsive("Judul", device) }}>
              Kementerian Kelautan & Perikanan
            </Text>
          </View>
          <View style={{ width: "90%" }}>
            <Text style={{fontSize: fontSizeResponsive("H4", device)}}>NIP / Email</Text>
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
            <Text style={{fontSize: fontSizeResponsive("H4", device)}}>Kata Sandi</Text>
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
                      size={device === 'tablet'? 30 : 24}
                      color={COLORS.grey}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setShow(false);
                    }}
                  >
                    <Ionicons name="eye-sharp" size={device === 'tablet'? 30 : 24} color={COLORS.grey} />
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
              <Text style={{fontSize: fontSizeResponsive("H4", device)}}>
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
            <Text style={{ color: COLORS.white, fontSize: fontSizeResponsive('H4', device) }}>Masuk</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="help-circle-outline" size={24} color={"#1868AB"} />
            <Text style={{ fontWeight: FONTWEIGHT.bold, color: "#1868AB" }}>
              Service Desk Collaboration Office
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            onPress={() => {
              setModalLog(true);
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={"#1868AB"}
            />
            <Text style={{ fontWeight: FONTWEIGHT.bold, color: "#1868AB", fontSize: fontSizeResponsive("H4", device) }}>
              Log Perubahan Aplikasi
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
                size={device === 'tablet'? 50: 24}
                color={COLORS.yourColor}
              />
              <View>
                <Text style={{ color: COLORS.lighter, fontSize: fontSizeResponsive("H4", device) }}>Senin - Jumat</Text>
                <Text style={{ color: COLORS.lighter, fontSize: fontSizeResponsive("H4", device) }}>08.00 - 17.00 WIB</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 10 }}
              onPress={() => {
                Linking.openURL("https://wa.me/6282211593987");
              }}
            >
              <Ionicons name="call-outline" size={device === 'tablet'? 50:24} color={COLORS.lighter} />
              <View
                style={{
                  borderRadius: 10,
                  borderColor: "#E4EEF5",
                  borderWidth: 1,
                  justifyContent: 'center',
                  padding: 5
                }}
              >
                <Text style={{ color: COLORS.lighter, fontSize: fontSizeResponsive("H4", device) }}>Support Coofis</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              gap: 10,
              marginVertical: 25,
              marginBottom: "10%",
            }}
          >
            <Text style={{ color: COLORS.grey, fontSize: fontSizeResponsive("H4", device) }}>Terintegrasi</Text>
            <Image source={require("../assets/superApp/bse.png")} />
            <Text style={{ marginTop: 20, color: COLORS.grey, fontSize: fontSizeResponsive("H4", device) }}>
              Version {Config.app_version}
            </Text>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalLog}
          onRequestClose={() => {
            setModalLog(false);
          }}
        >
          <TouchableOpacity
            style={[
              Platform.OS === "ios"
                ? styles.iOSBackdrop
                : styles.androidBackdrop,
              styles.backdrop,
            ]}
          />
          <View
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                width: "90%",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.grey,
                }}
              >
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Log Perbaikan Aplikasi Version {Config.app_version}
                </Text>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    setModalLog(false);
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color={COLORS.lighter}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Penambahan Menu Kepegawaian
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Update Korespondensi
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Penambahan Menu Perizinan Menteri
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                    marginHorizontal: 40,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: FONTWEIGHT.bold,
                      marginLeft: 10,
                    }}
                  >
                    Penambahan Menu FAQ
                  </Text>
                </View>

                {/* 
              <Text
                style={{
                  width: "70%",
                  marginHorizontal: 60,
                  marginTop: 10,
                  fontSize: fontSizeResponsive("H4", device),
                }}
              >
                {detail?.title !== "" && detail?.title !== null
                  ? detail.title
                  : "-"}
              </Text> */}
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.white,
    width: "90%",
    marginVertical: 20,
    marginLeft: 20,
    borderRadius: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
