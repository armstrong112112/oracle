// Pinia stores are auto-imported in Nuxt 3
// You can import them directly where needed:
import { useP2PCreateStore } from "~~/store/p2p/createStore";

// For backward compatibility, you can create accessors if needed
export const useP2PCreateStoreAccessor = () => {
  return useP2PCreateStore();
};

// Legacy accessor for p2pCreate (now using Pinia)
export const p2pCreate = {
  getStep: () => {
    const store = useP2PCreateStore();
    return store.getStep;
  },
};
