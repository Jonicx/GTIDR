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

  // Active logged-in citizen (Defaulting to u1 - Merveille Nkoghe for immediate interactive state)
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);
  
  // Selected request on Admin Dashboard map
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>('G-4829'); // Default select G-4829

  // Selected language state
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const t = translations[currentLang] || translations.fr;

  // Notification system
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Set initial welcome notification based on language
  useEffect(() => {
    setNotification({
      message: t.welcomeSim,
      type: "info"
    });
  }, [currentLang]);

  // Simulator View Mode: 'dual' (Side-by-side), 'citizen' (Mobile fullscreen), 'admin' (Desktop fullscreen)
  const [viewMode, setViewMode] = useState<'dual' | 'citizen' | 'admin'>('dual');

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
    const matchedIdx = pendingRequests.findIndex((r) => r.id === requestCode);
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
    setPendingRequests(prev => prev.filter(r => r.id !== requestCode));
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

    if (selectedRequestId === requestCode) {
      setSelectedRequestId(null);
    }

    setNotification({
      message: t.notificationPickupSuccess
        .replace('{name}', request.user_name)
        .replace('{weight}', request.quantity_value.toFixed(1)),
      type: 'success'
    });
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
  };

  const activeUserHistory = completedRequests.filter((r) => r.user_id === currentUser?.id);
  const activeUserRequest = pendingRequests.find((r) => r.user_id === currentUser?.id) || null;

  return (
    <div className="min-h-screen bg-slate-950 font-sans flex flex-col justify-between">
      
      {/* Top Universal Banner */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-4 sm:px-6 flex flex-col xl:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="flex shrink-0">
            <span className="w-2.5 h-6 bg-[#009E49] rounded-l" />
            <span className="w-2.5 h-6 bg-[#FCD116]" />
            <span className="w-2.5 h-6 bg-[#3A75C4] rounded-r" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              {t.appTitle} <span className="text-xs text-[#009E49] font-medium hidden sm:inline">{t.solutionEco}</span>
            </h1>
            <p className="text-xs text-slate-400">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Universal Controller - Switch simulation perspectives & languages */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto shrink-0 justify-end">
          
          {/* Language Selector Requested */}
          <div className="flex items-center justify-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setCurrentLang('fr')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-tight transition-all cursor-pointer ${
                currentLang === 'fr'
                  ? 'bg-gradient-to-r from-[#009E49] to-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-tight transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-[#3A75C4] text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('es')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-tight transition-all cursor-pointer ${
                currentLang === 'es'
                  ? 'bg-amber-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setCurrentLang('pt')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-tight transition-all cursor-pointer ${
                currentLang === 'pt'
                  ? 'bg-[#3A75C4] text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PT
            </button>
          </div>

          {/* Perspective View Selector */}
          <div className="flex items-center justify-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('dual')}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'dual'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.simDual}</span>
              <span className="sm:hidden">Dual</span>
            </button>
            
            <button
              onClick={() => setViewMode('citizen')}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'citizen'
                  ? 'bg-slate-800 text-[#009E49] shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#009E49]" />
              <span className="hidden sm:inline">{t.simCitizen.split(' ')[0]}</span>
              <span className="sm:hidden">App</span>
            </button>

            <button
              onClick={() => setViewMode('admin')}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'admin'
                  ? 'bg-slate-800 text-sky-400 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">{t.simAdmin.split(' ')[0]}</span>
              <span className="sm:hidden">Admin</span>
            </button>
          </div>

        </div>
      </header>

      {/* Synchronized Status / Notification Center */}
      {notification && (
        <div className="px-6 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-center shrink-0">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold ${
            notification.type === 'success' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/40' :
            notification.type === 'error' ? 'bg-red-950/50 text-red-400 border border-red-900/40' :
            'bg-sky-950/50 text-sky-400 border border-sky-900/40'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
        {viewMode === 'dual' ? (
          
          /* DUAL PERSPECTIVES GRID (COTE-A-COTE) */
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left: Mobile Citizen perspective inside curved shell */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="text-center mb-2.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#009E49] bg-emerald-950/60 border border-emerald-900 px-3 py-1 rounded-full">
                  📱 Écran Smartphone Citoyen
                </span>
                <p className="text-[10px] text-slate-500 mt-1">Simulez l'envoi d'un sac de déchets</p>
              </div>

              {/* iPhone premium bezel wrap */}
              <div className="w-full max-w-[340px] h-[640px] rounded-[42px] border-[12px] border-slate-900 bg-slate-950 shadow-2xl relative overflow-hidden flex flex-col justify-between shrink-0">
                
                {/* Dynamic Island notch */}
                <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-end px-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>

                {/* Simulated status bar */}
                <div className="h-6 bg-white w-full flex items-center justify-between px-6 pt-1 shrink-0 z-20">
                  <span className="text-[9px] font-bold text-slate-800">21:04</span>
                  <div className="flex items-center gap-1">
                    {/* Signal */}
                    <svg className="w-2.5 h-2.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="18" width="3" height="4" rx="0.5" />
                      <rect x="7" y="14" width="3" height="8" rx="0.5" />
                      <rect x="12" y="10" width="3" height="12" rx="0.5" />
                      <rect x="17" y="5" width="3" height="17" rx="0.5" />
                    </svg>
                    {/* Wifi */}
                    <svg className="w-3 h-3 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0-5a7 7 0 0 0-7 7h2a5 5 0 0 1 10 0h2a7 7 0 0 0-7-7zm0-5a12 12 0 0 0-12 12h2a10 10 0 0 1 20 0h2a12 12 0 0 0-12-12z"/>
                    </svg>
                  </div>
                </div>

                {/* React Mobile citizen app */}
                <div className="flex-1 overflow-hidden relative bg-white">
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
                  />
                </div>
              </div>
            </div>

            {/* Right: Administrative map & Analytics (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-stretch">
              <div className="text-center mb-2.5 mt-4 lg:mt-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                  🖥️ Portail Camion de Collecte
                </span>
                <p className="text-[10px] text-slate-500 mt-1">Saisissez les codes pour valider le ramassage</p>
              </div>

              <div className="flex-1">
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
                />
              </div>
            </div>

          </div>
        ) : viewMode === 'citizen' ? (
          
          /* CITIZEN PERSPECTIVE ONLY */
          <div className="w-full flex flex-col items-center justify-center animate-fade-in">
            <div className="w-full max-w-[340px] h-[640px] rounded-[42px] border-[12px] border-slate-900 bg-slate-950 shadow-2xl relative overflow-hidden flex flex-col justify-between shrink-0">
              
              <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-end px-4">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              </div>

              <div className="h-6 bg-white w-full flex items-center justify-between px-6 pt-1 shrink-0 z-20">
                <span className="text-[9px] font-bold text-slate-800">21:04</span>
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="18" width="3" height="4" rx="0.5" />
                    <rect x="7" y="14" width="3" height="8" rx="0.5" />
                    <rect x="12" y="10" width="3" height="12" rx="0.5" />
                    <rect x="17" y="5" width="3" height="17" rx="0.5" />
                  </svg>
                  <svg className="w-3 h-3 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0-5a7 7 0 0 0-7 7h2a5 5 0 0 1 10 0h2a7 7 0 0 0-7-7zm0-5a12 12 0 0 0-12 12h2a10 10 0 0 1 20 0h2a12 12 0 0 0-12-12z"/>
                  </svg>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative bg-white">
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
                />
              </div>
            </div>
          </div>
        ) : (
          
          /* ADMIN PERSPECTIVE ONLY */
          <div className="w-full max-w-5xl mx-auto h-[620px] animate-fade-in flex flex-col">
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
            />
          </div>
        )}
      </main>

      {/* Dynamic Instruction Walkthrough Guide */}
      <footer className="bg-slate-900 border-t border-slate-800 py-3 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 text-left">
          <Info className="w-3.5 h-3.5 text-[#FCD116] shrink-0" />
          <span><b>{t.guideSim.split(':')[0]}:</b> {t.guideSim.split(':').slice(1).join(':')}</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 shrink-0">
          <span>{t.footerCrafted.split('pour')[0]}</span>
          <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
          <span>pour {t.footerCrafted.split('pour')[1]}</span>
        </div>
      </footer>

    </div>
  );
}
