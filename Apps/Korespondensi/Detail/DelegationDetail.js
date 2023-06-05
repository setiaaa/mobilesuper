import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useEffect } from "react";
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

function DelegationDetail({ route }) {
  const profile = useSelector((state) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  let id = route.params.id;
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    getDetail();
  }, []);

  async function getDetail() {
    setIsLoading(true);
    try {
      //get detail
      const response = await getHTTP(
        nde_api.delegationbyid.replace("{$id}", id)
      );
      setDetail(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Warning!", "Delegation Detail not working!");
    }
    setIsLoading(false);
  }
  async function deactivate() {
    setIsLoading(true);
    try {
      const response = await getHTTP(
        nde_api.delegationdeactivate.replace("{$id}", id)
      );
      if (response.status == "Error") {
        Alert.alert("Warning!", "Deactvate Delegation not working!");
      } else {
        Alert.alert("Success!", "Deactivate Delegation was success!");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Warning!", "Deactvate Delegation not working!");
    }
    setIsLoading(false);
  }
  function confirm() {
    AlertConfirm(
      "Confirm",
      "Are you sure to deactivate this delegation?",
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
              <Text style={styles.badgeText}>Pejabat Pengganti</Text>
            </View>
            <View
              style={[
                detail?.status == "activate"
                  ? { backgroundColor: GlobalStyles.colors.greenlight }
                  : { backgroundColor: GlobalStyles.colors.yellowlight },
                styles.header,
                styles.badge,
              ]}
            >
              <Text
                style={[
                  detail?.status == "activate"
                    ? { color: GlobalStyles.colors.green }
                    : { color: GlobalStyles.colors.yellow },
                  styles.badgeText,
                ]}
              >
                {detail?.status}
              </Text>
            </View>
          </View>
          <Card.Title
            key={id}
            style={styles.containerCardTitle}
            title={
              <View style={{ flexDirection: "column" }}>
                <Text>{detail?.delegasi?.nik}</Text>
                <Text style={styles.title}>{detail?.delegasi?.name}</Text>
              </View>
            }
            titleNumberOfLines={5}
            left={(props) => (
              <View>
                <Avatar.Image
                  {...props}
                  source={{
                    uri: `${nde_api.baseurl + detail?.delegasi?.avatar}`,
                    method: "GET",
                  }}
                />
              </View>
            )}
          />
          <View style={styles.row}>
            <View>
              <Text>Tgl Mulai</Text>
              <Text style={styles.title}>
                {moment(new Date(detail?.start_date)).format("DD MMM YYYY")}
              </Text>
            </View>
            <View>
              <Text>Tgl Selesai</Text>
              <Text style={styles.title}>
                {moment(new Date(detail?.end_date)).format("DD MMM YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text>Alasan</Text>
            <Text style={styles.title}>{detail?.reason}</Text>
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

export default DelegationDetail;

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
