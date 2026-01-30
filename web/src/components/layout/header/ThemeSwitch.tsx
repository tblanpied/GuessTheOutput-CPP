"use client";

import { useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Switch } from "@/components/ui/inputs";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = useMemo(
    () => theme === "dark" || (theme === "system" && resolvedTheme === "dark"),
    [theme, resolvedTheme]
  );

  if (!mounted) {
    return <Switch />;
  }

  return (
    <Switch
      thumbIcon={
        isDark ? (
          <Moon
            className="h-3 w-3"
            strokeWidth={3}
          />
        ) : (
          <Sun
            className="h-3 w-3"
            strokeWidth={3}
          />
        )
      }
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
    />
  );
};

export default ThemeSwitch;
