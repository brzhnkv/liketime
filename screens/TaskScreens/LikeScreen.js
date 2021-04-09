import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput, Text, View, Button, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Task from "../../components/Task";

import AddAccountDialog from "../../components/utils/AddAccountDialog";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const LikeScreen = ({ logFromServer, statusMessage, statusList }) => {
  return (
    <View style={styles.root}>
      <Task taskName="Лайк" destination="/app/like" />
      <Task taskName="Сохранение" destination="/app/save" />
      <Task taskName="Лайк + сохранение" destination="/app/likeandsave" />
      <Task taskName="Самолет" destination="/app/sendmediatogroup" />

      <View style={styles.logsView}></View>
      <Text>Текущее действие: {logFromServer}</Text>
      <Text>Статус: {statusMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logsView: {
    flexDirection: "column",
    paddingHorizontal: 10,
    height: 300,
    width: "80%",
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
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    // width: "70%",
    width: "80%",
    marginVertical: 10,
  },
});

export default LikeScreen;
