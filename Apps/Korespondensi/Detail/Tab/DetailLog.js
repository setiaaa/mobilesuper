import moment from "moment";
import { last } from "ramda";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
import LoadingOverlay from "../../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../../constants/styles";
import { nde_api } from "../../../../utils/api.config";
import { getHTTP } from "../../../../utils/http";
import RenderHTML from "react-native-render-html";

function DetailLog({ route, data }) {
  const [id, setId] = useState();
  const [log, setLog] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (data == undefined) {
      //getlogapi
      setId(route?.params?.id);
      getLogDispo();
    } else {
      setLog(data);
    }
  }, [data, route]);

  const getLogDispo = async () => {
    setIsLoading(true);
    try {
      let response;
      if (route?.params?.tipe == "agendain") {
        response = await getHTTP(
          nde_api.agendainlog.replace("{$id}", route?.params?.id)
        );
      } else if (route?.params?.tipe == "agendadispo") {
        response = await getHTTP(
          nde_api.agendadispolog.replace("{$id}", route?.params?.id)
        );
      } else if (route?.params?.tipe == "agendaout") {
        response = await getHTTP(
          nde_api.agendaoutlog.replace("{$id}", route?.params?.id)
        );
      }
      setLog(response?.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Warning!", "Log Disposition not working!");
      setIsLoading(false);
    }
  };
  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );
  return (
    <ScrollView>
      {loadingOverlay}
      <View style={styles.screen}>
        <View style={{ marginBottom: 6 }}>
          <Text>My Disposisi</Text>
        </View>
        {log &&
          log.map((item, index) => (
            <Card key={item?.id} style={styles.containerCard}>
              <View style={styles.headerCard}>
                <View style={[styles.header, styles.badge]}>
                  <Text
                    style={[
                      { color: GlobalStyles.colors.textWhite },
                      styles.badgeText,
                    ]}
                  >
                    My Disposisi {index + 1}
                  </Text>
                </View>
                <View style={styles.headerDate}>
                  <Text style={styles.badgeText}>
                    {moment(item.created_date).format("DD MMM YYYY HH:mm")}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, { paddingTop: 16 }]}>
                <Text style={styles.title}>Diteruskan Dari</Text>
              </View>
              <Card.Title
                style={[styles.containerCardTitle]}
                title={<Text numberOfLines={3}>{item.creator_name}</Text>}
                titleNumberOfLines={5}
              />
              <View style={[styles.row, { marginBottom: 12 }]}>
                <RenderHTML
                  source={{ html: item?.message }}
                  contentWidth={width}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Diteruskan Kepada</Text>
              </View>
              <Card.Title
                style={[styles.containerCardTitle, { marginBottom: 12 }]}
                title={<Text>{item.receivers.replace(/;/g, "\n")}</Text>}
                titleNumberOfLines={100}
              />
            </Card>
          ))}

        {log?.length == 0 && (
          <Card style={styles.containerCard}>
            <View style={styles.headerCard}>
              <View style={[styles.header, styles.badge]}>
                <Text
                  style={[
                    { color: GlobalStyles.colors.textWhite },
                    styles.badgeText,
                  ]}
                >
                  Log Disposition
                </Text>
              </View>
              <View style={styles.headerDate}>
                <Text style={styles.badgeText}>
                  There is no log disposition
                </Text>
              </View>
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}
export default DetailLog;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  containerCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "white",
  },
  containerCardTitle: {
    padding: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.grey,
    padding: 8,
    width: "45%",
  },
  headerDate: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
    width: "55%",
  },
  badge: {
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
    height: "100%",
  },
  badgeText: {
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  container: {
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.greylight,
    borderColor: GlobalStyles.colors.primary,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainerStyle: {
    justifyContent: "flex-start",
    // backgroundColor: GlobalStyles.colors.backgroundInput,
  },
});
