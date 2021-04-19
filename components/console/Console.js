import React, { useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { ConsoleLine } from "./ConsoleLine";

export const Console = () => {
  const flatListRef = useRef(null);

  const { logMessages } = useSelector((state) => state.messages);
  const renderItem = ({ item, index }) => (
    <ConsoleLine message={item} index={index} />
  );

  return (
    <FlatList
      style={{
        width: "100%",
        flexGrow: 0,
        backgroundColor: "#222222",
      }}
      data={logMessages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={
        {
          // flexDirection: "column-reverse",
        }
      }
      // stickyHeaderIndices={[0]}
      // ListHeaderComponent={<Header />}
      // ListFooterComponent={<Footer statusMessage={"dfdfkdlfkjsl"} />}
      ref={flatListRef}
      onContentSizeChange={() => {
        flatListRef.current.scrollToEnd();
      }}
    />
  );
};
