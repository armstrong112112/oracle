import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useApiClient } from "~/composables/useApiClient";
import { useAuthSession } from "~/composables/useAuthSession";
import {
  sanitizeAuthSessionResponse,
  type AuthSessionResponse,
  type LoginRequestDto,
  type RegisterRequestDto,
  type TelegramAuthRequestDto,
} from "~/shared/types/api/sanitizers/auth";

export const useAuthStore = defineStore("auth", () => {
  // State
  const usersAndRoles = ref<AuthSessionResponse["user"][]>([]);
  const { accessToken, refreshToken, clearAuthSession, syncAuthSession } = useAuthSession();
  const api = useApiClient();

  // Actions
  const setUsers = () => {
    usersAndRoles.value = [];
  };

  const storeTokens = (session: AuthSessionResponse) => {
    syncAuthSession(session);
  };

  const logout = async (): Promise<void> => {
    try {
      await api("/auth/logout", { method: "POST" });
    } finally {
      clearAuthSession();
    }
  };

  const login = async (
    loginData: LoginRequestDto,
  ): Promise<AuthSessionResponse> => {
    const response = await api<unknown>("/auth/login", {
      method: "POST",
      body: loginData,
    });

    const session = sanitizeAuthSessionResponse(response);
    storeTokens(session);

    return session;
  };

  const register = async (
    loginData: RegisterRequestDto,
  ): Promise<AuthSessionResponse> => {
    const response = await api<unknown>("/auth/register", {
      method: "POST",
      body: loginData,
    });

    const session = sanitizeAuthSessionResponse(response);
    storeTokens(session);

    return session;
  };

  const loginWithTg = async (
    loginData: TelegramAuthRequestDto,
  ): Promise<AuthSessionResponse> => {
    const response = await api<unknown>("/auth/loginwithtg", {
      method: "POST",
      body: loginData,
    });

    const session = sanitizeAuthSessionResponse(response);
    storeTokens(session);

    return session;
  };

  const registerWithTg = async (
    loginData: TelegramAuthRequestDto,
  ): Promise<AuthSessionResponse> => {
    const response = await api<unknown>("/auth/regwithtg", {
      method: "POST",
      body: loginData,
    });

    const session = sanitizeAuthSessionResponse(response);
    storeTokens(session);

    return session;
  };

  const confirmWithTg = async (
    loginData: TelegramAuthRequestDto,
  ): Promise<AuthSessionResponse> => {
    const response = await api<unknown>("/auth/confirmTgLogin", {
      method: "POST",
      body: loginData,
    });

    const session = sanitizeAuthSessionResponse(response);
    storeTokens(session);

    return session;
  };

  // Getters
  const getUsersAndRoles = computed(() => usersAndRoles.value);

  return {
    // State
    usersAndRoles,
    accessToken,
    refreshToken,
    // Actions
    setUsers,
    logout,
    login,
    register,
    loginWithTg,
    registerWithTg,
    confirmWithTg,
    // Getters
    getUsersAndRoles,
  };
});
