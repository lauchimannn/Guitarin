import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Sound from "react-native-sound";
import Tuner from "./Tuner";
import Svg from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import GuitarbarSVG from "./assets/guitarbar.svg";
import HandSVG from "./assets/hand.svg";
import UpdateChord from "./UpdateChord";

//12 notes
notesList = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

//play audio
const playAudio = (filePath) => {
  //enable playback in silence mode
  Sound.setCategory("Playback");
  var sound = new Sound(filePath, Sound.MAIN_BUNDLE, () => {
    //play the sound with an onEnd callback
    sound.play();
  });
};

//get random chord
function getRandomChord(selectedChordsList) {
  var randomNum = Math.floor(Math.random() * selectedChordsList.length);
  return selectedChordsList[randomNum];
}

//chords training screen
export default function ChordsTrainingScreen({ route }) {
  //request microphone permission
  if (Platform.OS === "android") {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  }
  //count down timer
  function countDownTimer(randomChord) {
    setShowAns(false);
    setTimer(5);
    //check if correct note
    const tuner = new Tuner();
    tuner.start();
    //detect note every 0.1s
    var correctedBoo = Boolean(false);
    tuner.onNoteDetected = (note) => {
      if (!correctedBoo) {
        console.log("You played:", note.name, "Ans:", randomChord);
        var noteCorrect = Boolean(true);
        var storedNote = note.name;
        setNote(note);
        //check if note is correct every 0.1s
        const checkCorrectNoteTimer = setInterval(() => {
          if (storedNote != randomChord) {
            noteCorrect = Boolean(false);
            clearInterval(checkCorrectNoteTimer);
          }
          //play correct sound effect when note is correct after 0.7s
          setTimeout(() => {
            if (noteCorrect && !correctedBoo) {
              playAudio("correct.mp3");
              score_temp += 10;
              setScore(score_temp);
              tuner.stop();
              correctedBoo = Boolean(true);
            }
          }, 700);
        }, 100);
      }
    };

    setTimeout(() => {
      setTimer(4);
      setTimeout(() => {
        setTimer(3);
        setTimeout(() => {
          setTimer(2);
          setTimeout(() => {
            setTimer(1);
            setTimeout(() => {
              setTimer(0);
              setTimeout(() => {
                setTimer(3);
                tuner.stop();
                //show ans
                setShowAns(true);
                setTimeout(() => {
                  setTimer(2);
                  setTimeout(() => {
                    setTimer(1);
                    setTimeout(() => {
                      setTimer(0);
                    }, 1000);
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }
  //clear the training loop when back
  var mainLoop = "";
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      unsubscribe();
      clearInterval(mainLoop);
    });
  }, []);
  const [randomChord, setRandomChord] = useState("");
  const [countDownText, setCountDownText] = useState("");
  const [disableReadyBtn, setDisableReadyBtn] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [timer, setTimer] = useState(5);
  const [score, setScore] = useState(0);
  var score_temp = 0;
  const [note, setNote] = useState({
    name: "A",
    octave: 4,
    frequency: 440,
  });
  //receive selected training chords
  var selectedChordsList = Object.values(route.params)[0];
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.timer}>Timer: {timer}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={showAns ? styles.ansText : styles.countDownText}>
        {randomChord}
      </Text>
      {/* ans */}
      <View style={showAns ? styles.guitarbarSVG : styles.disabled}>
        <Svg style={showAns ? styles.SVG : styles.disabled}>
          <GuitarbarSVG />
          <UpdateChord selectedValue={randomChord} showAns={showAns} />
        </Svg>
        <Svg style={showAns ? styles.handSVG : styles.disabled}>
          <HandSVG style={showAns ? styles.handSVG : styles.disabled} />
        </Svg>
      </View>
      <TouchableOpacity //play audio button
        style={showAns ? styles.playBtn : styles.disabled}
        onPress={() => {
          playAudio("b3.mp3");
        }}
      >
        <Ionicons
          style={showAns ? styles.playIcon : styles.disabled}
          name="play"
          color="white"
          size={30}
        />
      </TouchableOpacity>
      <Text style={!disableReadyBtn ? styles.chordListText : styles.disabled}>
        {selectedChordsList}
      </Text>
      <Text style={styles.countDownText}>{countDownText}</Text>
      <TouchableOpacity
        disabled={disableReadyBtn}
        style={!disableReadyBtn ? styles.readyBtn : styles.disabled}
        onPress={() => {
          setDisableReadyBtn(true);
          //count down message
          setCountDownText("3");
          setTimeout(() => {
            setCountDownText("2");
            setTimeout(() => {
              setCountDownText("1");
              setTimeout(() => {
                setCountDownText("Go");
                setTimeout(() => {
                  setCountDownText("");
                  //get random chord
                  function getRandomChord_temp() {
                    var promise = new Promise(function (resolve) {
                      resolve(getRandomChord(selectedChordsList));
                    });
                    return promise;
                  }
                  //train once
                  getRandomChord_temp().then(function (randomChord) {
                    setRandomChord(randomChord);
                    countDownTimer(randomChord);
                  });
                  //loop the training
                  mainLoop = setInterval(() => {
                    getRandomChord_temp().then(function (randomChord) {
                      setRandomChord(randomChord);
                      countDownTimer(randomChord);
                    });
                  }, 10000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }}
      >
        <Text style={!disableReadyBtn ? styles.readyText : styles.disabled}>
          READY
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  timer: {
    position: "absolute",
    fontSize: 30,
    top: 10,
    left: 10,
    alignSelf: "flex-start",
  },
  score: {
    position: "absolute",
    fontSize: 30,
    top: 10,
    right: 100,
    alignSelf: "flex-end",
  },
  chordListText: {
    fontSize: 30,
  },
  readyBtn: {
    backgroundColor: "#FF6347",
    width: 80,
    height: 50,
    borderRadius: 10,
  },
  disabled: {
    width: 0,
    height: 0,
  },
  readyText: {
    position: "absolute",
    alignSelf: "center",
    top: 11,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  countDownText: {
    position: "absolute",
    fontSize: 150,
  },
  ansText: {
    position: "absolute",
    top: 60,
    fontSize: 50,
  },
  SVG: {
    height: "100%",
    width: "100%",
  },
  guitarbarSVG: {
    position: "absolute",
    top: 110,
    left: 50,
  },
  handSVG: {
    position: "absolute",
    bottom: -370,
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
});
