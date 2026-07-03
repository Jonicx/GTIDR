import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrashType, QuantityInputType, RequestStatus, CollectionRequest, User, NeighborhoodStats } from '../types';
import { translations, Language } from '../utils/translations';
import {
  Phone,
  User as UserIcon,
  Trash2,
  Scale,
  Navigation,
  CheckCircle,
  Clock,
  History,
  Home,
  UserCircle,
  LogOut,
  MapPin,
  Sparkles,
  AlertCircle,
  Flame,
  Globe,
  Loader2,
  LayoutDashboard,
  Gamepad2,
  Trophy
} from 'lucide-react';

interface UserMobileAppProps {
  currentUser: User | null;
  onLogin: (phone: string, name: string, neighborhood: string) => void;
  onLogout: () => void;
  activeRequest: CollectionRequest | null;
  onRequestCollection: (requestData: {
    trashType: TrashType;
    quantityType: QuantityInputType;
    quantityValue: number;
    estimateLabel?: string;
    latitude: number;
    longitude: number;
  }) => void;
  onCancelRequest: (requestId: string) => void;
  userRequestsHistory: CollectionRequest[];
  currentLang: Language;
  onSwitchToAdmin: () => void;
  onChangeLang: (lang: Language) => void;
  neighborhoodStats: NeighborhoodStats[];
}

export default function UserMobileApp({
  currentUser,
  onLogin,
  onLogout,
  activeRequest,
  onRequestCollection,
  onCancelRequest,
  userRequestsHistory,
  currentLang,
  onSwitchToAdmin,
  onChangeLang,
  neighborhoodStats,
}: UserMobileAppProps) {
  const t = translations[currentLang] || translations.fr;

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'profile' | 'game' | 'leaderboard'>('home');

  // Eco-Triage Game States
  const [gameScore, setGameScore] = useState(0);
  const [gameStreak, setGameStreak] = useState(0);
  const [gameMessage, setGameMessage] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [currentWasteIndex, setCurrentWasteIndex] = useState(0);
  const [hasUnlockedBadge, setHasUnlockedBadge] = useState(false);

  // Leaderboard interactive states
  const [cheeredNeighborhood, setCheeredNeighborhood] = useState<string | null>(null);

  const gameWasteItems = [
    {
      id: 'item-1',
      name: currentLang === 'fr' ? 'Bouteille en plastique (PET)' : 'Plastic PET Bottle',
      desc: currentLang === 'fr' ? 'Bouteille d\'eau minérale vide' : 'Empty mineral water bottle',
      type: TrashType.RECYCLABLE,
      emoji: '🧴',
      fact: currentLang === 'fr' 
        ? 'Le plastique PET est broyé en paillettes puis recyclé en fibres textiles ou nouvelles bouteilles au Gabon.' 
        : 'PET plastic is shredded into flakes and recycled into textile fibers or new bottles in Gabon.'
    },
    {
      id: 'item-2',
      name: currentLang === 'fr' ? 'Épluchures de banane' : 'Banana peel',
      desc: currentLang === 'fr' ? 'Déchets organiques humides' : 'Wet organic waste',
      type: TrashType.ROTTEN,
      emoji: '🍌',
      fact: currentLang === 'fr' 
        ? 'Les épluchures se décomposent pour former un compost riche pour les maraîchers de Libreville et d\'Akanda !' 
        : 'Peels decompose to form a rich compost for the market gardeners of Libreville and Akanda!'
    },
    {
      id: 'item-3',
      name: currentLang === 'fr' ? 'Canette d\'aluminium' : 'Aluminum soda can',
      desc: currentLang === 'fr' ? 'Canette de boisson gazeuse' : 'Soft drink can',
      type: TrashType.RECYCLABLE,
      emoji: '🥤',
      fact: currentLang === 'fr' 
        ? 'L\'aluminium est indéfiniment recyclable. Sa refonte consomme 95% d\'énergie en moins que sa production primaire.' 
        : 'Aluminum is infinitely recyclable. Melting it down uses 95% less energy than primary production.'
    },
    {
      id: 'item-4',
      name: currentLang === 'fr' ? 'Restes de manioc' : 'Cassava leftovers',
      desc: currentLang === 'fr' ? 'Épluchures ou morceaux non consommés' : 'Peelings or unconsumed pieces',
      type: TrashType.ROTTEN,
      emoji: '🍠',
      fact: currentLang === 'fr' 
        ? 'Les résidus de manioc sont d\'excellents activateurs de compostage grâce à leur teneur élevée en azote.' 
        : 'Cassava residues are excellent composting activators thanks to their high nitrogen content.'
    },
    {
      id: 'item-5',
      name: currentLang === 'fr' ? 'Bocal en verre' : 'Glass Jar',
      desc: currentLang === 'fr' ? 'Pot de confiture vide' : 'Empty jam jar',
      type: TrashType.RECYCLABLE,
      emoji: '🫙',
      fact: currentLang === 'fr' 
        ? 'Le verre propre est trié par couleur et recyclé à 100% sans perte de qualité !' 
        : 'Clean glass is sorted by color and recycled 100% with no loss of quality!'
    },
    {
      id: 'item-6',
      name: currentLang === 'fr' ? 'Boîte de pizza en carton' : 'Cardboard Pizza Box',
      desc: currentLang === 'fr' ? 'Carton d\'emballage propre' : 'Clean packaging cardboard',
      type: TrashType.RECYCLABLE,
      emoji: '📦',
      fact: currentLang === 'fr' 
        ? 'S\'il n\'est pas trop gras, le carton est broyé pour fabriquer de nouvelles caisses d\'expédition recyclées.' 
        : 'If not too greasy, cardboard is pulped to manufacture new recycled shipping boxes.'
    },
    {
      id: 'item-7',
      name: currentLang === 'fr' ? 'Noyau d\'avocat' : 'Avocado Pit',
      desc: currentLang === 'fr' ? 'Déchet de cuisine solide' : 'Solid kitchen waste',
      type: TrashType.ROTTEN,
      emoji: '🥑',
      fact: currentLang === 'fr' 
        ? 'Il met plusieurs mois à se décomposer mais apporte des nutriments stables au terreau final.' 
        : 'It takes several months to decompose but brings stable nutrients to the final potting soil.'
    }
  ];

  const handleSortItem = (selectedType: TrashType) => {
    const currentItem = gameWasteItems[currentWasteIndex];
    const isCorrect = currentItem.type === selectedType;

    if (isCorrect) {
      const newStreak = gameStreak + 1;
      setGameStreak(newStreak);
      setGameScore(prev => prev + 10);
      setGameMessage({
        text: `${t.correct} ${currentItem.fact}`,
        isCorrect: true
      });

      // Earn badge at 5 streak
      if (newStreak >= 5 && !hasUnlockedBadge) {
        setHasUnlockedBadge(true);
        if (currentUser) {
          currentUser.is_certified_recycler = true;
        }
      }
    } else {
      setGameStreak(0);
      setGameMessage({
        text: `${t.incorrect} ${currentItem.name} -> ${
          currentItem.type === TrashType.RECYCLABLE ? t.recyclableBin : t.organicBin
        }`,
        isCorrect: false
      });
    }
  };

  const handleNextItem = () => {
    setGameMessage(null);
    setCurrentWasteIndex((prev) => (prev + 1) % gameWasteItems.length);
  };

  // Login Form States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Akanda');
  const [loginError, setLoginError] = useState('');

  // Request Form States
  const [trashType, setTrashType] = useState<TrashType>(TrashType.RECYCLABLE);
  const [qtyType, setQtyType] = useState<QuantityInputType>(QuantityInputType.ESTIMATED);
  const [estimateRange, setEstimateRange] = useState<'small' | 'medium' | 'large'>('medium');
  const [preciseWeight, setPreciseWeight] = useState<string>('5');
  
  // GPS acquisition state
  const [isGettingGPS, setIsGettingGPS] = useState(false);
  const [acquiredCoords, setAcquiredCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState('');

  const handlePhoneLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setLoginError(t.fullNameError);
      return;
    }
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (cleanPhone.length < 5) {
      setLoginError(t.phoneError);
      return;
    }
    setLoginError('');
    onLogin(`+241 ${cleanPhone}`, fullName, selectedNeighborhood);
  };

  const triggerGPSAcquisition = () => {
    setIsGettingGPS(true);
    setGpsError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAcquiredCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsGettingGPS(false);
        },
        (error) => {
          console.warn("Geolocation API error, using simulation fallback:", error);
          // Fallback simulation coordinates in Libreville
          setTimeout(() => {
            const simulatedOffsets: Record<string, { lat: number; lng: number }> = {
              'Akanda': { lat: 0.4591, lng: 9.4185 },
              'Owendo': { lat: 0.3256, lng: 9.4891 },
              'Nzeng-Ayong': { lat: 0.3921, lng: 9.4587 },
              'Charbonnages': { lat: 0.4123, lng: 9.4389 },
              'La Sablière': { lat: 0.4312, lng: 9.4054 },
              'Glass': { lat: 0.3701, lng: 9.4498 },
              'Louis': { lat: 0.4011, lng: 9.4285 }
            };
            const neighborhoodBase = simulatedOffsets[currentUser?.neighborhood || 'Akanda'] || { lat: 0.4000, lng: 9.4500 };
            setAcquiredCoords({
              lat: neighborhoodBase.lat + (Math.random() - 0.5) * 0.005,
              lng: neighborhoodBase.lng + (Math.random() - 0.5) * 0.005
            });
            setIsGettingGPS(false);
          }, 850);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setGpsError(t.gpsErrorNotSupported);
      setIsGettingGPS(false);
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    let lat = acquiredCoords?.lat || 0.4000;
    let lng = acquiredCoords?.lng || 9.4500;

    if (!acquiredCoords) {
      const simulatedOffsets: Record<string, { lat: number; lng: number }> = {
        'Akanda': { lat: 0.4591, lng: 9.4185 },
        'Owendo': { lat: 0.3256, lng: 9.4891 },
        'Nzeng-Ayong': { lat: 0.3921, lng: 9.4587 },
        'Charbonnages': { lat: 0.4123, lng: 9.4389 },
        'La Sablière': { lat: 0.4312, lng: 9.4054 },
        'Glass': { lat: 0.3701, lng: 9.4498 },
        'Louis': { lat: 0.4011, lng: 9.4285 }
      };
      const base = simulatedOffsets[currentUser?.neighborhood || 'Akanda'] || { lat: 0.4000, lng: 9.4500 };
      lat = base.lat + (Math.random() - 0.5) * 0.003;
      lng = base.lng + (Math.random() - 0.5) * 0.003;
    }

    let calculatedWeight = 10;
    let label = '';

    if (qtyType === QuantityInputType.ESTIMATED) {
      if (estimateRange === 'small') {
        calculatedWeight = 2.5;
        label = t.sizeSmall + ' (<5kg)';
      } else if (estimateRange === 'medium') {
        calculatedWeight = 10;
        label = t.sizeMedium + ' (5-15kg)';
      } else {
        calculatedWeight = 20;
        label = t.sizeLarge + ' (15kg+)';
      }
    } else {
      calculatedWeight = parseFloat(preciseWeight) || 5;
      label = `Poids: ${calculatedWeight} kg`;
    }

    onRequestCollection({
      trashType,
      quantityType: qtyType,
      quantityValue: calculatedWeight,
      estimateLabel: label,
      latitude: lat,
      longitude: lng
    });

    setAcquiredCoords(null);
  };

  const getTrashTypeLabel = (type: TrashType) => {
    switch (type) {
      case TrashType.RECYCLABLE:
        return t.recyclableTitle;
      case TrashType.ROTTEN:
        return t.organicTitle;
      case TrashType.BOTH:
        return t.bothTitle;
    }
  };

  // Not Logged In View
  if (!currentUser) {
    return (
      <div className="flex flex-col h-full bg-white text-slate-900 justify-between">
        {/* Flag top border */}
        <div className="h-1.5 w-full flex shrink-0">
          <div className="bg-[#009E49] h-full flex-1" />
          <div className="bg-[#FCD116] h-full flex-1" />
          <div className="bg-[#3A75C4] h-full flex-1" />
        </div>

        {/* Compact Lang Switcher on Login Screen */}
        <div className="flex justify-end px-4 pt-3 pb-1 shrink-0">
          <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['fr', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onChangeLang(lang)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                  currentLang === lang
                    ? 'bg-white text-slate-800 shadow-xs border border-slate-200/50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4 flex flex-col justify-center items-center flex-1 overflow-y-auto">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#009E49] to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200 mb-3 shrink-0">
            <Globe className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight text-center">{t.appTitle}</h1>
          <p className="text-[11px] text-slate-500 text-center mt-1 max-w-[250px] leading-relaxed">
            {t.appSubtitle}
          </p>

          <form onSubmit={handlePhoneLoginSubmit} className="w-full mt-6 space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                {t.fullName}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder={t.fullNamePlaceholder}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#009E49]/20 focus:border-[#009E49] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                {t.phoneLabel}
              </label>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-[11px] font-semibold">
                  +241
                </span>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2.5 rounded-r-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#009E49]/20 focus:border-[#009E49] transition-all"
                />
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{t.phoneHelp}</p>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                {t.neighborhoodLabel}
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#009E49]/20 focus:border-[#009E49] transition-all font-medium"
              >
                <option value="Akanda">Akanda</option>
                <option value="Owendo">Owendo</option>
                <option value="Nzeng-Ayong">Nzeng-Ayong</option>
                <option value="Charbonnages">Charbonnages</option>
                <option value="La Sablière">La Sablière</option>
                <option value="Glass">Glass</option>
                <option value="Louis">Louis</option>
              </select>
            </div>

            {loginError && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-lg bg-red-50 border border-red-100 text-[10px] text-red-600">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#009E49] hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-100 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.phoneLoginBtn}</span>
            </button>
          </form>

          {/* Quick Google Option */}
          <div className="w-full mt-4">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[9px] uppercase tracking-wider">{t.or}</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
            <button
              type="button"
              onClick={() => onLogin('+241 GoogleAccount', 'Citoyen Gabonais', 'Nzeng-Ayong')}
              className="w-full mt-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-2 rounded-xl transition-all flex items-center justify-center gap-2 text-[11px] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.08 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.15C3.27 21.84 7.37 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3V6.49H1.29C.47 8.13 0 9.97 0 12s.47 3.87 1.29 5.51l3.98-3.27z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.22 0 12 0 7.37 0 3.27 2.16 1.29 5.51l3.98 3.27c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              <span>{t.googleLoginBtn}</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="py-2.5 border-t border-slate-100 text-center text-[9px] text-slate-400 shrink-0">
          {t.prototypeVersion}
        </div>
      </div>
    );
  }

  // Logged In User View (Mobile Shell Dashboard)
  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] text-slate-900 justify-between relative select-none">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 shrink-0 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src={currentUser.profile_image_url}
            alt={currentUser.full_name}
            className="w-8 h-8 rounded-full border border-[#009E49] object-cover"
          />
          <div>
            <div className="text-[11px] font-medium text-slate-500">{t.welcomeUser.replace('{name}', currentUser.full_name.split(' ')[0])}</div>
            <div className="text-[10px] font-bold text-[#3A75C4] flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-[#FCD116]" />
              <span>{t.locationGabon.replace('{neighborhood}', currentUser.neighborhood)}</span>
            </div>
          </div>
        </div>

        {/* Language setting button near location (right side of nav header) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['fr', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onChangeLang(lang)}
                className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${
                  currentLang === lang
                    ? 'bg-white text-slate-800 shadow-xs border border-slate-200/50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tab Panel Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 pb-24">
        <AnimatePresence mode="wait">
          
          {/* A. HOME TAB */}
          {activeTab === 'home' && (
            <motion.div
              key="tab-home"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3.5"
            >
              
              {/* If there is an active pending request, show the verification screen! */}
              {activeRequest ? (
                <div className="bg-white border-2 border-[#009E49]/30 rounded-2xl p-4 shadow-xl shadow-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#009E49] to-[#FCD116]" />

                  <div className="flex justify-between items-start mt-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#009E49]/10 text-[#009E49] flex items-center gap-1">
                      <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
                      {t.activeRequestTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => onCancelRequest(activeRequest.id)}
                      className="text-[11px] text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      {t.cancelBtn}
                    </button>
                  </div>

                  {/* LARGE CODE DISPLAY */}
                  <div className="my-4 text-center bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      {t.verificationCodeLabel}
                    </p>
                    <h2 className="text-3xl font-black text-[#009E49] tracking-widest mt-1 font-mono drop-shadow-sm select-all">
                      {activeRequest.verification_code}
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-2 max-w-[220px] mx-auto leading-relaxed">
                      {t.verificationCodeHelp}
                    </p>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.trashTypeLabel}</span>
                      <span className="font-semibold text-slate-800">{getTrashTypeLabel(activeRequest.trash_type)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.estimatedWeight}</span>
                      <span className="font-semibold text-slate-800">{activeRequest.quantity_value} kg ({activeRequest.estimate_label || 'Calculated'})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">{t.capturedPosition}</span>
                      <span className="font-mono text-[9px] text-[#3A75C4] flex items-center gap-1 bg-[#3A75C4]/5 px-1.5 py-0.5 rounded border border-[#3A75C4]/10">
                        <Navigation className="w-2.5 h-2.5 rotate-45 text-[#3A75C4]" />
                        {activeRequest.latitude.toFixed(4)}, {activeRequest.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 p-2.5 bg-[#3A75C4]/10 text-[#3A75C4] text-[10px] rounded-lg border border-[#3A75C4]/15 flex gap-2 items-start leading-relaxed">
                    <Sparkles className="w-3.5 h-3.5 text-[#FCD116] shrink-0 mt-0.5 animate-pulse" />
                    <span>
                      {t.driverHeadingText.replace('{neighborhood}', currentUser.neighborhood)}
                    </span>
                  </div>
                </div>
              ) : (
                
                // NO ACTIVE REQUEST -> SHOW TAKE OUT FORM!
                <form onSubmit={handleSubmitRequest} className="space-y-3.5">
                  
                  {/* HERO BANNER SECTION */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-4 shadow-xl shadow-slate-200">
                    <div className="absolute top-0 bottom-0 right-0 w-1.5 flex flex-col">
                      <div className="bg-[#009E49] flex-1" />
                      <div className="bg-[#FCD116] flex-1" />
                      <div className="bg-[#3A75C4] flex-1" />
                    </div>
                    
                    <h3 className="text-sm font-extrabold text-white tracking-tight">{t.takeOutTrashHeader}</h3>
                    <p className="text-[10px] text-emerald-100 max-w-[250px] mt-1 leading-relaxed">
                      {t.takeOutTrashHelp}
                    </p>

                    <div className="mt-3.5 flex gap-2.5 items-center">
                      <div className="bg-white/10 backdrop-blur px-2.5 py-1 rounded-lg border border-white/10 text-center">
                        <div className="text-[8px] text-emerald-200 uppercase font-black tracking-wider">{t.totalSorted}</div>
                        <div className="text-xs font-bold text-[#FCD116]">{currentUser.recyclables_weight + currentUser.rotten_weight} kg</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur px-2.5 py-1 rounded-lg border border-white/10 text-center">
                        <div className="text-[8px] text-emerald-200 uppercase font-black tracking-wider">{t.historyTitleShort}</div>
                        <div className="text-xs font-bold text-[#3A75C4]">{currentUser.requests_count} {t.historyCount}</div>
                      </div>
                    </div>
                  </div>

                  {/* 1. SELECT TRASH TYPE */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm space-y-2.5">
                    <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">
                      {t.trashTypeStep}
                    </label>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {/* Recyclables */}
                      <button
                        type="button"
                        onClick={() => setTrashType(TrashType.RECYCLABLE)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          trashType === TrashType.RECYCLABLE
                            ? 'border-[#009E49] bg-emerald-50/20 ring-1 ring-[#009E49]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          trashType === TrashType.RECYCLABLE ? 'bg-[#009E49] text-white' : 'bg-slate-50 text-slate-500'
                        }`}>
                          <Globe className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-800">{t.recyclableTitle}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">{t.recyclableDesc}</div>
                        </div>
                      </button>

                      {/* Compost / Organic */}
                      <button
                        type="button"
                        onClick={() => setTrashType(TrashType.ROTTEN)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          trashType === TrashType.ROTTEN
                            ? 'border-amber-500 bg-amber-50/10 ring-1 ring-amber-500'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          trashType === TrashType.ROTTEN ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-500'
                        }`}>
                          <Flame className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-800">{t.organicTitle}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">{t.organicDesc}</div>
                        </div>
                      </button>

                      {/* Both Mixed */}
                      <button
                        type="button"
                        onClick={() => setTrashType(TrashType.BOTH)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          trashType === TrashType.BOTH
                            ? 'border-[#3A75C4] bg-sky-50/10 ring-1 ring-[#3A75C4]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          trashType === TrashType.BOTH ? 'bg-[#3A75C4] text-white' : 'bg-slate-50 text-slate-500'
                        }`}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-800">{t.bothTitle}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">{t.bothDesc}</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 2. SELECT QUANTITY */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">
                        {t.quantityStep}
                      </label>
                      
                      {/* Toggle */}
                      <div className="flex p-0.5 bg-slate-100 rounded-lg shrink-0">
                        <button
                          type="button"
                          onClick={() => setQtyType(QuantityInputType.ESTIMATED)}
                          className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all cursor-pointer ${
                            qtyType === QuantityInputType.ESTIMATED
                              ? 'bg-white text-slate-800 shadow-sm'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {t.qtyEstimateTab}
                        </button>
                        <button
                          type="button"
                          onClick={() => setQtyType(QuantityInputType.WEIGHED)}
                          className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all cursor-pointer ${
                            qtyType === QuantityInputType.WEIGHED
                              ? 'bg-white text-slate-800 shadow-sm'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {t.qtyWeighedTab}
                        </button>
                      </div>
                    </div>

                    {qtyType === QuantityInputType.ESTIMATED ? (
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEstimateRange('small')}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            estimateRange === 'small'
                              ? 'border-[#009E49] bg-emerald-50/10 font-bold'
                              : 'border-slate-200 bg-white text-slate-600'
                          }`}
                        >
                          <div className="text-[8px] text-slate-400 uppercase font-semibold">{t.sizeSmall}</div>
                          <div className="text-xs font-black mt-0.5 text-slate-800">&lt; 5 kg</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEstimateRange('medium')}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            estimateRange === 'medium'
                              ? 'border-[#009E49] bg-emerald-50/10 font-bold'
                              : 'border-slate-200 bg-white text-slate-600'
                          }`}
                        >
                          <div className="text-[8px] text-slate-400 uppercase font-semibold">{t.sizeMedium}</div>
                          <div className="text-xs font-black mt-0.5 text-slate-800">5-15 kg</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEstimateRange('large')}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            estimateRange === 'large'
                              ? 'border-[#009E49] bg-emerald-50/10 font-bold'
                              : 'border-slate-200 bg-white text-slate-600'
                          }`}
                        >
                          <div className="text-[8px] text-slate-400 uppercase font-semibold">{t.sizeLarge}</div>
                          <div className="text-xs font-black mt-0.5 text-slate-800">15+ kg</div>
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Scale className="w-3.5 h-3.5 text-slate-500" />
                        </span>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          placeholder={t.preciseWeightPlaceholder}
                          value={preciseWeight}
                          onChange={(e) => setPreciseWeight(e.target.value)}
                          className="w-full pl-8 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#009E49]/20 focus:border-[#009E49] transition-all font-semibold"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-bold">
                          kg
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 3. CAPTURE GPS LOCATION */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm space-y-2.5">
                    <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">
                      {t.locationStep}
                    </label>

                    {acquiredCoords ? (
                      <div className="flex items-center justify-between p-2.5 bg-emerald-50/10 border border-emerald-500/20 rounded-xl text-[10px]">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-[#009E49]" />
                          <span><b>{t.gpsAcquired}</b> {acquiredCoords.lat.toFixed(4)}, {acquiredCoords.lng.toFixed(4)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAcquiredCoords(null)}
                          className="text-[#3A75C4] hover:underline font-bold cursor-pointer"
                        >
                          {t.recalibrate}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={triggerGPSAcquisition}
                        disabled={isGettingGPS}
                        className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600 transition-all cursor-pointer"
                      >
                        {isGettingGPS ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#009E49]" />
                            <span className="text-slate-500">{t.gpsGetting}</span>
                          </>
                        ) : (
                          <>
                            <Navigation className="w-3.5 h-3.5 text-[#3A75C4] rotate-45" />
                            <span>{t.gpsCaptureBtn}</span>
                          </>
                        )}
                      </button>
                    )}
                    {gpsError && (
                      <p className="text-[9px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {gpsError}
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="w-full bg-[#009E49] hover:bg-emerald-600 active:scale-95 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-1.5 text-sm cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t.takeOutSubmitBtn}</span>
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {/* B. HISTORY TAB */}
          {activeTab === 'history' && (
            <motion.div
              key="tab-history"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3.5"
            >
              <div className="bg-gradient-to-br from-[#3A75C4] to-blue-900 text-white p-4 rounded-2xl shadow-md">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-200">{t.myEcoImpact}</h4>
                
                <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                  <div className="bg-white/10 rounded-xl p-2.5 border border-white/5">
                    <div className="text-base font-black text-emerald-300">{currentUser.recyclables_weight} kg</div>
                    <div className="text-[8px] text-blue-100 mt-0.5">{t.recyclablesSaved}</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 border border-white/5">
                    <div className="text-base font-black text-yellow-300">{currentUser.rotten_weight} kg</div>
                    <div className="text-[8px] text-blue-100 mt-0.5">{t.organicComposted}</div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-blue-100 text-[10px]">{t.co2Avoided}:</span>
                  <span className="font-bold text-emerald-300 text-xs">
                    ~ {((currentUser.recyclables_weight * 1.5) + (currentUser.rotten_weight * 0.8)).toFixed(1)} kg CO2
                  </span>
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-1.5">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  <span>{t.pastTransactions} ({userRequestsHistory.length})</span>
                </h5>

                {userRequestsHistory.length === 0 ? (
                  <div className="bg-white rounded-xl p-6 border border-slate-100 text-center text-xs text-slate-400">
                    {t.noCollections}
                  </div>
                ) : (
                  userRequestsHistory.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          item.trash_type === TrashType.RECYCLABLE ? 'bg-emerald-50 text-[#009E49]' :
                          item.trash_type === TrashType.ROTTEN ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-[#3A75C4]'
                        }`}>
                          {item.trash_type === TrashType.RECYCLABLE ? 'R' :
                           item.trash_type === TrashType.ROTTEN ? 'O' : 'X'}
                        </div>

                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-slate-800 truncate">
                            {getTrashTypeLabel(item.trash_type)}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate">
                            {new Date(item.created_at).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[11px] font-extrabold text-slate-900">{item.quantity_value} kg</div>
                        <span className={`inline-flex items-center gap-0.5 mt-0.5 px-1 rounded-full text-[8px] font-bold ${
                          item.status === RequestStatus.COMPLETED
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {item.status === RequestStatus.COMPLETED ? 'OK' : 'Cancelled'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* C. PROFILE TAB */}
          {activeTab === 'profile' && (
            <motion.div
              key="tab-profile"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3.5"
            >
              {/* Profile card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
                <div className="relative inline-block">
                  <img
                    src={currentUser.profile_image_url}
                    alt={currentUser.full_name}
                    className="w-16 h-16 rounded-full mx-auto border-4 border-emerald-50 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-4.5 h-4.5 bg-[#009E49] rounded-full border-2 border-white flex items-center justify-center text-white text-[7px] font-black">
                    ✓
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-800 mt-2">{currentUser.full_name}</h4>
                
                {currentUser.is_certified_recycler && (
                  <div className="inline-flex items-center gap-1 mt-1 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold">
                    <Trophy className="w-3 h-3 text-amber-500 fill-amber-500 animate-bounce" />
                    <span>{t.certifiedBadge}</span>
                  </div>
                )}

                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{currentUser.phone_number}</p>

                <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div>
                    <div className="font-extrabold text-slate-800">{currentUser.requests_count}</div>
                    <div className="text-[8px] text-slate-400 mt-0.5">{t.historyCount}</div>
                  </div>
                  <div className="border-x border-slate-100">
                    <div className="font-extrabold text-[#009E49]">{(currentUser.recyclables_weight).toFixed(1)}</div>
                    <div className="text-[8px] text-slate-400 mt-0.5">Recyc. (kg)</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-600">{(currentUser.rotten_weight).toFixed(1)}</div>
                    <div className="text-[8px] text-slate-400 mt-0.5">Compost (kg)</div>
                  </div>
                </div>
              </div>

              {/* Eco advice */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm space-y-2">
                <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wide">
                  {t.ruleHeader}
                </h5>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {t.ruleDesc}
                </p>
                <div className="p-2.5 bg-amber-50 text-amber-800 text-[9px] rounded-xl border border-amber-100 leading-tight">
                  ⚠️ <b>{t.ruleWarning.split(':')[0]}:</b> {t.ruleWarning.split(':')[1]}
                </div>
              </div>

              {/* Logout button */}
              <div className="space-y-2 pt-2">
                <button
                   type="button"
                   onClick={onLogout}
                   className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout}</span>
                </button>

                {/* Switch to Admin dashboard requested by user */}
                <button
                   type="button"
                   onClick={onSwitchToAdmin}
                   className="w-full bg-sky-950 hover:bg-sky-900 text-sky-400 border border-sky-900/40 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.adminDashboard}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* D. ECO-GAME TAB */}
          {activeTab === 'game' && (
            <motion.div
              key="tab-game"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3.5"
            >
              <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl p-4 shadow-md text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <Gamepad2 className="w-24 h-24 rotate-12" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span>{t.gameHeader}</span>
                </h4>
                <p className="text-[10px] text-emerald-100 mt-1 max-w-xs mx-auto leading-relaxed">
                  {t.gameDesc}
                </p>

                {/* Score & Streak Counters */}
                <div className="mt-3.5 flex justify-center gap-4">
                  <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[70px]">
                    <div className="text-[9px] text-emerald-100">{t.score}</div>
                    <div className="text-xs font-black text-yellow-300">{gameScore} pts</div>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[70px] relative">
                    <div className="text-[9px] text-emerald-100">{t.streak}</div>
                    <div className="text-xs font-black text-yellow-300 flex items-center justify-center gap-0.5">
                      {gameStreak} / 5
                      {gameStreak > 0 && <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Play Board */}
              {hasUnlockedBadge && gameStreak >= 5 ? (
                // Won Screen
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="bg-white rounded-2xl p-5 border-2 border-emerald-500/30 text-center space-y-4 shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-3xl shadow-inner border border-emerald-100">
                    🏆
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-emerald-700">{t.certifiedBadge} !</h5>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {t.congrats}
                    </p>
                  </div>
                  
                  {/* The Shiny Badge */}
                  <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20 text-[10px] font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-600 animate-bounce" />
                    <span>{currentLang === 'fr' ? 'Badge Obtenu avec Succès !' : 'Badge Successfully Earned!'}</span>
                  </div>

                  <button
                    onClick={() => {
                      setGameStreak(0);
                    }}
                    className="w-full bg-[#009E49] hover:bg-[#00863e] text-white font-black py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    {t.playAgain}
                  </button>
                </motion.div>
              ) : (
                // Active Card to Sort
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-4 text-center">
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100/50 relative">
                    <span className="text-5xl block animate-bounce duration-1000">{gameWasteItems[currentWasteIndex].emoji}</span>
                    <h5 className="text-xs font-extrabold text-slate-800 mt-3">{gameWasteItems[currentWasteIndex].name}</h5>
                    <p className="text-[9px] text-slate-400 mt-0.5">{gameWasteItems[currentWasteIndex].desc}</p>
                  </div>

                  {/* Message Result */}
                  {gameMessage ? (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl text-[10px] text-left leading-relaxed ${
                        gameMessage.isCorrect 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                          : 'bg-red-50 text-red-800 border border-red-100'
                      }`}
                    >
                      <div className="font-extrabold flex items-center gap-1 mb-1">
                        <span>{gameMessage.isCorrect ? '✓' : '✗'}</span>
                        <span>{gameMessage.isCorrect ? t.correct : t.incorrect}</span>
                      </div>
                      <p>{gameMessage.text}</p>
                      
                      <button
                        onClick={handleNextItem}
                        className="mt-2.5 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 rounded-lg text-[9px] transition-all cursor-pointer"
                      >
                        {currentLang === 'fr' ? 'Élément Suivant →' : 'Next Item →'}
                      </button>
                    </motion.div>
                  ) : (
                    // Sort Buttons
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleSortItem(TrashType.RECYCLABLE)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-[#009E49] border border-emerald-200/60 font-black py-3 px-2 rounded-xl text-[10px] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="text-lg">♻️</span>
                        <span>{t.recyclableBin}</span>
                      </button>
                      <button
                        onClick={() => handleSortItem(TrashType.ROTTEN)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 font-black py-3 px-2 rounded-xl text-[10px] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="text-lg">🍂</span>
                        <span>{t.organicBin}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* E. LEADERBOARD TAB */}
          {activeTab === 'leaderboard' && (
            <motion.div
              key="tab-leaderboard"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3.5 pb-6"
            >
              {/* Header Card with Gabon colors strip */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 flex">
                  <div className="bg-[#009E49] h-full flex-1" />
                  <div className="bg-[#FCD116] h-full flex-1" />
                  <div className="bg-[#3A75C4] h-full flex-1" />
                </div>
                <div className="space-y-1 mt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400/20 animate-pulse" />
                    <span>{t.leaderboardHeader}</span>
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    {t.leaderboardDesc}
                  </p>
                </div>

                {/* Rainy season indicator banner */}
                <div className="mt-3 p-2.5 bg-sky-950/70 border border-sky-800/40 rounded-xl text-[9px] text-sky-200 leading-normal flex items-start gap-2">
                  <span className="text-sm shrink-0">🌧️</span>
                  <span>{t.leaderboardRainySeasonWarning}</span>
                </div>
              </div>

              {/* Leader Highlight Banner */}
              {(() => {
                const sorted = [...neighborhoodStats].sort((a, b) => b.total - a.total);
                const leader = sorted[0];
                const isLeaderUserHome = currentUser?.neighborhood === leader?.name;

                return (
                  <div className="bg-gradient-to-tr from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-3 -top-3 text-7xl opacity-15 select-none">🏆</div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-md border-2 border-amber-300 shrink-0">
                        <Trophy className="w-6 h-6 text-amber-950 fill-amber-950/10 animate-bounce" />
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <span className="text-[8px] font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/10">
                          {t.leaderboardLeadLabel}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-800 truncate mt-1">
                          {leader?.name} {isLeaderUserHome && `(${currentLang === 'fr' ? 'Votre Quartier' : 'Your Neighborhood'})`}
                        </h4>
                        <p className="text-[9px] text-slate-500">
                          {currentLang === 'fr' 
                            ? `En tête de Libreville avec un volume impressionnant de ${leader?.total.toFixed(1)} kg !`
                            : `Leading Libreville with an impressive ${leader?.total.toFixed(1)} kg sorted!`}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Cheer Action */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <p className="text-[8px] text-slate-400 italic">
                        {cheeredNeighborhood === leader?.name 
                          ? (currentLang === 'fr' ? '🎉 Claps envoyés ! Esprit d\'équipe actif.' : '🎉 Claps sent! Team spirit active.')
                          : (currentLang === 'fr' ? 'Encouragez les éco-citoyens de Libreville !' : 'Cheer on Libreville eco-citizens!')}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCheeredNeighborhood(leader?.name);
                          // Reset cheer state after 3 seconds
                          setTimeout(() => setCheeredNeighborhood(null), 3000);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 border ${
                          cheeredNeighborhood === leader?.name
                            ? 'bg-amber-500 border-amber-500 text-white shadow-inner'
                            : 'bg-white hover:bg-amber-50 border-amber-200 text-amber-700 hover:text-amber-800 shadow-sm'
                        }`}
                      >
                        <span>👏</span>
                        <span>
                          {cheeredNeighborhood === leader?.name 
                            ? (currentLang === 'fr' ? 'Soutenu !' : 'Supported!') 
                            : (currentLang === 'fr' ? 'Soutenir' : 'Cheer')}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Ranking List */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <span>{t.leaderboardNeighborhood}</span>
                  <span>{t.leaderboardScore}</span>
                </div>

                <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto">
                  {[...neighborhoodStats]
                    .sort((a, b) => b.total - a.total)
                    .map((item, index) => {
                      const isUserHome = currentUser?.neighborhood === item.name;
                      const isTop3 = index < 3;
                      const monthlyTarget = item.name === 'Owendo' ? 1000 : 500;
                      const pct = Math.min(100, Math.round((item.total / monthlyTarget) * 100));

                      const rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null;

                      return (
                        <div 
                          key={`rank-${item.name}`} 
                          className={`p-3 flex flex-col gap-2 transition-all ${
                            isUserHome ? 'bg-emerald-50/40' : 'hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              {/* Rank Indicator */}
                              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-extrabold text-slate-600 shrink-0">
                                {rankEmoji || (index + 1)}
                              </div>
                              <div className="truncate">
                                <span className={`text-xs font-bold ${isUserHome ? 'text-[#009E49] font-black' : 'text-slate-700'}`}>
                                  {item.name}
                                </span>
                                {isUserHome && (
                                  <span className="ml-1.5 text-[7px] font-extrabold uppercase tracking-wide bg-[#009E49]/10 text-[#009E49] px-1 py-0.5 rounded-md">
                                    {currentLang === 'fr' ? 'Chez vous' : 'Home'}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-xs font-black text-slate-800">{item.total.toFixed(0)} kg</span>
                            </div>
                          </div>

                          {/* Progress bar and breakdown */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[8px] text-slate-400 font-medium">
                              <span className="flex items-center gap-2">
                                <span className="text-[#009E49]">♻️ {item.recyclable.toFixed(0)} kg</span>
                                <span className="text-amber-600">🍂 {item.rotten.toFixed(0)} kg</span>
                              </span>
                              <span>{pct}% / {monthlyTarget} kg</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  index === 0 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                                  isUserHome ? 'bg-[#009E49]' : 'bg-slate-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FLOATING BOTTOM TAB BAR */}
      <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-lg border border-slate-100 rounded-2xl py-1.5 px-3 shadow-xl flex items-center justify-around z-20 shrink-0">
        
        {/* Tab 1 */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center transition-all px-2 py-1 rounded-xl cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#009E49] scale-105 bg-emerald-50/50 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-4.5 h-4.5" />
          <span className="text-[8px] mt-0.5">Home</span>
        </button>

        {/* Tab 2 */}
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center justify-center transition-all px-2 py-1 rounded-xl cursor-pointer ${
            activeTab === 'history'
              ? 'text-[#009E49] scale-105 bg-emerald-50/50 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <History className="w-4.5 h-4.5" />
          <span className="text-[8px] mt-0.5">{t.historyTitleShort}</span>
        </button>

        {/* Tab 3 - Learn & Win Game */}
        <button
          onClick={() => setActiveTab('game')}
          className={`flex flex-col items-center justify-center transition-all px-2 py-1 rounded-xl cursor-pointer ${
            activeTab === 'game'
              ? 'text-[#009E49] scale-105 bg-emerald-50/50 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Gamepad2 className="w-4.5 h-4.5" />
          <span className="text-[8px] mt-0.5">{t.gameTab}</span>
        </button>

        {/* Tab 4 - Neighborhood Eco-Challenge Leaderboard */}
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center justify-center transition-all px-2 py-1 rounded-xl cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'text-[#009E49] scale-105 bg-emerald-50/50 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Trophy className="w-4.5 h-4.5" />
          <span className="text-[8px] mt-0.5">{t.leaderboardTab}</span>
        </button>

        {/* Tab 5 */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center transition-all px-2 py-1 rounded-xl cursor-pointer ${
            activeTab === 'profile'
              ? 'text-[#009E49] scale-105 bg-emerald-50/50 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <UserCircle className="w-4.5 h-4.5" />
          <span className="text-[8px] mt-0.5">Profil</span>
        </button>
      </div>
      
    </div>
  );
}
