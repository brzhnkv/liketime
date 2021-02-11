import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Homepage2 from "./screens/Homepage2";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import HeaderButton from "./components/HeaderButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { RxStomp } from "@stomp/rx-stomp";
import { throttleTime, map, scan } from "rxjs/operators";
import * as encoding from "text-encoding";

const Stack = createStackNavigator();

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRoute, setInitialRoute] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [token, setToken] = useState("");

  const [logFromServer, setLogFromServer] = useState("");

  const [statusMessage, setStatusMessage] = useState("");

  const getLoggedInUser = async () => {
    try {
      const username = await AsyncStorage.getItem("@logged_in_user");
      if (username == null) {
        setInitialRoute("Login");
      } else {
        setIsLoggedIn(true);
        getLoggedInUserData(username);
        setInitialRoute("Home");
      }
    } catch (e) {
      alert("error");
    }
  };

  const getLoggedInUserData = async (key) => {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      const data = JSON.parse(jsonData);
      setToken(data.token);
      setLoggedInUsername(key);
      setUserProfilePic(data.profilePic);
    } catch {}
  };

  /*   useEffect(() => {
    // getAllKeys();
    getLoggedInUser();
    return () => {};
  }, []); */

  /*   useEffect(() => {
    if (isLoggedIn) {
      console.log(JSON.stringify(isLoggedIn));
      setInitialRoute("Home");
    }
  }, [isLoggedIn]); */

  // START debug //

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }
    console.log(keys);
  };

  useEffect(() => {
    getAllKeys();

    return () => {};
  }, []);

  // END debug //
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
  const storeLoggedInUser = async (username) => {
    try {
      await AsyncStorage.setItem("@logged_in_user", username);
    } catch (e) {
      // error
    }
    getLoggedInUser("logged_in_user");
  };

  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState(new RxStomp());

  let subscriptionAuth;
  let subscriptionStatus;
  let subscriptionLog;
  let subscriptionLogin;

  const stompConfig = {
    brokerURL: "wss://instanext-server.herokuapp.com/ws",
    //brokerURL: "ws://192.168.100.13:5000/ws",
    appendMissingNULLonIncoming: true,
    forceBinaryWSFrames: true,
    debug: function (str) {
      console.log("STOMP: " + str);
    },
    reconnectDelay: 10000,
  };

  useEffect(() => {
    stompClient.configure(stompConfig);
    stompClient.activate();

    subscriptionLogin = stompClient
      .watch("/user/notification/login")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        console.log(payload);
        if (payload.data.token !== null) {
          const username = payload.data.username;
          const token = payload.data.token;
          const profilePic = payload.data.userProfilePic;

          const data = { token, profilePic };
          storeLoggedInUser(username);
          storeData(username, data);

          ///  setStatusMessage("token received");
          //subscriptionLogin.unsubscribe();
        }
      });

    subscriptionStatus = stompClient
      .watch("/user/notification/status")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        setStatusMessage(payload.status);
      });

    subscriptionLog = stompClient
      .watch("/user/notification/log")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        setLogFromServer(payload.status);
        /* 

          let id = listDataLog.listLog.length;
          const newList = listDataLog.listLog.concat({
            id: id,
            message: payload.log,
          });

          setListDataLog({ ...listDataLog, listLog: newList }); */
      });
    setIsConnected(true);
  }, []);

  // END StompClient //

  const loadApp = async () => {
    // const images = [require('./assets/snack-icon.png')];

    /*  const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });  */

    return getLoggedInUser();
  };

  if (!appLoaded) {
    return (
      <AppLoading
        startAsync={loadApp}
        onFinish={() => setAppLoaded(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          options={{
            headerLeft: null,
            headerRight: (props) => (
              <HeaderButton
                username={loggedInUsername}
                userProfilePic={userProfilePic}
              />
            ),
          }}
        >
          {(props) => (
            <Homepage2
              {...props}
              isLoggedIn={isLoggedIn}
              loggedInUsername={loggedInUsername}
              userProfilePic={userProfilePic}
              token={token}
              isConnected={isConnected}
              stompClient={stompClient}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              isConnected={isConnected}
              stompClient={stompClient}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
