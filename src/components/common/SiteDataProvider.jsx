"use client";

import { createContext, useContext } from "react";
import { business as staticBusiness } from "@/config/business.config";

// ---------------------------------------------------------------------------
// Carries admin-editable data (business contact info, replaced fleet/
// destination images) from the server-rendered (site) layout — where it's
// fetched from the database once per request — down to the handful of
// client components that display it (Navbar, Footer, CallButton,
// WhatsAppButton, the Image wrapper). Every consumer falls back to the
// static defaults if rendered outside this provider (e.g. in isolation),
// so nothing breaks if a component is reused somewhere unexpected.
// ---------------------------------------------------------------------------

const SiteDataContext = createContext(null);

export function SiteDataProvider({ businessInfo, imageOverrides, children }) {
  return (
    <SiteDataContext.Provider value={{ businessInfo, imageOverrides: imageOverrides || {} }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useBusinessInfo() {
  const ctx = useContext(SiteDataContext);
  return ctx?.businessInfo || staticBusiness;
}

export function useImageOverrides() {
  const ctx = useContext(SiteDataContext);
  return ctx?.imageOverrides || {};
}
