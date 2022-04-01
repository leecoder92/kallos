export interface IMyKallosData {
  id: number;
  uri: string;
  price: string;
}

export interface SaleKallosProps {
  account: string;
  items: Array<Object>;
  setAllItems: any;
}
