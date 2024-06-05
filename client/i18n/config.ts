import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import DropdownMenuButtonEn from "./en/components/DropdownMenuButton.json";
import DropdownMenuButtonEsp from "./esp/components/DropdownMenuButton.json";
import SideNavEn from "./en/components/SideNav.json";
import SideNavEsp from "./esp/components/SideNav.json";
import SearchEn from "./en/components/Search.json";
import SearchEsp from "./esp/components/Search.json";
import LeaguesEn from "./en/pages/Leagues.json";
import LeaguesEsp from "./esp/pages/Leagues.json";
import FormsEn from "./en/pages/Forms.json";
import FormsEsp from "./esp/pages/Forms.json";
import NewFormsEn from "./en/pages/NewForms.json";
import NewFormsEsp from "./esp/pages/NewForms.json";
import EmptyDNDCanvasEn from "./en/components/EmptyDNDCanvas.json";
import EmptyDNDCanvasEsp from "./esp/components/EmptyDNDCanvas.json";
import DraggableButtonsEn from "./en/components/DraggableButtons.json";
import DraggableButtonsEsp from "./esp/components/DraggableButtons.json";
import { updateUsersLanguages } from "../api/users/service";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: (localStorage.getItem("defaultLanguage") as string) || "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      DropdownMenuButton: DropdownMenuButtonEn,
      SideNav: SideNavEn,
      Search: SearchEn,
      Leagues: LeaguesEn,
      Forms: FormsEn,
      NewForms: NewFormsEn,
      EmptyDNDCanvas: EmptyDNDCanvasEn,
      DraggableButtons: DraggableButtonsEn,
    },
    esp: {
      DropdownMenuButton: DropdownMenuButtonEsp,
      SideNav: SideNavEsp,
      Search: SearchEsp,
      Leagues: LeaguesEsp,
      Forms: FormsEsp,
      NewForms: NewFormsEsp,
      EmptyDNDCanvas: EmptyDNDCanvasEsp,
      DraggableButtons: DraggableButtonsEsp,
    },
  },
  ns: [
    "DropdownMenuButton",
    "SideNav",
    "Search",
    "Leagues",
    "Forms",
    "NewForms",
    "EmptyDNDCanvas",
    "DraggableButtons",
  ],
});

export const changeLanguage = async (user_id: number, lng: string) => {
  await updateUsersLanguages(user_id, lng);
  localStorage.setItem("defaultLanguage", lng);
  i18next.changeLanguage(lng);
};

export default i18next;
