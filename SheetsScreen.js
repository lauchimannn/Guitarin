import React, { useState } from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import SheetsLibrary from "./SheetsLibrary.json";
import List from "./List";
import SearchBar from "./SearchBar";
import Tuner from "./Tuner";

var sheetsLibrary = SheetsLibrary.SheetsLibrary;
export default function SheetsScreen({ route }) {
  //stop tuner
  const isFocused = useIsFocused();
  if (isFocused) {
    const tuner = new Tuner();
    tuner.stop();
  }

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  //delete sheet
  if (route.params && Object.keys(route.params).length == 1) {
    var { id } = route.params;
    var setValue = sheetsLibrary;

    sheetsLibrary = setValue.filter((el) => {
      return el.id !== id;
    });
    //change other sheet's id
    if (id < sheetsLibrary.length + 1) {
      for (var i = 0; i < sheetsLibrary.length + 1 - id; i++) {
        sheetsLibrary[i].id = sheetsLibrary[i].id - 1;
      }
    }
    route.params = "";
  }
  //add new sheet
  if (route.params && Object.keys(route.params).length > 1) {
    route.params.id = sheetsLibrary.length + 1;
    sheetsLibrary[sheetsLibrary.length] = route.params;
    route.params = "";
  }

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
        data={sheetsLibrary}
        setClicked={setClicked}
        reverse={false}
        screen={"sheets"}
      />
    </View>
  );
}
