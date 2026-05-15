import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/_layout/templates")({
  component: Templates,
});

const PRESETS = [
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro (1179 x 2556)",
    description: "Portrait • 19.5:9 Aspect Ratio",
    badge: "High PPI",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDv-lhtw8Atc0g4nnB5W7mF7lJJLnKbWeyfxIK2JImE7HWy-27PmOdZUv_0Trw0xCJGLCljUrxp8GRf-RrrY1ZfbvK1ZGOWUTtRUpQiFkLCAL2aXvaNq3Izjypb4vJLdQfGHVyqGSxBTi023BgDM334RCFtBl5X4mRPkxgOIqAZaDxb5S9TMLj_6F5f10Jq8THW0hZlpp0hFpKLFXce0oW9jYBs4uZUOQVFVyVbcv8pV1ih1zKiqztIr920cQ9MUvauHPTcEh2zfBc",
    type: "mobile",
    aspectRatio: "1179/2556",
    width: "120px",
  },
  {
    id: "pixel-9-pro",
    name: "Pixel 9 Pro (1080 x 2400)",
    description: "Portrait • 20:9 Aspect Ratio",
    badge: "Android Standard",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCz_xheqtfeRgZqFzV7Njsj5C9j-9l3i7fv1gc6emk6rjhrhvWM_1aFGo3k1nG2SdxCJTnc-zfRwfuQgWauu4krJIK4wms73Qrx3xMukf0zTeaO4ZlegXOKCGl2shL5Q8HcyK8uDSvm_a2mvtam53ZeGo4lNKot2R4Zm4IH6lMcQW-J3vBJInG6lC2wnN_Vt8koX3lKXOUE0tKcaEWG2NsZw1wLE3vIdrLUXelJ_Sa8lL9-eIYP6AZ5Uqy-8FNmOeOOx5v-lIznzfI",
    type: "mobile",
    aspectRatio: "1080/2400",
    width: "120px",
  },
  {
    id: "ipad-pro",
    name: 'iPad Pro 12.9" (2732 x 2048)',
    description: "Landscape • 4:3 Aspect Ratio",
    badge: "Tablet View",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEJEp31kkNip2U50OMjJyVUUXvB6wgiXarLYJO71t0CsNFLsFHT-R69XFgVyyzlCKDcd8eUbkVn-6I_h51CyodELvdAGpe9J00dYqBxg8ghXWO-J_mFUvSAiJIYHyDfUo37nUCGkYAc6BOibtpvAR1hkjeILu_i2U81mX7IOyngt-ZtStFA9-6gC_hfjraW0oaRAbhwuWsiwZdHxODlVtojNrIaVxK8FarYNk0kIMThXYorLnx1fMfp4YFegem-xGPceuOz04fcJE",
    type: "tablet",
    aspectRatio: "2732/2048",
    width: "200px",
  },
  {
    id: "fhd-desktop",
    name: "FHD Desktop (1920 x 1080)",
    description: "Landscape • 16:9 Aspect Ratio",
    badge: "Web Standard",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfg1yJ0sf-FNugsuhtYxsgxog8IUqoo_3rxxlkVhxekjXHH4xi9Cx5lb9cXjX7vxEDsGkEZm5yHSUKdgwhtLWyUK4-rllgK6Q7P5vi7G6S5OFmuVO5SKxrlu1RF_JmUgdhfKcB71XtzuIWyLHkL1PZVFPWAXJ1MmjxMISaPAFNCftuZqdvETdJXRIT4jv862ZNy3afwIh0ctmYjyz_JR0AreFx0Vzg0zo5dbEIazdVg5-AD5-lyaxfeF9Kh70qGFqQ2asK9gnnzsQ",
    type: "desktop",
    aspectRatio: "16/9",
    width: "220px",
  },
];

function Templates() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPresets = PRESETS.filter((preset) => {
    const matchesFilter = filter === "all" || preset.type === filter;
    const matchesSearch = preset.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-margin-page pb-24">
          <div className="max-w-350 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <header className="mb-12">
              <h1 className="text-display-lg font-display-lg text-white mb-4 uppercase tracking-tight">
                Resolution Presets
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
                Select a target resolution for your UI Screenshots. All presets
                are pre-configured with pixel-perfect layout dimensions and
                aspect ratios.
              </p>
            </header>

            {/* Filters & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  className="rounded-full h-auto py-2"
                  onClick={() => setFilter("all")}
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">
                    grid_view
                  </span>
                  All
                </Button>
                <Button
                  variant={filter === "mobile" ? "default" : "outline"}
                  className="rounded-full h-auto py-2"
                  onClick={() => setFilter("mobile")}
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">
                    smartphone
                  </span>
                  Mobile
                </Button>
                <Button
                  variant={filter === "tablet" ? "default" : "outline"}
                  className="rounded-full h-auto py-2"
                  onClick={() => setFilter("tablet")}
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">
                    tablet_mac
                  </span>
                  Tablet
                </Button>
                <Button
                  variant={filter === "desktop" ? "default" : "outline"}
                  className="rounded-full h-auto py-2"
                  onClick={() => setFilter("desktop")}
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">
                    desktop_windows
                  </span>
                  Desktop
                </Button>
              </div>
              <div className="sm:ml-auto relative w-full sm:w-auto group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                  search
                </span>
                <Input
                  className="bg-surface-container border-white/10 text-on-surface font-body-md rounded-full py-2 pl-10 pr-4 focus:border-primary w-full sm:w-64 transition-colors h-auto"
                  placeholder="Search resolutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Resolution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="group relative bg-surface-container rounded-2xl overflow-hidden border border-white/5 flex flex-col cursor-pointer transition-transform hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl duration-300"
                >
                  <div className="h-64 bg-surface-container-highest relative flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent pointer-events-none"></div>
                    {/* Flat UI Screenshot */}
                    <div
                      className="bg-[#121212] rounded-md shadow-2xl overflow-hidden border border-white/10 z-10 scale-110"
                      style={{
                        width: preset.width,
                        aspectRatio: preset.aspectRatio,
                      }}
                    >
                      <img
                        alt={`UI Screenshot for ${preset.name}`}
                        className="w-full h-full object-cover"
                        src={preset.image}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-sm">
                      <Link
                        to="/editor"
                        search={{ device: preset.id }}
                        className="transform translate-y-4 group-hover:translate-y-0 transition-all"
                      >
                        <Button className="rounded-full shadow-[0_0_15px_rgba(83,224,118,0.3)] gap-2 h-auto py-3 px-6 font-bold">
                          <span className="material-symbols-outlined">
                            screenshot_region
                          </span>
                          Select Preset
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-body-md font-bold text-white mb-1 line-clamp-1">
                      {preset.name}
                    </h3>
                    <p className="text-label-sm text-on-surface-variant mb-4">
                      {preset.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="bg-surface-container-highest border border-white/5 text-on-surface-variant px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider">
                        {preset.badge}
                      </span>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPresets.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50 text-center">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    search_off
                  </span>
                  <p>No presets found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
