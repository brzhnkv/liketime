import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import AddAccountDialog from "../components/utils/AddAccountDialog";
import DialogContext from "../contexts/DialogContext";
import StompContext from "../contexts/StompContext";
import UsersContext from "../contexts/UsersContext";
import {
  getMessages,
  receiveLogMessage,
  receiveStatusMessage,
} from "../redux/messagesSlice";
import ExtraScreen from "./TaskScreens/ExtraScreen";
import FollowScreen from "./TaskScreens/FollowScreen";
import LikeScreen from "./TaskScreens/LikeScreen";
import { RxStomp, RxStompState } from "@stomp/rx-stomp";

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [rxStomp, setRxStomp] = useState(new RxStomp());
  const [isConnected, setIsConnected] = useState(false);
  //const [rxStomp, isConnected, setIsConnected] = useContext(StompContext);
  const [users, setUsers] = useContext(UsersContext);
  const [visible, setVisible] = useContext(DialogContext);

  const rxStompConfig = {
    //brokerURL: "wss://instanext-server.herokuapp.com/ws", //production
    //brokerURL: "ws://192.168.100.50:5000/ws", //home
    brokerURL: "ws://192.168.0.50:5000/ws", //office
    connectHeaders: { sessionId: users[0].username, token: users[0].token },
    appendMissingNULLonIncoming: true,
    forceBinaryWSFrames: true,
    debug: function (str) {
      console.log("STOMP: " + str);
    },
    reconnectDelay: 20000,
    connectionTimeout: 1000,
  };
  rxStomp.configure(rxStompConfig);

  const [state, setState] = useState();
  useEffect(() => {
    const subscription = rxStomp.connectionState$.subscribe(setState);
    setIsConnected(state === RxStompState.OPEN);

    return () => subscription.unsubscribe();
  });

  let subscriptionStatus;
  let subscriptionLog;

  const dispatch = useDispatch();

  useEffect(() => {
    rxStomp.activate();

    subscriptionStatus = rxStomp
      .watch("/user/" + users[0].username + "/queue/status")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        const newStatusMessage = payload.status;
        dispatch(receiveStatusMessage(newStatusMessage));
      });

    subscriptionLog = rxStomp
      .watch("/user/" + users[0].username + "/queue/log")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        const newLogMessage = payload.status;
        dispatch(receiveLogMessage(newLogMessage));
      });

    return () => {
      subscriptionStatus.unsubscribe();
      subscriptionLog.unsubscribe();
    };
  }, [users]);

  useEffect(() => {
    dispatch(getMessages({ username: users[0].username }));
  }, [dispatch]);

  return (
    <StompContext.Provider value={[rxStomp, isConnected, setIsConnected]}>
      <View style={styles.root}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
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
                  visible={visible}
                  setVisible={setVisible}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Подписки">
              {(props) => <FollowScreen {...props} />}
            </Tab.Screen>
            {
              <Tab.Screen name="Extra">
                {(props) => <ExtraScreen {...props} />}
              </Tab.Screen>
            }
          </Tab.Navigator>
        )}
      </View>
    </StompContext.Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
});
