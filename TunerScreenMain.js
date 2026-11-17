import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
} from "react-native";
import "react-native-gesture-handler";
import Sound from "react-native-sound";
import Tuner from "./Tuner";
import Meter from "./Meter";
import Note from "./Note";

//play audio
const playAudio = (filePath) => {
  //enable playback in silence mode
  Sound.setCategory("Playback");
  var sound = new Sound(filePath, Sound.MAIN_BUNDLE, () => {
    //play the sound with an onEnd callback
    sound.play();
  });
};

//tuner screen
var audioPlaying = Boolean(false);
export default class TunerScreen extends Component {
  constructor(navigation) {
    super(navigation);
    this.navigation = navigation;
    this.state = {
      note: {
        name: "A",
        octave: 4,
        frequency: 440,
      },
    };
  }

  //update note's state
  _update(note) {
    this.setState({ note });
  }

  async componentDidMount() {
    //request microphone permission
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }

    const tuner = new Tuner();
    tuner.start();
    //when screen is focus
    const { navigation } = this.navigation;

    this.unmountNav = navigation.addListener("focus", () => {
      tuner.stop();
      tuner.start();
    });

    //When notes detected
    this.unmountTuner = tuner.onNoteDetected = (note) => {
      if (this._lastNoteName === note.name) {
        this._update(note);
        //check if note is correct
        if (
          (note.name == "D" && note.octave == "3") ||
          (note.name == "A" && note.octave == "2") ||
          (note.name == "E" && note.octave == "2") ||
          (note.name == "G" && note.octave == "3") ||
          (note.name == "B" && note.octave == "3") ||
          (note.name == "E" && note.octave == "4")
        ) {
          var storedNote = note.name + note.octave;
          var noteCorrect = Boolean(true);
          //check every 0.1s to see if the note is correct
          this.checkCorrectNoteTimer = setInterval(() => {
            if (note.name + note.octave != storedNote) {
              noteCorrect = Boolean(false);
              clearInterval(this.checkCorrectNoteTimer);
            }
          }, 100);
          //play correct sound effect if note is correct for 1s straight
          this.correctNotetimeout = setTimeout(() => {
            if (noteCorrect && !audioPlaying) {
              audioPlaying = Boolean(true);
              playAudio("correct.mp3");
              setTimeout(() => {
                audioPlaying = Boolean(false);
              }, 1000);
            }
          }, 1000);
        }
      } else {
        this._lastNoteName = note.name;
      }
    };
  }
  componentWillUnmount() {
    this.unmountNav();
    this.unmountTuner();
    this.checkCorrectNoteTimer && clearInterval(this.checkCorrectNoteTimer);
    this.correctNotetimeout && clearTimeout(this.correctNotetimeout);
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.tunerBtnViewE4}>
          <TouchableOpacity
            style={styles.tunerBtn}
            onPress={() => {
              playAudio("e4.mp3");
            }}
          >
            <Text style={styles.tunerBtnText}>E4</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tunerBtnViewB3}>
          <TouchableOpacity
            style={styles.tunerBtn}
            onPress={() => {
              playAudio("b3.mp3");
            }}
          >
            <Text style={styles.tunerBtnText}>B3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tunerBtnViewG3}>
          <TouchableOpacity
            style={styles.tunerBtn}
            onPress={() => {
              playAudio("g3.mp3");
            }}
          >
            <Text style={styles.tunerBtnText}>G3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tunerBtnViewD3}>
          <TouchableOpacity
            style={styles.tunerBtn}
            onPress={() => {
              playAudio("d3.mp3");
            }}
          >
            <Text style={styles.tunerBtnText}>D3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tunerBtnViewA2}>
          <TouchableOpacity
            style={styles.tunerBtn}
            onPress={() => {
              playAudio("a2.mp3");
            }}
          >
            <Text style={styles.tunerBtnText}>A2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tunerBtnViewE2}>
          <TouchableOpacity
            style={styles.tunerBtn}
            onPress={() => {
              playAudio("e2.mp3");
            }}
          >
            <Text style={styles.tunerBtnText}>E2</Text>
          </TouchableOpacity>
        </View>
        <Meter cents={this.state.note.cents} />
        <Note {...this.state.note} />
        <Text style={styles.frequency}>
          {this.state.note.frequency.toFixed(1)} Hz
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tunerBtnViewD3: {
    position: "absolute",
    left: 15,
    bottom: 250,
  },
  tunerBtnViewA2: {
    position: "absolute",
    left: 15,
    bottom: 185,
  },
  tunerBtnViewE2: {
    position: "absolute",
    left: 15,
    bottom: 120,
  },
  tunerBtnViewG3: {
    position: "absolute",
    right: 15,
    bottom: 250,
  },
  tunerBtnViewB3: {
    position: "absolute",
    right: 15,
    bottom: 185,
  },
  tunerBtnViewE4: {
    position: "absolute",
    right: 15,
    bottom: 120,
  },
  tunerBtn: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#ccc",
  },
  tunerBtnText: {
    position: "absolute",
    left: 15,
    bottom: 15,
  },
  frequency: {
    fontSize: 28,
    color: "#37474f",
  },
});
