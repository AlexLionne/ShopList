const shopItem: {
  id: any;
  name: string;
  //category: string;
  quantity: number;
} = {
  id: null,
  name: '',
  //category: 'food', // default category
  quantity: 0,
};

export type ShopItem = typeof shopItem;
