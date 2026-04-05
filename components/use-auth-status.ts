"use client";

import { useEffect, useState } from "react";

import { getAuthSession } from "@/lib/api";
import { clearAuthSession, readAuthSession } from "@/lib/auth-session";

type AuthStatusState = {
  hydrated: boolean;
  hasLocalToken: boolean;
  isAuthenticated: boolean;
  isChecking: boolean;
};

export function useAuthStatus() {
  const [state, setState] = useState<AuthStatusState>({
    hydrated: false,
    hasLocalToken: false,
    isAuthenticated: false,
    isChecking: true,
  });

  useEffect(() => {
    let cancelled = false;

    const authSession = readAuthSession();

    if (!authSession?.accessToken) {
      setState({
        hydrated: true,
        hasLocalToken: false,
        isAuthenticated: false,
        isChecking: false,
      });
      return;
    }

    setState({
      hydrated: true,
      hasLocalToken: true,
      isAuthenticated: false,
      isChecking: true,
    });

    const verifySession = async () => {
      try {
        const session = await getAuthSession();

        if (cancelled) {
          return;
        }

        if (session.authenticated) {
          setState({
            hydrated: true,
            hasLocalToken: true,
            isAuthenticated: true,
            isChecking: false,
          });
          return;
        }

        clearAuthSession();
        setState({
          hydrated: true,
          hasLocalToken: false,
          isAuthenticated: false,
          isChecking: false,
        });
      } catch {
        clearAuthSession();

        if (!cancelled) {
          setState({
            hydrated: true,
            hasLocalToken: false,
            isAuthenticated: false,
            isChecking: false,
          });
        }
      }
    };

    void verifySession();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
