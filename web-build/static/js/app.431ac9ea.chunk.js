(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{326:function(e,t,n){"use strict";n.d(t,"a",(function(){return U}));var a=n(28),r=n.n(a),c=n(5),o=n.n(c),s=n(6),l=n.n(s),i=n(0),u=n.n(i),p=n(291),f=n(684),m=n(4),d=n(36),g=n(23),b=n(3),h=n(47),v=n(57),x=n(123);function E(e){var t=e.stompClient,n=Object(i.useState)(""),a=l()(n,2),r=a[0],c=a[1],o=Object(i.useState)(""),s=l()(o,2),p=s[0],f=s[1],m=Object(i.useState)(""),v=l()(m,2),x=v[0];v[1];return u.a.createElement(b.a,null,u.a.createElement(g.a,{accessibilityRole:"header"},"\u041b\u0430\u0439\u043a + \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435"),u.a.createElement(d.a,{style:y.textInput,textAlign:"center",value:r,placeholder:"\u0422\u0435\u0433",onChangeText:function(e){return c(e)}}),u.a.createElement(h.a,{title:"\u0421\u0442\u0430\u0440\u0442",onPress:function(){""!==r?t.publish({destination:"/app/likeandsave",body:r}):alert("\u0422\u0435\u0433 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c!")}}),u.a.createElement(g.a,{accessibilityRole:"header"},"\u0421\u0430\u043c\u043e\u043b\u0435\u0442"),u.a.createElement(d.a,{style:y.textInput,textAlign:"center",value:p,placeholder:"\u0422\u0435\u0433",onChangeText:function(e){return f(e)}}),u.a.createElement(h.a,{title:"\u0421\u0442\u0430\u0440\u0442",onPress:function(){""!==p?t.publish({destination:"/app/sendmediatogroup",body:p}):alert("\u0422\u0435\u0433 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c!")}}),u.a.createElement(h.a,{title:"Test",onPress:function(){t.publish({destination:"/app/test",body:""})}}),u.a.createElement(g.a,null,"Response: ",x))}var y=m.a.create({textInput:{height:40,borderColor:"gray",borderWidth:1,width:"100%",marginVertical:10}}),S=n(682),w=n(683),O=n(44),P=(n(172),"#E8CEBF"),k="#fff",I=m.a.create({root:{flex:1,backgroundColor:P},container:{flex:1,alignItems:"center",justifyContent:"center"},header:{backgroundColor:P},toolbar:{padding:16,flexDirection:"row",justifyContent:"space-between"},textInput:{height:40,borderColor:"gray",borderWidth:1,width:"50%"},logo:{width:60,height:60}}),j=function(e){var t=e.userProfilePic,n=e.token,a=e.loggedInUsername,r=e.isLoggedIn,c=e.isConnected,s=e.stompClient,p=e.logFromServer,f=e.statusMessage,m=Object(i.useState)(""),y=l()(m,2),j=(y[0],y[1],Object(i.useState)("log")),C=l()(j,2),T=(C[0],C[1],Object(i.useState)("not connected")),J=l()(T,2),L=(J[0],J[1],Object(i.useState)(!0)),N=l()(L,2);N[0],N[1];Object(i.useEffect)((function(){return _(),function(){}}),[]);var R=function(e){var t,n;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,o.a.awrap(O.a.getItem(e));case 3:t=a.sent,n=JSON.parse(t),setToken(n.token),setLoggedInUsername(e),setUserProfilePic(n.profilePic),a.next=12;break;case 10:a.prev=10,a.t0=a.catch(0);case 12:case"end":return a.stop()}}),null,null,[[0,10]],Promise)},_=function(){var e;return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.a.awrap(O.a.getItem("@logged_in_user"));case 3:e=t.sent,setIsLoggedIn(!0),R(e),t.next=11;break;case 8:return t.prev=8,t.t0=t.catch(0),t.abrupt("return",null);case 11:case"end":return t.stop()}}),null,null,[[0,8]],Promise)},D=Object(i.useState)(""),U=l()(D,2),A=U[0],W=U[1],z=Object(i.useState)(""),F=l()(z,2),H=F[0],M=F[1],B=Object(i.useState)(""),K=l()(B,2),V=K[0];K[1];return u.a.createElement(b.a,{style:I.root},u.a.createElement(x.a,{backgroundColor:P,barStyle:"default"}),u.a.createElement(b.a,{style:I.header},u.a.createElement(b.a,{style:I.toolbar},u.a.createElement(S.a,{name:"text",size:30,style:{color:k}}),u.a.createElement(g.a,null,"LikeTime"),u.a.createElement(b.a,{style:{flexDirection:"row"}},u.a.createElement(w.a,{name:"user",size:30,style:{color:k}}))),u.a.createElement(b.a,null,u.a.createElement(g.a,null,"Text"))),u.a.createElement(b.a,{style:I.container},u.a.createElement(g.a,null,"StompJS connected: ",JSON.stringify(c)),u.a.createElement(h.a,{title:"Delete cookie",onPress:function(){return o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.awrap(O.a.removeItem("@logged_in_user"));case 3:return e.next=5,o.a.awrap(O.a.clear());case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:console.log("Done.");case 10:case"end":return e.stop()}}),null,null,[[0,7]],Promise)}}),u.a.createElement(g.a,null,"isLoggedIn: ",JSON.stringify(r)),u.a.createElement(g.a,null,"loggedInUsername: ",a),u.a.createElement(g.a,null,"token: ",n),u.a.createElement(v.a,{style:I.logo,source:t?{uri:t}:null}),s.connected&&u.a.createElement(E,{stompClient:s}),u.a.createElement(b.a,null,u.a.createElement(g.a,{accessibilityRole:"header"},"\u041b\u0430\u0439\u043a + \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435"),u.a.createElement(d.a,{style:I.textInput,textAlign:"center",value:A,placeholder:"\u0422\u0435\u0433",onChangeText:function(e){return W(e)}}),u.a.createElement(h.a,{title:"\u0421\u0442\u0430\u0440\u0442",onPress:function(){""!==A?s.publish({destination:"/app/likeandsave",body:A}):alert("\u0422\u0435\u0433 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c!")}}),u.a.createElement(g.a,{accessibilityRole:"header"},"\u0421\u0430\u043c\u043e\u043b\u0435\u0442"),u.a.createElement(d.a,{style:I.textInput,textAlign:"center",value:H,placeholder:"\u0422\u0435\u0433",onChangeText:function(e){return M(e)}}),u.a.createElement(h.a,{title:"\u0421\u0442\u0430\u0440\u0442",onPress:function(){""!==H?s.publish({destination:"/app/sendmediatogroup",body:H}):alert("\u0422\u0435\u0433 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c!")}}),u.a.createElement(h.a,{title:"Test"}),u.a.createElement(g.a,null,"Response: ",V)),u.a.createElement(g.a,null,"Log from server: ",p),u.a.createElement(g.a,null,"Status: ",f)))},C=(m.a.create({}),function(e){var t=e.navigation,n=e.stompClient,a=Object(i.useState)(""),r=l()(a,2),c=r[0],s=r[1],p=Object(i.useState)(""),f=l()(p,2),m=f[0],v=f[1],x=function(e,t){var a;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:a={username:e,password:t},n.connected?n.publish({destination:"/app/auth/login",body:JSON.stringify(a)}):alert("stomp not ready"),n&&console.log("works");case 3:case"end":return r.stop()}}),null,null,null,Promise)};return u.a.createElement(b.a,{style:T.container},u.a.createElement(g.a,{style:T.titleText},"\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f"),u.a.createElement(d.a,{style:T.textInput,placeholder:"\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",value:c,onChangeText:function(e){s(e)}}),u.a.createElement(d.a,{style:T.textInput,placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",secureTextEntry:!0,value:m,onChangeText:function(e){v(e)}}),u.a.createElement(h.a,{title:"\u0412\u043e\u0439\u0442\u0438",onPress:function(){x(c,m),t.navigate("Home")}}))}),T=m.a.create({container:{flex:1,alignItems:"center"},titleText:{fontSize:30,fontWeight:"bold"},textInput:{margin:20,height:40,borderColor:"red",borderWidth:1,width:"80%"}}),J=n(74),L=function(e){var t=e.username,n=e.userProfilePic;return u.a.createElement(b.a,null,u.a.createElement(J.a,{style:N.root},u.a.createElement(v.a,{style:N.logo,source:{uri:n}}),u.a.createElement(g.a,{style:N.text},t)))},N=m.a.create({root:{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",height:50,marginRight:5},logo:{width:45,height:45,marginRight:5},text:{fontSize:14,fontWeight:"500",color:"#94d82d"}}),R=n(327),_=n(685),D=(n(64),Object(f.a)());function U(){var e=Object(i.useState)(!1),t=l()(e,2),n=t[0],a=t[1],c=Object(i.useState)(!1),s=l()(c,2),f=s[0],m=s[1],d=Object(i.useState)(""),g=l()(d,2),b=g[0],h=g[1],v=Object(i.useState)(""),x=l()(v,2),E=x[0],y=x[1],S=Object(i.useState)(""),w=l()(S,2),P=w[0],k=w[1],I=Object(i.useState)(""),T=l()(I,2),J=T[0],N=T[1],U=Object(i.useState)(""),A=l()(U,2),W=(A[0],A[1]),z=Object(i.useState)(""),F=l()(z,2),H=(F[0],F[1]),M=function(){var e;return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.a.awrap(O.a.getItem("@logged_in_user"));case 3:null==(e=t.sent)?h("Login"):(m(!0),B(e),h("Home")),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),alert("error");case 10:case"end":return t.stop()}}),null,null,[[0,7]],Promise)},B=function(e){var t,n;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,o.a.awrap(O.a.getItem(e));case 3:t=a.sent,n=JSON.parse(t),N(n.token),y(e),k(n.profilePic),a.next=12;break;case 10:a.prev=10,a.t0=a.catch(0);case 12:case"end":return a.stop()}}),null,null,[[0,10]],Promise)};Object(i.useEffect)((function(){return function(){var e;o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=[],t.prev=1,t.next=4,o.a.awrap(O.a.getAllKeys());case 4:e=t.sent,t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:console.log(e);case 10:case"end":return t.stop()}}),null,null,[[1,7]],Promise)}(),function(){}}),[]);var K=function(e){var t,n;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,o.a.awrap(O.a.getItem(e));case 3:null!==(t=a.sent)&&(n=JSON.parse(t),console.log("data from getData: "+n),N(n.token),k(n.userProfilePic),console.log("token: "+J),console.log("upp: "+P)),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(0);case 9:case"end":return a.stop()}}),null,null,[[0,7]],Promise)},V=Object(i.useState)(!1),q=l()(V,2),G=q[0],Q=q[1],X=Object(i.useState)(new _.a),Y=l()(X,2),Z=Y[0],$=(Y[1],{brokerURL:"wss://instanext-server.herokuapp.com/ws",appendMissingNULLonIncoming:!0,forceBinaryWSFrames:!0,debug:function(e){console.log("STOMP: "+e)},reconnectDelay:1e4});Object(i.useEffect)((function(){Z.configure($),Z.activate(),Z.watch("/user/notification/login").subscribe((function(e){var t=JSON.parse(e.body);if(console.log(t),null!==t.data.token){var n=t.data.username,a={token:t.data.token,profilePic:t.data.userProfilePic};!function(e){o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.a.awrap(O.a.setItem("@logged_in_user",e));case 3:t.next=7;break;case 5:t.prev=5,t.t0=t.catch(0);case 7:M();case 8:case"end":return t.stop()}}),null,null,[[0,5]],Promise)}(n),function(e,t){var n;o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n=JSON.stringify(t),a.next=4,o.a.awrap(O.a.setItem(e,n));case 4:a.next=8;break;case 6:a.prev=6,a.t0=a.catch(0);case 8:K(e),console.log("key: "+e);case 10:case"end":return a.stop()}}),null,null,[[0,6]],Promise)}(n,a)}})),Z.watch("/user/notification/status").subscribe((function(e){var t=JSON.parse(e.body);H(t.status)})),Z.watch("/user/notification/log").subscribe((function(e){var t=JSON.parse(e.body);W(t.status)})),Q(!0)}),[]);return n?u.a.createElement(p.a,null,u.a.createElement(D.Navigator,{initialRouteName:b},u.a.createElement(D.Screen,{name:"Home",options:{headerLeft:null,headerRight:function(e){return u.a.createElement(L,{username:E,userProfilePic:P})}}},(function(e){return u.a.createElement(j,r()({},e,{isLoggedIn:f,loggedInUsername:E,userProfilePic:P,token:J,isConnected:G,stompClient:Z}))})),u.a.createElement(D.Screen,{name:"Login"},(function(e){return u.a.createElement(C,r()({},e,{isConnected:G,stompClient:Z}))})))):u.a.createElement(R.a,{startAsync:function(){return o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",M());case 1:case"end":return e.stop()}}),null,null,null,Promise)},onFinish:function(){return a(!0)},onError:function(){}})}},337:function(e,t,n){e.exports=n(674)}},[[337,1,2]]]);
//# sourceMappingURL=app.431ac9ea.chunk.js.map