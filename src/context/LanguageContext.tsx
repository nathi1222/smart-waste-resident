import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zu' | 'xh' | 'af' | 'st' | 'tn' | 'ts' | 've' | 'ss' | 'nr' | 'nso';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}

const translations: Record<Language, any> = {
  en: {
    common: { loading: 'Loading...', back: 'Back', submit: 'Submit', cancel: 'Cancel', save: 'Save', delete: 'Delete', edit: 'Edit', yes: 'Yes', no: 'No', ok: 'OK', close: 'Close', error: 'Error', success: 'Success' },
    login: { title: 'SMART WASTE', subtitle: 'Keep your city clean', emailPlaceholder: 'email@example.com', loginButton: 'LOGIN', or: 'OR', loginWithPhone: 'Login with Phone', signUp: "Don't have an account? Sign Up →" },
    dashboard: { welcomeBack: 'Welcome back,', yourNextCollection: 'Your next collection is', generalWaste: 'General Waste', setReminder: '🔔 Set Reminder', schedule: 'Schedule', history: 'History', tips: 'Tips', requestBin: 'Request Bin', serviceMap: 'Service Map', reportIssue: 'Report Issue', rateCollection: "Rate today's collection", recentAlerts: 'RECENT ALERTS', upcomingSchedule: 'Upcoming Schedule', viewAll: 'View All →' },
    chat: { title: 'Support Chat', subtitle: 'Chat with our team', typeMessage: 'Type a message...', send: 'Send', online: 'Online', offline: 'Offline', dispatch: 'Dispatch', customerSupport: 'Customer Support' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  zu: {
    common: { loading: 'Iyalayisha...', back: 'Buyela', submit: 'Thumela', cancel: 'Khansela', save: 'Gcina', delete: 'Susa', edit: 'Hlela', yes: 'Yebo', no: 'Cha', ok: 'Kulungile', close: 'Vala', error: 'Iphutha', success: 'Impumelelo' },
    login: { title: 'I-SMART WASTE', subtitle: 'Gcina idolobha lakho lihlanzekile', emailPlaceholder: 'i-imeyili@isibonelo.com', loginButton: 'NGENA', or: 'NOMA', loginWithPhone: 'Ngena ngeFoni', signUp: 'Awunawo i-akhawunti? Bhalisa →' },
    dashboard: { welcomeBack: 'Sawubona futhi,', yourNextCollection: 'Ukuqoqwa kwakho okulandelayo', generalWaste: 'Udoti Jikelele', setReminder: '🔔 Setha Isikhumbuzi', schedule: 'Uhlelo', history: 'Umlando', tips: 'Izeluleko', requestBin: 'Cela Umgqomo', serviceMap: 'Imephu Yensiza', reportIssue: 'Bika Inkinga', rateCollection: "Kala ukuqoqwa kwanamuhla", recentAlerts: 'IZEXWAYISO ZAKAMUVA', upcomingSchedule: 'Uhlelo Oluzayo', viewAll: 'Buka Konke →' },
    chat: { title: 'Ingxoxo Yosizo', subtitle: 'Xoxa nethimba lethu', typeMessage: 'Bhala umyalezo...', send: 'Thumela', online: 'Ku-inthanethi', offline: 'Ngaphandle', dispatch: 'Ukuthumela', customerSupport: 'Ukusekelwa Kwekhasimende' },
    currency: { zar: 'I-ZAR', zarSymbol: 'R' }
  },
  xh: {
    common: { loading: 'Iyilayisha...', back: 'Buyela', submit: 'Thumela', cancel: 'Rhoxisa', save: 'Gcina', delete: 'Cima', edit: 'Hlela', yes: 'Ewe', no: 'Hayi', ok: 'Kulungile', close: 'Vala', error: 'Impazamo', success: 'Impumelelo' },
    login: { title: 'I-SMART WASTE', subtitle: 'Gcina isixeko sakho sicocekile', emailPlaceholder: 'i-imeyile@umzekelo.com', loginButton: 'NGENA', or: 'OKANYE', loginWithPhone: 'Ngena ngeFowuni', signUp: 'Awunawo i-akhawunti? Bhalisa →' },
    dashboard: { welcomeBack: 'Wamkelekile,', yourNextCollection: 'Ukuqokelelwa kwakho okulandelayo', generalWaste: 'Inkunkuma Jikelele', setReminder: '🔔 Setha Isikhumbuzi', schedule: 'Icwangciso', history: 'Imbali', tips: 'Iingcebiso', requestBin: 'Cela Umgqomo', serviceMap: 'Imephu Yenkonzo', reportIssue: 'Bika Ingxaki', rateCollection: "Kala ukuqokelelwa kwanamhlanje", recentAlerts: 'IZILUMKISO ZAKUTSHA', upcomingSchedule: 'Icwangciso Elizayo', viewAll: 'Jonga Konke →' },
    chat: { title: 'Incoko Yoncedo', subtitle: 'Ncokola neqela lethu', typeMessage: 'Bhala umyalezo...', send: 'Thumela', online: 'Kwi-intanethi', offline: 'Ngaphandle', dispatch: 'Ukuthumela', customerSupport: 'Inkxaso Yabathengi' },
    currency: { zar: 'I-ZAR', zarSymbol: 'R' }
  },
  af: {
    common: { loading: 'Laai...', back: 'Terug', submit: 'Dien in', cancel: 'Kanselleer', save: 'Stoor', delete: 'Verwyder', edit: 'Wysig', yes: 'Ja', no: 'Nee', ok: 'OK', close: 'Sluit', error: 'Fout', success: 'Sukses' },
    login: { title: 'SMART WASTE', subtitle: 'Hou jou stad skoon', emailPlaceholder: 'e-pos@voorbeeld.com', loginButton: 'TEKEN AAN', or: 'OF', loginWithPhone: 'Teken aan met Foon', signUp: 'Nie \'n rekening nie? Teken aan →' },
    dashboard: { welcomeBack: 'Welkom terug,', yourNextCollection: 'Jou volgende versameling is', generalWaste: 'Algemene Afval', setReminder: '🔔 Stel Herinnering', schedule: 'Rooster', history: 'Geskiedenis', tips: 'Wenke', requestBin: 'Versoek Drom', serviceMap: 'Dienskaart', reportIssue: 'Rapporteer Probleem', rateCollection: "Beoordeel vandag se versameling", recentAlerts: 'ONLANGSE WAARSKUWINGS', upcomingSchedule: 'Komende Rooster', viewAll: 'Bekijk Alles →' },
    chat: { title: 'Ondersteuningsklets', subtitle: 'Klets met ons span', typeMessage: 'Tik \'n boodskap...', send: 'Stuur', online: 'Aanlyn', offline: 'Aflyn', dispatch: 'Versending', customerSupport: 'Klantondersteuning' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  st: {
    common: { loading: 'E ntse e qala...', back: 'Khutlela', submit: 'Romela', cancel: 'Hlakola', save: 'Boloka', delete: 'Hlakola', edit: 'Fetola', yes: 'Ee', no: 'Tjhe', ok: 'Ho lokile', close: 'Kwala', error: 'Phoso', success: 'Katleho' },
    login: { title: 'SMART WASTE', subtitle: 'Boloka motse wa hao o hloekile', emailPlaceholder: 'imeile@mohlala.com', loginButton: 'KENA', or: 'KAPA', loginWithPhone: 'Kena ka Fono', signUp: 'Ha o na akhaonte? Ingolisa →' },
    dashboard: { welcomeBack: 'Rea u amohela,', yourNextCollection: 'Pokello ea hau e latelang', generalWaste: 'Matlakala a Kakaretso', setReminder: '🔔 Beha Khopotso', schedule: 'Kemiso', history: 'Nalane', tips: 'Malebo', requestBin: 'Kopa Moqomo', serviceMap: 'Mapa wa Tshebeletso', reportIssue: 'Tlaleha Bothata', rateCollection: "Lekanya pokello ea kajeno", recentAlerts: 'LITEMOSO TSA MORAO', upcomingSchedule: 'Kemiso e Tlang', viewAll: 'Sheba Tsohle →' },
    chat: { title: 'Moqoqo wa Thuso', subtitle: 'Qoqa le sehlopha sa rona', typeMessage: 'Ngola molaetsa...', send: 'Romela', online: 'Inthaneteng', offline: 'Ntle', dispatch: 'Ho romela', customerSupport: 'Tshehetso ya Bareki' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  tn: {
    common: { loading: 'E ntse e qala...', back: 'Boela', submit: 'Romela', cancel: 'Phimola', save: 'Boloka', delete: 'Phimola', edit: 'Fetola', yes: 'Ee', no: 'Nnyaa', ok: 'Go siame', close: 'Tswala', error: 'Phoso', success: 'Katlego' },
    login: { title: 'SMART WASTE', subtitle: 'Boloka toropo ya gago e phepa', emailPlaceholder: 'imeile@sekai.com', loginButton: 'TSENA', or: 'LEBA', loginWithPhone: 'Tsena ka Mogala', signUp: 'Ga o na akhaonte? Ingolisa →' },
    dashboard: { welcomeBack: 'O amogetswe gape,', yourNextCollection: 'Pokello ya gago e e latelang', generalWaste: 'Matlakala a Kakaretso', setReminder: '🔔 Beha Segakolodi', schedule: 'Lenaneo', history: 'Hisitori', tips: 'Dikgakololo', requestBin: 'Kopa Mmotla', serviceMap: 'Mmapa wa Tirelo', reportIssue: 'Begela Bothata', rateCollection: "Lekanya pokello ya gompieno", recentAlerts: 'DIKGAOTSHO TSA MORAGO', upcomingSchedule: 'Lenaneo le le Tlang', viewAll: 'Lebelela Tsotlhe →' },
    chat: { title: 'Puisano ya Thuso', subtitle: 'Buisa le setlhopha sa rona', typeMessage: 'Kwala molaetsa...', send: 'Romela', online: 'Mo inthaneteng', offline: 'Kwa ntle', dispatch: 'Go romela', customerSupport: 'Thuso ya Bageriki' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  ts: {
    common: { loading: 'Ku layishe...', back: 'Vuyela', submit: 'Rhuma', cancel: 'Khandlula', save: 'Hlayisa', delete: 'Susa', edit: 'Lulamisa', yes: 'Ina', no: 'Ee', ok: 'Kulungile', close: 'Vala', error: 'Xivangelo', success: 'Mpumelelo' },
    login: { title: 'SMART WASTE', subtitle: 'Hlayisa dorobha ra wena ri tshama ri basile', emailPlaceholder: 'imeyili@xikombiso.com', loginButton: 'NGENA', or: 'KUMBE', loginWithPhone: 'Ngena hi Ririmi', signUp: 'A wu na akhawunti? Tsarisa →' },
    dashboard: { welcomeBack: 'Amukela mbilu,', yourNextCollection: 'Ku hlengeletiwa ka wena swi landzelaka', generalWaste: 'Swihlawulekisi swa Nkoka', setReminder: '🔔 Veka XiTsundzuxo', schedule: 'Xiyimiso', history: 'Matimu', tips: 'Swikombiso', requestBin: 'Kombela Xihlawulekisi', serviceMap: 'Mapa wa Vukorhokeri', reportIssue: 'Tivisa Xiphiqo', rateCollection: "Hlaya ku hlengeletiwa ka namuntlha", recentAlerts: 'SWIVISO SWA KHATSI', upcomingSchedule: 'Xiyimiso lexi Taka', viewAll: 'Vonisa Hinkwaswo →' },
    chat: { title: 'Xiyimo xa Mpfuno', subtitle: 'Burisana ni ntlawa wa hina', typeMessage: 'Tsala xitsundzuxo...', send: 'Rhuma', online: 'Inthanetini', offline: 'Handle', dispatch: 'Ku rhumeriwa', customerSupport: 'Mpfuno wa Vathengi' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  ve: {
    common: { loading: 'Kha ḓo ṱoḓa...', back: 'Fhiriselani', submit: 'Rumelani', cancel: 'Khandelani', save: 'Vhulungelani', delete: 'Bvisani', edit: 'Fulufhedzani', yes: 'Ee', no: 'Hai', ok: 'Ndi zwavhuḓi', close: 'Valani', error: 'Vhukhakhi', success: 'Mafhungo maḓifhi' },
    login: { title: 'SMART WASTE', subtitle: 'Vhulungelani dorobo yanu i tshi kha ḓi vha na vhutsila', emailPlaceholder: 'imeyili@tshinzhi', loginButton: 'TSENANI', or: 'NAA', loginWithPhone: 'Tsenani nga Lutego', signUp: 'A ni na akhawunti? Ikani →' },
    dashboard: { welcomeBack: 'Kha ḓi ṋamedzani,', yourNextCollection: 'Ku kuvhanganywa haṋu khu tevhelaho', generalWaste: 'Zwavhudifhadzo zwa Ntha', setReminder: '🔔 Dzudzanyani Mushumo', schedule: 'Nga nḓila', history: 'Mafhungo a kale', tips: 'Ṱhomo', requestBin: 'Humela Mudzipu', serviceMap: 'Mmapa wa Tshumelo', reportIssue: 'Humela Thaidzo', rateCollection: "Khethani ku kuvhanganywa ha namusi", recentAlerts: 'MAFHUNGO A PSI', upcomingSchedule: 'Nga nḓila i tevhelaho', viewAll: 'Vonani Zwoṱhe →' },
    chat: { title: 'Thuso ya Mbudano', subtitle: 'Budanani na tshigwada shashu', typeMessage: 'Nwalani mulaedza...', send: 'Rumelani', online: 'Kha inthanethe', offline: 'Nga nnda', dispatch: 'U rumela', customerSupport: 'Thuso ya Vhaguli' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  ss: {
    common: { loading: 'Kuyalayisha...', back: 'Buyela', submit: 'Thumela', cancel: 'Khansela', save: 'Gcina', delete: 'Susa', edit: 'Hlela', yes: 'Yebo', no: 'Cha', ok: 'Kulungile', close: 'Vala', error: 'Iphutha', success: 'Impumelelo' },
    login: { title: 'I-SMART WASTE', subtitle: 'Gcina lidolobha lakho lihlanzekile', emailPlaceholder: 'imeyili@isibonelo.com', loginButton: 'NGENA', or: 'NOMA', loginWithPhone: 'Ngena ngeLucingi', signUp: 'Awunayo i-akhawunti? Bhalisa →' },
    dashboard: { welcomeBack: 'Sawubona futhi,', yourNextCollection: 'Ukuqoqwa kwakho lokulandelako', generalWaste: 'Kadoti Jikelele', setReminder: '🔔 Setha Isikhumbuzi', schedule: 'Uhlelo', history: 'Umlandvo', tips: 'Tiphakanyiso', requestBin: 'Cela Umgqomo', serviceMap: 'Imephu Yensita', reportIssue: 'Bika Inkinga', rateCollection: "Kala ukuqoqwa kwalamuhla", recentAlerts: 'TIXWAYISO TAKAMUVA', upcomingSchedule: 'Uhlelo Loluletako', viewAll: 'Buka Konkhe →' },
    chat: { title: 'Ingcoco Yekusita', subtitle: 'Coca nelicembu letfu', typeMessage: 'Bhala umyalezo...', send: 'Thumela', online: 'Ku-inthanethi', offline: 'Ngaphandle', dispatch: 'Kuthumela', customerSupport: 'Kusekelwa Kwekhasimende' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  nr: {
    common: { loading: 'Kuyalayisha...', back: 'Buyela', submit: 'Thumela', cancel: 'Khansela', save: 'Gcina', delete: 'Susa', edit: 'Hlela', yes: 'Yebo', no: 'Cha', ok: 'Kulungile', close: 'Vala', error: 'Iphutha', success: 'Impumelelo' },
    login: { title: 'I-SMART WASTE', subtitle: 'Gcina idolobha lakho lihlanzekile', emailPlaceholder: 'imeyili@isibonelo.com', loginButton: 'NGENA', or: 'NOMA', loginWithPhone: 'Ngena ngeFoni', signUp: 'Awunalo i-akhawunti? Bhalisa →' },
    dashboard: { welcomeBack: 'Sawubona futhi,', yourNextCollection: 'Ukuqoqwa kwakho okulandelayo', generalWaste: 'Udoti Jikelele', setReminder: '🔔 Setha Isikhumbuzi', schedule: 'Uhlelo', history: 'Umlando', tips: 'Izeluleko', requestBin: 'Cela Umgqomo', serviceMap: 'Imephu Yenkonzo', reportIssue: 'Bika Inkinga', rateCollection: "Kala ukuqoqwa kwanamuhla", recentAlerts: 'IZEXWAYISO ZAKAMUVA', upcomingSchedule: 'Uhlelo Oluzayo', viewAll: 'Buka Konke →' },
    chat: { title: 'Ingxoxo Yosizo', subtitle: 'Xoxa nethimba lethu', typeMessage: 'Bhala umyalezo...', send: 'Thumela', online: 'Ku-inthanethi', offline: 'Ngaphandle', dispatch: 'Ukuthumela', customerSupport: 'Ukusekelwa Kwekhasimende' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  },
  nso: {
    common: { loading: 'E a layiša...', back: 'Boela morago', submit: 'Romela', cancel: 'Phumola', save: 'Boloka', delete: 'Phumola', edit: 'Fetola', yes: 'Ee', no: 'Aowa', ok: 'Gabotse', close: 'Tswalela', error: 'Phošo', success: 'Katlego' },
    login: { title: 'SMART WASTE', subtitle: 'Boloka toropo ya gago e hlwekile', emailPlaceholder: 'imeile@mohlaola.com', loginButton: 'TSENA', or: 'Goba', loginWithPhone: 'Tsena ka Mogala', signUp: 'Ga o na akhaonte? Ingwadiša →' },
    dashboard: { welcomeBack: 'Re go amogela gape,', yourNextCollection: 'Pokelo ya gago ye e latelago', generalWaste: 'Matlakala a Kakaretšo', setReminder: '🔔 Bea Sehopotši', schedule: 'Lenaneo', history: 'Hisetori', tips: 'Dikeletšo', requestBin: 'Kopa Mopeleto', serviceMap: 'Mapa wa Tirelo', reportIssue: 'Begelela Bothata', rateCollection: "Lekanya pokelo ya lehono", recentAlerts: 'DITEMOŠO TŠA MORAGO', upcomingSchedule: 'Lenaneo le le Latelago', viewAll: 'Lebelela Ka Moka →' },
    chat: { title: 'Polelano ya Thušo', subtitle: 'Boledišana le sehlopha sa rena', typeMessage: 'Ngwala molaetša...', send: 'Romela', online: 'Inthaneteng', offline: 'Ka ntle', dispatch: 'Go roma', customerSupport: 'Thekgo ya Moreki' },
    currency: { zar: 'ZAR', zarSymbol: 'R' }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key: string) => {
        const keys = key.split('.');
        let value: any = translations.en;
        for (const k of keys) {
          if (value === undefined) return key;
          value = value[k];
        }
        return value || key;
      },
      formatCurrency: (amount: number) => `R${amount.toFixed(2)}`,
    };
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && Object.keys(translations).includes(saved) ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value || key;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
};