import { InterestsEnum, IntervalEnum, RiskToleranceEnum } from "@/types";
import { create } from "zustand";

export type PreferencesType = {
  name: string;
  interests: InterestsEnum[];
  riskTolerance: RiskToleranceEnum;
  budget: number | null;
  years: IntervalEnum;
};

export type PreferencesStateType = PreferencesType & {
  setValue: <TKey extends keyof PreferencesType>(
    key: TKey,
    value: PreferencesType[TKey]
  ) => void;
  toggleInterest: (interest: InterestsEnum) => void;
};

export const usePreferencesState = create<PreferencesStateType>((set, get) => ({
  name: "",
  interests: ["TECH"],
  riskTolerance: "LOW",
  budget: 900,
  years: "UNCERTAIN",
  setValue: (key, value) => {
    set({ [key]: value });
  },
  toggleInterest: (interest) => {
    let newInterests = [...get().interests];

    if (newInterests.includes(interest)) {
      newInterests = newInterests.filter((_interest) => _interest !== interest);
    } else {
      newInterests.push(interest);
    }

    set({ interests: newInterests });
  },
}));
