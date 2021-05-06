import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export const ConsoleHeader = ({ statusMessage }) => {
  const { lastStatusMessage } = useSelector((state) => state.messages);
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{lastStatusMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    height: 50,
    width: "100%",
  },
  title: {
    color: "white",
    paddingLeft: 22,
  },
});
