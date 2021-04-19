import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Console } from "../../components/console/Console";
import { ConsoleHeader } from "../../components/console/ConsoleHeader";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";

const FollowScreen = () => {
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
    <View style={styles.root}>
      <Button title="1212" onPress={newLikeByTag} />
      <ConsoleHeader />
      <Console />
    </View>
  );
};

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default FollowScreen;
