import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const LoginScreen = ({ navigation, stompClient }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
    navigation.navigate("Home");
  };

  const login = async (username, password) => {
    const data = { username: username, password: password };
    if (stompClient.connected)
      stompClient.publish({
        destination: "/app/auth/login",
        body: JSON.stringify(data),
      });
    else alert("stomp not ready");
    if (stompClient) console.log("works");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Авторизация</Text>
      <TextInput
        style={styles.textInput}
        placeholder={"Имя пользователя"}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder={"Пароль"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textInput: {
    margin: 20,
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    width: "80%",
  },
});
