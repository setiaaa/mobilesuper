import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Searchbar, Text } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

function SearchFilter({
  searchQuery,
  setSearchQuery,
  getSearch,
  showBottomFilter,
  clearSearch,
}) {
  return (
    <View style={styles.containerRow}>
      <View style={{ width: "85%" }}>
        <Searchbar
          style={{
            borderRadius: 12,
            backgroundColor: GlobalStyles.colors.textWhite,
          }}
          placeholder="Cari..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onIconPress={getSearch}
          onSubmitEditing={getSearch}
          clearIcon={clearSearch}
        />
      </View>
      <TouchableOpacity
        onPress={showBottomFilter}
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <IconButton style={{ marginVertical: -5 }} icon="filter" />
        <Text style={{ fontSize: GlobalStyles.font.sm }}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchFilter;

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
});
