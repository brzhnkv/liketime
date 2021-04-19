import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AppLoading from "expo-app-loading";
import { extendTheme, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { HomeScreenHeader } from "./components/header/HomeScreenHeader";
import DialogContext from "./contexts/DialogContext";
import UsersContext from "./contexts/UsersContext";
import store from "./redux/store";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
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
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NativeBaseProvider theme={theme}>
          <UsersContext.Provider value={[users, setUsers]}>
            <DialogContext.Provider value={[visible, setVisible]}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName={initialRoute}>
                  <Stack.Screen
                    name="Home"
                    options={({ navigation }) => {
                      return {
                        header: () => <HomeScreenHeader />,
                      };
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
        </NativeBaseProvider>
      </ApplicationProvider>
    </Provider>
  );
}
