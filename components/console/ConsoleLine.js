import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ConsoleLine = ({ message, index }) => {
  return (
    <View style={styles.line}>
      <Text style={styles.index}>{index + 1}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  index: {
    width: 50,
    textAlign: "right",
    color: "#595959",
  },
  message: {
    paddingLeft: 20,
    color: "#d6d6d6",
  },
});
