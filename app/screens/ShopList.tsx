import React, { useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback
} from "react-native";
import { ShopList } from "../types/ShopList";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-eva-icons";
import ShopItem from "../components/ShopItem";


/**
 *
 * @param navigation
 * @constructor
 */
const App = ({ navigation }: any) => {
  // @ts-ignore
  // get shop list from store
  const { shopLists } = useSelector(state => state?.shop);

  //navigate to new list screen
  const navigateToNewList = useCallback(
    () => navigation?.navigate && navigation.navigate("AddList"),
    [navigation]
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text>Aucune listes disponibles, créez en une pour commencer.</Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.title}>Mes Listes</Text>

          <TouchableNativeFeedback onPress={navigateToNewList}>
            <Icon name={"plus-outline"} width={24} height={24} fill={"black"} />
          </TouchableNativeFeedback>
        </View>
      )}
      data={shopLists}
      renderItem={({ item }: { item: ShopList }) => <ShopItem
        key={`list-${item.id}`}
        navigation={navigation}
        items={item?.items}
        id={item?.id}
        name={item?.name} />}
      keyExtractor={list => list?.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: "black"
  },
  header: {
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  empty: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
