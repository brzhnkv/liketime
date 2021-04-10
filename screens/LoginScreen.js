import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StompContext from "../contexts/StompContext";
import UsersContext from "../contexts/UsersContext";

const LoginScreen = ({ navigation }) => {
  const [rxStomp] = useContext(StompContext);
  const [users, setUsers] = useContext(UsersContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(username, password);
  };

  useEffect(() => {
    if (users.length) navigation.navigate("Home");
    return () => {
      subscriptionLogin.unsubscribe();
    };
  }, [users]);

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

  let subscriptionLogin;
  useEffect(() => {
    const rxStompConfig = {
      //brokerURL: "wss://instanext-server.herokuapp.com/ws",
      //brokerURL: "ws://192.168.100.50:5000/ws", //home
      brokerURL: "ws://192.168.0.50:5000/ws", //office

      connectHeaders: { sessionId: "guest", token: null },
      appendMissingNULLonIncoming: true,
      forceBinaryWSFrames: true,
      debug: function (str) {
        console.log("STOMP: " + str);
      },
      reconnectDelay: 10000,
    };
    rxStomp.configure(rxStompConfig);
    subscriptionLogin = rxStomp
      .watch("/user/guest/queue/login")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        console.log(payload);
        if (payload.data.token !== null) {
          const username = payload.data.username;
          const token = payload.data.token;
          const profilePic = payload.data.userProfilePic;

          const user = {
            username,
            profilePic,
            token,
          };
          //storeUser(username, data);
          storeInitialUser(user);

          ///  setStatusMessage("token received");
        }
      });
    rxStomp.activate();
    return () => {
      /*  subscriptionLogin.unsubscribe();
      rxStomp.deactivate(); */
    };
  }, []);

  const login = async (username, password) => {
    const data = { username: username, password: password };

    rxStomp.publish({
      destination: "/app/auth/login",
      body: JSON.stringify(data),
    });
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
