import React from "react";
import { Text, ScrollView } from "react-native";
import SongsLibrary from "./SongsLibrary.json";

var parsedData = JSON.parse(JSON.stringify(SongsLibrary.SongsLibrary));

export default function SongsDetailsScreen({ route }) {
  //receive the song id
  var { id } = route.params;
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
