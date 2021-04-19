import { Button } from "native-base";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Console } from "../../components/console/Console";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";
import { ConsoleHeader } from "./../../components/console/ConsoleHeader";

const ExtraScreen = () => {
  const [rxStomp] = useContext(StompContext);
  const [users] = useContext(UsersContext);
  const [isRunning, setIsRunning] = useState(false);

  const handleTest = () => {
    const subscriptionRunning = rxStomp
      .watch("/user/" + users[0].username + "/queue/running")
      .subscribe(function (message) {
        const payload = JSON.parse(message.body);
        const running = payload.status === "true";
        setIsRunning(running);
        if (!running) subscriptionRunning.unsubscribe();
      });

    const data = {
      username: users[0].username,
      token: users[0].token,
    };

    rxStomp.publish({
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
        isLoading={isRunning}
        isLoadingText="processing"
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

export default ExtraScreen;
