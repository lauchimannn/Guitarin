import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import * as RootNavigation from "./RootNavigation.js";
import Tuner from "./Tuner";

//12 notes
var notesList = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];

//check selected chords
function checkSelectedChord(selectedChord, selectedChordList) {
  //check if the chord is already selected
  if (selectedChordList.includes(selectedChord)) {
    selectedChordList = selectedChordList.filter(
      (item) => item !== selectedChord
    );
  } else {
    selectedChordList.push(selectedChord);
  }
  return selectedChordList;
}

//export chord training screen
var showHints = Boolean(true);
export default function ChordsSelectionScreen() {
  //hint
  if (showHints) {
    Alert.alert(
      "Hints",
      "1. Choose your chord to train.\n2. You will have: \n     - 5s to play the random chord.\n     - 3s to check the answer.\n3. +10 marks if correct.",
      [
        {
          text: "OK",
        },
      ]
    );
    showHints = Boolean(false);
  }
  //reset tuner if the screen if focused
  const isFocused = useIsFocused();
  if (isFocused) {
    const tuner = new Tuner();
    tuner.stop();
  }
  const [selectedChordList, setSelectedChordList] = useState(notesList);
  const [selectedBoo0, setSelectedBoo0] = useState(true);
  const [selectedBoo1, setSelectedBoo1] = useState(true);
  const [selectedBoo2, setSelectedBoo2] = useState(true);
  const [selectedBoo3, setSelectedBoo3] = useState(true);
  const [selectedBoo4, setSelectedBoo4] = useState(true);
  const [selectedBoo5, setSelectedBoo5] = useState(true);
  const [selectedBoo6, setSelectedBoo6] = useState(true);
  const [selectedBoo7, setSelectedBoo7] = useState(true);
  const [selectedBoo8, setSelectedBoo8] = useState(true);
  const [selectedBoo9, setSelectedBoo9] = useState(true);
  const [selectedBoo10, setSelectedBoo10] = useState(true);
  const [selectedBoo11, setSelectedBoo11] = useState(true);
  return (
    <View>
      <TouchableOpacity
        style={
          selectedBoo0 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[0], selectedChordList)
          );
          setSelectedBoo0((isSelectedBoo0) => !isSelectedBoo0);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[0]}
          <Ionicons
            name={selectedBoo0 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo1 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[1], selectedChordList)
          );
          setSelectedBoo1((isSelectedBoo1) => !isSelectedBoo1);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[1]}
          <Ionicons
            name={selectedBoo1 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo2 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[2], selectedChordList)
          );
          setSelectedBoo2((isSelectedBoo2) => !isSelectedBoo2);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[2]}
          <Ionicons
            name={selectedBoo2 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo3 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[3], selectedChordList)
          );
          setSelectedBoo3((isSelectedBoo3) => !isSelectedBoo3);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[3]}
          <Ionicons
            name={selectedBoo3 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo4 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[4], selectedChordList)
          );
          setSelectedBoo4((isSelectedBoo4) => !isSelectedBoo4);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[4]}
          <Ionicons
            name={selectedBoo4 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo5 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[5], selectedChordList)
          );
          setSelectedBoo5((isSelectedBoo5) => !isSelectedBoo5);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[5]}
          <Ionicons
            name={selectedBoo5 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo6 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[6], selectedChordList)
          );
          setSelectedBoo6((isSelectedBoo6) => !isSelectedBoo6);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[6]}
          <Ionicons
            name={selectedBoo6 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo7 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[7], selectedChordList)
          );
          setSelectedBoo7((isSelectedBoo7) => !isSelectedBoo7);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[7]}
          <Ionicons
            name={selectedBoo7 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo8 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[8], selectedChordList)
          );
          setSelectedBoo8((isSelectedBoo8) => !isSelectedBoo8);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[8]}
          <Ionicons
            name={selectedBoo8 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo9 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[9], selectedChordList)
          );
          setSelectedBoo9((isSelectedBoo9) => !isSelectedBoo9);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[9]}
          <Ionicons
            name={selectedBoo9 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo10 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[10], selectedChordList)
          );
          setSelectedBoo10((isSelectedBoo10) => !isSelectedBoo10);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[10]}
          <Ionicons
            name={selectedBoo10 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedBoo11 ? styles.selectedChordBtn : styles.notSelectedChordBtn
        }
        onPress={() => {
          setSelectedChordList(
            checkSelectedChord(notesList[11], selectedChordList)
          );
          setSelectedBoo11((isSelectedBoo11) => !isSelectedBoo11);
        }}
      >
        <Text style={styles.chordBtnText}>
          {notesList[11]}
          <Ionicons
            name={selectedBoo11 ? "checkmark" : ""}
            size={26}
            style={{ position: "absolute", top: 20, right: 300 }}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity //chords-training button
        style={styles.trainBtn}
        onPress={() => {
          if (selectedChordList.length === 0) {
            alert("Choose a chord first!");
          } else
            RootNavigation.navigate("Chords main", {
              screen: "Chords training",
              params: { selectedChordList },
            });
        }}
      >
        <Text style={styles.trainText}>TRAIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  notSelectedChordBtn: {
    backgroundColor: "lightgrey",
    height: 44,
  },
  selectedChordBtn: {
    backgroundColor: "gray",
    height: 44,
  },
  chordBtnText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 8,
  },
  chordsSreenBtn: {
    height: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  trainBtn: {
    position: "absolute",
    alignSelf: "center",
    bottom: -60,
    backgroundColor: "#483D8B",
    borderRadius: 5,
    width: 70,
    height: 50,
  },
  trainText: {
    position: "absolute",
    alignSelf: "center",
    top: 11,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});
