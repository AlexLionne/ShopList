import { ShopItem as Item } from "../types/ShopItem";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Icon } from "react-native-eva-icons";
import React from "react";

/**
 * List item
 * @param name
 * @param items
 * @param id
 * @param navigation
 * @constructor
 */
const ShopItem = ({ name, items, id, navigation }: { id: any, name: string; items: Array<Item>; navigation: any }) => {
  return <TouchableNativeFeedback onPress={() => navigation?.navigate("AddList", {list: { name, items, id }})}>
    <View style={styles.item}>
      <Text style={styles.listName}>{name}</Text>
      <View style={styles.cart}>
        <Text style={styles.listName}>{items.length}</Text>
        <Icon name={"shopping-cart-outline"} width={18} height={18} fill={"black"} />
      </View>

    </View>
  </TouchableNativeFeedback>;
};

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12.75,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    padding: 25,
    marginVertical: 8
  },
  cart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listName: {
    marginRight: 5,
    fontSize: 18,
    color: "black"
  },
});

export default ShopItem
