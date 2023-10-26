import { Fragment } from "react";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import CardSecretary from "../../../components/UI/CardSecretary";
import { Button, Card } from "react-native-paper";
import { GlobalStyles } from "../../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeAll } from "../../../store/addressbook";
import { COLORS } from "../../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";

function DSecretary({ data, add }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          <View style={{ backgroundColor: COLORS.primary, padding: 20, flexDirection: "row", gap: 10, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}>
            <Image source={require("../../../assets/superApp/AvatarKomen1.png")} style={{
              borderRadius: 50,
              width: 32,
              height: 32,
              borderWidth: 1,
              borderColor: COLORS.white
            }} />
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>Yani Dama Putera</Text>
              <Text style={{ fontSize: 11, fontWeight: 400, color: COLORS.white, }}>Pranata 1 Departemen IT Core Application</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", padding: 20, alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", gap: 10, }}>
              <Text style={{ fontSize: 13, fontWeight: 400, color: COLORS.lighter }}>Diaktifkan : </Text>
              <Text style={{ fontSize: 13, fontWeight: 600, }}>04 Agustus 2023</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={COLORS.lighter}
            />
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
          <View style={{ backgroundColor: COLORS.primary, padding: 20, flexDirection: "row", gap: 10, borderTopRightRadius: 8, borderTopLeftRadius: 8, justifyContent: "center" }}>
              <Text style={{ fontSize: 13, fontWeight: 700, color: COLORS.white, }}>Anda Belum Punya Sekretaris</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={{ backgroundColor: COLORS.primary, height: 50, marginBottom: "10%", marginTop: 20, borderRadius: 8, justifyContent: "center", }}>
        <Text style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: COLORS.white }}>Tambah Sekretaris</Text>
      </TouchableOpacity>
    </View>


    // <>
    //   <View style={styles.screen}>
    //     {data?.results &&
    //       data.results.length > 0 &&
    //       data.results.map((data) => (
    //         <Fragment key={data.date}>
    //           {data.children &&
    //             data.children.map((item) => (
    //               <CardSecretary
    //                 key={item.id}
    //                 data={item}
    //                 onPress={() => {
    //                   navigation.navigate("SecretaryDetail", {
    //                     id: item.id,
    //                     title: "Secretary\nDetail",
    //                   });
    //                 }}
    //               />
    //             ))}
    //         </Fragment>
    //       ))}

    //     {data?.results && data.results.length == 0 && (
    //       <Card style={styles.container}>
    //         <Card.Content style={styles.cardContent}>
    //           <View style={styles.containerNoTitle}>
    //             <Text style={styles.title}>You don't have a Secretary</Text>
    //           </View>
    //         </Card.Content>
    //         <View style={styles.footerCard}>
    //           <Text></Text>
    //         </View>
    //       </Card>
    //     )}
    //   </View>

    //   {add && (
    //     <View style={styles.footer}>
    //       <Button
    //         mode="contained"
    //         style={styles.button}
    //         onPress={() => {
    //           dispatch(removeAll());
    //           navigation.navigate("SecretaryForm", {
    //             title: "Secretary\nForm",
    //           });
    //         }}
    //       >
    //         <Text style={styles.buttonText}>Add Secretary</Text>
    //       </Button>
    //     </View>
    //   )}
    // </>
  );
}
export default DSecretary;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
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
    backgroundColor: GlobalStyles.colors.dSecretary,
    height: 40,
  },
  buttonText: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
  },
  container: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  cardContent: {
    flexDirection: "row",
    paddingBottom: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: GlobalStyles.colors.dSecretary,
  },
  footerCard: {
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
});
