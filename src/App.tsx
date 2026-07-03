import React, { useState, useEffect } from 'react';
import { User, CollectionRequest, TrashType, QuantityInputType, RequestStatus } from './types';
import {
  MOCK_USERS,
  MOCK_HISTORIC_REQUESTS,
  INITIAL_PENDING_REQUESTS,
  INITIAL_NEIGHBORHOOD_STATS,
  INITIAL_DAILY_STATS,
  LIBREVILLE_NEIGHBORHOODS
} from './data/mockData';
import UserMobileApp from './components/UserMobileApp';
import AdminDashboard from './components/AdminDashboard';
import { translations, Language } from './utils/translations';
import {
  Sparkles,
  Info,
  Layers,
  Phone,
  Layout,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Globe,
  Trash2,
  Navigation,
  Heart
} from 'lucide-react';

export default function App() {
  // Global synchronized states
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [pendingRequests, setPendingRequests] = useState<CollectionRequest[]>(INITIAL_PENDING_REQUESTS);
  const [completedRequests, setCompletedRequests] = useState<CollectionRequest[]>(MOCK_HISTORIC_REQUESTS);
  const [neighborhoodStats, setNeighborhoodStats] = useState(INITIAL_NEIGHBORHOOD_STATS);
  const [dailyStats, setDailyStats] = useState(INITIAL_DAILY_STATS);

  // Active collection truck simulation state
  const [activeSimulationRequest, setActiveSimulationRequest] = useState<CollectionRequest | null>(null);

  // Active logged-in citizen (Defaulting to u1 - Merveille Nkoghe for immediate interactive state)
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);
  
  // Selected request on Admin Dashboard map
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>('G-4829'); // Default select G-4829

  // Selected language state
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const t = translations[currentLang] || translations.fr;

  // Notification system
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Auto-dismiss notifications after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Simulator View Mode: 'citizen' (Mobile fullscreen), 'admin' (Desktop fullscreen)
  const [viewMode, setViewMode] = useState<'citizen' | 'admin'>('citizen');

  // Citizen Actions
  const handleUserLogin = (phone: string, name: string, neighborhood: string) => {
    const existing = users.find((u) => u.phone_number === phone);
    if (existing) {
      setCurrentUser(existing);
    } else {
      const newUser: User = {
        id: `u-${Date.now()}`,
        phone_number: phone,
        full_name: name,
        profile_image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        neighborhood: neighborhood,
        recyclables_weight: 0,
        rotten_weight: 0,
        requests_count: 0,
        created_at: new Date().toISOString()
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
    }
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
  };

  const handleRequestCollection = (requestData: {
    trashType: TrashType;
    quantityType: QuantityInputType;
    quantityValue: number;
    estimateLabel?: string;
    latitude: number;
    longitude: number;
  }) => {
    if (!currentUser) return;

    // Check if they already have one pending
    const hasPending = pendingRequests.some((r) => r.user_id === currentUser.id);
    if (hasPending) {
      setNotification({
        message: t.alreadyHasPendingError,
        type: 'error'
      });
      return;
    }

    const numCode = Math.floor(1000 + Math.random() * 9000);
    const code = `G-${numCode}`;

    // Compute simple map offsets based on neighborhood for the visual map simulator
    const neighborhoodCoords: Record<string, { x: number; y: number }> = {
      'Akanda': { x: 45, y: 22 },
      'La Sablière': { x: 25, y: 42 },
      'Charbonnages': { x: 55, y: 38 },
      'Louis': { x: 20, y: 53 },
      'Nzeng-Ayong': { x: 52, y: 59 },
      'Glass': { x: 15, y: 67 },
      'Owendo': { x: 45, y: 82 }
    };

    const baseCoords = neighborhoodCoords[currentUser.neighborhood] || { x: 50, y: 50 };
    
    // Add minor randomized dispersion within the neighborhood sector boundary
    const map_x = Math.max(10, Math.min(90, baseCoords.x + (Math.random() - 0.5) * 8));
    const map_y = Math.max(10, Math.min(90, baseCoords.y + (Math.random() - 0.5) * 8));

    const newRequest: CollectionRequest = {
      id: code,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_phone: currentUser.phone_number,
      user_avatar: currentUser.profile_image_url,
      latitude: requestData.latitude,
      longitude: requestData.longitude,
      map_x,
      map_y,
      trash_type: requestData.trashType,
      quantity_input_type: requestData.quantityType,
      quantity_value: requestData.quantityValue,
      estimate_label: requestData.estimateLabel,
      status: RequestStatus.PENDING,
      verification_code: code,
      created_at: new Date().toISOString(),
      collected_at: null,
      collector_id: null,
      neighborhood: currentUser.neighborhood
    };

    setPendingRequests(prev => [newRequest, ...prev]);
    setSelectedRequestId(code); // focus on this on the admin map

    setNotification({
      message: t.requestCreatedSuccess.replace('{code}', code),
      type: 'success'
    });
  };

  const handleCancelRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    if (selectedRequestId === requestId) {
      setSelectedRequestId(null);
    }
    setNotification({
      message: t.notificationCancelled,
      type: "info"
    });
  };

  // Admin Actions
  const handleConfirmPickup = (requestCode: string) => {
    // Look up pending request by either id or verification code
    const request = pendingRequests.find(
      (r) => r.id === requestCode || r.verification_code.toUpperCase() === requestCode.toUpperCase()
    );
    if (!request) return;

    // Start simulation
    setActiveSimulationRequest(request);
    setNotification({
      message: currentLang === 'fr' 
        ? `🚚 Camion de collecte Kam-Tar en route vers ${request.neighborhood}...` 
        : `🚚 Kam-Tar collection truck en route to ${request.neighborhood}...`,
      type: 'info'
    });
  };

  const handleSimulationComplete = (requestId: string) => {
    const matchedIdx = pendingRequests.findIndex((r) => r.id === requestId);
    if (matchedIdx === -1) return;

    const request = pendingRequests[matchedIdx];
    
    // Complete request fields
    const completedReq: CollectionRequest = {
      ...request,
      status: RequestStatus.COMPLETED,
      collected_at: new Date().toISOString(),
      collector_id: 'collector-kamtar-1' // Libreville city waste truck 1
    };

    // 1. Move from pending to completed
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    setCompletedRequests(prev => [completedReq, ...prev]);

    // 2. Add weight contribution to citizen stats
    setUsers(prevUsers =>
      prevUsers.map((user) => {
        if (user.id === request.user_id) {
          const isRecyclable = request.trash_type === TrashType.RECYCLABLE || request.trash_type === TrashType.BOTH;
          const isOrganic = request.trash_type === TrashType.ROTTEN || request.trash_type === TrashType.BOTH;
          
          const addRecyc = isRecyclable ? request.quantity_value : 0;
          const addOrga = isOrganic ? request.quantity_value : 0;

          return {
            ...user,
            recyclables_weight: user.recyclables_weight + addRecyc,
            rotten_weight: user.rotten_weight + addOrga,
            requests_count: user.requests_count + 1
          };
        }
        return user;
      })
    );

    // If active user is the one who got picked up, update their client state
    if (currentUser && currentUser.id === request.user_id) {
      const isRecyclable = request.trash_type === TrashType.RECYCLABLE || request.trash_type === TrashType.BOTH;
      const isOrganic = request.trash_type === TrashType.ROTTEN || request.trash_type === TrashType.BOTH;
      
      setCurrentUser(prev => prev ? {
        ...prev,
        recyclables_weight: prev.recyclables_weight + (isRecyclable ? request.quantity_value : 0),
        rotten_weight: prev.rotten_weight + (isOrganic ? request.quantity_value : 0),
        requests_count: prev.requests_count + 1
      } : null);
    }

    // 3. Update Neighborhood Statistics
    setNeighborhoodStats(prevStats =>
      prevStats.map((n) => {
        if (n.name === request.neighborhood) {
          const isRecyc = request.trash_type === TrashType.RECYCLABLE || request.trash_type === TrashType.BOTH;
          const isOrga = request.trash_type === TrashType.ROTTEN || request.trash_type === TrashType.BOTH;
          return {
            ...n,
            recyclable: n.recyclable + (isRecyc ? request.quantity_value : 0),
            rotten: n.rotten + (isOrga ? request.quantity_value : 0),
            total: n.total + request.quantity_value
          };
        }
        return n;
      })
    );

    // 4. Update Current Day Stats in Daily Stats
    setDailyStats(prevStats => {
      const updated = [...prevStats];
      const todayIdx = updated.length - 1; // latest index
      if (todayIdx >= 0) {
        const isRecyc = request.trash_type === TrashType.RECYCLABLE || request.trash_type === TrashType.BOTH;
        const isOrga = request.trash_type === TrashType.ROTTEN || request.trash_type === TrashType.BOTH;
        updated[todayIdx] = {
          ...updated[todayIdx],
          recyclable: updated[todayIdx].recyclable + (isRecyc ? request.quantity_value : 0),
          rotten: updated[todayIdx].rotten + (isOrga ? request.quantity_value : 0)
        };
      }
      return updated;
    });

    if (selectedRequestId === requestId) {
      setSelectedRequestId(null);
    }

    setNotification({
      message: t.notificationPickupSuccess
        .replace('{name}', request.user_name)
        .replace('{weight}', request.quantity_value.toFixed(1)),
      type: 'success'
    });

    // Reset simulation request trigger
    setActiveSimulationRequest(null);
  };

  // Collector Simulator helper: Spawn random citizen request
  const handleSpawnRandomRequest = () => {
    const randomNames = [
      'Jean-Marc Ondo',
      'Tatiana Mba',
      'Guy-Serge Bongo',
      'Clarisse Nze',
      'Arnaud Obame',
      'Sandrine Ngoyo'
    ];
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const neighborhood = LIBREVILLE_NEIGHBORHOODS[Math.floor(Math.random() * LIBREVILLE_NEIGHBORHOODS.length)];
    const trashType = [TrashType.RECYCLABLE, TrashType.ROTTEN, TrashType.BOTH][Math.floor(Math.random() * 3)];
    const qtyType = [QuantityInputType.ESTIMATED, QuantityInputType.WEIGHED][Math.floor(Math.random() * 2)];
    
    const qtyValue = qtyType === QuantityInputType.ESTIMATED
      ? [2.5, 10, 20][Math.floor(Math.random() * 3)]
      : parseFloat((Math.random() * 25 + 1).toFixed(1));

    const numCode = Math.floor(1000 + Math.random() * 9000);
    const code = `G-${numCode}`;

    // Plot offsets
    const neighborhoodCoords: Record<string, { x: number; y: number }> = {
      'Akanda': { x: 45, y: 22 },
      'La Sablière': { x: 25, y: 42 },
      'Charbonnages': { x: 55, y: 38 },
      'Louis': { x: 20, y: 53 },
      'Nzeng-Ayong': { x: 52, y: 59 },
      'Glass': { x: 15, y: 67 },
      'Owendo': { x: 45, y: 82 }
    };

    const baseCoords = neighborhoodCoords[neighborhood] || { x: 50, y: 50 };
    const map_x = Math.max(10, Math.min(90, baseCoords.x + (Math.random() - 0.5) * 12));
    const map_y = Math.max(10, Math.min(90, baseCoords.y + (Math.random() - 0.5) * 12));

    const newReq: CollectionRequest = {
      id: code,
      user_id: `u-spawn-${Date.now()}`,
      user_name: name,
      user_phone: `+241 77 ${Math.floor(10 + Math.random() * 89)} ${Math.floor(10 + Math.random() * 89)} ${Math.floor(10 + Math.random() * 89)}`,
      user_avatar: "https://images.unsplash.com/photo-1500000000000?auto=format&fit=crop&q=80&w=200",
      latitude: 0.35 + Math.random() * 0.1,
      longitude: 9.40 + Math.random() * 0.1,
      map_x,
      map_y,
      trash_type: trashType,
      quantity_input_type: qtyType,
      quantity_value: qtyValue,
      estimate_label: qtyType === QuantityInputType.ESTIMATED ? (qtyValue === 2.5 ? 'Petit (<5kg)' : qtyValue === 10 ? 'Moyen (5-15kg)' : 'Grand (15kg+)') : undefined,
      status: RequestStatus.PENDING,
      verification_code: code,
      created_at: new Date().toISOString(),
      collected_at: null,
      collector_id: null,
      neighborhood: neighborhood
    };

    setPendingRequests(prev => [...prev, newReq]);
    setSelectedRequestId(code);
    setNotification({
      message: t.notificationSpawned
        .replace('{name}', name)
        .replace('{neighborhood}', neighborhood),
      type: 'info'
    });
  };

  // Helper stats for Admin dashboard
  const totalWeight = completedRequests.reduce((acc, r) => acc + r.quantity_value, 0);
  const recyclableWeight = completedRequests
    .filter((r) => r.trash_type === TrashType.RECYCLABLE || r.trash_type === TrashType.BOTH)
    .reduce((acc, r) => acc + r.quantity_value, 0);
  const rottenWeight = completedRequests
    .filter((r) => r.trash_type === TrashType.ROTTEN || r.trash_type === TrashType.BOTH)
    .reduce((acc, r) => acc + r.quantity_value, 0);

  const totalStats = {
    totalWeight,
    recyclableWeight,
    rottenWeight,
    completedCount: completedRequests.length
  };  const activeUserHistory = completedRequests.filter((r) => r.user_id === currentUser?.id);
  const activeUserRequest = pendingRequests.find((r) => r.user_id === currentUser?.id) || null;

  if (viewMode === 'citizen') {
    return (
      <div className="h-screen h-[100dvh] w-screen bg-slate-50 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-md bg-white h-full sm:h-[820px] sm:rounded-[24px] sm:shadow-2xl sm:border sm:border-slate-100 overflow-hidden flex flex-col relative">
          
          {/* Toast Notification overlay within the Citizen app container */}
          {notification && (
            <div className="absolute top-16 left-4 right-4 z-50 pointer-events-none">
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg backdrop-blur-md animate-bounce ${
                notification.type === 'success' ? 'bg-emerald-500/90 text-white' :
                notification.type === 'error' ? 'bg-red-500/90 text-white' :
                'bg-blue-600/90 text-white'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>{notification.message}</span>
              </div>
            </div>
          )}

          <UserMobileApp
            currentUser={currentUser}
            onLogin={handleUserLogin}
            onLogout={handleUserLogout}
            activeRequest={activeUserRequest}
            onRequestCollection={handleRequestCollection}
            onCancelRequest={handleCancelRequest}
            userRequestsHistory={activeUserHistory}
            currentLang={currentLang}
            onSwitchToAdmin={() => setViewMode('admin')}
            onChangeLang={(lang) => setCurrentLang(lang)}
            neighborhoodStats={neighborhoodStats}
          />
        </div>
      </div>
    );
  }

  // viewMode === 'admin'
  return (
    <div className="h-screen h-[100dvh] w-screen bg-slate-950 p-2 sm:p-6 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl h-full relative flex flex-col">
        
        {/* Toast Notification inside the Admin Dashboard */}
        {notification && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl border ${
              notification.type === 'success' ? 'bg-emerald-950/90 text-emerald-400 border-emerald-900/50' :
              notification.type === 'error' ? 'bg-red-950/90 text-red-400 border-red-900/50' :
              'bg-slate-900/90 text-slate-100 border-slate-800'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        <AdminDashboard
          requests={pendingRequests}
          onConfirmPickup={handleConfirmPickup}
          selectedRequestId={selectedRequestId}
          onSelectRequest={(r) => setSelectedRequestId(r.id)}
          onSpawnRandomRequest={handleSpawnRandomRequest}
          totalStats={totalStats}
          neighborhoodStats={neighborhoodStats}
          dailyStats={dailyStats}
          currentLang={currentLang}
          onSwitchToCitizen={() => setViewMode('citizen')}
          activeSimulationRequest={activeSimulationRequest}
          onSimulationComplete={handleSimulationComplete}
        />
      </div>
    </div>
  );
}
