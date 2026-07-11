"use client";

import { useState } from "react";
import Topbar from "../../../components/Topbar";
import {
  Camera,
  Save,
  Building2,
  Globe,
  Link2,
  MessageCircle,
  Bell,
  CheckCircle2,
} from "lucide-react";

// â”€â”€â”€ toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        checked ? "bg-green-600" : "bg-gray-200"
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// â”€â”€â”€ champ de formulaire â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent transition";

const readonlyCls =
  "w-full px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-600 cursor-default";

// â”€â”€â”€ page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function ProfilPage() {
  const [saved, setSaved] = useState(false);
  const [savedPref, setSavedPref] = useState(false);

  const [notifs, setNotifs] = useState({
    alertesCritiques: true,
    rapportHebdo: true,
    rapportIA: false,
    actualitesAgri: true,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSavePref() {
    setSavedPref(true);
    setTimeout(() => setSavedPref(false), 2000);
  }

  function toggleNotif(key: keyof typeof notifs) {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div>
      <Topbar title="Mon Profil" breadcrumb={["ParamÃ¨tres", "Profil"]} />

      <div className="p-6 space-y-6 max-w-4xl">

        {/* â”€â”€ Photo & identitÃ© â”€â”€ */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            Photo &amp; identitÃ©
          </h2>

          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white select-none"
                style={{ backgroundColor: "#2E7D32" }}
              >
                JK
              </div>
              <button
                className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                title="Changer la photo"
                type="button"
              >
                <Camera size={14} className="text-gray-500" />
              </button>
            </div>

            <div>
              <p className="text-lg font-bold text-gray-900">Jean-Baptiste Koffi</p>
              <p className="text-sm text-gray-500">Directeur gÃ©nÃ©ral</p>
              <p className="text-sm text-gray-400">AGROTEK CI</p>
              <button
                type="button"
                className="mt-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Changer la photo
              </button>
            </div>
          </div>
        </div>

        {/* â”€â”€ Informations personnelles â”€â”€ */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            Informations personnelles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="PrÃ©nom">
              <input type="text" defaultValue="Jean-Baptiste" className={inputCls} />
            </Field>
            <Field label="Nom">
              <input type="text" defaultValue="Koffi" className={inputCls} />
            </Field>
            <Field label="Email professionnel">
              <input type="email" defaultValue="jb.koffi@agrotek-ci.com" className={inputCls} />
            </Field>
            <Field label="TÃ©lÃ©phone">
              <input type="tel" defaultValue="+225 07 12 34 56" className={inputCls} />
            </Field>
            <Field label="Poste / Fonction">
              <input type="text" defaultValue="Directeur gÃ©nÃ©ral" className={inputCls} />
            </Field>
            <Field label="DÃ©partement">
              <input type="text" defaultValue="Direction gÃ©nÃ©rale" className={inputCls} />
            </Field>
            <Field label="Date de naissance">
              <input type="date" defaultValue="1978-04-15" className={inputCls} />
            </Field>
            <Field label="NationalitÃ©">
              <input type="text" defaultValue="Ivoirienne" className={inputCls} />
            </Field>
            <Field label="Langue prÃ©fÃ©rÃ©e">
              <select className={inputCls + " bg-white"}>
                <option value="fr">FranÃ§ais</option>
                <option value="en">English</option>
                <option value="dioula">Dioula</option>
              </select>
            </Field>
            <Field label="Fuseau horaire">
              <input type="text" defaultValue="Africa/Abidjan" readOnly className={readonlyCls} />
            </Field>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2E7D32" }}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={15} />
                  EnregistrÃ© !
                </>
              ) : (
                <>
                  <Save size={15} />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </div>

        {/* â”€â”€ Informations entreprise â”€â”€ */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Building2 size={16} className="text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">
              Informations entreprise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Raison sociale">
              <div className={readonlyCls}>AGROTEK CI SARL</div>
            </Field>
            <Field label="RCCM">
              <div className={readonlyCls}>CI-ABJ-2019-B-12345</div>
            </Field>
            <Field label="RÃ©gime fiscal">
              <div className={readonlyCls}>RÃ©el simplifiÃ© (SYSCOHADA)</div>
            </Field>
            <Field label="Capital social">
              <div className={readonlyCls}>50 000 000 XOF</div>
            </Field>
            <Field label="SiÃ¨ge social" className="sm:col-span-2">
              <div className={readonlyCls}>
                SoubrÃ©, RÃ©gion de la Nawa, CÃ´te d&apos;Ivoire
              </div>
            </Field>
            <Field label="ActivitÃ© principale" className="sm:col-span-2">
              <div className={readonlyCls}>
                Agriculture â€” Cultures pÃ©rennes (cacao, anacarde)
              </div>
            </Field>
          </div>
        </div>

        {/* â”€â”€ RÃ©seaux & liens â”€â”€ */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            RÃ©seaux &amp; liens
          </h2>

          <div className="space-y-4">
            <Field label="LinkedIn">
              <div className="relative">
                <Link2
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  defaultValue="https://linkedin.com/in/jb-koffi-agrotek"
                  className={inputCls + " pl-9"}
                />
              </div>
            </Field>

            <Field label="Site web entreprise">
              <div className="relative">
                <Globe
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="url"
                  placeholder="https://..."
                  defaultValue="https://agrotek-ci.com"
                  className={inputCls + " pl-9"}
                />
              </div>
            </Field>

            <Field label="WhatsApp professionnel">
              <div className="relative">
                <MessageCircle
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  placeholder="+225..."
                  defaultValue="+225 07 12 34 56"
                  className={inputCls + " pl-9"}
                />
              </div>
            </Field>
          </div>
        </div>

        {/* â”€â”€ Notifications par email â”€â”€ */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={16} className="text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">
              Notifications par email
            </h2>
          </div>

          <div className="space-y-4">
            {(
              [
                {
                  key: "alertesCritiques" as const,
                  label: "Alertes critiques",
                  desc: "Stocks faibles, pannes, alertes mÃ©tÃ©o sÃ©vÃ¨res",
                },
                {
                  key: "rapportHebdo" as const,
                  label: "Rapport hebdomadaire",
                  desc: "RÃ©sumÃ© de l'activitÃ© chaque lundi matin",
                },
                {
                  key: "rapportIA" as const,
                  label: "Rapport IA",
                  desc: "Analyse prÃ©dictive et recommandations automatiques",
                },
                {
                  key: "actualitesAgri" as const,
                  label: "ActualitÃ©s agricoles",
                  desc: "Prix du marchÃ©, rÃ©glementations, bonnes pratiques",
                },
              ] as const
            ).map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <Toggle
                  checked={notifs[item.key]}
                  onChange={() => toggleNotif(item.key)}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSavePref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2E7D32" }}
            >
              {savedPref ? (
                <>
                  <CheckCircle2 size={15} />
                  PrÃ©fÃ©rences enregistrÃ©es !
                </>
              ) : (
                <>
                  <Save size={15} />
                  Enregistrer les prÃ©fÃ©rences
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
