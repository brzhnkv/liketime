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
import { Client, Message } from "@stomp/stompjs";
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
}) => {
  const [cookie, setCookie] = useState("");

  const [logFromServer, setLogFromServer] = useState("");

  const [log, setLog] = useState("log");
  const [log2, setLog2] = useState("not connected");

  const [loading, setLoading] = useState(true);

  const [statusMessage, setStatusMessage] = useState("");
  const [listDataLog, setListDataLog] = useState({
    listLog: [{ id: 0, message: "Соединение с сервером установлено." }],
    isShowList: true,
  });

  const [conn, setConn] = useState(false);

  let stompClient;

  /*   const handleTest = () => {
      client.send("/app/test");
    }; */

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

  let subscriptionAuth;
  let subscriptionStatus;
  let subscriptionLog;
  let subscriptionLogin;
  const stompConfig = {
    brokerURL: "wss://instanext-server.herokuapp.com/ws",
    //brokerURL: "ws://192.168.100.13:5000/ws",
    appendMissingNULLonIncoming: true,
    forceBinaryWSFrames: true,
    //heartbeatIncoming: 4000,
    // heartbeatOutgoing: 4000,
    connectHeaders: {
      username: loggedInUsername,
      token: token,
    },
    debug: function (str) {
      console.log("STOMP: " + str);
    },
    reconnectDelay: 10000,
    onConnect: async function (frame) {
      // The return object has a method called `unsubscribe`
      subscriptionAuth = stompClient.subscribe(
        "/user/notification/auth",
        function (message) {
          const payload = JSON.parse(message.body);

          //setToken(payload.data.token);
          setStatusMessage("authentication ok");
          //subscriptionAuth.unsubscribe()
        }
      );
      subscriptionLogin = stompClient.subscribe(
        "/user/notification/login",
        function (message) {
          const payload = JSON.parse(message.body);

          if (payload.data.token !== null) {
            const username = payload.data.username;
            const token = payload.data.token;
            const profilePic = payload.data.userProfilePic;

            const data = { token, profilePic };
            storeLoggedInUser(username);
            storeData(username, data);

            setStatusMessage("token received");
            subscriptionLogin.unsubscribe();
          }
        }
      );
      subscriptionStatus = stompClient.subscribe(
        "/user/notification/status",
        function (message) {
          const payload = JSON.parse(message.body);
          setStatusMessage(payload.status);
        }
      );
      subscriptionLog = stompClient.subscribe(
        "/user/notification/log",
        function (message) {
          const payload = JSON.parse(message.body);
          setLogFromServer(payload.status);
          /* 
  
            let id = listDataLog.listLog.length;
            const newList = listDataLog.listLog.concat({
              id: id,
              message: payload.log,
            });
  
            setListDataLog({ ...listDataLog, listLog: newList }); */
        }
      );

      setLog2("OK");
      setConn(true);
      //loadUserFromCookies()
    },
    onDisconnect: () => {
      setLog2("not connected");
      // stompClient.close();
    },
  };
  stompClient = new Client(stompConfig);
  //stompClient.activate();
  useEffect(() => {
    //stompClient.activate();
  }, []);

  /* 
    var ws = new WebSocket('ws://localhost:5000/ws');
  
    ws.onopen = () => {
      // connection opened
      ws.send('/'); // send a message
      setLog("connected")
    };
    
    ws.onmessage = e => {
      // a message was received
      setLog(e.data);
    };
    
    ws.onerror = e => {
      // an error occurred
      setLog(e.message);
    };
    
    ws.onclose = e => {
      // connection closed
      setLog(e.code, e.reason);
      
    };
   */

  /*  let stompClient
    let subscriptionAuth
    let subscriptionStatus
    let subscriptionLog
    const stompConfig = {
        brokerURL: "wss://liketimeserver.xyz/ws",
        //brokerURL: "ws://localhost:5000/ws",
        appendMissingNULLonIncoming: true,
        forceBinaryWSFrames: true,
        debug: function (str) {
            setLog('STOMP: ' + str);
        },
        reconnectDelay: 5000,
        onConnect: async function (frame) {
            // The return object has a method called `unsubscribe`
            subscriptionAuth = stompClient.subscribe('/user/notification/auth', function (message) {
                const payload = JSON.parse(message.body);
                setLog(payload)
                setUsername(payload.data.username)
                setUserProfilePic(payload.data.userProfilePic)
                //subscriptionAuth.unsubscribe()
            });
            subscriptionStatus = stompClient.subscribe('/user/notification/status', function (message) {
                const payload = JSON.parse(message.body);
                setLog(payload)
  
                setStatusMessage(payload.data.status)
            });
            subscriptionLog = stompClient.subscribe('/user/notification/log', function (message) {
                const payload = JSON.parse(message.body);
                setLog(payload.data.log)
  
                let id = listDataLog.listLog.length
                const newList = listDataLog.listLog.concat({
                    id: id,
                    message: payload.data.log,
                });
  
                setListDataLog({...listDataLog, listLog: newList});
            });
            setIsConnected(true)
            //loadUserFromCookies()
        }
    };
    stompClient = new Client(stompConfig);
    stompClient.activate();
  
    function loadUserFromCookies() {
      stompClient.publish({
          destination: '/app/auth/session',
          body: '',
          skipContentLengthHeader: true,
      });
  }
  
  
  const login = async (username, password) => {
      const loginData = { username, password }
      const loginDataJSON = JSON.stringify(loginData)
      stompClient.publish({
          destination: '/app/auth/login',
          body: loginDataJSON,
          skipContentLengthHeader: true,
      });
      /*if (clientRef) {
          await clientRef.current.sendMessage("/app/auth/login", loginDataJSON) }*/
  /*  await loadUserFromCookies()
  
  }
  
  const logout = async () => {
      if (clientRef) await clientRef.current.sendMessage("/app/auth/logout")
  } */
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [response, setResponse] = useState("");
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

        <Button title="Delete cookie" onPress={deleteCookie} />
        <Text>isLoggedIn: {JSON.stringify(isLoggedIn)}</Text>
        <Text>loggedInUsername: {loggedInUsername}</Text>
        <Text>token: {token}</Text>
        <Image
          style={styles.logo}
          source={userProfilePic ? { uri: userProfilePic } : null}
        />

        {/* {isLoggedIn && conn && <Tasks stompClient={stompClient} />} */}
        {stompClient.connected && <Tasks stompClient={stompClient} />}
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
          <Button title="Test" />
          <Text>Response: {response}</Text>
        </View>
        <Text>Log from server: {logFromServer}</Text>
        <Text>Status: {statusMessage}</Text>
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
