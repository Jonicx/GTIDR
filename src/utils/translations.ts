export type Language = 'fr' | 'en';

export interface TranslationSchema {
  // Common
  appTitle: string;
  appSubtitle: string;
  solutionEco: string;
  simDual: string;
  simCitizen: string;
  simAdmin: string;
  guideSim: string;
  footerCrafted: string;
  logout: string;
  adminDashboard: string;
  welcomeSim: string;
  notificationCancelled: string;
  notificationPickupSuccess: string;
  notificationSpawned: string;

  // Login
  fullName: string;
  fullNamePlaceholder: string;
  fullNameError: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneHelp: string;
  phoneError: string;
  neighborhoodLabel: string;
  phoneLoginBtn: string;
  googleLoginBtn: string;
  or: string;
  prototypeVersion: string;

  // Dashboard / Request Form
  welcomeUser: string;
  locationGabon: string;
  citizenBadge: string;
  activeRequestTitle: string;
  cancelBtn: string;
  verificationCodeLabel: string;
  verificationCodeHelp: string;
  trashTypeLabel: string;
  estimatedWeight: string;
  capturedPosition: string;
  driverHeadingText: string;
  takeOutTrashHeader: string;
  takeOutTrashHelp: string;
  totalSorted: string;
  historyCount: string;
  trashTypeStep: string;
  recyclableTitle: string;
  recyclableDesc: string;
  organicTitle: string;
  organicDesc: string;
  bothTitle: string;
  bothDesc: string;
  quantityStep: string;
  qtyEstimateTab: string;
  qtyWeighedTab: string;
  sizeSmall: string;
  sizeMedium: string;
  sizeLarge: string;
  preciseWeightPlaceholder: string;
  locationStep: string;
  gpsAcquired: string;
  recalibrate: string;
  gpsGetting: string;
  gpsCaptureBtn: string;
  gpsErrorNotSupported: string;
  takeOutSubmitBtn: string;
  alreadyHasPendingError: string;
  requestCreatedSuccess: string;

  // Impact & History
  myEcoImpact: string;
  recyclablesSaved: string;
  organicComposted: string;
  co2Avoided: string;
  pastTransactions: string;
  noCollections: string;
  historyTitleShort: string;
  ruleHeader: string;
  ruleDesc: string;
  ruleWarning: string;

  // Admin Dashboard
  adminTitle: string;
  adminSubtitle: string;
  adminMapTab: string;
  adminAnalyticsTab: string;
  liveMapTitle: string;
  simCitizenBtn: string;
  activeWeight: string;
  pendingRequestsCount: string;
  globalHistory: string;
  codeSaisieTitle: string;
  codeSaisieHelp: string;
  codePlaceholder: string;
  verifyCodeBtn: string;
  codeRequiredError: string;
  noRequestFoundError: string;
  codeValidSuccess: string;
  trashSacks: string;
  confirmPickupBtn: string;
  secRulesTitle: string;
  secRule1: string;
  secRule2: string;
  secRule3: string;
  activeWeightTitle: string;
  recyPlasticsTitle: string;
  compostTitle: string;
  completionRateTitle: string;
  statsTitle: string;
  dailyTrendTitle: string;
  dailyTrendDesc: string;
  totalWeightCollected: string;
  unitKg: string;
  completedCards: string;
  averageTime: string;
  growthLabel: string;
  valorizedFarms: string;

  // New Features: Game, Truck, PDF
  gameTab: string;
  gameHeader: string;
  gameDesc: string;
  recyclableBin: string;
  organicBin: string;
  correct: string;
  incorrect: string;
  score: string;
  streak: string;
  certifiedBadge: string;
  playAgain: string;
  congrats: string;
  generateReportBtn: string;
  municipalReportTitle: string;
  republiqueGabonaise: string;
  unionTravailJustice: string;
  ministryEnv: string;
  printReport: string;
  reportClose: string;
  leaderboardTab: string;
  leaderboardHeader: string;
  leaderboardDesc: string;
  leaderboardRank: string;
  leaderboardNeighborhood: string;
  leaderboardScore: string;
  leaderboardRecyclable: string;
  leaderboardOrganic: string;
  leaderboardMonthlyTarget: string;
  leaderboardLeadLabel: string;
  leaderboardRainySeasonWarning: string;
}

export const translations: Record<Language, TranslationSchema> = {
  fr: {
    appTitle: "GTIDR Gabon",
    appSubtitle: "Solution écologique de gestion des déchets pour Libreville et Akanda",
    solutionEco: "● Transport Intelligent des Déchets",
    simDual: "Simulateur Double",
    simCitizen: "App Citoyen (Mobile)",
    simAdmin: "Portail Collecteur (Admin)",
    guideSim: "Guide de simulation : Créez une demande à gauche, voyez le point rouge apparaître sur la carte, puis entrez le code G-XXXX sur le clavier d'administration pour valider le recyclage !",
    footerCrafted: "Façonné avec pour le recyclage au Gabon",
    logout: "Se déconnecter",
    adminDashboard: "Accéder au tableau d'administration",
    welcomeSim: "Bienvenue dans GTIDR Gabon ! Mode Simulation Côte-à-Côte actif.",
    notificationCancelled: "Demande de collecte annulée.",
    notificationPickupSuccess: "Ramassage validé pour {name} ! Volume: {weight}kg enregistré.",
    notificationSpawned: "Nouvelle demande de {name} ({neighborhood}) ajoutée sur la carte !",

    fullName: "Nom complet",
    fullNamePlaceholder: "Ex. Merveille Nkoghe",
    fullNameError: "Veuillez saisir votre nom complet.",
    phoneLabel: "Numéro de Téléphone (Gabon)",
    phonePlaceholder: "077 12 34 56",
    phoneHelp: "Sert d'identifiant unique pour valider vos ramassages.",
    phoneError: "Veuillez saisir un numéro de téléphone valide.",
    neighborhoodLabel: "Votre Quartier (Libreville)",
    phoneLoginBtn: "Se connecter par Téléphone",
    googleLoginBtn: "Connexion rapide avec Google",
    or: "ou",
    prototypeVersion: "GTIDR Libreville, Gabon • Version Prototype",

    welcomeUser: "Salut, {name}",
    locationGabon: "{neighborhood}, Gabon",
    citizenBadge: "Citoyen",
    activeRequestTitle: "En attente de collecte...",
    cancelBtn: "Annuler",
    verificationCodeLabel: "Code de vérification du ramasseur",
    verificationCodeHelp: "Donnez ce code au collecteur à son arrivée pour valider la prise en charge sécurisée.",
    trashTypeLabel: "Type de Déchets:",
    estimatedWeight: "Poids Estimé:",
    capturedPosition: "Position capturée:",
    driverHeadingText: "Le collecteur se dirige vers votre quartier {neighborhood}. Préparez vos sacs recyclables !",
    takeOutTrashHeader: "Sortir vos poubelles",
    takeOutTrashHelp: "Enregistrez vos déchets de tri. Un collecteur agréé viendra valider et peser vos sacs à domicile.",
    totalSorted: "Total trié",
    historyCount: "collectes",
    trashTypeStep: "1. Type de déchets",
    recyclableTitle: "Recyclables plastiques / papiers",
    recyclableDesc: "Bouteilles PET, canettes, cartons d’emballages...",
    organicTitle: "Déchets organiques / Compost",
    organicDesc: "Restes de repas, épluchures de manioc/tarot...",
    bothTitle: "Les deux (sacs séparés)",
    bothDesc: "Pour trier simultanément les deux catégories.",
    quantityStep: "2. Quantité estimée",
    qtyEstimateTab: "Estimation",
    qtyWeighedTab: "Poids pesé",
    sizeSmall: "Petit",
    sizeMedium: "Moyen",
    sizeLarge: "Grand",
    preciseWeightPlaceholder: "Entrez le poids exact en kg",
    locationStep: "3. Coordonnées de collecte",
    gpsAcquired: "GPS Acquis:",
    recalibrate: "Recalibrer",
    gpsGetting: "Géolocalisation en cours...",
    gpsCaptureBtn: "Capturer ma position GPS exacte",
    gpsErrorNotSupported: "La géolocalisation n’est pas supportée par votre navigateur.",
    takeOutSubmitBtn: "Sortir les Poubelles !",
    alreadyHasPendingError: "Vous avez déjà une demande en attente. Veuillez la finaliser ou l'annuler.",
    requestCreatedSuccess: "Demande créée ! Code de collecte : {code}",

    myEcoImpact: "Mon Impact Écologique",
    recyclablesSaved: "Recyclables sauvés",
    organicComposted: "Organique composté",
    co2Avoided: "Bilan carbone évité",
    pastTransactions: "Mes transactions passées",
    noCollections: "Aucune collecte enregistrée pour l'instant.",
    historyTitleShort: "Historique",
    ruleHeader: "Règles écologiques du Gabon",
    ruleDesc: "Au Gabon, la gestion des déchets progresse rapidement. En triant vos plastiques en collaboration avec l'ANASUT et GTIDR, vous évitez le blocage des caniveaux à Libreville lors des grandes pluies tropicales.",
    ruleWarning: "Important: Ne déposez aucun verre brisé ou déchet médical avec les recyclables ordinaires.",

    adminTitle: "GTIDR Administrateur",
    adminSubtitle: "Réseau Intelligent de Collecte de Libreville",
    adminMapTab: "Carte & Saisie",
    adminAnalyticsTab: "Analyses & Volumes",
    liveMapTitle: "Localisation en temps réel des déchets",
    simCitizenBtn: "Simuler un citoyen",
    activeWeight: "Poids Actif",
    pendingRequestsCount: "Demandes en attente",
    globalHistory: "Historique Global",
    codeSaisieTitle: "Saisie Code Ramasseur",
    codeSaisieHelp: "Lors de l'arrivée du camion de collecte, le citoyen fournit son code de sécurité à 6 caractères.",
    codePlaceholder: "Ex: G-4829",
    verifyCodeBtn: "Vérifier le Code",
    codeRequiredError: "Veuillez entrer un code.",
    noRequestFoundError: "Aucune demande en attente trouvée pour ce code.",
    codeValidSuccess: "Code Valide ! Correspondance:",
    trashSacks: "Sacs Triés:",
    confirmPickupBtn: "Confirmer le ramassage",
    secRulesTitle: "Processus de sécurité du tri",
    secRule1: "Étape 1: Inspectez visuellement le sac recyclable (pas de contaminations d'ordures ménagères).",
    secRule2: "Étape 2: Rapprochez la quantité physique du poids estimé de {weight} kg.",
    secRule3: "Étape 3: Soumettez le code, ce qui met à jour instantanément les statistiques du citoyen.",
    activeWeightTitle: "Poids total collecté",
    recyPlasticsTitle: "Recyclables plastiques",
    compostTitle: "Organique / Compost",
    completionRateTitle: "Taux d'achèvement",
    statsTitle: "Volumes par quartier (Libreville)",
    dailyTrendTitle: "Progression quotidienne des collectes",
    dailyTrendDesc: "Graphique de la charge collectée quotidiennement (kg). Les données incluent le plastique trié et la matière bio-dégradable.",
    totalWeightCollected: "Poids total collecté",
    unitKg: "Unité: kg",
    completedCards: "fiches",
    averageTime: "Temps moyen de ramassage: 38 min",
    growthLabel: "+14.2% depuis la semaine passée",
    valorizedFarms: "Valorisés dans les fermes urbaines de Libreville",
    
    // New Features: Game, Truck, PDF
    gameTab: "Eco-Jeu",
    gameHeader: "Apprendre & Gagner : Éco-Tri",
    gameDesc: "Aidez à éduquer les familles de Libreville sur le tri ! Glissez ou cliquez pour trier le déchet dans le bon bac. Marquez 5 bonnes réponses pour gagner le badge 'Recycleur Certifié' sur votre profil !",
    recyclableBin: "Recyclable (Bac Vert)",
    organicBin: "Biodégradable (Bac Jaune)",
    correct: "Excellent ! Bon réflexe.",
    incorrect: "Oups ! Ce n'est pas le bon bac.",
    score: "Score",
    streak: "Série",
    certifiedBadge: "Recycleur Certifié",
    playAgain: "Rejouer",
    congrats: "Félicitations ! Vous avez obtenu le badge 'Recycleur Certifié' !",
    generateReportBtn: "Rapport Municipal PDF",
    municipalReportTitle: "Rapport d'Activité Municipal de Gestion des Déchets",
    republiqueGabonaise: "RÉPUBLIQUE GABONAISE",
    unionTravailJustice: "Union - Travail - Justice",
    ministryEnv: "Ministère de l'Environnement et de la Valorisation des Déchets",
    printReport: "Imprimer / Enregistrer PDF",
    reportClose: "Fermer le Rapport",
    leaderboardTab: "Classement",
    leaderboardHeader: "Classement des Quartiers Éco-Citoyens",
    leaderboardDesc: "Découvrez quel quartier de Libreville mène l'initiative verte ce mois-ci ! Ensemble, évitons le blocage des caniveaux lors des grandes pluies.",
    leaderboardRank: "Rang",
    leaderboardNeighborhood: "Secteur / Quartier",
    leaderboardScore: "Total Trié",
    leaderboardRecyclable: "Recyclables",
    leaderboardOrganic: "Organiques",
    leaderboardMonthlyTarget: "Objectif Mensuel",
    leaderboardLeadLabel: "En tête de Libreville ! 🏆",
    leaderboardRainySeasonWarning: "⚠️ Saison des pluies : Trier aide à prévenir les inondations à Libreville."
  },
  en: {
    appTitle: "GTIDR Gabon",
    appSubtitle: "Eco-friendly waste management solution for Libreville and Akanda",
    solutionEco: "● Intelligent Waste Transport",
    simDual: "Dual Simulator",
    simCitizen: "Citizen App (Mobile)",
    simAdmin: "Collector Portal (Admin)",
    guideSim: "Simulation Guide: Create a request on the left, watch the red pin appear on the map, then enter the G-XXXX code on the admin keypad to validate recycling!",
    footerCrafted: "Crafted with for recycling in Gabon",
    logout: "Log Out",
    adminDashboard: "Go to Admin Dashboard",
    welcomeSim: "Welcome to GTIDR Gabon! Side-by-Side Simulation Mode active.",
    notificationCancelled: "Collection request cancelled.",
    notificationPickupSuccess: "Pickup approved for {name}! Volume of {weight}kg recorded.",
    notificationSpawned: "New request from {name} ({neighborhood}) added to the map!",

    fullName: "Full Name",
    fullNamePlaceholder: "e.g. Merveille Nkoghe",
    fullNameError: "Please enter your full name.",
    phoneLabel: "Phone Number (Gabon)",
    phonePlaceholder: "077 12 34 56",
    phoneHelp: "Serves as a unique identifier to validate your pickups.",
    phoneError: "Please enter a valid phone number.",
    neighborhoodLabel: "Your Neighborhood (Libreville)",
    phoneLoginBtn: "Login with Phone",
    googleLoginBtn: "Quick login with Google",
    or: "or",
    prototypeVersion: "GTIDR Libreville, Gabon • Prototype Version",

    welcomeUser: "Hi, {name}",
    locationGabon: "{neighborhood}, Gabon",
    citizenBadge: "Citizen",
    activeRequestTitle: "Awaiting collection...",
    cancelBtn: "Cancel",
    verificationCodeLabel: "Collector Verification Code",
    verificationCodeHelp: "Give this code to the collector when they arrive to validate secure handling.",
    trashTypeLabel: "Waste Type:",
    estimatedWeight: "Estimated Weight:",
    capturedPosition: "Captured position:",
    driverHeadingText: "The collector is heading to your neighborhood {neighborhood}. Prepare your recyclable bags!",
    takeOutTrashHeader: "Take Out Trash",
    takeOutTrashHelp: "Register your sorted waste. A certified collector will arrive to validate and weigh your bags at home.",
    totalSorted: "Total Sorted",
    historyCount: "pickups",
    trashTypeStep: "1. Waste Type",
    recyclableTitle: "Recyclable Plastics / Papers",
    recyclableDesc: "PET bottles, soda cans, cardboard packaging...",
    organicTitle: "Organic Waste / Compost",
    organicDesc: "Meal leftovers, cassava/yam peelings...",
    bothTitle: "Both (Separated bags)",
    bothDesc: "To sort both categories at the same time.",
    quantityStep: "2. Estimated Quantity",
    qtyEstimateTab: "Estimation",
    qtyWeighedTab: "Weighed",
    sizeSmall: "Small",
    sizeMedium: "Medium",
    sizeLarge: "Large",
    preciseWeightPlaceholder: "Enter exact weight in kg",
    locationStep: "3. Collection Location",
    gpsAcquired: "GPS Acquired:",
    recalibrate: "Recalibrate",
    gpsGetting: "Acquiring GPS location...",
    gpsCaptureBtn: "Capture my exact GPS position",
    gpsErrorNotSupported: "Geolocation is not supported by your browser.",
    takeOutSubmitBtn: "Take Out the Trash!",
    alreadyHasPendingError: "You already have a pending request. Please finalize or cancel it.",
    requestCreatedSuccess: "Request created! Collection Code: {code}",

    myEcoImpact: "My Ecological Impact",
    recyclablesSaved: "Recyclables saved",
    organicComposted: "Organic composted",
    co2Avoided: "CO2 footprint avoided",
    pastTransactions: "My Past Transactions",
    noCollections: "No collections recorded yet.",
    historyTitleShort: "History",
    ruleHeader: "Gabon Ecological Guidelines",
    ruleDesc: "In Gabon, waste management is progressing rapidly. By sorting your plastics in collaboration with ANASUT and GTIDR, you prevent sewage blockage in Libreville during heavy tropical rainfalls.",
    ruleWarning: "Important: Do not mix broken glass or medical waste with ordinary recyclables.",

    adminTitle: "GTIDR Admin",
    adminSubtitle: "Libreville Intelligent Collection Network",
    adminMapTab: "Map & Entry",
    adminAnalyticsTab: "Analytics & Volumes",
    liveMapTitle: "Real-time waste map tracking",
    simCitizenBtn: "Simulate Citizen",
    activeWeight: "Active Weight",
    pendingRequestsCount: "Pending Requests",
    globalHistory: "Global History",
    codeSaisieTitle: "Collector Code Entry",
    codeSaisieHelp: "When the collection truck arrives, the citizen provides their 6-character security code.",
    codePlaceholder: "e.g. G-4829",
    verifyCodeBtn: "Verify Code",
    codeRequiredError: "Please enter a code.",
    noRequestFoundError: "No pending request found for this code.",
    codeValidSuccess: "Valid Code! Match found:",
    trashSacks: "Sorted Bags:",
    confirmPickupBtn: "Confirm Pickup",
    secRulesTitle: "Sorting Security Protocol",
    secRule1: "Step 1: Visually inspect the recyclable bag (no household garbage contamination).",
    secRule2: "Step 2: Compare the physical quantity with the estimated weight of {weight} kg.",
    secRule3: "Step 3: Submit the code, which instantly updates the citizen's personal statistics.",
    activeWeightTitle: "Total Weight Collected",
    recyPlasticsTitle: "Recyclable Plastics",
    compostTitle: "Organic / Compost",
    completionRateTitle: "Completion Rate",
    statsTitle: "Volumes by Neighborhood (Libreville)",
    dailyTrendTitle: "Daily Collection Progress",
    dailyTrendDesc: "Daily collected load graph (kg). Data includes sorted plastics and bio-degradable materials.",
    totalWeightCollected: "Total Weight Collected",
    unitKg: "Unit: kg",
    completedCards: "records",
    averageTime: "Average pickup time: 38 min",
    growthLabel: "+14.2% since last week",
    valorizedFarms: "Valorized in Libreville urban farms",
    
    // New Features: Game, Truck, PDF
    gameTab: "Learn & Win",
    gameHeader: "Learn & Win: Eco-Triage Game",
    gameDesc: "Help educate Libreville families on sorting rules! Swipe or tap to sort waste items into the correct bin. Get 5 correct answers in a row to earn your 'Certified Recycler' badge!",
    recyclableBin: "Recyclables (Green Bin)",
    organicBin: "Organic Compost (Yellow Bin)",
    correct: "Excellent! Great job.",
    incorrect: "Oops! Not the correct bin.",
    score: "Score",
    streak: "Streak",
    certifiedBadge: "Certified Recycler",
    playAgain: "Play Again",
    congrats: "Congratulations! You earned the 'Certified Recycler' profile badge!",
    generateReportBtn: "PDF Municipal Report",
    municipalReportTitle: "Municipal Waste Management Activity Report",
    republiqueGabonaise: "REPUBLIC OF GABON",
    unionTravailJustice: "Union - Work - Justice",
    ministryEnv: "Ministry of Environment & Waste Valorization",
    printReport: "Print / Save PDF",
    reportClose: "Close Report",
    leaderboardTab: "Leaderboard",
    leaderboardHeader: "Eco-Citizen Neighborhood Rankings",
    leaderboardDesc: "Find out which Libreville neighborhood is leading this month's green initiative! Together, let's prevent clogged culverts during heavy rainy seasons.",
    leaderboardRank: "Rank",
    leaderboardNeighborhood: "Sector / Neighborhood",
    leaderboardScore: "Total Sorted",
    leaderboardRecyclable: "Recyclables",
    leaderboardOrganic: "Organics",
    leaderboardMonthlyTarget: "Monthly Target",
    leaderboardLeadLabel: "Leading Libreville! 🏆",
    leaderboardRainySeasonWarning: "⚠️ Rainy Season Alert: Active recycling prevents street flooding in Libreville."
  }
};
