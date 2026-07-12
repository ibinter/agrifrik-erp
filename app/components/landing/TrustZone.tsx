"use client";
import { Shield, Wifi, Clock, Globe, Leaf, Download, RefreshCw, Headphones } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

const ICONS = [Shield, Wifi, Clock, Globe, Leaf, Download, RefreshCw, Headphones];

export default function TrustZone() {
  const { lang } = useLang();
  return (
    <section className="py-10 border-y" style={{ backgroundColor: "#F4F8F4", borderColor: "#C8E6C9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {t.trust.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#E8F5E9" }}>
                  <Icon size={16} style={{ color: "#2E7D32" }} />
                </div>
                <span className="text-xs font-medium text-gray-600 leading-tight">{item[lang]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
