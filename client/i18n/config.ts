import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import DropdownMenuButtonEn from "./en/components/dropdownMenuButton.json";
import DropdownMenuButtonEsp from "./esp/components/dropdownMenuButton.json";
import SideNavEn from "./en/components/SideNav.json";
import SideNavEsp from "./esp/components/SideNav.json";
import LanguageDropdownEn from "./en/components/LanguageDropdown.json";
import LanguageDropdownEsp from "./esp/components/LanguageDropdown.json";
import SearchEn from "./en/components/Search.json";
import SearchEsp from "./esp/components/Search.json";
import LeaguesEn from "./en/pages/Leagues.json";
import LeaguesEsp from "./esp/pages/Leagues.json";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      DropdownMenuButton: DropdownMenuButtonEn,
      SideNav: SideNavEn,
      Search: SearchEn,
      Leagues: LeaguesEn,
      LanguageDropdown: LanguageDropdownEn,
    },
    esp: {
      DropdownMenuButton: DropdownMenuButtonEsp,
      SideNav: SideNavEsp,
      Search: SearchEsp,
      Leagues: LeaguesEsp,
      LanguageDropdown: LanguageDropdownEsp,
    },
  },
  ns: [
    "DropdownMenuButton",
    "SideNav",
    "Search",
    "Leagues",
    "LanguageDropdown",
  ],
});

export const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
};

export default i18next;
