export interface FoodItem {
  id: number;
  name: string;
  protein: number;
  carbohydrates: number;
  fat: number;
  image: string;
  calories: number;
}

export interface Meal {
  id: number;
  name: string;
  date: string; // assuming date is in YYYY-MM-DD format
  time: string; // assuming time is in HH:MM:SS format
  food_item: FoodItem[];
  taken: boolean;
  total_calories: number;
  total_protein: number;
  total_carbohydrates: number;
  total_fat: number;
  picture: string;
}

export interface MealRecord {
  meal: Meal;
  date: string;
}
