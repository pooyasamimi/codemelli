import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 bg-background/95 border-b backdrop-blur backdrop-filter supports-[backdrop-filter]:bg-background/60 py-4">
      <div className="container flex justify-center gap-9">
        <div className="">
          <a href="#" className="flex items-center gap-3">
            <img src="/id.png" alt="id icon" className="w-11 -rotate-12" />
            <span className="font-AhkioRegular text-4xl">
              CODE<span>MELLI</span>
            </span>
          </a>
        </div>
        <div
          className={`flex items-center cursor-pointer transition-transform duration-500 ${
            theme === "dark" ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="w-7 h-7 text-yellow-500" />
          ) : (
            <Moon className="w-7 h-7 text-blue-500" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
