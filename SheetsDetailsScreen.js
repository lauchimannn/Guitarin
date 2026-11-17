import React from "react";
import { Text, ScrollView } from "react-native";
import SheetsLibrary from "./SheetsLibrary.json";

var parsedData = JSON.parse(JSON.stringify(SheetsLibrary.SheetsLibrary));

export default function SheetsDetailsScreen({ route }) {
  parsedData = route.params.data;
  //receive the song id
  var id = route.params.id;
  id = id - 1;

  return (
    <ScrollView>
      <Text>{parsedData[id].song}</Text>
      <Text>{parsedData[id].artist}</Text>
      <Text></Text>
      <Text>{parsedData[id].capo}</Text>
      <Text></Text>
      <Text>{parsedData[id].chords}</Text>
    </ScrollView>
  );
}
