import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import * as RootNavigation from "./RootNavigation.js";
import Tuner from "./Tuner";

export default function ChordsScreenMain() {
  //stop tuner
  const isFocused = useIsFocused();
  if (isFocused) {
    const tuner = new Tuner();
    tuner.stop();
  }
  return (
    <View>
      <View>
        <TouchableOpacity //chords-library button
          style={styles.chordsSreenBtn}
          onPress={() => {
            RootNavigation.navigate("Chords library");
          }}
        >
          <MaterialCommunityIcons name="tune-vertical" size={180} />
          <Text>Library</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity //chords-training button
          style={styles.chordsSreenBtn}
          onPress={() => {
            RootNavigation.navigate("Chords selection");
          }}
        >
          <FontAwesomeIcon name="guitar" size={180} />
          <Text>Training</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chordsSreenBtn: {
    height: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
