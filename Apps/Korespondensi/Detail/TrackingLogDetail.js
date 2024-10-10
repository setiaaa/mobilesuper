import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import TreeView from "react-native-final-tree-view";
import { Card, IconButton, Text } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../constants/styles";
import { nde_api } from "../../../utils/api.config";
import { getHTTP } from "../../../utils/http";

function TrackingLogDetail({ route, data }) {
  const [id, setId] = useState();
  const [log, setLog] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    //getlogapi
    setId(route?.params?.id);
    getLogDispo();
  }, [data, route]);

  const getLogDispo = async () => {
    setIsLoading(true);
    try {
      if (route?.params?.trackinglog) {
        let response;
        response = await getHTTP(nde_api.baseurl + route?.params?.trackinglog);
        setLog(response?.data);
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Peringatan!", "Aktivitas disposisi tidak berfungsi!");
      setIsLoading(false);
    }
  };
  function getIndicator(isExpanded, hasChildrenNodes) {
    if (!hasChildrenNodes) {
      return "";
    } else if (isExpanded) {
      return "chevron-down";
    } else {
      return "chevron-right";
    }
  }
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
          <Text>Log Disposition</Text>
        </View>
        {log && (
          <TreeView
            childrenKey="children"
            data={log} // defined above
            renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
              const marginTree = { marginLeft: 25 * level };
              return (
                <Fragment key={node.type == "head" ? "head" : node.id}>
                  {((level == 0 && node.type == "list") || level != 0) && (
                    <View
                      style={[
                        { flexDirection: "row" },
                        level == 0 && !hasChildrenNodes
                          ? { marginLeft: -45 }
                          : marginTree,
                      ]}
                    >
                      <IconButton
                        icon={getIndicator(isExpanded, hasChildrenNodes)}
                      />
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
                              {moment(node.date).format("DD MMM YYYY HH:mm")}
                            </Text>
                          </View>
                        </View>
                        <View style={[styles.row, { marginTop: 16 }]}>
                          <Text>Diteruskan Dari</Text>
                        </View>
                        <Card.Title
                          style={styles.containerCardTitle}
                          title={<Text numberOfLines={3}>{node.from}</Text>}
                          titleNumberOfLines={5}
                        />
                        <View style={styles.row}>
                          <Text>Diteruskan Kepada</Text>
                        </View>
                        <Card.Title
                          style={styles.containerCardTitle}
                          title={
                            <>
                              <Text>{node.receivers.replace(/;/g, "\n")}</Text>
                            </>
                          }
                          titleNumberOfLines={100}
                        />
                        <View style={styles.container}>
                          {/* <Text style={{ textAlign: "center" }}>
                            {node?.message}
                          </Text> */}
                          <RenderHTML
                            contentWidth={width}
                            source={{ html: node?.message }}
                            defaultTextProps={{ allowFontScaling: false }}
                          />
                        </View>
                      </Card>
                    </View>
                  )}
                </Fragment>
              );
            }}
          />
        )}

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
export default TrackingLogDetail;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  containerCard: {
    width: Platform.OS == "android" ? "85%" : "90%",
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.textWhite,
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
