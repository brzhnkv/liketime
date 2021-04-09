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
import { FlatList } from "react-native-gesture-handler";
import StompContext from "../../contexts/StompContext";
import UsersContext from "../../contexts/UsersContext";

const colors = {
  themeColor: "#E8CEBF",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

const FlatListBasics = (data) => {
  return (
    <View style={{ height: 300, width: "100%", backgroundColor: "#222222" }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Line message={item} index={index} />}
        keyExtractor={(item, index) => index}
        inverted
        contentContainerStyle={{
          flexDirection: "column-reverse",
        }}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<Header />}
        ListFooterComponent={<Footer statusMessage={"dfdfkdlfkjsl"} />}
      />
    </View>
  );
};

const Line = ({ message, index }) => {
  const styles = StyleSheet.create({
    line: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    index: {
      width: 50,
      textAlign: "right",
      color: "#595959",
    },
    message: {
      paddingLeft: 20,
      color: "#d6d6d6",
    },
  });

  return (
    <View style={styles.line}>
      <Text style={styles.index}>{index + 1}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const Header = () => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "black",
      height: 50,
    },
  });
  return (
    <View style={styles.root}>
      <Text>Header</Text>
    </View>
  );
};

const Footer = ({ statusMessage }) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "white",
      height: 30,
    },
  });
  return (
    <View style={styles.root}>
      <Text>Статус: </Text>
      <Text>{statusMessage}</Text>
    </View>
  );
};

const ExtraScreen = ({ logFromServer, statusMessage, statusList }) => {
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
    <View style={styles.container}>
      <Button title="test" disabled={isRunning} onPress={handleTest} />
      <Button title="1212" onPress={newLikeByTag} />
      <Text>Log from server: {logFromServer}</Text>
      <Text>Status: {statusMessage}</Text>
      {FlatListBasics(statusList)}
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

export default ExtraScreen;
