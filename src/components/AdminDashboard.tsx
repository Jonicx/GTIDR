import React, { useState } from 'react';
import { CollectionRequest, TrashType, RequestStatus } from '../types';
import { translations, Language } from '../utils/translations';
import InteractiveVectorMap from './InteractiveVectorMap';
import {
  MapPin,
  Check,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Scale,
  PlusCircle,
  User,
  Trash2,
  Calendar,
  Lock,
  RefreshCw,
  Globe,
  Flame,
  LayoutDashboard
} from 'lucide-react';

interface AdminDashboardProps {
  requests: CollectionRequest[];
  onConfirmPickup: (requestCode: string) => void;
  selectedRequestId: string | null;
  onSelectRequest: (request: CollectionRequest) => void;
  onSpawnRandomRequest: () => void;
  totalStats: {
    totalWeight: number;
    recyclableWeight: number;
    rottenWeight: number;
    completedCount: number;
  };
  neighborhoodStats: { name: string; recyclable: number; rotten: number; total: number }[];
  dailyStats: { date: string; recyclable: number; rotten: number }[];
  currentLang: Language;
}

export default function AdminDashboard({
  requests,
  onConfirmPickup,
  selectedRequestId,
  onSelectRequest,
  onSpawnRandomRequest,
  totalStats,
  neighborhoodStats,
  dailyStats,
  currentLang,
}: AdminDashboardProps) {
  const t = translations[currentLang] || translations.fr;

  // Tabs for the Admin panel: 'map' or 'analytics'
  const [adminTab, setAdminTab] = useState<'map' | 'analytics'>('map');

  // Code input state
  const [codeInput, setCodeInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<CollectionRequest | null>(null);
  const [verificationError, setVerificationError] = useState('');

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError('');
    setVerificationResult(null);

    const formattedCode = codeInput.trim().toUpperCase();
    if (!formattedCode) {
      setVerificationError(t.codeRequiredError);
      return;
    }

    const matched = requests.find(
      (r) => r.verification_code.toUpperCase() === formattedCode && r.status === RequestStatus.PENDING
    );

    if (matched) {
      setVerificationResult(matched);
      onSelectRequest(matched);
    } else {
      setVerificationError(t.noRequestFoundError);
    }
  };

  const handleConfirmAction = () => {
    if (verificationResult) {
      onConfirmPickup(verificationResult.verification_code);
      setVerificationResult(null);
      setCodeInput('');
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-full w-full">
      
      {/* Top Admin Header */}
      <div className="bg-slate-950 p-4 sm:px-6 sm:py-4 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#3A75C4] to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 shrink-0">
            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-2">
              {t.adminTitle}
              <span className="text-[9px] font-bold text-slate-400 font-mono bg-slate-900 border border-slate-800 px-1 py-0.5 rounded">
                v1.1.0
              </span>
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-400">{t.adminSubtitle}</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-center">
          <button
            onClick={() => setAdminTab('map')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              adminTab === 'map'
                ? 'bg-[#3A75C4] text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.adminMapTab}</span>
          </button>
          <button
            onClick={() => setAdminTab('analytics')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              adminTab === 'analytics'
                ? 'bg-[#3A75C4] text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.adminAnalyticsTab}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {adminTab === 'map' ? (
          
          /* VIEW 1: CARTE & VERIFICATION */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Map (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  {t.liveMapTitle}
                </h3>

                {/* Simulated demand spawner */}
                <button
                  type="button"
                  onClick={onSpawnRandomRequest}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 hover:border-slate-600 rounded-xl text-[10px] sm:text-xs font-bold text-emerald-400 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{t.simCitizenBtn}</span>
                </button>
              </div>

              {/* Vector Map Component */}
              <InteractiveVectorMap
                requests={requests}
                selectedRequestId={selectedRequestId}
                onSelectRequest={onSelectRequest}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3 text-center">
                  <div className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">{t.activeWeight}</div>
                  <div className="text-base sm:text-xl font-extrabold text-[#FCD116] mt-0.5 sm:mt-1">
                    {requests.reduce((acc, r) => acc + r.quantity_value, 0).toFixed(1)} kg
                  </div>
                </div>
                <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3 text-center">
                  <div className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">{t.pendingRequestsCount}</div>
                  <div className="text-base sm:text-xl font-extrabold text-rose-400 mt-0.5 sm:mt-1">
                    {requests.length}
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-slate-950/40 border border-slate-800 rounded-xl p-3 text-center">
                  <div className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">{t.globalHistory}</div>
                  <div className="text-base sm:text-xl font-extrabold text-emerald-400 mt-0.5 sm:mt-1">
                    {totalStats.completedCount} {t.completedCards}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Code Input & Action Panel (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Verification Panel */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
                  <Lock className="w-4 h-4 text-[#FCD116]" />
                  <span>{t.codeSaisieTitle}</span>
                </div>

                <form onSubmit={handleVerifyCode} className="space-y-3">
                  <p className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed">
                    {t.codeSaisieHelp}
                  </p>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t.codePlaceholder}
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm sm:text-base font-bold font-mono text-center tracking-widest text-emerald-400 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#3A75C4]/40 focus:border-[#3A75C4] uppercase"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs border border-slate-700 transition-all cursor-pointer"
                  >
                    {t.verifyCodeBtn}
                  </button>
                </form>

                {verificationError && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-950/40 border border-red-900/50 text-[10px] sm:text-[11px] text-red-400">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{verificationError}</span>
                  </div>
                )}

                {/* VERIFICATION REVEALED PANEL */}
                {verificationResult && (
                  <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-3 sm:p-4 space-y-3 animate-slide-up">
                    <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-400">{t.codeValidSuccess}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <img
                        src={verificationResult.user_avatar}
                        alt={verificationResult.user_name}
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-slate-700 object-cover"
                      />
                      <div>
                        <div className="text-[11px] sm:text-xs font-extrabold text-white">{verificationResult.user_name}</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400">{verificationResult.user_phone}</div>
                        <div className="text-[9px] sm:text-[10px] text-sky-400 font-semibold mt-0.5">{verificationResult.neighborhood}</div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-2 sm:p-2.5 rounded-lg border border-slate-800 text-[10px] sm:text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.trashSacks}</span>
                        <span className={`font-bold ${
                          verificationResult.trash_type === TrashType.RECYCLABLE ? 'text-emerald-400' :
                          verificationResult.trash_type === TrashType.ROTTEN ? 'text-amber-400' : 'text-sky-400'
                        }`}>
                          {verificationResult.trash_type === TrashType.RECYCLABLE ? t.recyclableTitle.split(' ')[0] :
                           verificationResult.trash_type === TrashType.ROTTEN ? t.organicTitle.split(' ')[0] : 'Both'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.estimatedWeight}</span>
                        <span className="font-bold text-white">{verificationResult.quantity_value} kg</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleConfirmAction}
                      className="w-full bg-[#009E49] hover:bg-emerald-600 text-white font-black py-2.5 rounded-xl text-[10px] sm:text-xs transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.confirmPickupBtn}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sector Guidelines/Admins Checklist */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
                <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider">{t.secRulesTitle}</h4>
                <ul className="text-[10px] sm:text-[11px] text-slate-400 space-y-2 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#009E49] mt-1 shrink-0" />
                    <span>{t.secRule1}</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FCD116] mt-1 shrink-0" />
                    <span>{t.secRule2.replace('{weight}', verificationResult?.quantity_value.toString() || 'X')}</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A75C4] mt-1 shrink-0" />
                    <span>{t.secRule3}</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        ) : (
          
          /* VIEW 2: ANALYTICS & VOLUMES */
          <div className="space-y-6">
            
            {/* Top Grid Highlight Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 sm:p-4">
                <div className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">{t.totalWeightCollected}</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-0.5 sm:mt-1">{(totalStats.totalWeight).toFixed(1)} kg</div>
                <div className="text-[9px] sm:text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5 font-semibold">
                  <TrendingUp className="w-3 h-3 shrink-0" /> {t.growthLabel.split(' ')[0]} {t.growthLabel.split(' ').slice(1).join(' ')}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 sm:p-4">
                <div className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">{t.recyPlasticsTitle}</div>
                <div className="text-lg sm:text-2xl font-black text-[#009E49] mt-0.5 sm:mt-1">{(totalStats.recyclableWeight).toFixed(1)} kg</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">
                  ~ {((totalStats.recyclableWeight / totalStats.totalWeight) * 100 || 0).toFixed(0)}% total
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 sm:p-4">
                <div className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">{t.compostTitle}</div>
                <div className="text-lg sm:text-2xl font-black text-amber-500 mt-0.5 sm:mt-1">{(totalStats.rottenWeight).toFixed(1)} kg</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">
                  {t.valorizedFarms}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 sm:p-4">
                <div className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">{t.completionRateTitle}</div>
                <div className="text-lg sm:text-2xl font-black text-[#3A75C4] mt-0.5 sm:mt-1">98.4%</div>
                <div className="text-[9px] sm:text-[10px] text-emerald-400 mt-1 truncate">
                  {t.averageTime}
                </div>
              </div>
            </div>

            {/* Custom SVG Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart A: Volume collected by neighborhood (SVG Bar Chart) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.statsTitle}</h4>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">{t.unitKg}</span>
                </div>

                <div className="space-y-3">
                  {neighborhoodStats.map((neigh) => {
                    const maxTotal = Math.max(...neighborhoodStats.map(n => n.total), 1);
                    return (
                      <div key={neigh.name} className="space-y-1">
                        <div className="flex justify-between text-[11px] sm:text-xs">
                          <span className="font-bold text-slate-300">{neigh.name}</span>
                          <span className="font-mono text-slate-400 text-[10px] sm:text-[11px]">
                            <b>{(neigh.total).toFixed(1)} kg</b>
                          </span>
                        </div>
                        {/* Custom multi-color stacked bar */}
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                          <div
                            style={{ width: `${(neigh.recyclable / maxTotal) * 100}%`, animationDuration: '3s' }}
                            className="bg-[#009E49] h-full animate-pulse"
                            title="Recyclable"
                          />
                          <div
                            style={{ width: `${(neigh.rotten / maxTotal) * 100}%` }}
                            className="bg-amber-500 h-full"
                            title="Organic"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[9px] sm:text-[10px] justify-center border-t border-slate-900/60">
                  <span className="flex items-center gap-1.5 text-[#009E49] font-bold">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#009E49]" /> {t.recyPlasticsTitle}
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> {t.compostTitle}
                  </span>
                </div>
              </div>

              {/* Chart B: Daily Trend Line Chart (SVG Plot) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.dailyTrendTitle}</h4>
                  <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold">Weekly</span>
                </div>

                {/* SVG Area Chart */}
                <div className="relative h-[160px] sm:h-[200px] w-full flex items-end">
                  <svg viewBox="0 0 100 45" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3A75C4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3A75C4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    <line x1="0" y1="5" x2="100" y2="5" stroke="#1e293b" strokeWidth="0.2" />
                    <line x1="0" y1="15" x2="100" y2="15" stroke="#1e293b" strokeWidth="0.2" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#1e293b" strokeWidth="0.2" />
                    <line x1="0" y1="35" x2="100" y2="35" stroke="#1e293b" strokeWidth="0.2" />

                    {/* SVG Path calculation for Daily Stats */}
                    {(() => {
                      const points = dailyStats.map((stat, idx) => {
                        const total = stat.recyclable + stat.rotten;
                        const x = (idx / (dailyStats.length - 1)) * 100;
                        const y = 40 - (total / 150) * 35; // mapped to height coordinates
                        return { x, y, ...stat };
                      });

                      const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                      const areaD = `${pathD} L 100 40 L 0 40 Z`;

                      return (
                        <>
                          {/* Shaded Area */}
                          <path d={areaD} fill="url(#chartGrad)" />

                          {/* Line Plot */}
                          <path d={pathD} fill="none" stroke="#3A75C4" strokeWidth="0.8" />

                          {/* Dots */}
                          {points.map((p, i) => (
                            <g key={i}>
                              <circle cx={p.x} cy={p.y} r="1.2" fill="#ffffff" stroke="#3A75C4" strokeWidth="0.4" />
                              <text x={p.x} y={p.y - 2.2} fill="#ffffff" fontSize="2" textAnchor="middle" fontWeight="bold">
                                {(p.recyclable + p.rotten).toFixed(0)}k
                              </text>
                              <text x={p.x} y="44" fill="#64748b" fontSize="2.2" textAnchor="middle" fontWeight="500">
                                {p.date}
                              </text>
                            </g>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>

                <p className="text-[9px] sm:text-[10px] text-slate-500 text-center leading-relaxed">
                  {t.dailyTrendDesc}
                </p>
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  );
}
