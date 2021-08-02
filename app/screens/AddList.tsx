import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  useWindowDimensions,
  Button,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {ShopItem} from '../types/ShopItem';
import {ShopList} from '../types/ShopList';
import {v4 as uuidv4} from 'uuid';
import {useDispatch} from 'react-redux';
import {createList, removeList} from '../redux/actions';
import {useRoute} from '@react-navigation/native';
import isEqual from 'lodash/isEqual';
import AddItem from '../components/AddItem';

/**
 *
 * @param navigation
 * @constructor
 */
const AddList = ({navigation}: any) => {
  const {params} = useRoute();
  const dispatch = useDispatch();

  // @ts-ignore
  const [shopList, setShopList]: [ShopList, Function] = useState(
    // @ts-ignore
    params?.list || {name: '', items: [], id: uuidv4()},
  );

  //add empty item
  const addItem = useCallback(
    () =>
      setShopList((shopList: ShopList) => ({
        ...shopList,
        items: [...shopList.items, {id: uuidv4(), name: '', quantity: 0}],
      })),
    [],
  );

  //remove item from index
  const removeItem = useCallback((index: number) => {
    setShopList((shopList: ShopList) => ({
      ...shopList,
      items: [
        ...shopList.items.slice(0, index),
        ...shopList.items.slice(index + 1),
      ],
    }));
  }, []);

  //set specific item name
  const setItemName = useCallback((name: string, index: number) => {
    setShopList((shopList: ShopList) => ({
      ...shopList,
      items: [
        ...shopList.items.map((item, i) =>
          index === i ? {...item, name} : item,
        ),
      ],
    }));
  }, []);

  //set specific item qtt
  const setItemQuantity = useCallback((quantity: string, index: number) => {
    setShopList((shopList: ShopList) => ({
      ...shopList,
      items: [
        ...shopList.items.map((item, i) =>
          index === i ? {...item, quantity} : item,
        ),
      ],
    }));
  }, []);

  //set list name
  const setListName = useCallback((name: string) => {
    setShopList((shopList: ShopList) => ({...shopList, name}));
  }, []);

  const {width} = useWindowDimensions();
  //check for items, make sure no one is empty
  const canCreate = useMemo(
    () =>
      shopList?.items?.length > 0 &&
      !shopList?.items.some(item => !item?.quantity || !item?.name),
    [shopList],
  );
  // @ts-ignore
  //check if list is passed trough params
  const hasList = useMemo(() => params?.list !== undefined, [params]);

  //check if list has been updated
  const hasChanged = useMemo(
    // @ts-ignore
    () => !isEqual(params?.list, shopList),
    [params, shopList],
  );

  //add list to redux
  const addList = useCallback(() => {
    dispatch(createList(shopList));
    navigation.goBack();
  }, [dispatch, navigation, shopList]);
  //remove list to redux
  const deleteList = useCallback(() => {
    console.log('remove list ', shopList);
    dispatch(removeList(shopList));
    navigation.goBack();
  }, [dispatch, navigation, shopList]);

  //update list
  //(delete / create new one)
  const updateList = useCallback(() => {
    dispatch(removeList(shopList));
    dispatch(createList(shopList));
    navigation.goBack();
  }, [dispatch, navigation, shopList]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TextInput
          placeholder={'Nouvelle Liste'}
          style={styles.title}
          onChangeText={setListName}
          value={shopList?.name}
        />
        <TouchableNativeFeedback onPress={hasList ? deleteList : addItem}>
          {hasList ? (
            <Icon
              name={'trash-2-outline'}
              width={24}
              height={24}
              fill={'red'}
            />
          ) : (
            <Icon name={'plus-outline'} width={24} height={24} fill={'black'} />
          )}
        </TouchableNativeFeedback>
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>
              Aucun élément dans votre liste, ajoutez en un pour commencer.
            </Text>
          </View>
        )}
        data={shopList?.items}
        renderItem={({item, index}: {item: ShopItem; index: number}) => (
          <AddItem
            index={index}
            shopItem={item}
            hasList={hasList}
            key={`list-item-${item.id}`}
            onRemove={(index: number) => removeItem(index)}
            handleNameChange={(value: string) => setItemName(value, index)}
            handleQuantityChange={(value: string) =>
              setItemQuantity(value, index)
            }
            {...item}
          />
        )}
        keyExtractor={(item: ShopItem) => `item-${item.id}`}
      />
      {canCreate && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            left: 25,
            borderRadius: 12.5,
            width: width - 50,
          }}>
          {hasList && hasChanged && (
            <Button title={'Modifier la liste'} onPress={updateList} />
          )}
          {!hasList && <Button title={'Créer la liste'} onPress={addList} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  header: {
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
  },
  empty: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddList;
