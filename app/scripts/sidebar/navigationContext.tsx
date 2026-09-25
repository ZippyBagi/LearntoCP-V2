import { createContext, useContext } from "react";

export type NavigationContextValue = {
	pendingHref: string | null;
	startNavigation: (href: string) => void;
};

export const NavigationContext = createContext<NavigationContextValue>({
	pendingHref: null,
	startNavigation: () => {},
});

export function useNavigation() {
	return useContext(NavigationContext);
}
