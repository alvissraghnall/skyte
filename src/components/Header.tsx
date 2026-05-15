import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

interface HeaderProps {
  onSettingsClick?: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-margin-page h-16 max-w-full mx-auto fixed top-0 z-50 border-b border-white/5">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-headline-md font-metropolis font-black text-primary tracking-tighter hover:opacity-80 transition-opacity uppercase"
        >
          SKYTE
        </Link>
        <nav className="hidden md:flex gap-6 h-full items-center">
          <Link
            to="/editor"
            activeProps={{ className: "text-primary border-primary" }}
            inactiveProps={{
              className: "text-on-surface-variant border-transparent",
            }}
            className="font-bold border-b-2 pb-1 h-full flex items-center font-hanken text-body-md hover:text-primary transition-colors duration-200"
          >
            Editor
          </Link>
          <Link
            to="/templates"
            activeProps={{ className: "text-primary border-primary" }}
            inactiveProps={{
              className: "text-on-surface-variant border-transparent",
            }}
            className="font-medium border-b-2 pb-1 h-full flex items-center font-hanken text-body-md hover:text-primary transition-colors duration-200"
          >
            Presets
          </Link>
          <Link
            to="/history"
            activeProps={{ className: "text-primary border-primary" }}
            inactiveProps={{
              className: "text-on-surface-variant border-transparent",
            }}
            className="font-medium border-b-2 pb-1 h-full flex items-center font-hanken text-body-md hover:text-primary transition-colors duration-200"
          >
            UI Library
          </Link>
          <Link
            to="/showcase"
            activeProps={{ className: "text-primary border-primary" }}
            inactiveProps={{
              className: "text-on-surface-variant border-transparent",
            }}
            className="font-medium border-b-2 pb-1 h-full flex items-center font-hanken text-body-md hover:text-primary transition-colors duration-200"
          >
            Showcase
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {onSettingsClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
          >
            <span className="material-symbols-outlined">settings</span>
          </Button>
        )}
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <span className="material-symbols-outlined">help</span>
        </Button>
        <Button className="hidden sm:flex">Go Pro</Button>
      </div>
    </header>
  );
}
