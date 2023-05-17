export type Price = {
  year: number;
  value: number;
};
export interface WithPrices {
  id: string;
  prices: Price[];
}

export type PriceToUpdate = {
  id: string;
  price: number;
};

export type TeleComService = {
  id: string;
  name: string;
  icon: string;
  prices: Price[];
  dependencies?: string[];
};

export type TeleComPackage = {
  id: string;
  name: string;
  items: string[];
  prices: Price[];
  free?: string[];
};

export type Cart = {
  packages: string[];
  services: string[];
  free: string[];
  price: number;
};
