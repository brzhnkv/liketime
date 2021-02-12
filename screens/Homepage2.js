import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Image,
  StatusBar,
} from "react-native";
import Tasks from "../components/Tasks";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as encoding from "text-encoding";

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const Homepage2 = ({
  userProfilePic,
  token,
  loggedInUsername,
  isLoggedIn,
  isConnected,
  stompClient,
  logFromServer,
  statusMessage,
}) => {
  const [cookie, setCookie] = useState("");

  const [log, setLog] = useState("log");
  const [log2, setLog2] = useState("not connected");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getAllKeys();
    getLoggedInUser();
    return () => {};
  }, []);

  const getLoggedInUserData = async (key) => {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      const data = JSON.parse(jsonData);
      setToken(data.token);
      setLoggedInUsername(key);
      setUserProfilePic(data.profilePic);
    } catch {}
  };

  const storeLoggedInUser = async (username) => {
    try {
      await AsyncStorage.setItem("@logged_in_user", username);
    } catch (e) {
      // error
    }
    getLoggedInUser("logged_in_user");
  };
  const getLoggedInUser = async () => {
    try {
      const username = await AsyncStorage.getItem("@logged_in_user");
      setIsLoggedIn(true);
      getLoggedInUserData(username);
    } catch {
      return null;
    }
  };

  const storeData = async (key, value) => {
    try {
      let data = JSON.stringify(value);
      await AsyncStorage.setItem(key, data);
    } catch (e) {
      // saving error
    }
    getData(key);
    console.log("key: " + key);
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        let data = JSON.parse(value);
        console.log("data from getData: " + data);
        setToken(data.token);
        setUserProfilePic(data.userProfilePic);
        console.log("token: " + token);
        console.log("upp: " + userProfilePic);
      }
    } catch (e) {
      // error reading value
    }
  };

  const deleteCookie = async () => {
    try {
      await AsyncStorage.removeItem("@logged_in_user");
      await AsyncStorage.clear();
    } catch (e) {
      // remove error
    }
    console.log("Done.");
  };

  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [response, setResponse] = useState("");

  const likeByTag = () => {
    if (tag1 !== "") {
      const data = { username: loggedInUsername, token: token, tag: tag1 };
      if (stompClient.connected)
        stompClient.publish({
          destination: "/app/like",
          body: JSON.stringify(data),
        });
      else alert("stomp not ready");
    } else alert("Тег не может быть пустым!");
  };
  const saveByTag = () => {
    if (tag2 !== "") {
      const data = { username: loggedInUsername, token: token, tag: tag2 };
      if (stompClient.connected)
        stompClient.publish({
          destination: "/app/save",
          body: JSON.stringify(data),
        });
      else alert("stomp not ready");
    } else alert("Тег не может быть пустым!");
  };

  const likeAndSave = () => {
    if (tag3 !== "") {
      //client.send("/app/likeandsave", {}, tag1);
      const data = { username: loggedInUsername, token: token, tag: tag3 };
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
    if (tag2 !== "") {
      //client.send("/app/sendmediatogroup", {}, tag2);
      stompClient.publish({ destination: "/app/sendmediatogroup", body: tag2 });
      //setIsInProgress(true);
    } else alert("Тег не может быть пустым!");
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.themeColor} barStyle={"default"} />
      <View style={styles.header}>
        <View style={styles.toolbar}>
          <MaterialCommunityIcons
            name="text"
            size={30}
            style={{ color: colors.white }}
          />
          <Text>LikeTime</Text>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="user" size={30} style={{ color: colors.white }} />
          </View>
        </View>
        <View>
          <Text>Text</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text>StompJS connected: {JSON.stringify(isConnected)}</Text>

        <Button
          title="LOGOUT FROM ALL (deletes all cookies)"
          onPress={deleteCookie}
        />
        <Text>isLoggedIn: {JSON.stringify(isLoggedIn)}</Text>
        <Text>loggedInUsername: {loggedInUsername}</Text>
        <Text>token: {token}</Text>
        <Image
          style={styles.logo}
          source={userProfilePic ? { uri: userProfilePic } : null}
        />

        {/* {isLoggedIn && conn && <Tasks stompClient={stompClient} />} */}
        {stompClient.connected && (
          <Tasks
            stompClient={stompClient}
            loggedInUsername={loggedInUsername}
            token={token}
            logFromServer={logFromServer}
            statusMessage={statusMessage}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: colors.themeColor,
  },
  toolbar: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "50%",
  },
  logo: {
    width: 60,
    height: 60,
  },
});

export default Homepage2;
