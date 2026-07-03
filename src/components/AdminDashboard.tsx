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
  LayoutDashboard,
  Smartphone
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
  onSwitchToCitizen?: () => void;
  activeSimulationRequest: CollectionRequest | null;
  onSimulationComplete: (requestId: string) => void;
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
  onSwitchToCitizen,
  activeSimulationRequest,
  onSimulationComplete,
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

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Veuillez autoriser les fenêtres contextuelles (popups) pour exporter le rapport PDF.');
      return;
    }

    const dateStr = new Date().toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const neighborhoodRows = neighborhoodStats.map(n => `
      <tr>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">${n.name}</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #009e49; font-weight: bold;">${n.recyclable.toFixed(1)} kg</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #d97706; font-weight: bold;">${n.rotten.toFixed(1)} kg</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 800; color: #0f172a; background-color: #f8fafc;">${n.total.toFixed(1)} kg</td>
      </tr>
    `).join('');

    const co2Reduction = (totalStats.recyclableWeight * 1.5 + totalStats.rottenWeight * 0.8).toFixed(1);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GTIDR - Rapport Municipal de Collecte</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              color: #1e293b;
              margin: 40px;
              line-height: 1.5;
            }
            .header {
              border-bottom: 3px solid #009E49;
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .title-section h1 {
              font-size: 24px;
              margin: 0;
              color: #0f172a;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .title-section p {
              margin: 5px 0 0 0;
              font-size: 13px;
              color: #64748b;
            }
            .gabon-colors {
              display: flex;
              height: 6px;
              margin-top: 15px;
              width: 120px;
              border-radius: 3px;
              overflow: hidden;
            }
            .green-bar { background-color: #009E49; flex: 1; }
            .yellow-bar { background-color: #FCD116; flex: 1; }
            .blue-bar { background-color: #3A75C4; flex: 1; }
            .meta {
              text-align: right;
              font-size: 11px;
              color: #64748b;
            }
            .summary-cards {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-bottom: 40px;
            }
            .card {
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 15px;
              background-color: #f8fafc;
            }
            .card-title {
              font-size: 10px;
              font-weight: bold;
              color: #64748b;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .card-val {
              font-size: 20px;
              font-weight: 900;
              color: #0f172a;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 40px;
            }
            th {
              background-color: #f1f5f9;
              padding: 12px 10px;
              font-size: 11px;
              font-weight: bold;
              text-transform: uppercase;
              color: #475569;
              border-bottom: 2px solid #cbd5e1;
            }
            .footer {
              border-top: 1px solid #e2e8f0;
              padding-top: 15px;
              font-size: 10px;
              color: #94a3b8;
              text-align: center;
              margin-top: 50px;
            }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title-section">
              <h1>GTIDR Gabon</h1>
              <p>Rapport d'Analyse Municipale des Collectes de Déchets</p>
              <div class="gabon-colors">
                <div class="green-bar"></div>
                <div class="yellow-bar"></div>
                <div class="blue-bar"></div>
              </div>
            </div>
            <div class="meta">
              <div><strong>Généré le:</strong> ${dateStr}</div>
              <div><strong>Portée:</strong> Grand Libreville (Estuaire)</div>
              <div><strong>Statut:</strong> Officiel / Certifié</div>
            </div>
          </div>

          <div class="summary-cards">
            <div class="card" style="border-left: 4px solid #009E49;">
              <div class="card-title">Volume Total Collecté</div>
              <div class="card-val">${totalStats.totalWeight.toFixed(1)} kg</div>
            </div>
            <div class="card" style="border-left: 4px solid #3A75C4;">
              <div class="card-title">Plastiques Recyclés (PET/Alu)</div>
              <div class="card-val">${totalStats.recyclableWeight.toFixed(1)} kg</div>
            </div>
            <div class="card" style="border-left: 4px solid #FCD116;">
              <div class="card-title">Impact Évité (CO2)</div>
              <div class="card-val">~ ${co2Reduction} kg CO2</div>
            </div>
          </div>

          <h3 style="font-size: 14px; margin-bottom: 15px; color: #0f172a; text-transform: uppercase; border-left: 3px solid #3A75C4; padding-left: 8px; font-weight: 800;">
            Rendement Analytique par Quartier / Secteur
          </h3>
          <table>
            <thead>
              <tr>
                <th style="text-align: left;">Secteur / Quartier</th>
                <th style="text-align: right;">Volume Recyclable (kg)</th>
                <th style="text-align: right;">Volume Compostable (kg)</th>
                <th style="text-align: right;">Total Collecté (kg)</th>
              </tr>
            </thead>
            <tbody>
              ${neighborhoodRows}
            </tbody>
          </table>

          <div class="footer">
            <p>Ce document est un rapport officiel généré automatiquement par la plateforme GTIDR Gabon de tri sélectif.</p>
            <p>© ${new Date().getFullYear()} GTIDR Libreville. Tous droits réservés.</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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

        {/* Tab Buttons & Back to Citizen Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
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

          {onSwitchToCitizen && (
            <button
              onClick={onSwitchToCitizen}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold bg-[#009E49] hover:bg-emerald-600 text-white transition-all shadow-md shadow-emerald-950/20 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.simCitizen}</span>
            </button>
          )}
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
                currentLang={currentLang}
                activeSimulationRequest={activeSimulationRequest}
                onSimulationComplete={onSimulationComplete}
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
            
            {/* Download Report Row */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="text-center sm:text-left space-y-1">
                <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009E49]" />
                  <span>{currentLang === 'fr' ? 'Rapports Administratifs Municipaux' : 'Municipal Administrative Reports'}</span>
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  {currentLang === 'fr' 
                    ? 'Téléchargez le rapport officiel au format PDF contenant l\'analyse détaillée des quartiers (Akanda, Owendo, Glass, etc.).'
                    : 'Download the official PDF report containing the detailed analysis of neighborhoods.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportPDF}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-950/20 active:scale-95 cursor-pointer border border-emerald-500"
              >
                <TrendingUp className="w-4 h-4 text-emerald-100 rotate-90" />
                <span>{t.generateReportBtn}</span>
              </button>
            </div>

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
