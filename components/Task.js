import React, { useContext, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import StompContext from "../contexts/StompContext";
import UsersContext from "../contexts/UsersContext";
import { clearMessages } from "../redux/messagesSlice";

const Task = ({ taskName, destination, buttonName }) => {
  const [rxStomp] = useContext(StompContext);
  const [users] = useContext(UsersContext);

  const [tag, setTag] = useState("");

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.status);

  const handleRunTask = async () => {
    if (tag === "") alert("Тег не может быть пустым!");
    let editedTag = tag;
    editedTag = editedTag.replace("#", "");

    dispatch(clearMessages());
    await rxStomp.activate();

    const data = {
      username: users[0].username,
      token: users[0].token,
      tag: editedTag,
    };

    await rxStomp.publish({
      destination: destination,
      body: JSON.stringify(data),
    });
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        textAlign="center"
        value={tag}
        placeholder={taskName}
        onChangeText={(text) => setTag(text)}
      />
      <Button
        title={!buttonName ? "Старт" : buttonName}
        disabled={status}
        onPress={handleRunTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "80%",
    marginVertical: 10,
  },
});

export default Task;
