//node modules
import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
//icons
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//screens
import * as RootNavigation from "./RootNavigation.js";
import { navigationRef } from "./RootNavigation";
import SongsScreenMain from "./SongsScreenMain";
import SongsFavouritesScreen from "./SongsFavouritesScreen";
import SongsDetailsScreen from "./SongsDetailsScreen";
import TunerScreen from "./TunerScreen";
import ChordsScreenMain from "./ChordScreenMain";
import ChordsLibraryScreen from "./ChordsLibraryScreen";
import ChordsSelectionScreen from "./ChordsSelectionScreen";
import ChordsTrainingScreen from "./ChordsTrainingScreen";
import SheetsScreen from "./SheetsScreen";
import SheetsInputScreen from "./SheetsInputScreen.js";
import SheetsEditScreen from "./SheetsEditScreen.js";
import SheetsDetailsScreen from "./SheetsDetailsScreen.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//songs stack screens
function SongsStackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Songs"
        component={SongsScreenMain}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ position: "absolute", right: 10 }}
              onPress={() => {
                RootNavigation.navigate("Favourites");
              }}
            >
              <MaterialCommunityIcons name="music-box-multiple" size={26} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Favourites" component={SongsFavouritesScreen} />
      <Stack.Screen name="Song" component={SongsDetailsScreen} />
    </Stack.Navigator>
  );
}

//chords stack screens
function ChordsStackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chords" component={ChordsScreenMain} />
      <Stack.Screen name="Chords library" component={ChordsLibraryScreen} />
      <Stack.Screen name="Chords selection" component={ChordsSelectionScreen} />
      <Stack.Screen name="Chords training" component={ChordsTrainingScreen} />
    </Stack.Navigator>
  );
}

//sheets stack screens
function SheetsStackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sheets"
        component={SheetsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ position: "absolute", right: 10 }}
              onPress={() => {
                RootNavigation.navigate("Song info");
              }}
            >
              <MaterialCommunityIcons name="playlist-plus" size={26} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Song info" component={SheetsInputScreen} />
      <Stack.Screen name="Edit" component={SheetsEditScreen} />
      <Stack.Screen name="Sheet" component={SheetsDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen //songs tab screen
          name="Songs main"
          component={SongsStackScreens}
          options={{
            tabBarLabel: "Songs",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "musical-notes" : "musical-notes-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen //tuner tab screen
          name="Tuner"
          component={TunerScreen}
          options={{
            tabBarLabel: "Tuner",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="tune" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen //chords tab screen
          name="Chords main"
          component={ChordsStackScreens}
          options={{
            tabBarLabel: "Chords",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="tune-vertical"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen //sheets tab screen
          name="Sheets main"
          component={SheetsStackScreens}
          options={{
            tabBarLabel: "Sheets",
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? "playlist-music" : "playlist-music-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
