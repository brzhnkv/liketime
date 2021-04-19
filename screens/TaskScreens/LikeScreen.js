import React from "react";
import { StyleSheet, View } from "react-native";
import { Console } from "../../components/console/Console";
import { ConsoleHeader } from "../../components/console/ConsoleHeader";
import Task from "../../components/Task";

const LikeScreen = () => {
  return (
    <View style={styles.root}>
      <Task taskName="Лайк" destination="/app/like" />
      <Task taskName="Сохранение" destination="/app/save" />
      <Task taskName="Лайк + сохранение" destination="/app/likeandsave" />
      <Task taskName="Самолет" destination="/app/sendmediatogroup" />

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

export default LikeScreen;
