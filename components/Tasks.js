import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";

export default function Tasks({ stompClient }) {
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [response, setResponse] = useState("");

  const login = async (username, password) => {
    try {
      var body = JSON.stringify({ username, password });

      const response = await fetch("http://192.168.100.50:5000/test", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log(await response.text());
      /* if (response.hasOwnProperty("accessToken")) {
        console.log("login successfull");
        console.log(response);
      } else if (response.hasOwnProperty("error")) {
        console.log("login failed");
        console.log(response);
      } */
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const handleTest = () => {
    //client.send("/app/test");
    stompClient.publish({ destination: "/app/test", body: "" });
    //login("usersdfsaf", "121329");
  };

  const likeAndSave = () => {
    if (tag1 !== "") {
      //client.send("/app/likeandsave", {}, tag1);
      stompClient.publish({ destination: "/app/likeandsave", body: tag1 });
      //setIsInProgress(true)
    } else alert("Тег не может быть пустым!");
  };
  const sendMediaToGroup = () => {
    if (tag2 !== "") {
      //client.send("/app/sendmediatogroup", {}, tag2);
      stompClient.publish({ destination: "/app/sendmediatogroup", body: tag2 });
      //setIsInProgress(true);
    } else alert("Тег не может быть пустым!");
  };

  return (
    <View>
      <Text accessibilityRole="header">Лайк + сохранение</Text>
      <TextInput
        style={styles.textInput}
        textAlign="center"
        value={tag1}
        placeholder="Тег"
        onChangeText={(text) => setTag1(text)}
      />
      <Button title="Старт" onPress={likeAndSave} />
      <Text accessibilityRole="header">Самолет</Text>
      <TextInput
        style={styles.textInput}
        textAlign="center"
        value={tag2}
        placeholder="Тег"
        onChangeText={(text) => setTag2(text)}
      />
      <Button title="Старт" onPress={sendMediaToGroup} />
      <Button title="Test" onPress={handleTest} />
      <Text>Response: {response}</Text>
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
