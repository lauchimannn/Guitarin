import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Search } from "react-native-feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <Search //search icon
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />

        <TextInput //input
          style={styles.input}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          placeholder="Search for artists or songs"
          onKeyPress={(e) => e.key === "Enter" && setClicked(false)}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && ( //cross icon
          <FontAwesome5
            name="times"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {clicked && ( //cancel button
        <View style={{ width: "20%", marginLeft: 12 }}>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchPhrase("");
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
