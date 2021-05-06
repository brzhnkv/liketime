export const StompConfig = (username, token) => {
  return {
    brokerURL: "wss://instanext-server.herokuapp.com/ws", //production
    //brokerURL: "ws://192.168.100.50:5000/ws", //home
    //brokerURL: "ws://192.168.0.50:5000/ws", //office
    connectHeaders: { sessionId: username, token: token },
    appendMissingNULLonIncoming: true,
    forceBinaryWSFrames: true,
    debug: function (str) {
      console.log("STOMP: " + str);
    },
    reconnectDelay: 20000,
    connectionTimeout: 1000,
  };
};

export const Subscription = (stomp, username, path, dispatch) => {
  const subscription = stomp
    .watch("/user/" + username + "/queue/" + path)
    .subscribe(function (message) {
      const payload = JSON.parse(message.body);
      const newMessage = payload.status;
      dispatch(newMessage);
    });

  return subscription;
};
