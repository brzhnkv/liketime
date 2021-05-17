import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
import UsersContext from "../../contexts/UsersContext";

export default function AddAccountDialog({ visible, setVisible }) {
  const [users, setUsers] = useContext(UsersContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleLogin = () => {
    axios
      .post("https://instanext-server.herokuapp.com/api/v1/user/", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        const { data } = response;

        const user = {
          username: data.username,
          profilePic: data.userProfilePic,
          token: data.token,
        };

        storeAdditionalUser(user);
      })
      .catch(function (error) {
        console.log(error);
      });

    setVisible(false);
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
