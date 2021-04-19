import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button, Layout, MenuItem, OverflowMenu } from "@ui-kitten/components";

import { colors } from "../styles/theme";
import StompContext from "../contexts/StompContext";
import DialogContext from "../contexts/DialogContext";
import UsersContext from "../contexts/UsersContext";
import axios from "axios";

const HeaderButton = () => {
  const [rxStomp] = useContext(StompContext);
  const [users, setUsers] = useContext(UsersContext);
  const [visible, setVisible] = useContext(DialogContext);

  const [isLogoutActive, setIsLogoutActive] = useState(true);

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

  const handleLogout = async () => {
    const username = users[0].username;
    setIsLogoutActive(false);
    await rxStomp.deactivate();
    axios.request({
      method: "DELETE",
      url: `http://localhost:5000/api/v1/user/api/v1/user/${username}`,
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
    await rxStomp.activate();
    setIsLogoutActive(true);
  };

  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisibleMenu(false);
  };

  const renderToggleButton = () => (
    <Button onPress={() => setVisibleMenu(true)}>TOGGLE MENU</Button>
  );

  return (
    users[0] && (
      <OverflowMenu
        anchor={renderToggleButton}
        backdropStyle={styles.backdrop}
        visible={visibleMenu}
        selectedIndex={selectedIndex}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}
      >
        <MenuItem title="Users" />
        <MenuItem title="Orders" />
        <MenuItem title="Transactions" />
      </OverflowMenu>
      /*   <Menu
        closeOnSelect={true}
        onOpen={() => console.log("opened")}
        onClose={() => console.log("closed")}
        trigger={(triggerProps) => {
          return (
            <View style={styles.menuTrigger}>
              <Image
                style={styles.logo}
                source={{
                  uri: users[0].profilePic,
                }}
              />
              {triggerProps}
              <Text style={styles.text}>{users[0].username}</Text>
            </View>
          );
        }}
      >
        {users[1] && (
          <Menu.Group title="Аккаунты">
            {users.slice(1).map((user, index) => {
              return (
                <Menu.Item
                  key={user.username}
                  style={styles.menuOption}
                  value={user.username}
                  onPress={(value) => handleChangeAccount(value)}
                >
                  <Image
                    style={styles.logo}
                    source={user.profilePic ? { uri: user.profilePic } : null}
                  />
                  <Text style={styles.text}>{user.username}</Text>
                </Menu.Item>
              );
            })}
          </Menu.Group>
        )}
        <Divider />
        <Menu.Group title="Действия">
          <Menu.Item isDisabled>Menu item 3</Menu.Item>
          <Menu.Item>Menu item 4</Menu.Item>
        </Menu.Group>
      </Menu> */
    )
  );
};

export default HeaderButton;

/* function MenuComponent() {
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
      <MenuOption
        disabled={!isLogoutActive}
        onSelect={() => handleLogout()}
        text="Выйти из системы"
      />
    </MenuOptions>
  </Menu>
  );
} */

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

  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
