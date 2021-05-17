import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsersContext from "../contexts/UsersContext";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [users, setUsers] = useContext(UsersContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const office = "http://localhost:5000/api/v1/user/";
  const production = "https://instanext-server.herokuapp.com/api/v1/user/";

  const handleLogin = () => {
    axios
      .post(production, {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        const { data } = response;

        if (data.error === "true") alert(data.errorMessage);

        const user = {
          username: data.username,
          profilePic: data.userProfilePic,
          token: data.token,
        };

        storeInitialUser(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const storeInitialUser = async (user) => {
    const usersArray = [];
    usersArray.push(user);
    try {
      await AsyncStorage.setItem("users", JSON.stringify(usersArray));
    } catch (e) {}
    try {
      const usersStorage = JSON.parse(await AsyncStorage.getItem("users"));
      setUsers(usersStorage);
    } catch (e) {}
  };

  useEffect(() => {
    if (users.length) navigation.navigate("Home");
  }, [users]);

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
