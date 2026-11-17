import React, { useState } from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import SongsLibrary from "./SongsLibrary.json";
import List from "./List";
import SearchBar from "./SearchBar";
import Tuner from "./Tuner";

//songs main screen
export default function SongsScreenMain() {
  //stop tuner
  const isFocused = useIsFocused();
  if (isFocused) {
    const tuner = new Tuner();
    tuner.stop();
  }
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const songsLibrary = SongsLibrary.SongsLibrary;

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <List
        searchPhrase={searchPhrase}
        data={songsLibrary}
        setClicked={setClicked}
        reverse={false}
        screen={"songs"}
      />
    </View>
  );
}
