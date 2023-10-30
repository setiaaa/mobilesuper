import { useEffect, useState } from "react";
import { Alert, Text, StyleSheet, View } from "react-native";
import { Avatar, Card, Chip, IconButton } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import { nde_api } from "../../utils/api.config";
import { headerToken } from "../../utils/http";
import moment from "moment";
import { Config } from "../../constants/config";

function CardDelegation({ data, onPress }) {
  const [errorAvatarTitle, setErrorAvatarTitle] = useState(false);
  const [errorAvatarDelegasi, setErrorAvatarDelegasi] = useState(false);
  let header = {};
  async function getHeader() {
    try {
      header = await headerToken();
    } catch (error) {
      Alert.alert("Warning!", "Get Header not working!");
    }
  }
  useEffect(() => {
    getHeader();
  });
  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        {errorAvatarTitle && (
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
        {!errorAvatarTitle && (
          <Avatar.Image
            size={40}
            source={{
              uri: `${nde_api.baseurl + data.title?.avatar}`,
              method: "GET",
              headers: header,
            }}
            onError={(e) => setErrorAvatarTitle(true)}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        {errorAvatarDelegasi && (
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
        {!errorAvatarDelegasi && (
          <Avatar.Image
            size={40}
            source={{
              uri: `${nde_api.baseurl + data.delegasi.avatar}`,
              method: "GET",
              headers: header,
            }}
            onError={(e) => setErrorAvatarDelegasi(true)}
            style={styles.avaDelegasi}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{data.title.name}</Text>
          <Text style={styles.subtitle}>{data.title.label}</Text>
          <View style={styles.subtitleDele}>
            <IconButton
              icon="arrow-right-bottom"
              size={14}
              iconColor={GlobalStyles.colors.textWhite}
              style={{ marginLeft: 0 }}
            />
            <Text style={styles.subtitle}>{data.delegasi.fullname}</Text>
          </View>
        </View>
      </Card.Content>
      <View style={styles.footer}>
        <View>
          <Text
            style={[styles.subtitle, { color: GlobalStyles.colors.textBlack }]}
          >
            Start : {moment(data.start_date).format(DATETIME.LONG_DATE)}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: GlobalStyles.colors.textBlack, marginTop: 4 },
            ]}
          >
            End :{" "}
            <Text style={{ fontWeight: "600" }}>
              {moment(data.end_date).format(DATETIME.LONG_DATE)}
            </Text>
          </Text>
        </View>
        <Chip
          compact={true}
          textStyle={
            data.status == "activate"
              ? {
                color: GlobalStyles.colors.green,
              }
              : data.status == "waiting"
                ? {
                  color: GlobalStyles.colors.yellow,
                }
                : ""
          }
          style={
            data.status == "activate"
              ? {
                backgroundColor: GlobalStyles.colors.greenlight,
              }
              : data.status == "waiting"
                ? {
                  backgroundColor: GlobalStyles.colors.yellowlight,
                }
                : ""
          }
        >
          {data.status}
        </Chip>
      </View>
    </Card>
  );
}

export default CardDelegation;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: GlobalStyles.colors.dDelegation,
    paddingBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  avaDelegasi: {
    marginLeft: -25,
    marginTop: 30,
  },
  containerTitle: {
    width: "75%",
    marginLeft: 8,
  },
  containerNoTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  title: {
    fontSize: GlobalStyles.font.md,
    fontWeight: "bold",
    color: GlobalStyles.colors.textWhite,
  },
  subtitle: {
    fontSize: GlobalStyles.font.sm,
    color: GlobalStyles.colors.textWhite,
  },
  subtitleDele: {
    flexDirection: "row",
    alignItems: "center",
  },
});
