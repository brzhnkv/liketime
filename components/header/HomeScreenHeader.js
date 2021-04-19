import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";
import DialogContext from "../../contexts/DialogContext";
import axios from "axios";

const UserIcon = (props) => <Icon {...props} name="person-add" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const HomeScreenHeader = () => {
  //const [rxStomp] = useContext(StompContext);
  const [users, setUsers] = useContext(UsersContext);
  const [visible, setVisible] = useContext(DialogContext);

  const [isLogoutActive, setIsLogoutActive] = useState(true);

  const handleAddAccount = () => {
    toggleMenu();
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
    toggleMenu();
    //await rxStomp.deactivate();
    await reorderStoredUsers(user);
    //await rxStomp.activate();
  };

  const handleLogout = async () => {
    toggleMenu();
    const username = users[0].username;
    setIsLogoutActive(false);
    // await rxStomp.deactivate();
    axios.request({
      method: "DELETE",
      url: `http://localhost:5000/api/v1/user/${username}`,
    });

    const usersArray = [...users];
    usersArray.shift();

    try {
      await AsyncStorage.setItem("users", JSON.stringify(usersArray));
    } catch (e) {}
    try {
      const usersStorage = JSON.parse(await AsyncStorage.getItem("users"));
      setUsers(usersStorage);
    } catch (e) {}
    //await rxStomp.activate();
    setIsLogoutActive(true);
  };

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction
      icon={() => (
        <View style={styles.menuActionWrapper}>
          <Avatar
            //defaultSource={{ uri: "/assets/icon.png" }}
            source={{ uri: users[0].profilePic }}
          />
          <Text //style={styles.text}
          >
            {users[0].username}
          </Text>
        </View>
      )}
      onPress={toggleMenu}
    ></TopNavigationAction>
  );

  const renderOverflowMenuAction = () => (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
      placement={"bottom end"}
      backdropStyle={styles.backdrop}
      onSelect={toggleMenu}
    >
      {users.slice(1).map((user) => {
        return (
          <MenuItem
            key={user.username}
            accessoryLeft={() => <Avatar source={{ uri: user.profilePic }} />}
            title={user.username}
            onPress={(title) => handleChangeAccount(title)}
          ></MenuItem>
        );
      })}
      <MenuItem
        accessoryLeft={UserIcon}
        title="Добавить аккаунт"
        onPress={() => handleAddAccount()}
      />
      <MenuItem
        accessoryLeft={LogoutIcon}
        title="Выйти из системы"
        disabled={!isLogoutActive}
        onPress={() => handleLogout()}
      />
    </OverflowMenu>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      {/*  <Avatar style={styles.logo} source={require("../../assets/icon.png")} /> */}
      <Text {...props}>LikeTime</Text>
    </View>
  );

  useEffect(() => {
    if (!users.length) navigation.navigate("Home");
  }, [users]);

  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuActionWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
});
