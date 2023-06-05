import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { useSelector } from "react-redux";
import AlertConfirm from "../../../components/UI/AlertConfirm";
import Button from "../../../components/UI/Button";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../constants/styles";
import { nde_api } from "../../../utils/api.config";
import { getHTTP } from "../../../utils/http";

function SecretaryDetail({ route }) {
  const profile = useSelector((state) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  let hak;
  let id = route.params.id;
  let count = 1;
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    getDetail();
  }, []);

  async function getDetail() {
    setIsLoading(true);
    try {
      //get detail
      const response = await getHTTP(
        nde_api.secretarybyid.replace("{$id}", id)
      );
      setDetail(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Warning!", "Secretary Detail not working!");
    }
    setIsLoading(false);
  }
  async function deactivate() {
    setIsLoading(true);
    try {
      const response = await getHTTP(
        nde_api.secretarydeactivate.replace("{$id}", id)
      );
      if (response.status == "Error") {
        Alert.alert("Warning!", "Deactvate Secretary not working!");
      } else {
        Alert.alert("Success!", "Deactivate Secretary was success!");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Warning!", "Deactvate Secretary not working!");
    }
    setIsLoading(false);
  }
  function confirm() {
    AlertConfirm(
      "Confirm",
      "Are you sure to deactivate this secretary?",
      deactivate
    );
  }
  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  return (
    <>
      {loadingOverlay}
      <View style={styles.screen}>
        <View style={{ marginBottom: 6 }}>
          <Text>Pejabat</Text>
        </View>
        <Card style={styles.containerCard}>
          <Card.Title
            key={id}
            style={styles.containerCardTitle}
            title={
              <View style={{ flexDirection: "column" }}>
                <Text>{detail?.title?.nik}</Text>
                <Text style={styles.title}>{detail?.title?.official}</Text>
              </View>
            }
            titleNumberOfLines={5}
            subtitle={detail?.title?.name}
            subtitleNumberOfLines={5}
            left={(props) => (
              <View>
                <Avatar.Image
                  {...props}
                  source={{
                    uri: `${nde_api.baseurl + detail?.title?.avatar}`,
                    method: "GET",
                  }}
                />
              </View>
            )}
          />
        </Card>
        <Card style={styles.containerCard}>
          <View style={styles.headerCard}>
            <View style={styles.header}>
              <Text style={styles.badgeText}>Secretary</Text>
            </View>
            <View
              style={[
                detail?.status == true
                  ? { backgroundColor: GlobalStyles.colors.greenlight }
                  : { backgroundColor: GlobalStyles.colors.yellowlight },
                styles.header,
                styles.badge,
              ]}
            >
              <Text
                style={[
                  detail?.status == true
                    ? { color: GlobalStyles.colors.green }
                    : { color: GlobalStyles.colors.yellow },
                  styles.badgeText,
                ]}
              >
                Active
              </Text>
            </View>
          </View>
          <Card.Title
            key={id}
            style={styles.containerCardTitle}
            title={
              <View style={{ flexDirection: "column" }}>
                <Text>{detail?.profile?.nik}</Text>
                <Text style={styles.title}>{detail?.profile?.name}</Text>
              </View>
            }
            titleNumberOfLines={5}
            left={(props) => (
              <View>
                <Avatar.Image
                  {...props}
                  source={{
                    uri: `${nde_api.baseurl + detail?.profile?.avatar}`,
                    method: "GET",
                  }}
                />
              </View>
            )}
          />
          <View style={styles.row}>
            <View>
              <Text>Diaktifkan</Text>
              <Text style={styles.title}>{detail?.created_date}</Text>
            </View>
            <View>
              <Text>Sifat</Text>
              <Text style={styles.title}>
                {detail?.personal_assistant == true
                  ? "Personal Assistant"
                  : "Secretary"}
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text>Hak</Text>
            {detail?.secretary_access?.map((item, index) => (
              <Fragment key={index}>
                {(item.biasa || item.rahasia || item.rahasia_prib) && (
                  <Text style={styles.title}>
                    {count++}.
                    {item.biasa ? " Biasa" : ""}
                    {item.rahasia ? " Rahasia" : ""}
                    {item.rahasia_prib ? " Rhs-Prib" : ""}
                  </Text>
                )}
              </Fragment>
            ))}
          </View>
        </Card>
        {detail?.title?.nik == profile?.nik && (
          <Button style={styles.button} onPress={confirm}>
            Deactivate
          </Button>
        )}
      </View>
    </>
  );
}

export default SecretaryDetail;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  containerCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  containerCardTitle: {
    padding: 16,
    alignItems: "flex-start",
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    padding: 8,
    width: "50%",
  },
  badge: {
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  badgeText: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  container: { padding: 16 },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.error500,
    color: GlobalStyles.colors.textWhite,
  },
});
