import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Image } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../styles/theme";
import StompContext from "../contexts/StompContext";
import DialogContext from "../contexts/DialogContext";
import UsersContext from "../contexts/UsersContext";

const { Popover } = renderers;

const HeaderButton = () => {
  const [rxStomp] = useContext(StompContext);
  const [users, setUsers] = useContext(UsersContext);
  const [visible, setVisible] = useContext(DialogContext);

  const handleAddAccount = () => {
    setVisible(true);
  };

  const reorderStoredUsers = async (username) => {
    const usersArray = [...users];
    const index = usersArray.findIndex((x) => x.username === username);
    usersArray.unshift(usersArray.splice(index, 1)[0]);
    try {
      await AsyncStorage.setItem("users", JSON.stringify(usersArray));
    } catch (e) {}
    try {
      const usersStorage = JSON.parse(await AsyncStorage.getItem("users"));
      setUsers(usersStorage);
    } catch (e) {}
  };

  const handleChangeAccount = async (user) => {
    await rxStomp.deactivate();
    /* let d;
    try {
      await AsyncStorage.setItem("@logged_in_user", user);
    } catch (e) {}
    try {
      d = await AsyncStorage.getItem("@logged_in_user");
    } catch (e) {}
    await setLoggedInUsername(d);
    await setCurrentUserData(d); */
    await reorderStoredUsers(user);
    await rxStomp.activate();
  };

  return (
    <Menu renderer={Popover} rendererProps={{ preferredPlacement: "bottom" }}>
      <MenuTrigger style={styles.menuTrigger}>
        <Image
          style={styles.logo}
          source={{
            uri: users[0].profilePic,
          }}
        />
        <Text style={styles.text}>{users[0].username}</Text>
      </MenuTrigger>
      <MenuOptions style={styles.menuOptions}>
        {users.slice(1).map((user, index) => {
          return (
            <MenuOption
              key={index}
              style={styles.menuOption}
              value={user.username}
              onSelect={(value) => handleChangeAccount(value)}
            >
              <Image
                style={styles.logo}
                source={user.profilePic ? { uri: user.profilePic } : null}
              />
              <Text style={styles.text}>{user.username}</Text>
            </MenuOption>
          );
        })}

        <MenuOption disabled={true} />
        <MenuOption
          onSelect={() => handleAddAccount()}
          text="Добавить аккаунт"
        />
      </MenuOptions>
    </Menu>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  logo: {
    width: 45,
    height: 45,
    marginRight: 5,
    borderRadius: 50,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.secondary,
  },
  menuTrigger: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginRight: 5,
  },
  menuOptions: {
    display: "flex",
  },
  menuOption: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50,
    marginRight: 5,
  },
});
