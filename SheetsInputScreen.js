import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as RootNavigation from "./RootNavigation.js";
import Tuner from "./Tuner";

capoList = [
  "No capo",
  "1st fret",
  "2nd fret",
  "3rd fret",
  "4th fret",
  "5th fret",
  "6th fret",
  "7th fret",
  "8th fret",
  "9th fret",
  "10th fret",
  "11th fret",
  "12th fret",
];

export default function SheetsInputScreen() {
  //stop tuner
  const isFocused = useIsFocused();
  if (isFocused) {
    const tuner = new Tuner();
    tuner.stop();
  }
  const [songNameInput, setSongNameInput] = useState("");
  const [artistInput, setArtistInput] = useState("");
  const [lyricsInput, setLyricsInput] = useState("");
  const [selectedCapo, setSelectedCapo] = useState(capoList[0]);
  return (
    <ScrollView>
      <Text style={styles.text}>Song name: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setSongNameInput(text)}
        value={songNameInput}
        editable
        maxLength={50}
      ></TextInput>
      <Text style={styles.text}>Artist: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setArtistInput(text)}
        value={artistInput}
        editable
        maxLength={50}
      ></TextInput>
      <Text style={styles.text}>Capo: </Text>
      <Picker //capo dropdown menu
        selectedValue={selectedCapo}
        onValueChange={(itemValue) => {
          setSelectedCapo(itemValue);
        }}
      >
        <Picker.Item label={capoList[0]} value={capoList[0]} />
        <Picker.Item label={capoList[1]} value={capoList[1]} />
        <Picker.Item label={capoList[2]} value={capoList[2]} />
        <Picker.Item label={capoList[3]} value={capoList[3]} />
        <Picker.Item label={capoList[4]} value={capoList[4]} />
        <Picker.Item label={capoList[5]} value={capoList[5]} />
        <Picker.Item label={capoList[6]} value={capoList[6]} />
        <Picker.Item label={capoList[7]} value={capoList[7]} />
        <Picker.Item label={capoList[8]} value={capoList[8]} />
        <Picker.Item label={capoList[9]} value={capoList[9]} />
        <Picker.Item label={capoList[10]} value={capoList[10]} />
        <Picker.Item label={capoList[11]} value={capoList[11]} />
        <Picker.Item label={capoList[12]} value={capoList[12]} />
      </Picker>
      <Text style={styles.text}>Lyrics: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setLyricsInput(text)}
        value={lyricsInput}
        editable
        multiline={true}
      ></TextInput>
      <TouchableOpacity //OK button
        style={styles.OkBtn}
        onPress={() => {
          if (!songNameInput || !artistInput || !lyricsInput) {
            alert("Enter all input fisrt!");
          } else {
            RootNavigation.navigate("Sheets main", {
              screen: "Edit",
              params: { songNameInput, artistInput, selectedCapo, lyricsInput },
            });
          }
        }}
      >
        <Text style={styles.OkText}>OK</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
  },
  textInput: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    fontSize: 20,
  },
  OkBtn: {
    bottom: 5,
    right: -310,
    backgroundColor: "#483D8B",
    borderRadius: 10,
    width: 70,
    height: 50,
  },
  OkText: {
    position: "absolute",
    top: 11,
    left: 20,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});
