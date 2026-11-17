import React from "react";
import { useNavigation } from "@react-navigation/native";
import TunerScreenMain from "./TunerScreenMain";

export default function TunerScreen() {
  const navigation = useNavigation();

  return <TunerScreenMain navigation={navigation} />;
}
