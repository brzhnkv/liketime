import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";

export default function Tasks({
  stompClient,
  loggedInUsername,
  token,
  logFromServer,
  statusMessage,
}) {
  const [tagLike, setTagLike] = useState("");
  const [tagSave, setTagSave] = useState("");
  const [tagLikeAndSave, setTagLikeAndSave] = useState("");
  const [tagPlanes, setTagPlanes] = useState("");
  const [response, setResponse] = useState("");

  const handleTest = () => {
    stompClient.publish({ destination: "/app/test", body: "" });
  };

  const likeByTag = () => {
    if (tagLike !== "") {
      const data = { username: loggedInUsername, token: token, tag: tagLike };
      if (stompClient.connected)
        stompClient.publish({
          destination: "/app/like",
          body: JSON.stringify(data),
        });
      else alert("stomp not ready");
    } else alert("Тег не может быть пустым!");
  };
  const saveByTag = () => {
    if (tagSave !== "") {
      const data = { username: loggedInUsername, token: token, tag: tagSave };
      if (stompClient.connected)
        stompClient.publish({
          destination: "/app/save",
          body: JSON.stringify(data),
        });
      else alert("stomp not ready");
    } else alert("Тег не может быть пустым!");
  };

  const likeAndSave = () => {
    if (tagLikeAndSave !== "") {
      //client.send("/app/likeandsave", {}, tag1);
      const data = {
        username: loggedInUsername,
        token: token,
        tag: tagLikeAndSave,
      };
      if (stompClient.connected)
        stompClient.publish({
          destination: "/app/likeandsave",
          body: JSON.stringify(data),
        });
      else alert("stomp not ready");
      // stompClient.publish({ destination: "/app/likeandsave", body: tag1 });
      //setIsInProgress(true)
    } else alert("Тег не может быть пустым!");
  };
  const sendMediaToGroup = () => {
    if (tagPlanes !== "") {
      const data = { username: loggedInUsername, token: token, tag: tagPlanes };
      if (stompClient.connected)
        stompClient.publish({
          destination: "/app/sendmediatogroup",
          body: JSON.stringify(data),
        });
      else alert("stomp not ready");
    } else alert("Тег не может быть пустым!");
  };

  return (
    <View>
      <Text accessibilityRole="header">Лайк</Text>
      <TextInput
        style={styles.textInput}
        textAlign="center"
        value={tagLike}
        placeholder="Тег"
        onChangeText={(text) => setTagLike(text)}
      />
      <Button title="Старт" onPress={likeByTag} />

      <Text accessibilityRole="header">Сохранение</Text>
      <TextInput
        style={styles.textInput}
        textAlign="center"
        value={tagSave}
        placeholder="Тег"
        onChangeText={(text) => setTagSave(text)}
      />
      <Button title="Старт" onPress={saveByTag} />

      <Text accessibilityRole="header">Лайк + сохранение</Text>
      <TextInput
        style={styles.textInput}
        textAlign="center"
        value={tagLikeAndSave}
        placeholder="Тег"
        onChangeText={(text) => setTagLikeAndSave(text)}
      />
      <Button title="Старт" onPress={likeAndSave} />

      <Text accessibilityRole="header">Самолет</Text>
      <TextInput
        style={styles.textInput}
        textAlign="center"
        value={tagPlanes}
        placeholder="Тег"
        onChangeText={(text) => setTagPlanes(text)}
      />
      <Button title="Старт" onPress={sendMediaToGroup} />

      {/*  <Button title="Test" onPress={handleTest} />
      <Text>Response: {response}</Text> */}
      <Text>Log from server: {logFromServer}</Text>
      <Text>Status: {statusMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
  },
});
