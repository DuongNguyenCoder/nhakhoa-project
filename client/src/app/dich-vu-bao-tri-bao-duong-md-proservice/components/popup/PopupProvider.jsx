"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import DentalSOSPopup from "./DentalSOSPopup";

const PopupContext = createContext(null);

export function PopupProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /* mounted */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* auto open popup */
  useEffect(() => {
    if (!mounted) return;

    const viewed = sessionStorage.getItem("md-proservice-popup");

    if (viewed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);

      sessionStorage.setItem("md-proservice-popup", "true");
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted]);

  /* lock body scroll */
  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  /* esc close */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openPopup = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const togglePopup = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openPopup,
      closePopup,
      togglePopup,
    }),
    [isOpen, openPopup, closePopup, togglePopup],
  );

  return (
    <PopupContext.Provider value={value}>
      {children}

      {mounted &&
        createPortal(
          <DentalSOSPopup open={isOpen} onClose={closePopup} />,
          document.body,
        )}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("usePopup must be used within PopupProvider");
  }

  return context;
}
