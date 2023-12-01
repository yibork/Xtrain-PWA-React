// src/types/user.ts
export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  phone_number: string;
  role: string | null;
  day_macros: Array<{ protein: number; fat: number; carbs: number; calories: number }>;
  day_weights: Array<{ weight: string }>;
  water_intake: { WaterCup_250ml: number | null };
  picture: string | null;
}
export interface LoginResponse {
    access: string;  // Access token for authentication
    refresh: string; // Refresh token for getting new access tokens when the access token expires
}



