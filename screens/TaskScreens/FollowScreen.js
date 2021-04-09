import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Image,
  StatusBar,
} from "react-native";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const FollowScreen = ({ logFromServer, statusMessage }) => {
  const [rxStomp] = useContext(StompContext);
  const [users] = useContext(UsersContext);
  const newLikeByTag = () => {
    const data = {
      username: users[0].username,
      token: users[0].token,
      tag: "onedayinperu",
    };

    rxStomp.publish({
      destination: "/app/newlike",
      body: JSON.stringify(data),
    });
  };

  return (
    <View style={styles.container}>
      <Button title="1212" onPress={newLikeByTag} />
      <Text>Log from server: {logFromServer}</Text>
      <Text>Status: {statusMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dialog: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: colors.themeColor,
  },
  toolbar: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "50%",
  },
  logo: {
    width: 60,
    height: 60,
  },
});

export default FollowScreen;
