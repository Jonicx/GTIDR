export type Language = 'fr' | 'en' | 'es' | 'pt';

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
    valorizedFarms: "Valorisés dans les fermes urbaines de Libreville"
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
    valorizedFarms: "Valorized in Libreville urban farms"
  },
  es: {
    appTitle: "GTIDR Gabón",
    appSubtitle: "Solución ecológica de gestión de residuos para Libreville y Akanda",
    solutionEco: "● Transporte Inteligente de Residuos",
    simDual: "Simulador Doble",
    simCitizen: "App Ciudadano (Móvil)",
    simAdmin: "Portal de Recolector (Admin)",
    guideSim: "Guía de simulación: Cree una solicitud a la izquierda, observe el pin rojo en el mapa, luego ingrese el código G-XXXX en el teclado de administración para validar el reciclaje.",
    footerCrafted: "Diseñado con para el reciclaje en Gabón",
    logout: "Cerrar sesión",
    adminDashboard: "Acceder al Panel de Admin",
    welcomeSim: "¡Bienvenido a GTIDR Gabón! Modo Simulación Lado a Lado activo.",
    notificationCancelled: "Solicitud de recogida cancelada.",
    notificationPickupSuccess: "Recogida validada para {name}. Volumen: {weight}kg registrado.",
    notificationSpawned: "¡Nueva solicitud de {name} ({neighborhood}) añadida al mapa!",

    fullName: "Nombre completo",
    fullNamePlaceholder: "Ej. Merveille Nkoghe",
    fullNameError: "Por favor, ingrese su nombre completo.",
    phoneLabel: "Número de Teléfono (Gabón)",
    phonePlaceholder: "077 12 34 56",
    phoneHelp: "Sirve como identificador único para validar sus recogidas.",
    phoneError: "Por favor, ingrese un número de teléfono válido.",
    neighborhoodLabel: "Su Barrio (Libreville)",
    phoneLoginBtn: "Conectarse por Teléfono",
    googleLoginBtn: "Conexión rápida con Google",
    or: "o",
    prototypeVersion: "GTIDR Libreville, Gabón • Versión Prototipo",

    welcomeUser: "Hola, {name}",
    locationGabon: "{neighborhood}, Gabón",
    citizenBadge: "Ciudadano",
    activeRequestTitle: "Esperando recogida...",
    cancelBtn: "Cancelar",
    verificationCodeLabel: "Código de Verificación del Recolector",
    verificationCodeHelp: "Entregue este código al recolector cuando llegue para validar el manejo seguro.",
    trashTypeLabel: "Tipo de Residuo:",
    estimatedWeight: "Peso Estimado:",
    capturedPosition: "Posición capturada:",
    driverHeadingText: "El recolector se dirige a su barrio {neighborhood}. ¡Prepare sus bolsas de reciclaje!",
    takeOutTrashHeader: "Sacar la Basura",
    takeOutTrashHelp: "Registre sus residuos de reciclaje. Un recolector certificado validará y pesará sus bolsas a domicilio.",
    totalSorted: "Total clasificado",
    historyCount: "recogidas",
    trashTypeStep: "1. Tipo de residuo",
    recyclableTitle: "Reciclables plásticos / papeles",
    recyclableDesc: "Botellas PET, latas, envases de cartón...",
    organicTitle: "Residuos orgánicos / Compost",
    organicDesc: "Restos de comida, cáscaras de yuca/ñame...",
    bothTitle: "Ambos (bolsas separadas)",
    bothDesc: "Para clasificar ambas categorías simultáneamente.",
    quantityStep: "2. Cantidad estimada",
    qtyEstimateTab: "Estimación",
    qtyWeighedTab: "Peso medido",
    sizeSmall: "Pequeño",
    sizeMedium: "Mediano",
    sizeLarge: "Grande",
    preciseWeightPlaceholder: "Ingrese el peso exacto en kg",
    locationStep: "3. Ubicación de recogida",
    gpsAcquired: "GPS Adquirido:",
    recalibrate: "Recalibrar",
    gpsGetting: "Obteniendo ubicación GPS...",
    gpsCaptureBtn: "Capturar mi posición GPS exacta",
    gpsErrorNotSupported: "La geolocalización no es compatible con su navegador.",
    takeOutSubmitBtn: "¡Sacar la Basura!",
    alreadyHasPendingError: "Ya tiene una solicitud pendiente. Por favor, finalícela o cancélela.",
    requestCreatedSuccess: "¡Solicitud creada! Código de recogida: {code}",

    myEcoImpact: "Mi Impacto Ecológico",
    recyclablesSaved: "Reciclables salvados",
    organicComposted: "Orgánico compostado",
    co2Avoided: "CO2 evitado",
    pastTransactions: "Mis Transacciones Pasadas",
    noCollections: "No hay recogidas registradas todavía.",
    historyTitleShort: "Historial",
    ruleHeader: "Pautas Ecológicas de Gabón",
    ruleDesc: "En Gabón, la gestión de residuos avanza rápidamente. Al clasificar sus plásticos en colaboración con ANASUT y GTIDR, evita obstrucciones de alcantarillado en Libreville durante las lluvias tropicales.",
    ruleWarning: "Importante: No mezcle vidrio roto ni residuos médicos con reciclables ordinarios.",

    adminTitle: "GTIDR Administrador",
    adminSubtitle: "Red Inteligente de Recogida de Libreville",
    adminMapTab: "Mapa y Registro",
    adminAnalyticsTab: "Análisis y Volúmenes",
    liveMapTitle: "Ubicación de residuos en tiempo real",
    simCitizenBtn: "Simular Ciudadano",
    activeWeight: "Peso Activo",
    pendingRequestsCount: "Solicitudes Pendientes",
    globalHistory: "Historial Global",
    codeSaisieTitle: "Registro de Código de Recolector",
    codeSaisieHelp: "Al llegar el camión de recogida, el ciudadano proporciona su código de seguridad de 6 caracteres.",
    codePlaceholder: "Ej: G-4829",
    verifyCodeBtn: "Verificar Código",
    codeRequiredError: "Por favor ingrese un código.",
    noRequestFoundError: "No se encontró ninguna solicitud pendiente para este código.",
    codeValidSuccess: "¡Código Válido! Coincidencia encontrada:",
    trashSacks: "Bolsas Clasificadas:",
    confirmPickupBtn: "Confirmar recogida",
    secRulesTitle: "Protocolo de Seguridad de Clasificación",
    secRule1: "Paso 1: Inspeccione visualmente la bolsa de reciclaje (sin contaminación de basura común).",
    secRule2: "Paso 2: Compare la cantidad física con el peso estimado de {weight} kg.",
    secRule3: "Paso 3: Envíe el código, lo que actualiza instantáneamente las estadísticas del ciudadano.",
    activeWeightTitle: "Peso Total Recogido",
    recyPlasticsTitle: "Plásticos Reciclables",
    compostTitle: "Orgánico / Compost",
    completionRateTitle: "Tasa de Finalización",
    statsTitle: "Volúmenes por Barrio (Libreville)",
    dailyTrendTitle: "Progreso Diario de Recogida",
    dailyTrendDesc: "Gráfico de carga diaria recogida (kg). Los datos incluyen plásticos clasificados y materiales biodegradables.",
    totalWeightCollected: "Peso Total Recogido",
    unitKg: "Unidad: kg",
    completedCards: "registros",
    averageTime: "Tiempo promedio de recogida: 38 min",
    growthLabel: "+14.2% desde la semana pasada",
    valorizedFarms: "Valorizados en granjas urbanas de Libreville"
  },
  pt: {
    appTitle: "GTIDR Gabão",
    appSubtitle: "Solução ecológica de gestão de resíduos para Libreville e Akanda",
    solutionEco: "● Transporte Inteligente de Resíduos",
    simDual: "Simulador Duplo",
    simCitizen: "App Cidadão (Móvel)",
    simAdmin: "Portal do Coletor (Admin)",
    guideSim: "Guia de simulação: Crie uma solicitação à esquerda, veja o pino vermelho aparecer no mapa, insira o código G-XXXX no teclado de administração para validar a reciclagem.",
    footerCrafted: "Criado com para a reciclagem no Gabão",
    logout: "Sair",
    adminDashboard: "Acessar Painel de Admin",
    welcomeSim: "Bem-vindo ao GTIDR Gabão! Modo de Simulação Lado a Lado ativo.",
    notificationCancelled: "Solicitação de coleta cancelada.",
    notificationPickupSuccess: "Coleta validada para {name}! Volume de {weight}kg registrado.",
    notificationSpawned: "Nova solicitação de {name} ({neighborhood}) adicionada ao mapa!",

    fullName: "Nome completo",
    fullNamePlaceholder: "Ex. Merveille Nkoghe",
    fullNameError: "Por favor, digite seu nome completo.",
    phoneLabel: "Número de Telefone (Gabão)",
    phonePlaceholder: "077 12 34 56",
    phoneHelp: "Serve como identificador único para validar suas coletas.",
    phoneError: "Por favor, insira um número de telefone válido.",
    neighborhoodLabel: "Seu Bairro (Libreville)",
    phoneLoginBtn: "Conectar por Telefone",
    googleLoginBtn: "Conexão rápida com Google",
    or: "ou",
    prototypeVersion: "GTIDR Libreville, Gabão • Versão Protótipo",

    welcomeUser: "Olá, {name}",
    locationGabon: "{neighborhood}, Gabão",
    citizenBadge: "Cidadão",
    activeRequestTitle: "Aguardando coleta...",
    cancelBtn: "Cancelar",
    verificationCodeLabel: "Código de Verificação do Coletor",
    verificationCodeHelp: "Entregue este código ao coletor quando ele chegar para validar o manuseio seguro.",
    trashTypeLabel: "Tipo de Resíduo:",
    estimatedWeight: "Peso Estimado:",
    capturedPosition: "Posição capturada:",
    driverHeadingText: "O coletor está se dirigindo ao seu bairro {neighborhood}. Prepare suas sacolas de reciclagem!",
    takeOutTrashHeader: "Descartar Lixo",
    takeOutTrashHelp: "Registre seus resíduos de triagem. Um coletor certificado virá validar e pesar suas sacolas em casa.",
    totalSorted: "Total classificado",
    historyCount: "coletas",
    trashTypeStep: "1. Tipo de resíduo",
    recyclableTitle: "Recicláveis plásticos / papéis",
    recyclableDesc: "Garrafas PET, latas de alumínio, embalagens de papelão...",
    organicTitle: "Resíduos orgânicos / Composto",
    organicDesc: "Restos de refeições, cascas de mandioca/inhame...",
    bothTitle: "Ambos (sacolas separadas)",
    bothDesc: "Para classificar ambas as categorias simultaneamente.",
    quantityStep: "2. Quantidade estimada",
    qtyEstimateTab: "Estimativa",
    qtyWeighedTab: "Peso medido",
    sizeSmall: "Pequeno",
    sizeMedium: "Médio",
    sizeLarge: "Grande",
    preciseWeightPlaceholder: "Digite o peso exato em kg",
    locationStep: "3. Localização de coleta",
    gpsAcquired: "GPS Adquirido:",
    recalibrate: "Recalibrar",
    gpsGetting: "Obtendo localização GPS...",
    gpsCaptureBtn: "Capturar minha posição GPS exata",
    gpsErrorNotSupported: "A geolocalização não é suportada pelo seu navegador.",
    takeOutSubmitBtn: "Descartar o Lixo!",
    alreadyHasPendingError: "Você já tem uma solicitação pendente. Por favor, finalize-a ou cancele-a.",
    requestCreatedSuccess: "Solicitação criada! Código de coleta: {code}",

    myEcoImpact: "Meu Impacto Ecológico",
    recyclablesSaved: "Recicláveis salvos",
    organicComposted: "Orgânico compostado",
    co2Avoided: "CO2 evitado",
    pastTransactions: "Minhas Transações Passadas",
    noCollections: "Nenhuma coleta registrada até o momento.",
    historyTitleShort: "Histórico",
    ruleHeader: "Regras Ecológicas do Gabão",
    ruleDesc: "No Gabão, a gestão de resíduos avança rapidamente. Ao separar seus plásticos em parceria com a ANASUT e GTIDR, você evita entupimento de canais em Libreville durante as fortes chuvas tropicais.",
    ruleWarning: "Importante: Não misture vidro quebrado ou resíduos médicos com recicláveis comuns.",

    adminTitle: "GTIDR Administrador",
    adminSubtitle: "Rede Inteligente de Coleta de Libreville",
    adminMapTab: "Mapa e Registro",
    adminAnalyticsTab: "Análises e Volumes",
    liveMapTitle: "Localização de resíduos em tempo real",
    simCitizenBtn: "Simular Cidadão",
    activeWeight: "Peso Ativo",
    pendingRequestsCount: "Solicitações Pendentes",
    globalHistory: "Histórico Global",
    codeSaisieTitle: "Registro de Código do Coletor",
    codeSaisieHelp: "Ao chegar o caminhão de coleta, o cidadão fornece seu código de segurança de 6 caracteres.",
    codePlaceholder: "Ex: G-4829",
    verifyCodeBtn: "Verificar Código",
    codeRequiredError: "Por favor, digite um código.",
    noRequestFoundError: "Nenhuma solicitação pendente encontrada para este código.",
    codeValidSuccess: "Código Válido! Correspondência encontrada:",
    trashSacks: "Sacolas Separadas:",
    confirmPickupBtn: "Confirmar coleta",
    secRulesTitle: "Processo de Segurança da Triagem",
    secRule1: "Passo 1: Inspecione visualmente a sacola reciclável (sem contaminação de lixo comum).",
    secRule2: "Passo 2: Compare a quantidade física com o peso estimado de {weight} kg.",
    secRule3: "Passo 3: Envie o código, o que atualiza instantaneamente as estatísticas do cidadão.",
    activeWeightTitle: "Peso Total Coletado",
    recyPlasticsTitle: "Plásticos Recicláveis",
    compostTitle: "Orgânico / Composto",
    completionRateTitle: "Taxa de Conclusão",
    statsTitle: "Volumes por Bairro (Libreville)",
    dailyTrendTitle: "Progresso Diário da Coleta",
    dailyTrendDesc: "Gráfico de carga diária coletada (kg). Os dados incluem plásticos classificados e orgânicos biodegradáveis.",
    totalWeightCollected: "Peso Total Coletado",
    unitKg: "Unidade: kg",
    completedCards: "registros",
    averageTime: "Tempo médio de coleta: 38 min",
    growthLabel: "+14.2% desde a semana passada",
    valorizedFarms: "Valorizados em fazendas urbanas de Libreville"
  }
};
