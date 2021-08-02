import { CREATE_LIST, CREATE_CATEGORY, ADD_TO_lIST, DELETE_LIST } from "../constants";
import {ShopItem} from '../../types/ShopItem';
import { ShopList } from "../../types/ShopList";

export function removeList(list: ShopList) {
  return {
    type: DELETE_LIST,
    list,
  };
}
export function createList(list: ShopList) {
  return {
    type: CREATE_LIST,
    list
  };
}

export function createCategory(category: string) {
  return {
    type: CREATE_CATEGORY,
    category,
  };
}
