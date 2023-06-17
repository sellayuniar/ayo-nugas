import {
  createContext,
  useState,
  useContext,
  useRef,
  React,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/router";

const StateContext = createContext();

const initialState = {
  profileMenu: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(true);
  const toggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  // set the html tag overflow to hidden
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  // close side navigation when route changes
  // it's triggered when viewport is less than 1024px
  useEffect(() => {
    if (open && window.innerWidth < 1024) {
      router.events.on("routeChangeStart", () => setOpen(false));
    }
    return () => {
      if (open && window.innerWidth < 1024) {
        router.events.off("routeChangeStart", () => setOpen(false));
      }
    };
  }, [open, router]);

  // close side navigation on click outside when viewport is less than 1024px
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (window.innerWidth < 1024) {
        if (!ref.current?.contains(event.target)) {
          if (!open) return;
          setOpen(false);
        }
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [open, ref]);

  return (
    <StateContext.Provider value={{ open, ref, toggle }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export function useToggle() {
  return useContext(StateContext);
}
