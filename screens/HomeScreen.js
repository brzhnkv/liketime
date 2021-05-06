import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RxStomp, RxStompState } from "@stomp/rx-stomp";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddAccountDialog from "../components/utils/AddAccountDialog";
import DialogContext from "../contexts/DialogContext";
import StompContext from "../contexts/StompContext";
import UsersContext from "../contexts/UsersContext";
import {
  getMessages,
  receiveLogMessage,
  receiveStatusMessage,
} from "../redux/messagesSlice";
import { getStatus } from "../redux/statusSlice";
import { StompConfig, Subscription } from "./../lib/stomp/Stomp";
import AdminScreen from "./TaskScreens/AdminScreen";
import FollowScreen from "./TaskScreens/FollowScreen";
import LikeScreen from "./TaskScreens/LikeScreen";

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
  const [users, setUsers] = useContext(UsersContext);
  const [visible, setVisible] = useContext(DialogContext);

  const username = users[0].username;
  const token = users[0].token;

  const { status } = useSelector((state) => state.status);

  useEffect(() => {
    status === true ? rxStomp.activate() : rxStomp.deactivate();
  }, [status]);

  rxStomp.configure(StompConfig(username, token));

  const [state, setState] = useState();
  useEffect(() => {
    const subscription = rxStomp.connectionState$.subscribe(setState);
    setIsConnected(state === RxStompState.OPEN);

    return () => subscription.unsubscribe();
  });

  let subscriptionStatus;
  let subscriptionLog;

  const dispatch = useDispatch();
  const dispatchStatus = (newStatusMessage) => {
    dispatch(receiveStatusMessage(newStatusMessage));
    dispatch(getStatus({ username: users[0].username }));
  };
  const dispatchLog = (newLogMessage) =>
    dispatch(receiveLogMessage(newLogMessage));

  useEffect(() => {
    dispatch(getMessages({ username: users[0].username }));
    dispatch(getStatus({ username: users[0].username }));

    subscriptionStatus = Subscription(
      rxStomp,
      username,
      "status",
      dispatchStatus
    );
    subscriptionLog = Subscription(rxStomp, username, "log", dispatchLog);

    return () => {
      subscriptionStatus.unsubscribe();
      subscriptionLog.unsubscribe();
    };
  }, [users]);

  return (
    <StompContext.Provider value={[rxStomp, isConnected, setIsConnected]}>
      <View style={styles.root}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <AddAccountDialog
          visible={visible}
          setVisible={setVisible}
          style={styles.dialog}
        />
        {false ? (
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
              <Tab.Screen name="Admin">
                {(props) => <AdminScreen {...props} />}
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
