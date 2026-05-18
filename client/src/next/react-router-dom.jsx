"use client";

import NextLink from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

const OutletContext = createContext(null);

export function OutletProvider({ children, outlet }) {
  return (
    <OutletContext.Provider value={outlet}>{children}</OutletContext.Provider>
  );
}

export function Outlet() {
  return useContext(OutletContext);
}

export function Link({ to, href, replace: _replace, state: _state, ...props }) {
  return <NextLink href={href ?? to ?? "#"} {...props} />;
}

export function NavLink({
  to,
  href,
  className,
  children,
  end = false,
  ...props
}) {
  const pathname = usePathname() || "/";
  const target = href ?? to ?? "#";
  const cleanTarget = String(target).split("?")[0];
  const isActive = end
    ? pathname === cleanTarget
    : pathname === cleanTarget || pathname.startsWith(`${cleanTarget}/`);
  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <NextLink href={target} className={resolvedClassName} {...props}>
      {typeof children === "function" ? children({ isActive }) : children}
    </NextLink>
  );
}

export function Navigate({ to, replace = false }) {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [replace, router, to]);

  return null;
}

export function useNavigate() {
  const router = useRouter();

  return (to, options = {}) => {
    if (typeof to === "number") {
      router.back();
      return;
    }

    if (options.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useParams() {
  return useNextParams();
}

export function useLocation() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams?.toString();

  return {
    pathname,
    search: search ? `?${search}` : "",
    hash: "",
    state: null,
  };
}

export function BrowserRouter({ children }) {
  return children;
}

export function Routes({ children }) {
  return children;
}

export function Route() {
  return null;
}
