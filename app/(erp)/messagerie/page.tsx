"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  MessageSquare,
  Users,
  Bell,
  Phone,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  MapPin,
  Send,
  Circle,
  FileText,
  Image,
  ChevronRight,
} from "lucide-react";

const breadcrumb = ["Collaboration", "Messagerie"];

type Tab = "messages" | "groupes" | "notifications";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup?: boolean;
  online?: boolean;
}

interface Message {
  id: string;
  sender: "admin" | "other";
  content: string;
  time: string;
  date: string;
  unread?: boolean;
}

const conversations: Conversation[] = [
  { id: "1", name: "Ibrahim Sawadogo", lastMessage: "Traitement Ridomil PAR-B1 effectue a 08h30 OK", time: "il y a 2h", unread: 1, online: true },
  { id: "2", name: "Equipe Terrain", lastMessage: "Konan: Controle fermentation LOT-048 a 14h?", time: "il y a 3h", unread: 2, isGroup: true },
  { id: "3", name: "Barry Callebaut Procurement", lastMessage: "RE: DEV-2025-012 - Ferrero...", time: "il y a 1j", unread: 0 },
  { id: "4", name: "Adjoua Messou", lastMessage: "Cut test LOT-047 termine - rapport envoye", time: "il y a 1j", unread: 0 },
  { id: "5", name: "Bamba Oumar", lastMessage: "Pieces JD commandees, ETA 15/07", time: "il y a 2j", unread: 0 },
  { id: "6", name: "Direction", lastMessage: "Reunion hebdo - CR disponible", time: "il y a 2j", unread: 0, isGroup: true },
  { id: "7", name: "ANADER", lastMessage: "Confirmation FORM-002 - 12/07", time: "il y a 3j", unread: 0 },
  { id: "8", name: "Konan Yao", lastMessage: "Analyse sol PAR-A3 - resultats joints", time: "il y a 4j", unread: 0 },
];

const msgs: Message[] = [
  { id: "1", sender: "other", content: "Bonjour, je confirme la detection de traces de mildiou sur PAR-B1. J'ai vu les taches blanches hier soir lors de mon tour de parcelle. Ca ressemble a du Phytophthora. L'IA dit 78% de probabilite.", time: "09:15", date: "09/07" },
  { id: "2", sender: "admin", content: "Compris. Tu as du Ridomil en stock ? Verifie avec Bamba. Si oui, traitement des aujourd'hui si la meteo le permet.", time: "09:22", date: "09/07" },
  { id: "3", sender: "other", content: "Bamba confirme 82 kg de Ridomil Gold 68 WG en stock. Meteo ensoleilee ce matin, vent faible. Je commence le traitement a 8h30 demain avec Aicha et Sekou.", time: "09:28", date: "09/07" },
  { id: "4", sender: "other", content: "Traitement demarre 08h30. Toute l'equipe equipee EPI. On commence par la zone nord de PAR-B1 (1,6 ha).", time: "08:31", date: "10/07" },
  { id: "5", sender: "other", content: "Traitement PAR-B1 termine. 120L de bouillie appliques sur 3,2 ha. 3 cabosses infectees supprimees. J'ai fait un RT (rapport terrain RT-2025-082). DRE 14j -> surveiller avant traitement suivant.", time: "10:48", date: "10/07" },
  { id: "6", sender: "other", content: "Bonjour. Fermentation LOT-2025-048 en J5. Cut test hier : 89% brunes, 8% violettes, 3% ardoisees. Dans les normes pour J5. Adjoua fait le J6 final demain matin.", time: "09:15", date: "11/07", unread: true },
];

const attachments = [
  { name: "rapport-terrain-RT-2025-082.pdf", size: "1,2 MB", date: "11/07", type: "pdf" },
  { name: "photo-mildiou-PAR-B1.jpg", size: "2,4 MB", date: "09/07", type: "img" },
  { name: "analyse-sol-PAR-A3.pdf", size: "0,8 MB", date: "08/07", type: "pdf" },
];

const groups = [
  { name: "Equipe Terrain", members: 6, unread: 2 },
  { name: "Direction", members: 4, unread: 0 },
  { name: "Cooperative", members: 5, unread: 0 },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[10px] text-gray-400 w-20 flex-shrink-0">{label}</span>
      <span className="text-[10px] font-medium text-gray-700">{value}</span>
    </div>
  );
}

export default function MessageriePage() {
  const [tab, setTab] = useState<Tab>("messages");
  const [activeConv, setActiveConv] = useState("1");
  const [inputValue, setInputValue] = useState("");

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={breadcrumb} />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Colonne gauche 240px */}
        <div className="w-60 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
          <div className="px-4 pt-4 pb-2 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">Messagerie</span>
            {totalUnread > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none">
                {totalUnread} non lus
              </span>
            )}
          </div>

          <div className="flex border-b border-gray-100 mx-2">
            {(
              [
                { key: "messages" as Tab, icon: MessageSquare, label: "Messages" },
                { key: "groupes" as Tab, icon: Users, label: "Groupes" },
                { key: "notifications" as Tab, icon: Bell, label: "Notifs" },
              ]
            ).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 flex flex-col items-center py-2 text-[10px] gap-0.5 transition-colors ${
                  tab === key
                    ? "text-[#2E7D32] border-b-2 border-[#2E7D32]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {tab === "messages" && (
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase px-4 pt-3 pb-1 tracking-wide">
                  Conversations recentes
                </p>
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConv(conv.id)}
                    className={`w-full flex items-start gap-2 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left ${
                      activeConv === conv.id ? "bg-green-50 border-r-2 border-[#2E7D32]" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white ${
                        conv.isGroup ? "bg-[#E65100]" : "bg-[#2E7D32]"
                      }`}
                    >
                      {conv.isGroup ? <Users size={14} /> : getInitials(conv.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-800 truncate max-w-[90px]">
                          {conv.name}
                        </span>
                        <span className="text-[9px] text-gray-400 flex-shrink-0 ml-1">{conv.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-4 h-4 bg-[#2E7D32] rounded-full flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0 mt-1">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {tab === "groupes" && (
              <div className="p-3 space-y-2">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Mes groupes</p>
                {groups.map((g) => (
                  <div
                    key={g.name}
                    className="flex items-center gap-2 p-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E65100] flex items-center justify-center">
                      <Users size={14} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800">{g.name}</p>
                      <p className="text-[10px] text-gray-500">{g.members} membres</p>
                    </div>
                    {g.unread > 0 && (
                      <span className="w-4 h-4 bg-[#2E7D32] rounded-full flex items-center justify-center text-[9px] text-white font-bold">
                        {g.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === "notifications" && (
              <div className="p-4">
                <p className="text-xs text-gray-500 text-center mt-8">Aucune notification en attente</p>
              </div>
            )}
          </div>
        </div>

        {/* Colonne centrale flex-1 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Bandeau */}
          <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2E7D32] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              IS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">Ibrahim Sawadogo</p>
              <div className="flex items-center gap-1">
                <Circle size={7} className="fill-green-500 text-green-500" />
                <span className="text-[10px] text-green-600">En ligne</span>
                <span className="text-[10px] text-gray-400 ml-1">— Resp. Terrain</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Appel">
                <Phone size={15} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Rechercher">
                <Search size={15} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Options">
                <MoreVertical size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {(() => {
              let lastDate = "";
              return msgs.map((msg) => {
                const showDate = msg.date !== lastDate;
                lastDate = msg.date;
                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-[10px] text-gray-400 font-medium">{msg.date}</span>
                        <div className="flex-1 h-px bg-gray-100" />
                      </div>
                    )}
                    <div className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"} mb-2`}>
                      {msg.sender === "other" && (
                        <div className="w-7 h-7 rounded-full bg-[#2E7D32] flex items-center justify-center text-[10px] font-bold text-white mr-2 flex-shrink-0 mt-1">
                          IS
                        </div>
                      )}
                      <div className="max-w-[62%]">
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                            msg.sender === "admin"
                              ? "bg-[#2E7D32] text-white rounded-tr-sm"
                              : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div className={`flex items-center gap-1 mt-0.5 ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                          <span className="text-[9px] text-gray-400">{msg.time}</span>
                          {msg.unread && (
                            <span className="text-[9px] bg-[#2E7D32] text-white rounded-full px-1.5 py-0.5 leading-none font-medium ml-1">
                              Non lu
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Zone saisie */}
          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                <Paperclip size={16} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ecrire un message..."
                className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
              />
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                <Smile size={16} />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                <MapPin size={16} />
              </button>
              <button className="w-7 h-7 bg-[#2E7D32] rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-[#1B5E20] transition-colors">
                <Send size={13} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Colonne droite 280px */}
        <div className="w-[280px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-y-auto">
          <div className="p-5 border-b border-gray-100 text-center">
            <div className="w-14 h-14 rounded-full bg-[#2E7D32] flex items-center justify-center text-xl font-bold text-white mx-auto mb-2">
              IS
            </div>
            <p className="text-sm font-semibold text-gray-800">Ibrahim Sawadogo</p>
            <p className="text-[11px] text-gray-500 mb-2">Responsable Terrain</p>
            <div className="flex items-center justify-center gap-1">
              <Circle size={7} className="fill-green-500 text-green-500" />
              <span className="text-[10px] text-green-600">En ligne depuis 09h15</span>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100 space-y-2.5">
            <InfoRow label="Telephone" value="+225 07 XX XX XX" />
            <InfoRow label="Email" value="ibrahim.s@agrifrik.com" />
            <InfoRow label="Parcelles" value="PAR-A1, A2, A3, B1, B2" />
            <InfoRow label="Echanges" value="48 messages ce mois" />
          </div>

          <div className="p-4">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Pieces jointes partagees
            </p>
            <div className="space-y-2">
              {attachments.map((att) => (
                <div
                  key={att.name}
                  className="flex items-center gap-2 p-2 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      att.type === "pdf" ? "bg-red-50" : "bg-blue-50"
                    }`}
                  >
                    {att.type === "pdf" ? (
                      <FileText size={14} className="text-red-500" />
                    ) : (
                      <Image size={14} className="text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-gray-700 truncate">{att.name}</p>
                    <p className="text-[9px] text-gray-400">
                      {att.size} — {att.date}
                    </p>
                  </div>
                  <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
