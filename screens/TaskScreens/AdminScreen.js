import { Button } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Console } from "../../components/console/Console";
import { ConsoleHeader } from "../../components/console/ConsoleHeader";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";
import { clearMessages } from "../../redux/messagesSlice";

const AdminScreen = () => {
  const [rxStomp] = useContext(StompContext);
  const [users] = useContext(UsersContext);

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

  return (
    <View style={styles.root}>
      <Button onPress={handleTest} style={styles.button}>
        Test
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
