import React, { useState, useContext, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";

export default function AddAccountDialog({ visible, setVisible }) {
  const [rxStomp] = useContext(StompContext);
  const [users, setUsers] = useContext(UsersContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginButtonPressed, setLoginButtonPressed] = useState(false);

  const storeAdditionalUser = async (user) => {
    const usersArray = [...users];
    usersArray.push(user);
    const index = usersArray.findIndex((x) => x.username === user.username);
    usersArray.unshift(usersArray.splice(index, 1)[0]);
    try {
      await AsyncStorage.setItem("users", JSON.stringify(usersArray));
    } catch (e) {
      alert("error1");
    }
    try {
      const usersStorage = JSON.parse(await AsyncStorage.getItem("users"));
      setUsers(usersStorage);
    } catch (e) {
      alert("error2");
    }
  };

  let subscriptionAddAccount;

  useEffect(() => {
    if (loginButtonPressed) {
      subscriptionAddAccount = rxStomp
        .watch("/user/" + users[0].username + "/queue/login/addaccount")
        .subscribe(function (message) {
          const payload = JSON.parse(message.body);
          console.log(payload);
          if (payload.data.token !== null) {
            const username = payload.data.username;
            const token = payload.data.token;
            const profilePic = payload.data.userProfilePic;

            const user = { username, profilePic, token };
            storeAdditionalUser(user);

            ///  setStatusMessage("token received");
            //subscriptionLogin.unsubscribe();
          }
        });
      login(username, password);
    }
  }, [loginButtonPressed]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleLogin = () => {
    setLoginButtonPressed(true);
  };

  const login = async (username, password) => {
    const data = { username: username, password: password };

    rxStomp.publish({
      destination: "/app/auth/addaccount",
      body: JSON.stringify(data),
    });
  };

  return (
    <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
      <Dialog.Title>Добавление аккаунта</Dialog.Title>
      <Dialog.Input
        style={styles.input}
        autoCapitalize="none"
        label="Имя пользователя:"
        autoCorrect={false}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
      ></Dialog.Input>

      <Dialog.Input
        style={styles.input}
        wrapperStyle={styles.wrapper}
        autoCapitalize="none"
        autoCorrect={false}
        label="Пароль:"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Dialog.Button label="Отмена" onPress={handleCancel} />
      <Dialog.Button label="Войти" onPress={handleLogin} />
    </Dialog.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 0.8,
  },
  wrapper: {},
});
