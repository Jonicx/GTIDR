import React, { useState, useEffect } from 'react';
import { CollectionRequest, TrashType } from '../types';
import { translations, Language } from '../utils/translations';
import { MapPin, Info, Navigation, Anchor, TreePine, ShieldCheck, Truck } from 'lucide-react';

interface InteractiveVectorMapProps {
  requests: CollectionRequest[];
  selectedRequestId: string | null;
  onSelectRequest: (request: CollectionRequest) => void;
  currentLang?: Language;
  activeSimulationRequest: CollectionRequest | null;
  onSimulationComplete: (requestId: string) => void;
}

export default function InteractiveVectorMap({
  requests,
  selectedRequestId,
  onSelectRequest,
  currentLang = 'fr',
  activeSimulationRequest,
  onSimulationComplete,
}: InteractiveVectorMapProps) {
  const t = translations[currentLang] || translations.fr;
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  // Simulated Truck States
  const [truckPos, setTruckPos] = useState({ x: 40, y: 82 }); // Starts at Owendo Depot
  const [truckStatus, setTruckStatus] = useState<string>('');
  const [isTruckMoving, setIsTruckMoving] = useState(false);

  useEffect(() => {
    if (activeSimulationRequest) {
      setIsTruckMoving(true);
      
      const targetNeighborhood = activeSimulationRequest.neighborhood;
      setTruckStatus(currentLang === 'fr' 
        ? `🚚 Camion en route vers ${targetNeighborhood}...` 
        : `🚚 Truck is en route to ${targetNeighborhood}...`
      );

      // Move truck to target coordinates
      setTruckPos({ x: activeSimulationRequest.map_x, y: activeSimulationRequest.map_y });

      // After 2.5s, update status to "arrived"
      const arrivalTimer = setTimeout(() => {
        setTruckStatus(currentLang === 'fr' 
          ? `📍 Arrivé à ${targetNeighborhood} ! Collecte en cours...` 
          : `📍 Arrived at ${targetNeighborhood}! Collecting...`
        );
        
        // After another 1.2s, complete the simulation
        const completeTimer = setTimeout(() => {
          setIsTruckMoving(false);
          setTruckStatus('');
          onSimulationComplete(activeSimulationRequest.id);
        }, 1200);

        return () => clearTimeout(completeTimer);
      }, 2500);

      return () => clearTimeout(arrivalTimer);
    }
  }, [activeSimulationRequest, currentLang, onSimulationComplete]);

  // Libreville Sectors/Neighborhoods coordinates for visual zones in SVG
  const sectors = [
    {
      name: 'Akanda',
      color: 'rgba(0, 158, 73, 0.08)', // Gabon Green with low opacity
      hoverColor: 'rgba(0, 158, 73, 0.18)',
      strokeColor: '#009E49',
      path: 'M 30,10 L 65,10 L 75,30 L 40,35 Z',
      labelX: 48,
      labelY: 20,
      description: 'Zone Résidentielle Nord & Éco-quartiers'
    },
    {
      name: 'La Sablière',
      color: 'rgba(58, 117, 196, 0.08)', // Gabon Blue with low opacity
      hoverColor: 'rgba(58, 117, 196, 0.18)',
      strokeColor: '#3A75C4',
      path: 'M 15,35 L 40,35 L 35,50 L 10,45 Z',
      labelX: 25,
      labelY: 42,
      description: 'Quartier Côtier Résidentiel'
    },
    {
      name: 'Charbonnages',
      color: 'rgba(252, 209, 22, 0.08)', // Gabon Yellow with low opacity
      hoverColor: 'rgba(252, 209, 22, 0.18)',
      strokeColor: '#FCD116',
      path: 'M 40,35 L 75,30 L 70,48 L 45,48 Z',
      labelX: 58,
      labelY: 38,
      description: 'Zone Commerciale & d\'Habitation'
    },
    {
      name: 'Louis',
      color: 'rgba(0, 158, 73, 0.06)',
      hoverColor: 'rgba(0, 158, 73, 0.15)',
      strokeColor: '#009E49',
      path: 'M 10,45 L 35,50 L 30,62 L 5,55 Z',
      labelX: 20,
      labelY: 53,
      description: 'Centre-ville / Zone Active'
    },
    {
      name: 'Nzeng-Ayong',
      color: 'rgba(58, 117, 196, 0.06)',
      hoverColor: 'rgba(58, 117, 196, 0.15)',
      strokeColor: '#3A75C4',
      path: 'M 35,50 L 70,48 L 65,68 L 40,70 Z',
      labelX: 52,
      labelY: 59,
      description: 'Grande Zone Résidentielle'
    },
    {
      name: 'Glass',
      color: 'rgba(252, 209, 22, 0.06)',
      hoverColor: 'rgba(252, 209, 22, 0.15)',
      strokeColor: '#FCD116',
      path: 'M 5,55 L 30,62 L 25,78 L 3,70 Z',
      labelX: 15,
      labelY: 67,
      description: 'Zone Commerciale & Industrielle'
    },
    {
      name: 'Owendo',
      color: 'rgba(58, 117, 196, 0.09)',
      hoverColor: 'rgba(58, 117, 196, 0.2)',
      strokeColor: '#3A75C4',
      path: 'M 3,70 L 40,70 L 65,68 L 85,90 L 15,95 Z',
      labelX: 40,
      labelY: 82,
      description: 'Port Industriel & Domestique Sud'
    }
  ];

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
      {/* Truck Status Alert Banner */}
      {truckStatus && (
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-sky-950/95 border border-sky-500/40 text-sky-200 px-3.5 py-2 rounded-xl text-[10px] sm:text-xs flex items-center gap-2 shadow-2xl animate-pulse z-50 backdrop-blur-md">
          <Truck className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
          <span className="font-bold tracking-wide">{truckStatus}</span>
        </div>
      )}

      {/* The Simulated moving collection truck */}
      <div 
        className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `${truckPos.x}%`,
          top: `${truckPos.y}%`,
          transition: isTruckMoving ? 'left 2500ms cubic-bezier(0.25, 1, 0.5, 1), top 2500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
      >
        <div className="relative">
          {/* Animated visual ripple */}
          {isTruckMoving && (
            <span className="absolute -inset-2 bg-sky-400/30 rounded-full animate-ping pointer-events-none" />
          )}
          <div className="bg-sky-50 text-sky-600 p-1.5 sm:p-2 rounded-xl shadow-lg border-2 border-sky-500 flex items-center justify-center">
            <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 fill-sky-100" />
          </div>
        </div>
      </div>

      {/* Coastline / Water Background */}
      <div className="absolute inset-0 bg-slate-950 pointer-events-none">
        {/* Ocean simulation on the left */}
        <div className="absolute top-0 bottom-0 left-0 w-[18%] bg-gradient-to-r from-slate-900 to-slate-950 opacity-40" />
      </div>

      {/* SVG Canvas for Map */}
      <svg
        id="libreville-svg-map"
        viewBox="0 0 100 100"
        className="w-full h-full select-none cursor-default"
        preserveAspectRatio="none"
      >
        {/* Estuary / Ocean boundary lines */}
        <path
          d="M 12,0 Q 8,25 10,40 T 3,65 T 5,100"
          fill="none"
          stroke="#1e293b"
          strokeWidth="1.5"
          strokeDasharray="2,2"
        />

        {/* Port d'Owendo Landmark Anchors */}
        <path
          d="M 5,85 L 12,85"
          stroke="#384252"
          strokeWidth="1"
          strokeDasharray="1,1"
        />

        {/* Neighborhood Sector Polygons */}
        {sectors.map((sector) => {
          const isHovered = hoveredSector === sector.name;
          return (
            <g key={sector.name}>
              <path
                d={sector.path}
                fill={isHovered ? sector.hoverColor : sector.color}
                stroke={sector.strokeColor}
                strokeWidth={isHovered ? "0.6" : "0.3"}
                strokeOpacity={isHovered ? "0.8" : "0.4"}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredSector(sector.name)}
                onMouseLeave={() => setHoveredSector(null)}
              />
              
              {/* Sector Name Text */}
              <text
                x={sector.labelX}
                y={sector.labelY}
                fill={isHovered ? "#ffffff" : "#94a3b8"}
                fontSize="2.4"
                fontWeight={isHovered ? "bold" : "normal"}
                textAnchor="middle"
                className="transition-colors duration-150 pointer-events-none"
              >
                {sector.name}
              </text>
            </g>
          );
        })}

        {/* Main Road Highway Lines (Boulevard Triomphal / Voie Rapide) */}
        <path
          d="M 48,10 Q 35,40 20,53 T 15,82 T 35,95"
          fill="none"
          stroke="#1e293b"
          strokeWidth="0.8"
          strokeOpacity="0.7"
          pointerEvents="none"
        />
        <path
          d="M 45,35 Q 55,50 52,59 T 40,82"
          fill="none"
          stroke="#1e293b"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          pointerEvents="none"
        />

        {/* Custom Completed Requests - Faint Green Stars/Dots for historical density */}
        <circle cx="48" cy="27" r="0.6" fill="#009E49" fillOpacity="0.4" />
        <circle cx="60" cy="52" r="0.6" fill="#009E49" fillOpacity="0.4" />
        <circle cx="71" cy="83" r="0.6" fill="#009E49" fillOpacity="0.4" />
        <circle cx="53" cy="40" r="0.6" fill="#009E49" fillOpacity="0.4" />
      </svg>

      {/* Floating Overlays - Map Widgets */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 font-semibold text-white border-b border-slate-800 pb-1 mb-1">
          <Navigation className="w-3.5 h-3.5 text-sky-400 rotate-45" />
          <span>Libreville Sector Map</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{requests.length} demandes actives</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-600" />
          <span>Zones de collecte sécurisées</span>
        </div>
      </div>

      {/* Map Labels/Indicators */}
      <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400">
        <span className="flex items-center gap-1"><TreePine className="w-3 h-3 text-emerald-500" /> Parc d'Akanda</span>
        <span className="flex items-center gap-1"><Anchor className="w-3 h-3 text-sky-500" /> Port d'Owendo</span>
      </div>

      {/* Hover Sector Card */}
      {hoveredSector && (
        <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl max-w-[200px] text-xs transition-opacity duration-150 animate-fade-in pointer-events-none">
          <div className="font-bold text-white text-sm flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            {hoveredSector}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            {sectors.find(s => s.name === hoveredSector)?.description}
          </p>
          <div className="mt-1.5 pt-1.5 border-t border-slate-800 flex justify-between text-[10px]">
            <span className="text-slate-500">Demandes actives:</span>
            <span className="font-semibold text-emerald-400">
              {requests.filter(r => r.neighborhood === hoveredSector).length}
            </span>
          </div>
        </div>
      )}

      {/* Request Pins Overlay (HTML rendered on top of SVG map using absolute positions) */}
      {requests.map((req) => {
        const isSelected = selectedRequestId === req.id;
        // Determine theme based on trash type
        let badgeColor = 'bg-emerald-500 shadow-emerald-500/50';
        if (req.trash_type === TrashType.ROTTEN) {
          badgeColor = 'bg-amber-500 shadow-amber-500/50';
        } else if (req.trash_type === TrashType.BOTH) {
          badgeColor = 'bg-sky-500 shadow-sky-500/50';
        }

        return (
          <button
            key={req.id}
            id={`pin-btn-${req.id}`}
            onClick={() => onSelectRequest(req)}
            className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${req.map_x}%`,
              top: `${req.map_y}%`,
              zIndex: isSelected ? 40 : 20
            }}
          >
            {/* Pulsating ring */}
            <span className={`absolute -inset-2 rounded-full opacity-60 animate-ping duration-1000 ${isSelected ? 'bg-rose-500 scale-150' : 'bg-rose-600'}`} />

            {/* Solid Marker Icon */}
            <div className={`relative flex items-center justify-center p-1.5 rounded-full transition-all duration-200 shadow-lg ${
              isSelected
                ? 'bg-rose-500 scale-125 border-2 border-white'
                : 'bg-rose-600 group-hover:bg-rose-500 group-hover:scale-110'
            }`}>
              <MapPin className="w-4 h-4 text-white" />
              
              {/* Quick Type Indicator on top-right */}
              <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-slate-950 ${badgeColor}`} />
            </div>

            {/* Quick-peek tooltips */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-slate-950 border border-slate-800 text-white text-[10px] px-2 py-1 rounded-md shadow-2xl z-50">
              <p className="font-bold">{req.user_name}</p>
              <p className="text-slate-400">{req.trash_type} • {req.quantity_value}kg</p>
              <p className="text-emerald-400 font-mono text-[9px]">{req.id}</p>
            </div>
          </button>
        );
      })}

      {/* Selected Request Detail Card inside Map */}
      {selectedRequestId && (
        <div className="absolute bottom-3 left-3 right-3 bg-slate-950/95 backdrop-blur-md border border-rose-500/30 p-3 rounded-xl shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-slide-up z-30">
          {(() => {
            const req = requests.find(r => r.id === selectedRequestId);
            if (!req) return null;
            return (
              <>
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={req.user_avatar}
                    alt={req.user_name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-700 object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-white text-xs sm:text-sm truncate max-w-[120px]">{req.user_name}</span>
                      <span className="text-[9px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                        {req.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] sm:text-xs flex-wrap">
                      <span className="text-slate-300 font-medium truncate max-w-[80px]">{req.neighborhood}</span>
                      <span className="text-slate-500">•</span>
                      <span className={`font-semibold shrink-0 ${
                        req.trash_type === TrashType.RECYCLABLE ? 'text-emerald-400' :
                        req.trash_type === TrashType.ROTTEN ? 'text-amber-400' : 'text-sky-400'
                      }`}>
                        {req.trash_type === TrashType.RECYCLABLE ? t.recyclableTitle.split(' ')[0] :
                         req.trash_type === TrashType.ROTTEN ? t.organicTitle.split(' ')[0] : t.bothTitle.split(' ')[0]}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-white font-medium shrink-0">{req.quantity_value} kg</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-slate-900 pt-2 sm:pt-0 sm:border-0 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-[9px] text-slate-500">{t.locationStep}</div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-slate-300">{req.latitude.toFixed(4)}, {req.longitude.toFixed(4)}</div>
                  </div>
                  <button
                    onClick={() => {
                      const pin = document.getElementById(`pin-btn-${req.id}`);
                      if (pin) {
                        pin.classList.add('scale-150');
                        setTimeout(() => pin.classList.remove('scale-150'), 500);
                      }
                    }}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
