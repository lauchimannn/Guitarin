import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import Svg from "react-native-svg";
import Sound from "react-native-sound";
import GuitarbarSVG from "./assets/guitarbar.svg";
import HandSVG from "./assets/hand.svg";
import UpdateChord from "./UpdateChord";
import * as RootNavigation from "./RootNavigation.js";

//12 notes
notesList = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

//update chord

//play audio
const playAudio = (filePath) => {
  //get the filepath
  if (filePath.length == 1) {
    filePath = filePath + ".mp3";
  } else {
    filePath = filePath.substring(0, 1) + "_sharp.mp3";
  }
  //enable playback in silence mode
  Sound.setCategory("Playback");
  var sound = new Sound(filePath, Sound.MAIN_BUNDLE, () => {
    //play the sound with an onEnd callback
    sound.play();
  });
};

//chord-library screen
function ChordsLibraryScreen() {
  const [selectedValue, setSelectedValue] = useState(notesList[0]);
  return (
    <View>
      <Picker //chords dropdown menu
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
        }}
      >
        <Picker.Item label={notesList[0]} value={notesList[0]} />
        <Picker.Item label={notesList[1]} value={notesList[1]} />
        <Picker.Item label={notesList[2]} value={notesList[2]} />
        <Picker.Item label={notesList[3]} value={notesList[3]} />
        <Picker.Item label={notesList[4]} value={notesList[4]} />
        <Picker.Item label={notesList[5]} value={notesList[5]} />
        <Picker.Item label={notesList[6]} value={notesList[6]} />
        <Picker.Item label={notesList[7]} value={notesList[7]} />
        <Picker.Item label={notesList[8]} value={notesList[8]} />
        <Picker.Item label={notesList[9]} value={notesList[9]} />
        <Picker.Item label={notesList[10]} value={notesList[10]} />
        <Picker.Item label={notesList[11]} value={notesList[11]} />
      </Picker>
      <View>
        <View style={styles.guitarbarSVG}>
          <Svg height="100%" width="100%">
            <GuitarbarSVG />
            <UpdateChord selectedValue={selectedValue} showAns={true} />
          </Svg>
          <HandSVG style={styles.handSVG} />
        </View>
        <TouchableOpacity //play audio button
          style={styles.playBtn}
          onPress={() => {
            playAudio(selectedValue);
          }}
        >
          <Ionicons
            style={styles.playIcon}
            name="play"
            color="white"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity //chords-training button
          style={styles.trainBtn}
          onPress={() => {
            var selectedValueList = [];
            selectedValueList.push(selectedValue);
            RootNavigation.navigate("Chords main", {
              screen: "Chords training",
              params: { selectedValueList },
            });
          }}
        >
          <Text style={styles.trainText}>TRAIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChordsLibraryScreen;

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    left: 165,
    height: 50,
    width: 100,
  },
  guitarbarSVG: {
    position: "absolute",
    top: 110,
    left: 50,
  },
  handSVG: {
    position: "absolute",
    bottom: -150,
    left: -40,
  },
  playBtn: {
    position: "absolute",
    top: 530,
    left: 165,
    backgroundColor: "#778899",
    borderRadius: 100,
    width: 70,
    height: 50,
  },
  playIcon: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  trainBtn: {
    position: "absolute",
    top: 530,
    right: 35,
    backgroundColor: "#483D8B",
    borderRadius: 5,
    width: 70,
    height: 50,
  },
  trainText: {
    position: "absolute",
    top: 11,
    left: 6,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});
