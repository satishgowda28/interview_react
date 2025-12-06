import { useQuery } from "@tanstack/react-query";
import { searchRecepies } from "../service";

const useServiceHook = (query: string) => {
  return useQuery({
    queryKey: ["searchRecepies", query],
    queryFn: () => searchRecepies(query),
    enabled: false,
  });
};

export default useServiceHook;
