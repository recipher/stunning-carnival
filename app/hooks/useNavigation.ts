import { useMatchesData } from "./useMatchesData";

export default function useNavigation() {
  const data = useMatchesData("routes/$zoneId/$entryId");
  if (!data) return undefined;
  return data.navigation;
}