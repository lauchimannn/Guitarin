import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
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

var showHints = Boolean(true);
var count = 0;
var speedCount = 0;
var countingTimer;
var countingSpeed;
var chordTotalLength = 0;
var saved = Boolean(false);
export default function SheetsEditScreen({ route }) {
  //hint
  if (showHints) {
    Alert.alert(
      "Hints",
      "Press start button and play whatever you want!\nChord sheet will be generated in ChordPro format. E.g.\n\n[D]We were both young when I first saw you\nI [G]close my eyes and the flashback starts\nI'm standin' [Bm]there\nOn a balcony in [G]summer air",
      [
        {
          text: "OK",
        },
      ]
    );
    showHints = Boolean(false);
  }
  //unsaved changes alert
  const navigation = useNavigation();
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (saved) {
          return;
        }
        e.preventDefault();

        Alert.alert(
          "Unsaved changes",
          "Are you sure to discard the chord sheet and leave?",
          [
            {
              text: "No",
            },
            {
              text: "Yes",
              onPress: () => {
                count = 0;
                speedCount = 0;
                chordTotalLength = 0;
                clearInterval(countingTimer);
                clearInterval(countingSpeed);
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
      }),
    [navigation, !saved]
  );

  //receive entered song info
  var songInfo = Object.values(route.params);
  const [start, setStart] = useState(false);
  const [displayChord, setDisplayChord] = useState(songInfo[3]);
  var chordInputList = displayChord;
  const [timer, setTimer] = useState(0);
  const [note, setNote] = useState({
    name: "A",
    octave: 4,
    frequency: 440,
  });

  function ChangeTimer(status) {
    if (status == "start") {
      countingTimer = setInterval(() => {
        count += 1;
        setTimer(count);
      }, 1000);
      countingSpeed = setInterval(() => {
        speedCount += 1;
      }, 500);
    } else if (status == "pause") {
      clearInterval(countingTimer);
      clearInterval(countingSpeed);
    } else if (status == "restart") {
      clearInterval(countingTimer);
      clearInterval(countingSpeed);
      count = 0;
      speedCount = 0;
    }
  }

  const tuner = new Tuner();
  function startTuner() {
    tuner.start();
    tuner.onNoteDetected = (note) => {
      setNote(note);
      chordInputList =
        chordInputList.substring(0, speedCount + chordTotalLength) +
        "[" +
        note.name +
        "]" +
        chordInputList.substring(
          speedCount + chordTotalLength,
          chordInputList.length
        );
      setDisplayChord(chordInputList);
      chordTotalLength += 2 + note.name.length;
    };
  }
  function stopTuner() {
    tuner.stop();
  }
  function restartTuner() {
    setStart(false);
    setTimer(0);
    tuner.stop();
  }

  function saveSheet(song, artist, capo, chords) {
    var id = "0";
    saved = Boolean(true);
    RootNavigation.navigate("Sheets", { id, song, artist, capo, chords });
  }

  return (
    <ScrollView>
      <Text style={styles.titleText}>Timer: {timer}</Text>
      <Text style={styles.titleText}>Capo: {songInfo[2]}</Text>
      <ScrollView>
        <TextInput
          style={styles.titleText}
          onChangeText={(text) => setDisplayChord(text)}
          value={displayChord.toString()}
          editable
          multiline={true}
        ></TextInput>
      </ScrollView>
      <TouchableOpacity //restart button
        style={styles.restartBtn}
        onPress={() => {
          Alert.alert(
            "Restart",
            "Are you sure to discard the chord sheet and restart?",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                onPress: () => {
                  ChangeTimer("restart"), restartTuner();
                },
              },
            ]
          );
        }}
      >
        <Text style={styles.restartText}>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity //start pause button
        style={styles.startBtn}
        onPress={() => {
          setStart(!start);
          if (start) {
            ChangeTimer("pause");
            stopTuner();
          } else {
            ChangeTimer("start");
            startTuner();
          }
        }}
      >
        <Ionicons
          style={styles.startIcon}
          name={start ? "pause" : "play"}
          color="white"
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity //save button
        style={styles.saveBtn}
        onPress={() => {
          Alert.alert("Save", "End and save?", [
            {
              text: "No",
            },
            {
              text: "Yes",
              onPress: () =>
                saveSheet(songInfo[0], songInfo[1], songInfo[2], displayChord),
            },
          ]);
        }}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleText: { fontSize: 20, padding: 10, borderWidth: 1 },
  restartBtn: {
    top: 50,
    left: 40,
    backgroundColor: "#B22222",
    borderRadius: 10,
    width: 80,
    height: 50,
  },
  restartText: {
    position: "absolute",
    top: 11,
    left: 8,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  startBtn: {
    top: 0,
    left: 165,
    backgroundColor: "#778899",
    borderRadius: 100,
    width: 70,
    height: 50,
  },
  startIcon: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  saveBtn: {
    top: -50,
    right: -280,
    backgroundColor: "#483D8B",
    borderRadius: 10,
    width: 70,
    height: 50,
  },
  saveText: {
    position: "absolute",
    top: 11,
    left: 13,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});
