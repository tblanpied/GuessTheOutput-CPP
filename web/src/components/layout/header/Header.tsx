import { Logo } from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  return (
    <header
      className="bg-sidebar fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between px-4
        py-2 shadow-sm dark:shadow-zinc-700/60"
    >
      <Logo className="h-full" />
      <ThemeSwitch />
    </header>
  );
};

export default Header;
