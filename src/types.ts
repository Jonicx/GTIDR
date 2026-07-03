export enum TrashType {
  RECYCLABLE = 'Recyclable',
  ROTTEN = 'Rotten', // Organic/Compostable
  BOTH = 'Both'
}

export enum QuantityInputType {
  WEIGHED = 'Weighed',
  ESTIMATED = 'Estimated'
}

export enum RequestStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface User {
  id: string;
  phone_number: string;
  email?: string;
  full_name: string;
  profile_image_url: string;
  neighborhood: string;
  created_at: string;
  recyclables_weight: number; // in kg
  rotten_weight: number; // in kg
  requests_count: number;
  is_certified_recycler?: boolean;
}

export interface CollectionRequest {
  id: string; // The verification code (e.g., G-4829)
  user_id: string;
  user_name: string;
  user_phone: string;
  user_avatar: string;
  latitude: number;
  longitude: number;
  map_x: number; // For rendering on custom vector map (0 to 100)
  map_y: number; // For rendering on custom vector map (0 to 100)
  trash_type: TrashType;
  quantity_input_type: QuantityInputType;
  quantity_value: number; // calculated or inputted weight in kg
  estimate_label?: string; // e.g., 'Petit (<5kg)', 'Moyen (5-15kg)', 'Grand (15kg+)'
  status: RequestStatus;
  verification_code: string;
  created_at: string;
  collected_at: string | null;
  collector_id: string | null;
  neighborhood: string;
}

export interface NeighborhoodStats {
  name: string;
  recyclable: number;
  rotten: number;
  total: number;
  activeRequests: number;
}

export interface DailyCollectionStats {
  date: string;
  recyclable: number;
  rotten: number;
}
