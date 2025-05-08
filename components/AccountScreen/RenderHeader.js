import {
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { StyleSheet, Text } from "react-native";

export const RenderHeader = ({ styles }) => (
  <View style={styles.ordersContainer}>
    <Text style={styles.header}>My Orders</Text>
    <View style={styles.ordersIconsList}>
      <Pressable
        style={styles.iconsList}
        onPress={() => navigation.navigate("Orders", { type: "pay" })}
      >
        <Ionicons name="card-outline" size={35} color="gray" />
        <Text>To Pay</Text>
      </Pressable>
      <Pressable
        style={styles.iconsList}
        onPress={() => navigation.navigate("Orders", { type: "ship" })}
      >
        <FontAwesome5 name="clipboard-list" size={35} color="gray" />
        <Text>To Ship</Text>
      </Pressable>
      <Pressable
        style={styles.iconsList}
        onPress={() => navigation.navigate("Orders", { type: "receive" })}
      >
        <FontAwesome5 name="shipping-fast" size={35} color="gray" />
        <Text>To Receive</Text>
      </Pressable>
      <Pressable style={styles.iconsList} onPress={() => {}}>
        <Ionicons name="ios-chatbox-ellipses-outline" size={35} color="gray" />
        <Text>Messages</Text>
      </Pressable>
    </View>
    <View style={styles.actionContainer}>
      <Pressable
        style={styles.actionInnerContainer}
        onPress={() => navigation.navigate("Orders", { type: "return" })}
      >
        <View style={styles.actionInnerContainerReturn}>
          <Fontisto name="arrow-return-left" size={18} color="black" />
        </View>
        <Text style={styles.actionText}>My Returns</Text>
      </Pressable>
      <Pressable
        style={styles.actionInnerContainer}
        onPress={() => navigation.navigate("Orders", { type: "cancel" })}
      >
        <MaterialCommunityIcons
          name="text-box-remove-outline"
          size={32}
          color="black"
        />
        <Text style={styles.actionText}>My Cancellations</Text>
      </Pressable>
    </View>
  </View>
);
