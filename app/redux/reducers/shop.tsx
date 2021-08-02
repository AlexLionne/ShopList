import {
  //ADD_TO_lIST,
  CREATE_LIST,
  //CREATE_CATEGORY,
  //REMOVE_ITEM_TO_lIST,
  //DELETE_CATEGORY,
  DELETE_LIST,
} from '../constants';
import {ShopItem} from '../../types/ShopItem';
import {ShopList} from '../../types/ShopList';

const initialState: {
  //categories: Array<string>;
  shopLists: Array<ShopList>;
  //shopItems: Array<ShopItem>;
} = {
  //categories: ['food', 'drink', 'pets', 'vegetables'],
  shopLists: [],
  //shopItems: [],
};

/**
 *
 * @param state
 * @param category
 * @param list
 * @param type
 * @param item
 */
const shopReducer = (
  state = initialState,
  {
    list,
    type,
  }: {category: string; list: ShopList; type: string},
) => {
  switch (type) {
    /*case ADD_TO_lIST:
      return {
        ...state,
        shopItems: [...state.shopItems, item],
      };*/
    case CREATE_LIST:
      return {
        ...state,
        shopLists: [...state.shopLists, list],
      };
    case DELETE_LIST:
      return {
        ...state,
        shopLists: [...state.shopLists.filter(l => l.id !== list?.id)],
      };
    /*case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, category],
      };*/
    /*case REMOVE_ITEM_TO_lIST:
      return {
        ...state,
        shopItems: [...state.shopItems, item],
      };*/
    /*case DELETE_CATEGORY:
      return {
        ...state,
        shopLists: [...state.categories, list],
      };*/
    default:
      return state;
  }
};
export default shopReducer;
