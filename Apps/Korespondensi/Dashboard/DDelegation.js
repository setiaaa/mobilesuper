import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import CardDelegation from "../../../components/UI/CardDelegation";
import { GlobalStyles } from "../../../constants/styles";
import { removeAll } from "../../../store/addressbook";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";
import { COLORS } from "../../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";

function DDelegation({ add }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let [listMyDelegation, setMyDelegation] = useState([]);
  const willFocusSubscription = navigation.addListener("focus", () => {
    getMyDelegation();
  });

  useEffect(() => {
    getMyDelegation();
    return willFocusSubscription;
  }, []);

  async function getMyDelegation() {
    try {
      //get secretary actived
      const response = await getHTTP(nde_api.delegationassigned);
      setMyDelegation(response.data);
    } catch (error) {
      handlerError(error, "Warning!", "My Delegation list not working!");
    }
  }
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={{ 
          backgroundColor: COLORS.white, 
          borderRadius: 8, 
          marginBottom: 20,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}>
          <View style={{ backgroundColor: "#7B570F", padding: 20, flexDirection: "row", gap: 10, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}>
            <Image source={require("../../../assets/superApp/AvatarKomen1.png")} style={{
              borderRadius: 50,
              width: 32,
              height: 32,
              borderWidth: 1,
              borderColor: COLORS.white
            }} />
            <Image source={require("../../../assets/superApp/AvatarKomen1.png")} style={{
              borderRadius: 50,
              width: 32,
              height: 32,
              borderWidth: 1,
              borderColor: COLORS.white,
              marginLeft: -30,
              marginTop: 20
            }} />
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>Rizky Novriansyah</Text>
              <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.white, }}>Pranata 1 Departemen IT Core Application</Text>
              <Ionicons
                name="return-down-back-outline"
                size={16}
                color={COLORS.white}
              />
              <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.white, }}>Kepala Divisi IT Solution</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", padding: 20, alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <View style={{ flexDirection: "row", gap: 10, }}>
                <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.lighter, textAlign: "right", width: 35 }}>Start : </Text>
                <Text style={{ fontSize: 13, fontWeight: 400, }}>04 Agustus 2023</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10, }}>
                <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.lighter, textAlign: "right", width: 35 }}>End : </Text>
                <Text style={{ fontSize: 13, fontWeight: 600, }}>05 Agustus 2023</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.successLight,
                borderRadius: 30,
                width: 53,
                height: 24,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.success, textAlign: "center" }}>
                Active
              </Text>
            </View>
          </View>
        </View>

        <View style={{ 
          backgroundColor: COLORS.white, 
          borderRadius: 8, 
          height: 100,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}>
          <View style={{ backgroundColor: "#7B570F", padding: 20, flexDirection: "row", gap: 10, borderTopRightRadius: 8, borderTopLeftRadius: 8, justifyContent: "center" }}>
              <Text style={{ fontSize: 13, fontWeight: 700, color: COLORS.white, }}>Anda Belum Punya Delegasi</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={{ backgroundColor: "#7B570F", height: 50, marginBottom: "-10%", marginTop: 20, borderRadius: 8, justifyContent: "center", }}>
        <Text style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: COLORS.white }}>Tambah Delegasi</Text>
      </TouchableOpacity>
    </View>


    // <>
    //   <ScrollView>
    //     <View style={styles.screen}>
    //       {listMyDelegation.results &&
    //         listMyDelegation.results.length > 0 &&
    //         listMyDelegation.results.map((data) => (
    //           <Fragment key={data.date}>
    //             {data.children &&
    //               data.children.map((item) => (
    //                 <CardDelegation
    //                   key={item.id}
    //                   style={styles.card}
    //                   data={item}
    //                   onPress={() => {
    //                     navigation.navigate("DelegationDetail", {
    //                       id: item.id,
    //                       title: "Delegation\nDetail",
    //                     });
    //                   }}
    //                 />
    //               ))}
    //           </Fragment>
    //         ))}
    //       {listMyDelegation.results && listMyDelegation.results.length == 0 && (
    //         <Card style={styles.container}>
    //           <Card.Content style={styles.cardContent}>
    //             <View style={styles.containerNoTitle}>
    //               <Text style={styles.title}>You don't have a Delegation</Text>
    //             </View>
    //           </Card.Content>
    //           <View style={styles.footerDele}>
    //             <Text></Text>
    //           </View>
    //         </Card>
    //       )}
    //     </View>
    //   </ScrollView>
    //   {add && (
    //     <View style={styles.footer}>
    //       <Button
    //         mode="contained"
    //         style={styles.button}
    //         onPress={() => {
    //           dispatch(removeAll());
    //           navigation.navigate("DelegationForm", {
    //             title: "Delegation\nForm",
    //           });
    //         }}
    //       >
    //         <Text style={styles.buttonText}>Add Delegation</Text>
    //       </Button>
    //     </View>
    //   )}
    // </>
  );
}
export default DDelegation;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    marginBottom: 54,
  },
  card: {
    borderWidth: 1,
  },

  container: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  cardContent: {
    flexDirection: "row",
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: GlobalStyles.colors.dDelegation,
  },
  footerDele: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    margin: 4,
  },
  containerNoTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  title: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
    color: GlobalStyles.colors.textWhite,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 16,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: GlobalStyles.colors.dDelegation,
  },
  buttonText: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
  },
});
