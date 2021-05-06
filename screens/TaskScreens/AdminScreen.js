import { Button } from "native-base";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Console } from "../../components/console/Console";
import { ConsoleHeader } from "../../components/console/ConsoleHeader";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";
import { clearMessages } from "../../redux/messagesSlice";

const AdminScreen = () => {
  const [rxStomp] = useContext(StompContext);
  const [users] = useContext(UsersContext);

  const { status } = useSelector((state) => state.status);

  const dispatch = useDispatch();

  const handleTest = async () => {
    dispatch(clearMessages());
    await rxStomp.activate();
    setIsRunning(true);
    const data = {
      username: users[0].username,
      token: users[0].token,
    };

    await rxStomp.publish({
      destination: "/app/test",
      body: JSON.stringify(data),
    });
  };

  const newLikeByTag = () => {
    const data = {
      username: users[0].username,
      token: users[0].token,
      tag: "onedayinperu",
    };

    rxStomp.publish({
      destination: "/app/newlike",
      body: JSON.stringify(data),
    });
  };

  return (
    <View style={styles.root}>
      <Button
        colorScheme="emerald"
        isLoading={status}
        isLoadingText="в работе"
        onPress={handleTest}
        variant="outline"
        size={"sm"}
      >
        Test
      </Button>

      <Button
        colorScheme="emerald"
        size={"sm"}
        variant="outline"
        onPress={newLikeByTag}
      >
        1212
      </Button>

      <ConsoleHeader />
      <Console />
    </View>
  );
};

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default AdminScreen;
