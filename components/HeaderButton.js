import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../styles/theme";

const HeaderButton = ({ username, userProfilePic }) => {
  return (
    <View>
      <TouchableOpacity style={styles.root}>
        <Image
          style={styles.logo}
          source={{
            uri: userProfilePic,
          }}
        />
        <Text style={styles.text}>{username}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 50,
    marginRight: 5,
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.secondary,
  },
});
