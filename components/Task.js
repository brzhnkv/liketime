import React, { useContext, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import StompContext from "../contexts/StompContext";
import UsersContext from "../contexts/UsersContext";

const Task = ({ taskName, destination, buttonName }) => {
  const [rxStomp] = useContext(StompContext);
  const [users] = useContext(UsersContext);

  const [isRunning, setIsRunning] = useState(false);
  const [tag, setTag] = useState("");

  const handleRunTask = async () => {
    if (tag !== "") {
      setIsRunning(true);
      const data = {
        username: users[0].username,
        token: users[0].token,
        tag: tag,
      };

      rxStomp.publish({
        destination: destination,
        body: JSON.stringify(data),
      });
    } else alert("Тег не может быть пустым!");
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
        disabled={isRunning}
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
