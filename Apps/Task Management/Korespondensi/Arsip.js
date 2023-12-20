import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native";
import { CardListTask } from "../../../components/CardListTask";
import { CardShimmerListTask } from "../../../components/CardListTask/CardShimmerListTask";
import { useSelector } from "react-redux";
import { CardListGridTask } from "../../../components/CardListGridTask";
import moment from "moment";
import ListEmpty from "../../../components/ListEmpty";
import { CardShimmerListGridTask } from "../../../components/CardListGridTask/CardShimmerListGridTask";
import { COLORS, DATETIME } from "../../../config/SuperAppps";
import { Loading } from "../../../components/Loading";
import { Search } from "../../../components/Search";
import TreeView from "react-native-final-tree-view";
import { Text } from "react-native";

export const Arsip = () => {
  const { list, variant, loading } = useSelector((state) => state.task);
  const taskLists = list.data;
  const [filterData, setFilterData] = useState([]);
  const [filterDataStatus, setFilterDataStatus] = useState([]);
  const [page, setPage] = useState(5);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // const data = taskLists.filter((item) => {
    //     return item.deadline_status
    // })
    setFilterDataStatus(taskLists);
  }, [taskLists]);

  const loadMore = () => {
    if (filterData % 5 === 0) {
      setPage(page + 5);
    }
    console.log("page dari harini" + page);
  };

  console.log(taskLists);

  // const renderShimmerList = () => {
  //     const arr = []
  //     for (let i = 0; i < 6; i++) {
  //         arr.push(
  //             <View key={i}>
  //                 <CardShimmerListTask />
  //             </View>
  //         )
  //     }
  //     return arr
  // }

  const renderShimmerGrid = () => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push(
        <View key={i} style={{ flexDirection: "row", gap: 4 }}>
          <CardShimmerListGridTask />
          <CardShimmerListGridTask />
        </View>
      );
    }
    return arr;
  };

  const filter = (event) => {
    setSearch(event);
  };

  useEffect(() => {
    // const item = taskLists
    if (search !== "") {
      const data = filterDataStatus.filter((item) => {
        return item.title?.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    } else {
      setFilterData(filterDataStatus);
    }
    console.log(filterData);
  }, [search, taskLists]);
  console.log(filterData);
  return (
    <>
      <View style={{ marginTop: 20 }}>
        <Search
          placeholder={"Cari"}
          iconColor={COLORS.primary}
          onSearch={filter}
        />
      </View>
      {variant === "list" ? (
        <View style={{ flex: 1, marginTop: 20 }}>
          {loading ? (
            <Loading />
          ) : (
            <View>
              {/* <FlatList
                                    data={search !== '' ? filterData : filterDataStatus}
                                    renderItem={({ item }) => <CardListTask
                                        id={item.id}
                                        title={item.type}
                                        duedate={item.date}
                                    />
                                    }
                                    ListEmptyComponent={() =>
                                        <ListEmpty />
                                    }
                                    ListFooterComponent={() =>
                                        loading === true ? (
                                        <View
                                            style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 24,
                                            }}
                                        >
                                            <ActivityIndicator size="large" color={COLORS.primary} />
                                        </View>
                                        ) : null
                                    }
                                    onEndReached={loadMore}
                                    style={{ height:"95%"}}
                                /> */}
              {/* <TreeView
      data={family} // defined above
      renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
        return (
          <View>
            <Text
              style={{
                marginLeft: 25 * level,
              }}
            >
              {getIndicator(isExpanded, hasChildrenNodes)} {node.name}
            </Text>
          </View>
        )
      }}
    /> */}
            </View>
          )}
        </View>
      ) : variant === "grid" ? (
        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              {renderShimmerGrid()}
            </View>
          ) : (
            <FlatList
              key={"#"}
              data={filterData}
              renderItem={({ item }) => (
                <CardListGridTask
                  // id={item.id}
                  // title={item.children}
                  duedate={item.date}
                  // priority={item.priority}
                  // members={item.members}
                />
              )}
              style={{ marginTop: 20 }}
              columnWrapperStyle={{ gap: 4 }}
              numColumns={2}
              keyExtractor={(item) => "#" + item.id}
              ListEmptyComponent={() => <ListEmpty />}
            />
          )}
        </View>
      ) : null}
    </>
  );
};
