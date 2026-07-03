export interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
}

export type DishObj = Omit<Dish, 'id'>;

export interface DishState {
  dishes: Dish[];
  isLoading: boolean;
  error: string | null;
}