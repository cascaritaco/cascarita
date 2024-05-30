import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import DropdownMenuButtonEn from "./en/components/DropdownMenuButton.json";
import DropdownMenuButtonEsp from "./esp/components/DropdownMenuButton.json";
import SideNavEn from "./en/components/SideNav.json";
import SideNavEsp from "./esp/components/SideNav.json";
import LanguageDropdownEn from "./en/components/LanguageDropdown.json";
import LanguageDropdownEsp from "./esp/components/LanguageDropdown.json";
import SearchEn from "./en/components/Search.json";
import SearchEsp from "./esp/components/Search.json";
import LeaguesEn from "./en/pages/Leagues.json";
import LeaguesEsp from "./esp/pages/Leagues.json";
import { updateUsersLanguages } from "../api/users/service";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: localStorage.getItem("defaultLanguage") as string,
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

export const changeLanguage = async (user_id: number, lng: string) => {
  await updateUsersLanguages(user_id, lng);
  localStorage.setItem("defaultLanguage", lng);
  i18next.changeLanguage(lng);
};

export default i18next;
