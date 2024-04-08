// types.ts
export interface Spec {
    key: string;
    name: string;
    value: string;
    isTopSpec: boolean;
    unit?: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    specs?: Spec[];
  }