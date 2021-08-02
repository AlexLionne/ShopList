//
import {ShopItem} from './ShopItem';

const shopList: {
  name: string;
  id: any;
  items: Array<ShopItem>;
} = {
  id: null,
  name: 'My ShopList',
  items: [],
};

export type ShopList = typeof shopList;
