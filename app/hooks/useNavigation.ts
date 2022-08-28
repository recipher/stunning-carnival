import { useMatchesData } from "./useMatchesData";
import type { INavigation } from "../../@types/generated/contentful";

export default function useNavigation(): INavigation | undefined {
  const data = useMatchesData("routes/$zoneId");
  if (!data) return undefined;
  return data.navigation as INavigation;
}
