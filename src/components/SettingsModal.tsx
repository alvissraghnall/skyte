import { useState, useEffect } from "react";
import { historyStorage } from "#/lib/storage";
import { Button } from "#/components/ui/button";
import { Switch } from "#/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "#/components/ui/dialog";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [retinaExport, setRetinaExport] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("skyte_retina_export");
    if (stored !== null) {
      setRetinaExport(stored === "true");
    }
  }, []);

  const handleToggleRetina = (checked: boolean) => {
    setRetinaExport(checked);
    localStorage.setItem("skyte_retina_export", String(checked));
  };

  const handleClearHistory = () => {
    if (
      confirm(
        "Are you sure you want to clear all history? This cannot be undone.",
      )
    ) {
      historyStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-surface-container-high border-white/10 text-on-surface">
        <DialogHeader>
          <DialogTitle className="font-headline-md text-white">
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 space-y-8">
          <section className="space-y-4">
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest">
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="retina-export"
                  className="space-y-0.5 cursor-pointer"
                >
                  <div className="font-body-md text-white">
                    Retina Export (2x)
                  </div>
                  <div className="text-label-sm text-on-surface-variant">
                    Higher quality, larger file size.
                  </div>
                </label>
                <Switch
                  id="retina-export"
                  checked={retinaExport}
                  onCheckedChange={handleToggleRetina}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest text-error">
              Danger Zone
            </h3>
            <Button
              variant="destructive"
              onClick={handleClearHistory}
              className="w-full justify-between group"
            >
              <div>
                <div className="font-body-md font-bold text-left">
                  Clear All History
                </div>
                <div className="text-label-sm opacity-80 text-left">
                  This will permanently delete your screenshots.
                </div>
              </div>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">
                delete_forever
              </span>
            </Button>
          </section>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
