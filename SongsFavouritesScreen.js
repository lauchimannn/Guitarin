import React, { useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SongsLibrary from "./SongsLibrary";
//search bar
import List from "./List";
import SearchBar from "./SearchBar";

//read data from AsyncStorage
const getData = async (key) => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

//setting screen
export default function SongsFavouritesScreen() {
  const [temp, setTemp] = useState(null);
  getData("favourite_id").then((value) => {
    let favSongsData = [];
    for (let i = 0; i < value.length; i++) {
      favSongsData.push(SongsLibrary[value[i] - 1]);
    }
    if (JSON.stringify(temp) != JSON.stringify(favSongsData)) {
      setTemp(favSongsData);
    }
  });
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <List
        searchPhrase={searchPhrase}
        data={temp}
        setClicked={setClicked}
        reverse={true}
      />
    </View>
  );
}
