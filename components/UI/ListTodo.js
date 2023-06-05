import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { Avatar, Chip, List } from "react-native-paper";
import { Config } from "../../constants/config";
import { GlobalStyles } from "../../constants/styles";
import { nde_api } from "../../utils/api.config";

function ListTodo({ title, result }) {
  const [errorAvatarSender, setErrorAvatarSender] = useState(false);
  const [errorAvatarReceiver, setErrorAvatarReceiver] = useState(false);
  const navigation = useNavigation();
  let header = {};
  useEffect(() => {
    async function getToken() {
      try {
        let data2 = await AsyncStorage.getItem("token");
        if (data2 != null) {
          let token = JSON.parse(data2);
          header = {
            Authorization: "token " + token,
          };
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        Alert.alert("Warning!", "Avatar " + title + " not working!");
      }
    }
    getToken();
  }, []);
  return (
    <List.Accordion
      title={title}
      id={title}
      key={title}
      style={styles.listAccordion}
    >
      <ScrollView
        style={[
          title == "Searching" && styles.scrollSearch,
          title != "Searching" && styles.scroll,
        ]}
      >
        {result.results &&
          result.results.length > 0 &&
          result.results.map((data) => (
            <Fragment key={data.date}>
              {data.children &&
                data.children.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      navigation.navigate("TodoDetail", {
                        id: item.id,
                        title: Config.labelTodo + "\nDetail",
                      });
                    }}
                  >
                    <List.Section style={styles.containerTodo}>
                      <List.Item
                        title={() => (
                          <>
                            <Text style={styles.titleTodo}>{item.subject}</Text>
                            <Text style={styles.descTodo}>
                              {item.description}
                            </Text>
                          </>
                        )}
                        right={(props) => (
                          <View style={{ width: 45 }}>
                            {errorAvatarSender && (
                              <Avatar.Image {...props} source={Config.avatar} />
                            )}
                            {!errorAvatarSender && (
                              <Avatar.Image
                                {...props}
                                size={40}
                                key={item.sender[0].name}
                                source={{
                                  uri: `${
                                    nde_api.baseurl + item.sender[0].avatar
                                  }`,
                                  method: "GET",
                                  headers: header,
                                }}
                                onError={(e) => setErrorAvatarSender(true)}
                                theme={{
                                  colors: {
                                    primary: GlobalStyles.colors.textWhite,
                                  },
                                }}
                              />
                            )}
                          </View>
                        )}
                      />
                      <View style={styles.footer}>
                        <View style={styles.containerAvatar}>
                          {item.receiver &&
                            item.receiver.map((receiver, index) => (
                              <Fragment key={index}>
                                {errorAvatarReceiver && (
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
                                {!errorAvatarReceiver && (
                                  <Avatar.Image
                                    size={30}
                                    style={styles.avaReceiver}
                                    source={{
                                      uri: `${
                                        nde_api.baseurl + receiver.avatar
                                      }`,
                                      method: "GET",
                                      headers: header,
                                    }}
                                    onError={(e) =>
                                      setErrorAvatarReceiver(true)
                                    }
                                    theme={{
                                      colors: {
                                        primary: GlobalStyles.colors.textWhite,
                                      },
                                    }}
                                  />
                                )}
                              </Fragment>
                            ))}
                        </View>
                        <Chip
                          compact={true}
                          style={
                            item.prio == "Normal"
                              ? { backgroundColor: GlobalStyles.colors.normal }
                              : item.prio == "Low"
                              ? { backgroundColor: GlobalStyles.colors.low }
                              : item.prio == "High"
                              ? { backgroundColor: GlobalStyles.colors.high }
                              : { backgroundColor: GlobalStyles.colors.yellow }
                          }
                          textStyle={{ color: "white" }}
                        >
                          {item.duedate.substr(0, 6)}
                        </Chip>
                      </View>
                    </List.Section>
                  </Pressable>
                ))}
            </Fragment>
          ))}
        {result.results && result.results.length == 0 && (
          <List.Section
            key="search"
            style={[styles.containerNotFound, styles.noTodo]}
          >
            <Text style={styles.textNotFound}>
              You don't have a {Config.labelTodo} {title}
            </Text>
          </List.Section>
        )}
      </ScrollView>
    </List.Accordion>
  );
}

export default ListTodo;

const styles = StyleSheet.create({
  listAccordion: {
    padding: 0,
    margin: 0,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  scroll: {
    // height: "30%",
  },
  scrollSearch: {
    // height: "60%",
  },
  containerTodo: {
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.textWhite,
    padding: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.tertiery40,
  },
  containerNotFound: {
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.disabled,
    padding: 24,
    elevation: 1,
  },
  titleTodo: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "600",
  },
  descTodo: {
    fontSize: GlobalStyles.font.sm,
    color: GlobalStyles.colors.blue,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerAvatar: {
    flexDirection: "row",
  },
  avaReceiver: { marginLeft: 6 },
  noTodo: {
    justifyContent: "center",
    alignItems: "center",
  },
  textNotFound: {
    fontWeight: "bold",
  },
});
