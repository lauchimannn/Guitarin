import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "./RootNavigation.js";

//song icon sources
const songIcon = {
  i1: require("./assets/1.jpg"),
  i2: require("./assets/2.jpg"),
};

//store data to AsyncStorage
const storeData = async (value) => {
  const jsonValue = JSON.stringify(value);
  AsyncStorage.clear();
  AsyncStorage.setItem("favourite_id", jsonValue);
};

//definition of the Item, which will be rendered in the FlatList
var favSongsID = [];
const Item = ({ id, song, artist, reverse, screen, data }) => {
  //fill like buttons depends on focused screen
  if (reverse == false) {
    var [liked, setLiked] = useState(false);
    var disableLikeBtn = false;
  } else {
    var [liked, setLiked] = useState(true);
    var disableLikeBtn = true;
  }

  return (
    <View style={styles.item}>
      <TouchableOpacity //song button
        onPress={() => {
          if (screen != "sheets") {
            RootNavigation.navigate("Songs main", {
              screen: "Song",
              params: { id, data },
            });
          } else {
            RootNavigation.navigate("Sheets main", {
              screen: "Sheet",
              params: { id, data },
            });
          }
        }}
        style={{ flexDirection: "row" }}
      >
        <Image
          style={screen != "sheets" ? styles.songIcon : styles.disable}
          source={songIcon["i" + id]}
        />
        <View>
          <Text style={styles.songTitle}>{song}</Text>
          <Text>{artist}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity //like button
        style={screen != "sheets" ? styles.btn : styles.disable}
        disabled={disableLikeBtn}
        activeOpacity={0.7}
        onPress={() => {
          setLiked(!liked);
          //store favourite songs id
          if (!liked) {
            favSongsID.push(id);
          } else {
            favSongsID = favSongsID.filter((item) => item !== id);
          }
          //store favourite songs id to AsyncStorage
          storeData(favSongsID);
        }}
      >
        <MaterialCommunityIcons //like button icon
          name={liked ? "heart" : "heart-outline"}
          size={28}
          color={liked ? "red" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity //delete button
        style={screen == "sheets" ? styles.btn : styles.disable}
        disabled={disableLikeBtn}
        activeOpacity={0.7}
        onPress={() => {
          Alert.alert(
            "Delete",
            "Are you sure you want to permanently remove this sheet?",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                onPress: () => {
                  RootNavigation.navigate("Sheets", { id });
                },
              },
            ]
          );
        }}
      >
        <MaterialCommunityIcons //delete button icon
          name={"delete"}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

//filter
const List = ({ searchPhrase, setClicked, data, reverse, screen }) => {
  const renderItem = ({ item }) => {
    //display all data when no input
    if (searchPhrase === "") {
      return (
        <Item
          id={item.id}
          song={item.song}
          artist={item.artist}
          reverse={reverse}
          screen={screen}
          data={data}
        />
      );
    }
    //filter songs
    if (item.song.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return (
        <Item
          id={item.id}
          song={item.song}
          artist={item.artist}
          reverse={reverse}
          screen={screen}
          data={data}
        />
      );
    }
    //filter artists
    if (item.artist.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return (
        <Item
          id={item.id}
          song={item.song}
          artist={item.artist}
          reverse={reverse}
          screen={screen}
          data={data}
        />
      );
    }
  };

  return (
    <View style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    right: 18,
  },
  disable: {
    width: 0,
    height: 0,
  },
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 20,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    marginBottom: 5,
  },
  songIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginBottom: 5,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
  },
});
