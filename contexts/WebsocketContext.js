// START StompClient //
const [isConnected, setIsConnected] = useState(false);
// let stompClient;

let subscriptionAuth;
let subscriptionStatus;
let subscriptionLog;
let subscriptionLogin;

const stompConfig = {
  brokerURL: "wss://instanext-server.herokuapp.com/ws",
  //brokerURL: "ws://192.168.100.13:5000/ws",
  appendMissingNULLonIncoming: true,
  forceBinaryWSFrames: true,
  debug: function (str) {
    console.log("STOMP: " + str);
  },
  reconnectDelay: 10000,
  onConnect: async function (frame) {
    // The return object has a method called `unsubscribe`
    subscriptionAuth = stompClient.subscribe(
      "/user/notification/auth",
      function (message) {
        const payload = JSON.parse(message.body);

        //setToken(payload.data.token);
        ///setStatusMessage("authentication ok");
        //subscriptionAuth.unsubscribe()
      }
    );
    subscriptionLogin = stompClient.subscribe(
      "/user/notification/login",
      function (message) {
        const payload = JSON.parse(message.body);

        if (payload.data.token !== null) {
          const username = payload.data.username;
          const token = payload.data.token;
          const profilePic = payload.data.userProfilePic;

          const data = { token, profilePic };
          storeLoggedInUser(username);
          storeData(username, data);

          ///  setStatusMessage("token received");
          subscriptionLogin.unsubscribe();
        }
      }
    );
    subscriptionStatus = stompClient.subscribe(
      "/user/notification/status",
      function (message) {
        const payload = JSON.parse(message.body);
        ///  setStatusMessage(payload.status);
      }
    );
    subscriptionLog = stompClient.subscribe(
      "/user/notification/log",
      function (message) {
        const payload = JSON.parse(message.body);
        ///  setLogFromServer(payload.status);
        /* 
  
            let id = listDataLog.listLog.length;
            const newList = listDataLog.listLog.concat({
              id: id,
              message: payload.log,
            });
  
            setListDataLog({ ...listDataLog, listLog: newList }); */
      }
    );
    setIsConnected(true);
    /// setLog2("OK");
    //loadUserFromCookies()
  },
  onDisconnect: () => {
    setIsConnected(false);
    ///  setLog2("not connected");
    // stompClient.close();
  },
};
const stompClient = new Client(stompConfig);
//stompClient.activate();
useEffect(() => {
  stompClient.activate();
}, []);

// END StompClient //

const WebsocketContext = React.createContext(stompClient);
export default WebsocketContext;
