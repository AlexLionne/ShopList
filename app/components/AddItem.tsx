
// @ts-ignore
import { ShopItem } from "../types/ShopItem";
import { StyleSheet, TextInput, TouchableNativeFeedback, View } from "react-native";
import { Icon } from "react-native-eva-icons";
import React from "react";



const AddItem: any = ({
                     index,
                     shopItem,
                     hasList,
                     onRemove,
                     handleNameChange,
                     handleQuantityChange
                   }: { shopItem: ShopItem; hasList: boolean; index: number; onRemove: Function; handleNameChange: Function; handleQuantityChange: Function }) => (
  <View style={styles.item}>
    <TextInput
      defaultValue={shopItem?.name || ""}
      placeholder={"Nom"} style={styles.name}
      onChangeText={(text: string) => handleNameChange(text)} />

    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      <TextInput
        defaultValue={shopItem?.quantity.toString() || ""}
        onChangeText={(text: string) => handleQuantityChange(text)}
        placeholder={"Quantité"}
        style={styles.qty}
        keyboardType={"numeric"}
      />
    </View>

    {!hasList && <TouchableNativeFeedback onPress={() => onRemove(index)}>
      <Icon name={"trash-2-outline"} fill={"black"} width={24} height={24} />
    </TouchableNativeFeedback>}
  </View>
);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    paddingTop: 25,
    borderRadius: 10
  },
  qty: {
    marginRight: 10,
    color: "black",
    fontSize: 15
  },
  name: {
    minWidth: "50%",
    color: "black",
    fontSize: 15
  },
});

export default AddItem
