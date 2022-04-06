export interface IMyKallosData {
  id: number;
  uri: string;
  price: any;
}

export interface SaleKallosProps {
  account: string;
  items: Array<Object>;
  setAllItems: any;
}
