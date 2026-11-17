import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Circle, Rect } from "react-native-svg";

const UpdateChord = ({ selectedValue, showAns }) => {
  //set var
  var [
    changeRectWidth,
    changeCX1,
    changeCY1,
    changeCX2,
    changeCY2,
    changeCX3,
    changeCY3,
    changeCX4,
    changeCY4,
  ] = "0";
  var [changeOpacity1, changeOpacity2, changeOpacity3] = "1";
  var changeOpacity4 = "0";
  var muteOpen = "";
  var fret1 = "1";
  var fret2 = "2";
  var fret3 = "3";
  var fret4 = "4";
  if (selectedValue == notesList[0]) {
    changeCX1 = "196";
    changeCY1 = "80";
    changeCX2 = "130";
    changeCY2 = "147";
    changeCX3 = "96";
    changeCY3 = "218";
    muteOpen = "X                         O                O";
  } else if (selectedValue == notesList[1]) {
    changeOpacity1 = "0";
    changeRectWidth = "94";
    changeCX1 = "150";
    changeCY1 = "67";
    changeCX2 = "196";
    changeCY2 = "147";
    changeCX3 = "130";
    changeCY3 = "218";
    muteOpen = "X       X";
  } else if (selectedValue == notesList[2]) {
    changeCX1 = "163";
    changeCY1 = "147";
    changeCX2 = "229";
    changeCY2 = "147";
    changeCX3 = "196";
    changeCY3 = "218";
    muteOpen = "X       X       O";
  } else if (selectedValue == notesList[3]) {
    changeCX1 = "130";
    changeCY1 = "80";
    changeCX2 = "163";
    changeCY2 = "218";
    changeCX3 = "230";
    changeCY3 = "218";
    changeCX4 = "196";
    changeCY4 = "287";
    changeOpacity4 = "1";
    muteOpen = "X       X";
  } else if (selectedValue == notesList[4]) {
    changeCX1 = "163";
    changeCY1 = "80";
    changeCX2 = "96";
    changeCY2 = "147";
    changeCX3 = "130";
    changeCY3 = "147";
    muteOpen = "O                                  O      O";
  } else if (selectedValue == notesList[5]) {
    changeOpacity1 = "0";
    changeRectWidth = "64";
    changeCX1 = "180";
    changeCY1 = "67";
    changeCX2 = "163";
    changeCY2 = "147";
    changeCX3 = "130";
    changeCY3 = "218";
    muteOpen = "X       X";
  } else if (selectedValue == notesList[6]) {
    changeOpacity1 = "0";
    changeRectWidth = "64";
    changeCX1 = "180";
    changeCY1 = "67";
    changeCX2 = "163";
    changeCY2 = "147";
    changeCX3 = "130";
    changeCY3 = "218";
    muteOpen = "X       X";
    fret1 = "2";
    fret2 = "3";
    fret3 = "4";
    fret4 = "5";
  } else if (selectedValue == notesList[7]) {
    changeCX1 = "96";
    changeCY1 = "147";
    changeCX2 = "63";
    changeCY2 = "218";
    changeCX3 = "229";
    changeCY3 = "218";
    muteOpen = "                  O       O      O";
  } else if (selectedValue == notesList[8]) {
    changeOpacity1 = "0";
    changeRectWidth = "196";
    changeCX1 = "48";
    changeCY1 = "67";
    changeCX2 = "163";
    changeCY2 = "147";
    changeCX3 = "96";
    changeCY3 = "218";
    changeCX4 = "130";
    changeCY4 = "218";
    changeOpacity4 = "1";
    fret1 = "4";
    fret2 = "5";
    fret3 = "6";
    fret4 = "7";
  } else if (selectedValue == notesList[9]) {
    changeCX1 = "130";
    changeCY1 = "147";
    changeCX2 = "163";
    changeCY2 = "147";
    changeCX3 = "196";
    changeCY3 = "147";
    muteOpen = "X       O                                  O";
  } else if (selectedValue == notesList[10]) {
    changeOpacity1 = "0";
    changeRectWidth = "166";
    changeCX1 = "78";
    changeCY1 = "67";
    changeCX2 = "130";
    changeCY2 = "218";
    changeCX3 = "163";
    changeCY3 = "218";
    changeCX4 = "196";
    changeCY4 = "218";
    changeOpacity4 = "1";
    muteOpen = "X";
  } else if (selectedValue == notesList[11]) {
    changeOpacity1 = "0";
    changeRectWidth = "166";
    changeCX1 = "78";
    changeCY1 = "67";
    changeCX2 = "130";
    changeCY2 = "218";
    changeCX3 = "163";
    changeCY3 = "218";
    changeCX4 = "196";
    changeCY4 = "218";
    changeOpacity4 = "1";
    muteOpen = "X";
    fret1 = "2";
    fret2 = "3";
    fret3 = "4";
    fret4 = "5";
  }

  return (
    <View>
      <Text style={showAns ? styles.muteOpen : styles.disabled}>
        {muteOpen}
      </Text>
      <Text style={showAns ? styles.fret1 : styles.disabled}>{fret1}</Text>
      <Text style={showAns ? styles.fret2 : styles.disabled}>{fret2}</Text>
      <Text style={showAns ? styles.fret3 : styles.disabled}>{fret3}</Text>
      <Text style={showAns ? styles.fret4 : styles.disabled}>{fret4}</Text>
      <Rect
        width={changeRectWidth}
        height="30"
        x={changeCX1}
        y={changeCY1}
        rx="15"
        fill="#FAFAD2"
      ></Rect>
      <Circle
        id="circle1"
        cx={changeCX1}
        cy={changeCY1}
        opacity={changeOpacity1}
        r="15"
        fill="#FAFAD2"
      />
      <Circle
        id="circle2"
        cx={changeCX2}
        cy={changeCY2}
        opacity={changeOpacity2}
        r="15"
        fill="#008080"
      />
      <Circle
        id="circle3"
        cx={changeCX3}
        cy={changeCY3}
        opacity={changeOpacity3}
        r="15"
        fill="#87CEFA"
      />
      <Circle
        id="circle4"
        cx={changeCX4}
        cy={changeCY4}
        opacity={changeOpacity4}
        r="15"
        fill="#FFB6C1"
      />
    </View>
  );
};

export default UpdateChord;

const styles = StyleSheet.create({
  muteOpen: {
    position: "absolute",
    top: -335,
    left: 58,
  },
  fret1: {
    position: "absolute",
    top: -280,
    left: 25,
  },
  fret2: {
    position: "absolute",
    top: -212,
    left: 25,
  },
  fret3: {
    position: "absolute",
    top: -143,
    left: 25,
  },
  fret4: {
    position: "absolute",
    top: -75,
    left: 25,
  },
  disabled: {
    width: 0,
  },
});
