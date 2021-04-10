import React, { useState, useEffect, useContext } from "react";
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
import { RxStomp, RxStompState } from "@stomp/rx-stomp";
import { of } from "rxjs";
import { take } from "rxjs/operators";
import * as encoding from "text-encoding";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StompContext from "../contexts/StompContext";
import AddAccountDialog from "../components/utils/AddAccountDialog";
import DialogContext from "../contexts/DialogContext";
import UsersContext from "../contexts/UsersContext";
import LikeScreen from "./TaskScreens/LikeScreen";
import ExtraScreen from "./TaskScreens/ExtraScreen";
import FollowScreen from "./TaskScreens/FollowScreen";

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [rxStomp, isConnected, setIsConnected] = useContext(StompContext);
  const [users, setUsers] = useContext(UsersContext);
  const [visible, setVisible] = useContext(DialogContext);

  const [logFromServer, setLogFromServer] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusList, setStatusList] = useState([]);

  const rxStompConfig = {
    //brokerURL: "wss://instanext-server.herokuapp.com/ws",
    //brokerURL: "ws://192.168.100.50:5000/ws", //home
    brokerURL: "ws://192.168.0.50:5000/ws", //office

    connectHeaders: { sessionId: users[0].username, token: users[0].token },
    appendMissingNULLonIncoming: true,
    forceBinaryWSFrames: true,
    debug: function (str) {
      console.log("STOMP: " + str);
    },
    reconnectDelay: 10000,
  };
  rxStomp.configure(rxStompConfig);

  const [state, setState] = useState();
  useEffect(() => {
    const subscription = rxStomp.connectionState$.subscribe(setState);
    console.log(state === RxStompState.OPEN);
    setIsConnected(state === RxStompState.OPEN);

    return () => subscription.unsubscribe();
  });

  let subscriptionStatus;
  let subscriptionRunning;
  let subscriptionLog;

  useEffect(() => {
    setLogFromServer("");
    setStatusMessage("");
    setStatusList([
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
      "lorem",
    ]);

    rxStomp.activate();

    subscriptionStatus = rxStomp
      .watch("/user/" + users[0].username + "/queue/status")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        setStatusMessage(payload.status);
        setStatusList((list) => [...list, payload.status]);
      });

    subscriptionLog = rxStomp
      .watch("/user/" + users[0].username + "/queue/log")
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
    //setIsConnected(true);
    return () => {
      subscriptionStatus.unsubscribe();
      subscriptionLog.unsubscribe();
    };
  }, [users]);

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {/*  <Text>StompJS connected: {JSON.stringify(isConnected)}</Text> */}
      <AddAccountDialog
        visible={visible}
        setVisible={setVisible}
        style={styles.dialog}
      />
      {!isConnected ? (
        <Text>Соединение с сервером не установлено...</Text>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Лайки">
            {(props) => (
              <LikeScreen
                {...props}
                isConnected={isConnected}
                logFromServer={logFromServer}
                statusMessage={statusMessage}
                visible={visible}
                setVisible={setVisible}
                statusList={statusList}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Подписки">
            {(props) => (
              <FollowScreen
                {...props}
                logFromServer={logFromServer}
                statusMessage={statusMessage}
              />
            )}
          </Tab.Screen>
          {
            <Tab.Screen name="Extra">
              {(props) => (
                <ExtraScreen
                  {...props}
                  logFromServer={logFromServer}
                  statusMessage={statusMessage}
                  statusList={statusList}
                />
              )}
            </Tab.Screen>
          }
        </Tab.Navigator>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dialog: {
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
