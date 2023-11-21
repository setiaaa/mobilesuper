import { Avatar, Card, IconButton } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { nde_api } from "../../utils/api.config";
import { useEffect, useState } from "react";
import { headerToken } from "../../utils/http";
import { useNavigation } from "@react-navigation/native";
import { Config } from "../../constants/config";

function CardList({ data, tipe, onPress }) {
  const navigation = useNavigation();
  const [title, setTitle] = useState();
  const [errorAvatar, setErrorAvatar] = useState(false);
  let header = {};
  useEffect(() => {
    if (tipe == "agendain") {
      setTitle("Log Disposition\nIncoming Letter");
    } else if (tipe == "agendadispo") {
      setTitle("Log Disposition\nDisposition Letter");
    } else if (tipe == "agendaout") {
      setTitle("Log Disposition\nSubmitted Letter");
    } else if (tipe == "agendamydispo") {
      setTitle("Log Disposition\nMy Disposition Letter");
    }
    getHeader();
  }, []);
  async function getHeader() {
    header = await headerToken();
  }

  function selectDetailHandler() {
    if (tipe == "agendain") {
      navigation.navigate("TabViewBg", {
        id: data.id,
        screen: "detailAgenda",
        position: "bottom",
      });
    } else if (tipe == "agendadispo" || tipe == "agendamydispo") {
      navigation.navigate("DispositionDetail", {
        id: data.id,
      });
    } else if (tipe == "agendaout") {
      navigation.navigate("SubmittedDetail", {
        id: data.id,
      });
    }
  }
  return (
    <Card
      onPress={onPress}
      style={[
        data.unread
          ? styles.cardUnread
          : data.disposisi
          ? styles.cardReadDispo
          : styles.cardRead,
        data.is_pejabat == false ? styles.cardSecre : "",
      ]}
    >
      <Card.Title
        style={styles.containerCard}
        title={
          <>
            {data.sender.title && (
              <Text style={data?.unread ? { fontWeight: "bold" } : {}}>
                {data.sender.title}
              </Text>
            )}
            {data.sender.title == null && (
              <Text style={data?.unread ? { fontWeight: "bold" } : {}}>
                {data.sender}
              </Text>
            )}
          </>
        }
        titleNumberOfLines={10}
        subtitle={
          <>
            {data?.position && (
              <Text style={{ color: GlobalStyles.colors.grey }}>
                {data.position}
                {"\n"}
              </Text>
            )}
            <Text>{data?.subject}</Text>
          </>
        }
        subtitleNumberOfLines={10}
        leftStyle={{ marginTop: data.is_pejabat == false ? 20 : 0 }}
        left={(props) => (
          <View style={{ alignItems: "center", flex: 1 }}>
            {errorAvatar && (
              <Avatar.Image
                {...props}
                source={Config.avatar}
                theme={{
                  colors: {
                    primary: GlobalStyles.colors.textWhite,
                  },
                }}
              />
            )}
            {!errorAvatar && (
              <Avatar.Image
                {...props}
                source={{
                  uri: `${nde_api.baseurl + data.avatar}`,
                  method: "GET",
                  headers: header,
                }}
                onError={(e) => setErrorAvatar(true)}
                theme={{
                  colors: {
                    primary: GlobalStyles.colors.textWhite,
                  },
                }}
              />
            )}
            {(data?.priority == "Segera" || data?.prio == "Segera") && (
              <IconButton
                icon="information-outline"
                size={GlobalStyles.font.xxl}
                iconColor={GlobalStyles.colors.red}
                style={styles.button}
              />
            )}
          </View>
        )}
        rightStyle={styles.rightStyle}
        right={(props) => (
          <>
            <View style={styles.rightCard}>
              <Text style={styles.date}>{data.date.substr(0, 6)}</Text>
              <Text>{data.time.substr(0, 5)}</Text>
            </View>
            {data.disposisi && tipe != "agendamydispo" && (
              <View style={styles.containerButton}>
                <IconButton
                  icon="share-outline"
                  size={GlobalStyles.font.xxl}
                  iconColor={GlobalStyles.colors.blue}
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("DetailLog", {
                      id: data.id,
                      tipe: tipe,
                      title: title,
                    });
                  }}
                />
              </View>
            )}
            {data.tracking && tipe == "agendamydispo" && (
              <View style={styles.containerButton}>
                <IconButton
                  icon="forum-outline"
                  size={GlobalStyles.font.xxl}
                  iconColor={GlobalStyles.colors.blue}
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("TrackingLogDetail", {
                      id: data.id,
                      tipe: tipe,
                      title: title,
                      trackinglog: data.tracking,
                    });
                  }}
                />
              </View>
            )}
          </>
        )}
      />
      <View style={styles.footer}>
        {(data.type == "incoming" ||
          data.type == "disposition" ||
          data.type == "submitted" ||
          data.type == "outgoing") && (
          <View
            style={[
              data.type == "disposition"
                ? {
                    backgroundColor: GlobalStyles.colors.yellow,
                  }
                : data.type == "incoming"
                ? {
                    backgroundColor: GlobalStyles.colors.tertiery,
                  }
                : data.type == "submitted"
                ? {
                    backgroundColor: GlobalStyles.colors.red,
                  }
                : data.type == "outgoing"
                ? {
                    backgroundColor: GlobalStyles.colors.yellow,
                  }
                : {},
              styles.badgeTipeLetter,
            ]}
          >
            <Text
              style={{
                color: GlobalStyles.colors.textWhite,
              }}
            >
              {data.type == "incoming"
                ? "Incoming"
                : data.type == "disposition"
                ? "Disposition"
                : data.type == "submitted"
                ? "Submitted"
                : data.type == "outgoing"
                ? "Need Follow Up"
                : ""}
            </Text>
          </View>
        )}
        {data.remaining != null && (
          <View style={styles.badgeRemaining}>
            <IconButton
              icon="account-check"
              size={GlobalStyles.font.lg}
              iconColor={GlobalStyles.colors.textWhite}
              style={styles.button}
            />
            <Text
              style={{
                color: GlobalStyles.colors.textWhite,
              }}
            >
              {data.remaining}
            </Text>
          </View>
        )}
        {data.status && (
          <View
            style={[
              data.status == "In Progress"
                ? {
                    backgroundColor: GlobalStyles.colors.yellow,
                  }
                : {
                    backgroundColor: GlobalStyles.colors.red,
                    color: GlobalStyles.colors.textWhite,
                  },
              styles.badgeStatus,
            ]}
          >
            <Text
              style={{
                color: GlobalStyles.colors.textWhite,
              }}
            >
              {data.status}
            </Text>
          </View>
        )}
      </View>
      {/* <Divider bold /> */}
    </Card>
  );
}

export default CardList;

const styles = StyleSheet.create({
  cardUnread: {
    backgroundColor: GlobalStyles.colors.textWhite,
    borderLeftWidth: 3,
    borderLeftColor: GlobalStyles.colors.yellow,
    borderRadius: 0,
  },
  cardRead: {
    backgroundColor: GlobalStyles.colors.greylight,
    borderLeftWidth: 3,
    borderLeftColor: GlobalStyles.colors.grey,
    borderRadius: 0,
  },
  cardReadDispo: {
    backgroundColor: GlobalStyles.colors.greylight,
    borderLeftWidth: 3,
    borderLeftColor: GlobalStyles.colors.blue,
    borderRadius: 0,
  },
  cardSecre: {
    borderLeftWidth: 3,
    borderLeftColor: GlobalStyles.colors.red,
    borderRadius: 0,
  },
  containerCard: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginRight: 16,
    marginVertical: 8,
  },
  rightStyle: { width: "15%" },
  rightCard: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  remaining: {
    textAlign: "center",
  },
  date: {
    textAlign: "right",
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 0,
  },
  button: {
    margin: 0,
  },
  footer: {
    flexDirection: "row",
    marginLeft: "20%",
    marginBottom: 8,
  },
  badgeTipeLetter: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    padding: 8,
  },
  badgeStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  badgeRemaining: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.tertiery,
    borderRadius: 6,
    paddingRight: 8,
  },
});
