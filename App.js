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
import { MenuProvider } from "react-native-popup-menu";

import { throttleTime, map, scan } from "rxjs/operators";
import * as encoding from "text-encoding";
import { RxStomp, RxStompState } from "@stomp/rx-stomp";
import { add, remove } from "./lib/ArrayOperators";
import StompContext from "./contexts/StompContext";
import DialogContext from "./contexts/DialogContext";
import UsersContext from "./contexts/UsersContext";

const Stack = createStackNavigator();

export default function App() {
  const [rxStomp, setRxStomp] = useState(new RxStomp());
  const [isConnected, setIsConnected] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRoute, setInitialRoute] = useState("");
  const [currentUser, setLoggedInUsername] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);

  const getLoggedInUser = async () => {
    // getCurrentUser
    try {
      const username = await AsyncStorage.getItem("@logged_in_user"); // @current_user
      if (username == null) {
        setInitialRoute("Login");
      } else {
        setIsLoggedIn(true);
        setCurrentUserData(username);
        // setUsers((users) => ({ username }, { ...users }));
        let obj = { username: "kflkl", profilePic: "dffd" };
        // setUsers(obj);
        setInitialRoute("Home");
      }
    } catch (e) {
      alert("error getting logged in user");
    }
  };

  const setCurrentUserData = async (username) => {
    try {
      const jsonData = await AsyncStorage.getItem(username);
      const data = JSON.parse(jsonData);
      setToken(data.token); // setCurrentUserToken
      setLoggedInUsername(username); // setCurrentUsername
      setUserProfilePic(data.profilePic); // setCurrentUserProfilePicture
    } catch {}
  };

  const storeUser = async (username, userData) => {
    try {
      let data = JSON.stringify(userData);
      await AsyncStorage.setItem(username, data);
    } catch (e) {
      // saving error
    }
    storeLoggedInUser(username);
  };
  // storeCurrentUser
  const storeLoggedInUser = async (username) => {
    try {
      await AsyncStorage.setItem("@logged_in_user", username);
    } catch (e) {
      // error
    }
    await getLoggedInUser();
  };
  const storeNewUser = async (username, userData) => {
    try {
      let data = JSON.stringify(userData);
      await AsyncStorage.setItem(username, data);
    } catch (e) {}
    try {
      await AsyncStorage.setItem("@logged_in_user", username);
    } catch (e) {}
    try {
      d = await AsyncStorage.getItem("@logged_in_user");
    } catch (e) {}
    await setLoggedInUsername(d);
    await setCurrentUserData(d);
  };
  // START debug //

  const getAllUsersExceptCurrentUser = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }
    let currentUser;
    console.log(keys);
    const index = keys.indexOf("@logged_in_user");
    if (index > -1) {
      keys.splice(index, 1);
    }
    const index2 = keys.indexOf(currentUser);
    console.log(index2);
    if (index2 > -1) {
      keys.splice(index2, 1);
    }
    let obj = [];
    let profilePic;
    await Promise.all(
      keys.map(async (k, i) => {
        try {
          const jsonData = await AsyncStorage.getItem(k);
          const data = JSON.parse(jsonData);
          profilePic = data.profilePic;
        } catch (e) {
          console.log("failed loading profile picture");
        }
        console.log("prof pic: ", profilePic);
        console.log("key " + i + ": " + k);
        obj.push({ username: k, profilePic: profilePic });
      })
    );
    obj.map((i) => {
      console.log(i.username, i.profilePic);
    });
    //setUsers((state) => [...state, ...obj]);

    //setUsers((state) => [obj2, ...state]);
  };

  /* useEffect(() => {
    setUsers([{ username: "uusd" }]);
  }, []); */

  const getUsers = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("users"));
      if (!users.length) {
        setInitialRoute("Login");
      } else {
        setIsLoggedIn(true);
        setUsers(users);
        setInitialRoute("Home");
      }
    } catch (e) {
      setInitialRoute("Login");
    }
  };
  /* 
  const getUsers = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }
    let currentUser;
    console.log(keys);
    const index = keys.indexOf("@logged_in_user");
    if (index > -1) {
      keys.splice(index, 1);
    }
    const index2 = keys.indexOf(currentUser);
    console.log(index2);
    if (index2 > -1) {
      keys.splice(index2, 1);
    }
    let obj = [];
    let profilePic;
    await Promise.all(
      keys.map(async (k, i) => {
        try {
          const jsonData = await AsyncStorage.getItem(k);
          const data = JSON.parse(jsonData);
          profilePic = data.profilePic;
        } catch (e) {
          console.log("failed loading profile picture");
        }
        console.log("prof pic: ", profilePic);
        console.log("key " + i + ": " + k);
        obj.push({ username: k, profilePic: profilePic });
      })
    );
    obj.map((i) => {
      console.log(i.username, i.profilePic);
    });
    // setUsers((state) => [...state, ...obj]);

    //setUsers((state) => [obj2, ...state]);
  }; */

  useEffect(() => {
    if (users !== null)
      users.map((u) => {
        console.log("users: ", u.username);
      });
  }, [users]);

  // END debug //

  const loadApp = async () => {
    // const images = [require('./assets/snack-icon.png')];

    /*  const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });  */
    return getUsers();
  };

  if (!appLoaded) {
    return (
      <AppLoading
        startAsync={loadApp}
        onFinish={() => {
          //  getAllUsersExceptCurrentUser();
          setAppLoaded(true);
        }}
        onError={() => {}}
      />
    );
  }

  return (
    <MenuProvider>
      <StompContext.Provider value={[rxStomp, isConnected, setIsConnected]}>
        <UsersContext.Provider value={[users, setUsers]}>
          <DialogContext.Provider value={[visible, setVisible]}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen
                  name="LikeTime"
                  options={{
                    headerLeft: null,
                    headerRight: (props) => <HeaderButton />,
                  }}
                >
                  {(props) => (
                    <HomeScreen
                      {...props}
                      isLoggedIn={isLoggedIn}
                      loggedInUsername={currentUser}
                      userProfilePic={userProfilePic}
                      token={token}
                      storeNewUser={storeNewUser}
                      storeUser={storeUser}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Login">
                  {(props) => <LoginScreen {...props} />}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </DialogContext.Provider>
        </UsersContext.Provider>
      </StompContext.Provider>
    </MenuProvider>
  );
}
