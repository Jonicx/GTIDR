import { User, CollectionRequest, TrashType, QuantityInputType, RequestStatus, NeighborhoodStats, DailyCollectionStats } from '../types';

export const LIBREVILLE_NEIGHBORHOODS = [
  'Akanda',
  'Owendo',
  'Nzeng-Ayong',
  'Charbonnages',
  'La Sablière',
  'Glass',
  'Louis'
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    phone_number: '+241 077 12 34 56',
    full_name: 'Merveille Nkoghe',
    email: 'merveille.nkoghe@gmail.com',
    profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    neighborhood: 'Akanda',
    created_at: '2026-05-15T10:00:00Z',
    recyclables_weight: 45.5,
    rotten_weight: 12.0,
    requests_count: 8
  },
  {
    id: 'u2',
    phone_number: '+241 066 89 45 12',
    full_name: 'Brice Ondo',
    email: 'brice.ondo@yahoo.fr',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    neighborhood: 'Nzeng-Ayong',
    created_at: '2026-05-20T14:30:00Z',
    recyclables_weight: 22.0,
    rotten_weight: 35.5,
    requests_count: 12
  },
  {
    id: 'u3',
    phone_number: '+241 074 55 66 77',
    full_name: 'Syntyche Bignoumba',
    profile_image_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    neighborhood: 'Charbonnages',
    created_at: '2026-06-01T09:15:00Z',
    recyclables_weight: 18.2,
    rotten_weight: 8.4,
    requests_count: 4
  },
  {
    id: 'u4',
    phone_number: '+241 077 99 88 00',
    full_name: 'Jean-Pierre Aubame',
    email: 'jp.aubame@gmail.com',
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    neighborhood: 'Owendo',
    created_at: '2026-06-10T11:45:00Z',
    recyclables_weight: 78.0,
    rotten_weight: 110.5,
    requests_count: 24
  }
];

export const MOCK_HISTORIC_REQUESTS: CollectionRequest[] = [
  {
    id: 'G-3482',
    user_id: 'u1',
    user_name: 'Merveille Nkoghe',
    user_phone: '+241 077 12 34 56',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    latitude: 0.4485,
    longitude: 9.4212,
    map_x: 45,
    map_y: 28,
    trash_type: TrashType.RECYCLABLE,
    quantity_input_type: QuantityInputType.ESTIMATED,
    quantity_value: 10,
    estimate_label: 'Moyen (5-15kg)',
    status: RequestStatus.COMPLETED,
    verification_code: 'G-3482',
    created_at: '2026-06-25T08:30:00Z',
    collected_at: '2026-06-25T09:45:00Z',
    collector_id: 'collector-1',
    neighborhood: 'Akanda'
  },
  {
    id: 'G-9812',
    user_id: 'u2',
    user_name: 'Brice Ondo',
    user_phone: '+241 066 89 45 12',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    latitude: 0.3921,
    longitude: 9.4587,
    map_x: 62,
    map_y: 54,
    trash_type: TrashType.BOTH,
    quantity_input_type: QuantityInputType.WEIGHED,
    quantity_value: 18.5,
    status: RequestStatus.COMPLETED,
    verification_code: 'G-9812',
    created_at: '2026-06-28T14:10:00Z',
    collected_at: '2026-06-28T15:20:00Z',
    collector_id: 'collector-2',
    neighborhood: 'Nzeng-Ayong'
  },
  {
    id: 'G-5519',
    user_id: 'u4',
    user_name: 'Jean-Pierre Aubame',
    user_phone: '+241 077 99 88 00',
    user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    latitude: 0.3112,
    longitude: 9.4921,
    map_x: 75,
    map_y: 85,
    trash_type: TrashType.ROTTEN,
    quantity_input_type: QuantityInputType.ESTIMATED,
    quantity_value: 20,
    estimate_label: 'Grand (15kg+)',
    status: RequestStatus.COMPLETED,
    verification_code: 'G-5519',
    created_at: '2026-06-29T11:00:00Z',
    collected_at: '2026-06-29T11:50:00Z',
    collector_id: 'collector-1',
    neighborhood: 'Owendo'
  },
  {
    id: 'G-1102',
    user_id: 'u3',
    user_name: 'Syntyche Bignoumba',
    user_phone: '+241 074 55 66 77',
    user_avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    latitude: 0.4189,
    longitude: 9.4412,
    map_x: 52,
    map_y: 42,
    trash_type: TrashType.RECYCLABLE,
    quantity_input_type: QuantityInputType.WEIGHED,
    quantity_value: 6.2,
    status: RequestStatus.COMPLETED,
    verification_code: 'G-1102',
    created_at: '2026-06-30T07:15:00Z',
    collected_at: '2026-06-30T08:00:00Z',
    collector_id: 'collector-2',
    neighborhood: 'Charbonnages'
  }
];

export const INITIAL_PENDING_REQUESTS: CollectionRequest[] = [
  {
    id: 'G-4829',
    user_id: 'u1',
    user_name: 'Merveille Nkoghe',
    user_phone: '+241 077 12 34 56',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    latitude: 0.4591,
    longitude: 9.4185,
    map_x: 43,
    map_y: 22,
    trash_type: TrashType.RECYCLABLE,
    quantity_input_type: QuantityInputType.ESTIMATED,
    quantity_value: 2.5,
    estimate_label: 'Petit (<5kg)',
    status: RequestStatus.PENDING,
    verification_code: 'G-4829',
    created_at: '2026-07-01T19:45:00-07:00',
    collected_at: null,
    collector_id: null,
    neighborhood: 'Akanda'
  },
  {
    id: 'G-7718',
    user_id: 'u3',
    user_name: 'Syntyche Bignoumba',
    user_phone: '+241 074 55 66 77',
    user_avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    latitude: 0.4123,
    longitude: 9.4389,
    map_x: 50,
    map_y: 45,
    trash_type: TrashType.BOTH,
    quantity_input_type: QuantityInputType.WEIGHED,
    quantity_value: 14.8,
    status: RequestStatus.PENDING,
    verification_code: 'G-7718',
    created_at: '2026-07-01T20:15:00-07:00',
    collected_at: null,
    collector_id: null,
    neighborhood: 'Charbonnages'
  },
  {
    id: 'G-2289',
    user_id: 'u4',
    user_name: 'Jean-Pierre Aubame',
    user_phone: '+241 077 99 88 00',
    user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    latitude: 0.3256,
    longitude: 9.4891,
    map_x: 73,
    map_y: 81,
    trash_type: TrashType.ROTTEN,
    quantity_input_type: QuantityInputType.ESTIMATED,
    quantity_value: 10,
    estimate_label: 'Moyen (5-15kg)',
    status: RequestStatus.PENDING,
    verification_code: 'G-2289',
    created_at: '2026-07-01T20:50:00-07:00',
    collected_at: null,
    collector_id: null,
    neighborhood: 'Owendo'
  }
];

export const INITIAL_NEIGHBORHOOD_STATS: NeighborhoodStats[] = [
  { name: 'Akanda', recyclable: 120.5, rotten: 45.2, total: 165.7, activeRequests: 1 },
  { name: 'Owendo', recyclable: 310.2, rotten: 442.8, total: 753.0, activeRequests: 1 },
  { name: 'Nzeng-Ayong', recyclable: 215.8, rotten: 180.5, total: 396.3, activeRequests: 0 },
  { name: 'Charbonnages', recyclable: 98.4, rotten: 55.6, total: 154.0, activeRequests: 1 },
  { name: 'La Sablière', recyclable: 85.0, rotten: 22.1, total: 107.1, activeRequests: 0 },
  { name: 'Glass', recyclable: 142.3, rotten: 198.4, total: 340.7, activeRequests: 0 },
  { name: 'Louis', recyclable: 112.5, rotten: 64.0, total: 176.5, activeRequests: 0 }
];

export const INITIAL_DAILY_STATS: DailyCollectionStats[] = [
  { date: '25/06', recyclable: 25.4, rotten: 30.1 },
  { date: '26/06', recyclable: 42.1, rotten: 28.5 },
  { date: '27/06', recyclable: 35.8, rotten: 41.2 },
  { date: '28/06', recyclable: 55.2, rotten: 60.4 },
  { date: '29/06', recyclable: 48.9, rotten: 50.1 },
  { date: '30/06', recyclable: 64.0, rotten: 45.8 },
  { date: '01/07', recyclable: 72.5, rotten: 58.0 }
];
