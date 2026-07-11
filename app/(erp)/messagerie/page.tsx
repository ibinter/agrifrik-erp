"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Search,
  Plus,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Camera,
  Send,
  FileText,
  FileSpreadsheet,
  Image,
  ClipboardList,
  FolderOpen,
  Bell,
  Users,
} from "lucide-react";

const breadcrumb = ["Collaboration", "Messagerie"];

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  status: "online" | "offline" | "external";
  isGroup?: boolean;
  initials: string;
  color: string;
}

const discussions: Conversation[] = [
  {
    id: "1",
    name: "Équipe EXP-001",
    lastMessage: "Ibrahim: Commande KCl effectuée",
    time: "09h14",
    unread: 2,
    status: "online",
    isGroup: true,
    initials: "EX",
    color: "#2E7D32",
  },
  {
    id: "2",
    name: "Ibrahim Sawadogo",
    lastMessage: "Rapport terrain soumis RT-028",
    time: "07h02",
    status: "online",
    initials: "IS",
    color: "#E65100",
  },
  {
    id: "3",
    name: "Adjoua Messou",
    lastMessage: "Facture BC réglée ✅",
    time: "08/07",
    status: "online",
    initials: "AM",
    color: "#1565C0",
  },
  {
    id: "4",
    name: "Kofi Mensah",
    lastMessage: "Merci pour la formation",
    time: "07/07",
    status: "offline",
    initials: "KM",
    color: "#6A1B9A",
  },
];

const externalContacts: Conversation[] = [
  {
    id: "5",
    name: "Barry Callebaut CI",
    lastMessage: "Confirmation BL-008",
    time: "09/07",
    status: "external",
    initials: "BC",
    color: "#4A235A",
  },
  {
    id: "6",
    name: "ANADER Soubré",
    lastMessage: "Convocation session BPA août",
    time: "05/07",
    status: "offline",
    initials: "AN",
    color: "#1A5276",
  },
  {
    id: "7",
    name: "SCPA Afrique",
    lastMessage: "Devis Super Cupravit disponible",
    time: "04/07",
    status: "offline",
    initials: "SC",
    color: "#784212",
  },
];

interface ChatMessage {
  id: string;
  sender: "KA" | "IS" | "AM";
  senderName: string;
  content: string;
  time: string;
  color: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "KA",
    senderName: "Koffi Amani",
    content:
      "Bonjour l'équipe 🌱 Vérification du stock KCl ce matin — on est à 2 sacs, il faut commander urgent.",
    time: "08h15",
    color: "#2E7D32",
  },
  {
    id: "2",
    sender: "IS",
    senderName: "Ibrahim Sawadogo",
    content:
      "Bonjour chef ! Confirmé, j'ai vérifié hier à l'entrepôt. On a besoin d'au moins 10 sacs pour la fertilisation PAR-B1 (tâche PCT-2025-036).",
    time: "08h22",
    color: "#E65100",
  },
  {
    id: "3",
    sender: "KA",
    senderName: "Koffi Amani",
    content:
      "Ok, j'ai créé la commande auprès de KCl Distribution — bon de commande ACH-2025-024. Livraison prévue 14/07.",
    time: "08h31",
    color: "#2E7D32",
  },
  {
    id: "4",
    sender: "IS",
    senderName: "Ibrahim Sawadogo",
    content:
      "Parfait. Le traitement PAR-A1 du 15/07 (Super Cupravit) — est-ce qu'on a reçu la livraison SCPA ?",
    time: "08h45",
    color: "#E65100",
  },
  {
    id: "5",
    sender: "AM",
    senderName: "Adjoua Messou",
    content:
      "Pas encore, j'ai relancé SCPA hier soir. Ils confirment livraison 12/07 matin 👍",
    time: "09h02",
    color: "#1565C0",
  },
  {
    id: "6",
    sender: "IS",
    senderName: "Ibrahim Sawadogo",
    content:
      "Commande KCl effectuée ✅ Bon de commande signé et envoyé par email à KCl Distribution.",
    time: "09h14",
    color: "#E65100",
  },
];

const sharedFiles = [
  { icon: "pdf", name: "RT-2025-028.pdf", label: "Rapport terrain", date: "07/07", author: "Ibrahim" },
  { icon: "xls", name: "Budget-phyto-juillet.xlsx", label: "", date: "05/07", author: "Koffi" },
  { icon: "img", name: "PAR-A1-mirides-photo.jpg", label: "", date: "07/07", author: "Ibrahim" },
  { icon: "pdf", name: "FAC-2025-008.pdf", label: "", date: "22/06", author: "Adjoua" },
  { icon: "pdf", name: "Commande-SCPA-ACH022.pdf", label: "", date: "14/06", author: "Koffi" },
];

function StatusDot({ status }: { status: "online" | "offline" | "external" }) {
  if (status === "online") return <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />;
  if (status === "external") return <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />;
  return <span className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />;
}

function Avatar({
  initials,
  color,
  size = "md",
  isGroup,
}: {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
  isGroup?: boolean;
}) {
  const sizes = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-xs", lg: "w-10 h-10 text-sm" };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      {isGroup ? <Users size={size === "sm" ? 12 : 14} /> : initials}
    </div>
  );
}

function ConvItem({
  conv,
  active,
  onClick,
}: {
  conv: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-2.5 px-3 py-2.5 text-left transition-colors ${
        active ? "bg-green-50 border-r-2 border-[#2E7D32]" : "hover:bg-gray-100"
      }`}
    >
      <div className="relative flex-shrink-0">
        <Avatar initials={conv.initials} color={conv.color} size="md" isGroup={conv.isGroup} />
        <span className="absolute -bottom-0.5 -right-0.5">
          <StatusDot status={conv.status} />
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[11px] font-semibold text-gray-800 truncate">{conv.name}</span>
          <span className="text-[9px] text-gray-400 flex-shrink-0">{conv.time}</span>
        </div>
        <p className="text-[10px] text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
      </div>
      {conv.unread ? (
        <span className="w-4 h-4 bg-[#2E7D32] rounded-full flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0 mt-0.5">
          {conv.unread}
        </span>
      ) : null}
    </button>
  );
}

export default function MessageriePage() {
  const [activeId, setActiveId] = useState("1");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [search, setSearch] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "KA",
        senderName: "Koffi Amani",
        content: input.trim(),
        time: `${h}h${m}`,
        color: "#2E7D32",
      },
    ]);
    setInput("");
  };

  const filterConvs = (list: Conversation[]) =>
    search ? list.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) : list;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar breadcrumb={breadcrumb} />

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
        {/* Colonne gauche — 260px */}
        <div className="w-[260px] flex-shrink-0 flex flex-col border-r border-gray-200" style={{ background: "#F5F5F5" }}>
          {/* Search */}
          <div className="p-3">
            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200">
              <Search size={13} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une conversation..."
                className="flex-1 bg-transparent text-[11px] text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Discussions */}
          <div className="flex-1 overflow-y-auto">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-2 pb-1">
              Discussions
            </p>
            {filterConvs(discussions).map((c) => (
              <ConvItem key={c.id} conv={c} active={activeId === c.id} onClick={() => setActiveId(c.id)} />
            ))}

            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-4 pb-1">
              Contacts externes
            </p>
            {filterConvs(externalContacts).map((c) => (
              <ConvItem key={c.id} conv={c} active={activeId === c.id} onClick={() => setActiveId(c.id)} />
            ))}
          </div>

          {/* Nouvelle conversation */}
          <div className="p-3 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium rounded-xl py-2 transition-colors">
              <Plus size={13} />
              Nouvelle conversation
            </button>
          </div>
        </div>

        {/* Colonne centrale — flex-1 */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* En-tête chat */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 flex-shrink-0">
            <div className="flex -space-x-2">
              <Avatar initials="KA" color="#2E7D32" size="sm" />
              <Avatar initials="IS" color="#E65100" size="sm" />
              <Avatar initials="AM" color="#1565C0" size="sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">Équipe EXP-001</p>
              <p className="text-[10px] text-green-600">3 membres en ligne</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Appel">
                <Phone size={15} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Vidéo">
                <Video size={15} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Infos">
                <Info size={15} />
              </button>
            </div>
          </div>

          {/* Corps du chat */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ background: "#FAFAFA" }}>
            {messages.map((msg) => {
              const isMine = msg.sender === "KA";
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
                  {!isMine && (
                    <Avatar initials={msg.sender} color={msg.color} size="sm" />
                  )}
                  <div className={`max-w-[58%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                    {!isMine && (
                      <span className="text-[9px] text-gray-500 font-medium px-1">{msg.senderName}</span>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        isMine
                          ? "bg-[#E8F5E9] text-gray-800 rounded-br-sm"
                          : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className={`text-[9px] text-gray-400 px-1 ${isMine ? "text-right" : "text-left"}`}>
                      {msg.time}
                    </span>
                  </div>
                  {isMine && (
                    <Avatar initials="KA" color="#2E7D32" size="sm" />
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            <div className="flex items-end gap-2">
              <Avatar initials="IS" color="#E65100" size="sm" />
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                <span className="text-[10px] text-gray-400 italic">Ibrahim est en train d&apos;écrire...</span>
                <span className="inline-flex gap-0.5 ml-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          </div>

          {/* Barre de saisie */}
          <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0" title="Pièce jointe">
                <Paperclip size={16} />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0" title="Emoji">
                <Smile size={16} />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0" title="Photo">
                <Camera size={16} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Écrire un message..."
                className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none mx-1"
              />
              <button
                onClick={handleSend}
                className="w-8 h-8 bg-[#2E7D32] hover:bg-[#1B5E20] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Colonne droite — 240px */}
        <div className="w-[240px] flex-shrink-0 border-l border-gray-100 bg-white flex flex-col overflow-y-auto">
          {/* Infos de la conversation */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Infos de la conversation
            </p>
            <p className="text-sm font-semibold text-gray-800">Équipe EXP-001</p>
            <p className="text-[10px] text-gray-500 mb-3">Groupe de travail</p>

            <p className="text-[10px] font-semibold text-gray-500 mb-2">Membres</p>
            <div className="space-y-2">
              {[
                { initials: "KA", color: "#2E7D32", name: "Koffi Amani", role: "Admin" },
                { initials: "IS", color: "#E65100", name: "Ibrahim Sawadogo", role: "" },
                { initials: "AM", color: "#1565C0", name: "Adjoua Messou", role: "" },
              ].map((m) => (
                <div key={m.initials} className="flex items-center gap-2">
                  <Avatar initials={m.initials} color={m.color} size="sm" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-gray-700 truncate">{m.name}</p>
                    {m.role && (
                      <span className="text-[9px] bg-green-50 text-green-700 rounded px-1">{m.role}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fichiers partagés */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Fichiers partagés récents
            </p>
            <div className="space-y-2">
              {sharedFiles.map((f) => {
                const iconEl =
                  f.icon === "pdf" ? (
                    <FileText size={13} className="text-red-500" />
                  ) : f.icon === "xls" ? (
                    <FileSpreadsheet size={13} className="text-green-600" />
                  ) : (
                    <Image size={13} className="text-blue-500" />
                  );
                const bg =
                  f.icon === "pdf" ? "bg-red-50" : f.icon === "xls" ? "bg-green-50" : "bg-blue-50";
                return (
                  <div
                    key={f.name}
                    className="flex items-center gap-2 p-2 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}>
                      {iconEl}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-medium text-gray-700 truncate">{f.name}</p>
                      <p className="text-[9px] text-gray-400">
                        {f.date} · {f.author}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Actions rapides
            </p>
            <div className="space-y-1.5">
              <button className="w-full flex items-center gap-2 text-[11px] text-gray-600 hover:text-[#2E7D32] hover:bg-green-50 rounded-xl px-3 py-2 transition-colors text-left">
                <ClipboardList size={13} className="flex-shrink-0" />
                Lier une tâche
              </button>
              <button className="w-full flex items-center gap-2 text-[11px] text-gray-600 hover:text-[#2E7D32] hover:bg-green-50 rounded-xl px-3 py-2 transition-colors text-left">
                <FolderOpen size={13} className="flex-shrink-0" />
                Voir tous les fichiers
              </button>
              <button className="w-full flex items-center gap-2 text-[11px] text-green-700 hover:text-[#2E7D32] hover:bg-green-50 rounded-xl px-3 py-2 transition-colors text-left">
                <Bell size={13} className="flex-shrink-0" />
                Notifications : Activées
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
