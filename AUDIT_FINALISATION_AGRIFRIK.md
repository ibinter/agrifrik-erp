# AUDIT_FINALISATION_AGRIFRIK.md
**Produit :** AGRIFRIK ERP  
**Éditeur :** IBIG Soft — Intermark Business International Group  
**Date d'audit :** 12 juillet 2026  
**Version analysée :** 0.1.0  
**URL production :** https://agrifrik.ibigsoft.com  
**Auditeur :** Claude Code (Anthropic) — analyse statique exhaustive  

---

## A. ÉTAT ACTUEL DU PROJET

AGRIFRIK ERP est une **démo fonctionnelle avancée** d'un ERP agricole africain bâti sur Next.js 16 / React 19 / TypeScript / Tailwind CSS v4. L'interface couvre 48 modules, le design est professionnel et cohérent. Cependant, **l'application est entièrement non-persistante** : toutes les données proviennent de constantes TypeScript codées en dur. Supabase est installé mais non connecté. Aucune mutation ne survit à un rechargement.

---

## B. FONCTIONNALITÉS PRÉSENTES (UI)

| Catégorie | Modules présents |
|-----------|-----------------|
| Production | Exploitations, Cultures, Élevage, Pisciculture, Cartographie, Planning cultural, Semences, Transformation |
| Logistique | Stocks, Entrepôts, Achats, Fournisseurs, Matériels, Intrants, Logistique |
| Commerce | Ventes, Exportation, Importation, Prix marché, Devis, Factures, Suivi qualité, Traçabilité, Audit, Certifications, Contrats |
| Finance | Comptabilité SYSCOHADA, Trésorerie, Budget, Prévisions, Inventaire, Assurances, Actifs |
| RH & Paie | RH, Paie, Planning RH, Formations, Coopérative, Projets, Gestion terres |
| Rapports & BI | Rapports, Analytics, Direction, Rapport annuel, Rapport builder, Rapports planifiés, Rapports terrain, Bailleur |
| IA & Données | ARIA (IA), Météo, Calendrier |
| Collaboration | Messagerie, Tâches, Documents |
| Administration | Administration, RSE, Portail producteur, Alertes, Logs, Notifications, Aide |
| Paramètres | Profil, Sécurité, Préférences, Intégrations, Abonnement, Facturation, Notifications |

**Total : 48 modules — UI présente, données 100% mockées.**

---

## C. FONCTIONNALITÉS INCOMPLÈTES

| Fonctionnalité | État | Détail |
|---------------|------|--------|
| Authentification | ❌ Simulée | Token factice, mot de passe en clair, localStorage |
| Supabase | ❌ Non connecté | Client configuré, hooks = stubs vides |
| Persistance données | ❌ Absente | Aucune mutation ne persiste |
| APIs backend | ⚠️ 13/48 | 35+ modules sans API |
| Export XLSX | ❌ Absent | Boutons présents, pas de SheetJS |
| Export PDF | ❌ Absent | Boutons présents, pas de jsPDF |
| Multilingue FR/EN | ❌ Absent | 100% hard-codé en français |
| Système licences SaaS | ❌ Absent | Interface abonnement présente, pas de logique |
| Paiements (CinetPay, etc.) | ❌ Absent | Architecture non définie |
| Console Superadmin IBIG | ❌ Absente | Page Administration présente mais locale |
| Emails automatiques | ❌ Absents | Aucune infrastructure email |
| Tests (Jest/Playwright) | ❌ Absents | Zéro test |
| Icônes PWA | ❌ Absentes | Dossier /public/icons/ manquant |
| Service Worker (offline) | ❌ Absent | PWA partielle |
| Dark mode complet | ⚠️ Partiel | Couleurs inline non adaptées |
| Recherche globale | ⚠️ Partielle | Composant présent, données non connectées |
| IA (ARIA) | ⚠️ Simulée | Réponses hard-codées |
| Cartographie | ⚠️ Partielle | Pas de carte interactive réelle |

---

## D. ANOMALIES DÉTECTÉES

### Critiques
1. **Mot de passe en clair dans le code** : `agrifrik2025` visible dans `app/api/auth/login/route.ts`
2. **Token factice** : `demo-token-{id}-{timestamp}` — pas de JWT signé
3. **Aucune vérification serveur** : routes API accessibles sans authentification réelle
4. **localStorage pour les credentials** : vulnérable XSS

### Majeures
5. **Incohérence effectifs** : 7 employés (lib/data.ts) ≠ 15 (page RH) ≠ 23 (dashboard) ≠ 287 (page login)
6. **Doublons sidebar** : Transformation et Contrats listés dans 2 catégories
7. **Icônes PWA manquantes** : 8 fichiers PNG déclarés, aucun présent
8. **Boutons sans action** : Export Excel, Import données, Synchroniser Supabase
9. **IA non fonctionnelle** : ARIA répond avec des tableaux hard-codés

### Mineures
10. **Double style print** dans globals.css
11. **2 routes dashboard stats** (`api/dashboard/stats` et `api/stats/dashboard`) — doublon
12. **User redéfini 2 fois** : `lib/types.ts` et `context/AuthContext.tsx` divergents

---

## E. RISQUES TECHNIQUES

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Fuite de données inter-tenants | Élevée si Supabase connecté sans RLS | Critique | Configurer RLS avant tout |
| Contournement auth | Certaine (actuelle) | Critique | Remplacer par Supabase Auth + JWT |
| Perte données si crash | Certaine (actuelle) | Critique | Connecter Supabase |
| Régression lors migration Supabase | Moyenne | Élevé | Tests avant migration |
| Breaking changes Next.js 16 | Faible | Moyen | Surveiller changelog |

---

## F. ÉCARTS PAR RAPPORT AU CAHIER DES CHARGES (PROMPT MAÎTRE)

| Section | Exigence | État |
|---------|----------|------|
| § 3 Identité visuelle | Logo officiel, favicon, variantes | ⚠️ Logo AGRIFRIK présent, icônes PWA absentes |
| § 4 Tableaux de bord | KPIs dynamiques par rôle | ❌ KPIs hard-codés |
| § 5 Page de vente | Landing haute conversion | ⚠️ Landing présente mais basique |
| § 6 Licences SaaS | Moteur de licences complet | ❌ Absent |
| § 7 Paiements | CinetPay, Mobile Money, etc. | ❌ Absent |
| § 8 Emails automatiques | Séquence complète 15 emails | ❌ Absent |
| § 9 Console Superadmin | CRM prospects, gestion clients | ❌ Absent |
| § 10 Centre d'aide | Base de connaissances, tickets | ❌ Absent (page aide basique) |
| § 11 IA intégrée | IA configurable, RAG, multiprestataire | ❌ Simulée |
| § 12 Guide utilisateur PDF | Guide complet FR/EN | ❌ Absent |
| § 13 Exports PDF/XLSX | Tous modules | ❌ CSV uniquement |
| § 14 Multilingue | FR + EN obligatoire | ❌ FR uniquement |
| § 15 Rôles et permissions | 11 rôles, contrôle serveur | ❌ Pas de contrôle serveur |
| § 16 Multi-entreprise | Isolation des données | ❌ Non implémenté |
| § 17 Sécurité | JWT, RLS, rate limiting, MFA | ❌ Multiples lacunes |
| § 18 Journal d'audit | Actions sensibles tracées | ⚠️ UI présente, non persisté |
| § 19 Notifications | Multicanal (app, email, SMS) | ⚠️ UI présente, email/SMS absent |
| § 20 Import de données | XLSX/CSV avec validation | ❌ Absent |
| § 24 Performance | Cache, pagination, lazy loading | ⚠️ Partiel |
| § 25 Sauvegardes | Politique de backup | ❌ Absent |
| § 26 Pages légales | CGU, confidentialité, cookies | ⚠️ Page aide/legal présente, incomplète |
| § 27 SEO | Sitemap, OG, données structurées | ⚠️ Partiel (sitemap présent) |
| § 29 Tests | Fonctionnels, sécurité, e2e | ❌ Zéro test |
| § 30 Données démo | Environnement démo professionnel | ⚠️ Données mock présentes, non réinitialisables |
| § 31 Onboarding | Parcours post-inscription | ⚠️ Page présente, incomplète |

---

## G. ÉTAT DE L'IDENTITÉ VISUELLE

| Élément | État |
|---------|------|
| Couleurs principales (#1B5E20, #2E7D32, #4CAF50) | ✅ Cohérentes |
| Couleur accent orange (#E65100) | ✅ Présente |
| Variables CSS centralisées | ✅ Dans globals.css |
| Logo AGRIFRIK | ✅ Présent (SVG/texte) |
| Favicon | ⚠️ À vérifier |
| Icônes (lucide-react uniquement) | ✅ Conforme |
| Typographie | ✅ Cohérente |
| Composants UI harmonisés | ✅ Design system présent |
| Dark mode | ⚠️ Partiel |
| Responsive mobile | ✅ Sidebar overlay, BottomNav |
| Mode impression | ✅ Media query présente |

---

## H. PLAN DE CORRECTION PAR PHASES

### PHASE 1 — SOCLE CRITIQUE (Priorité maximale)
**Durée estimée : 3-4 semaines**

1. **Authentification réelle**
   - Supabase Auth (email + mot de passe hashé)
   - JWT signé côté serveur
   - Cookie HttpOnly (remplacer localStorage)
   - Rate limiting sur login
   - Middleware Next.js pour protection des routes

2. **Connexion Supabase + schéma complet**
   - Migrations SQL pour les 48 modules
   - RLS (Row Level Security) par tenant
   - Remplacement des 13 APIs mock par Supabase
   - Hooks Supabase réels (remplacer les stubs)

3. **Multi-tenant (isolation)**
   - Champ `organisation_id` sur toutes les tables
   - RLS appliquée partout
   - Tests d'isolation inter-entreprises

4. **Sécurité de base**
   - CSRF tokens
   - En-têtes sécurité (HSTS, CSP, X-Frame-Options)
   - Validation côté serveur sur toutes les routes API
   - Nettoyage du mot de passe en clair

### PHASE 2 — EXPÉRIENCE PRODUIT
**Durée estimée : 3-4 semaines**

5. **APIs pour les 35 modules manquants**
   - Toutes les routes CRUD (GET, POST, PUT, DELETE)
   - Pagination, filtres, recherche
   - Connexion Supabase

6. **Dashboard dynamique**
   - KPIs depuis Supabase
   - Filtres par période et rôle
   - Graphiques SVG avec données réelles

7. **Exports fonctionnels**
   - SheetJS pour XLSX
   - jsPDF pour PDF (factures, rapports, fiches)
   - Tous les modules concernés

8. **Dark mode complet**
   - Remplacement des couleurs inline par variables CSS

9. **PWA complète**
   - Génération des 8 icônes PNG (/public/icons/)
   - Service Worker (offline)

### PHASE 3 — COMMERCIALISATION SaaS
**Durée estimée : 4-5 semaines**

10. **Système de licences**
    - Tables : plans, licences, organisations
    - Moteur : essai, activation, expiration, renouvellement
    - Contrôle serveur (pas côté client)

11. **Paiements**
    - Architecture fournisseur interchangeable
    - CinetPay + Mobile Money (priorité Afrique)
    - Mode test / production
    - Journal des paiements, webhooks

12. **Emails automatiques**
    - Infrastructure : Resend ou SMTP configurable
    - 15 templates (séquence complète du Prompt Maître)
    - File d'attente, retry, journalisation

13. **Console Superadmin IBIG Soft**
    - Route séparée `/superadmin`
    - Tableau de bord global
    - Gestion prospects (mini-CRM)
    - Gestion clients et licences
    - Paramètres éditeur

14. **Landing page haute conversion**
    - Structure complète (A→L du Prompt Maître)
    - Tarifs depuis base de données
    - SEO optimisé

### PHASE 4 — ASSISTANCE & IA
**Durée estimée : 2-3 semaines**

15. **Centre d'aide réel**
    - Base de connaissances administrable
    - Système de tickets
    - FAQ indexable

16. **IA (ARIA) fonctionnelle**
    - Connexion API Claude/Groq/OpenAI configurable
    - RAG sur la documentation AGRIFRIK
    - IA publique (landing) + interne (ERP)

17. **Guide utilisateur PDF**
    - Générateur de guide FR/EN
    - Export PDF professionnel

### PHASE 5 — FINALISATION
**Durée estimée : 2-3 semaines**

18. **Multilingue FR/EN**
    - next-intl
    - Extraction de toutes les chaînes
    - Traduction initiale

19. **Tests**
    - Vitest (unitaires)
    - Playwright (e2e : login, CRUD, exports, paiements)
    - Tests de sécurité (IDOR, permissions)

20. **Performance**
    - Pagination serveur
    - Cache Supabase
    - Optimisation images

21. **Documentation technique**
    - Guide installation/déploiement
    - Guide SMTP, paiements, IA
    - Variables d'environnement documentées

---

## I. FICHIERS ET MODULES CONCERNÉS PAR LES CORRECTIONS

| Fichier/Dossier | Action |
|----------------|--------|
| `app/api/auth/login/route.ts` | Remplacer par Supabase Auth |
| `app/context/AuthContext.tsx` | Remplacer par sessions Supabase |
| `lib/supabase/hooks.ts` | Implémenter les 48 hooks réels |
| `lib/supabase/types.ts` | Ajouter les 43 tables manquantes |
| `supabase/migrations/` | Créer migrations complètes |
| `lib/data.ts` | Garder pour seeds/démo uniquement |
| `app/api/` | Créer 35+ nouvelles routes |
| `app/components/ui/ExportButton.tsx` | Étendre : XLSX + PDF |
| `public/icons/` | Créer le dossier + 8 PNG |
| `app/(erp)/dashboard/page.tsx` | Connecter KPIs à Supabase |
| `app/globals.css` | Supprimer doublon print, compléter dark |
| `package.json` | Ajouter : xlsx, jspdf, next-intl, resend |
| NOUVEAU : `app/(superadmin)/` | Console Superadmin IBIG |
| NOUVEAU : `app/api/superadmin/` | APIs Superadmin |
| NOUVEAU : `middleware.ts` | Protection routes + tenant |

---

## J. RISQUES DE RÉGRESSION

| Zone | Risque | Protection |
|------|--------|------------|
| Auth refonte | Toutes les pages protégées | Tester login/logout avant merge |
| Supabase connexion | Données mock disparaissent | Garder lib/data.ts comme fallback |
| Sidebar navigation | Doublons à corriger | Vérifier les 48 routes après |
| TypeScript strict | 0 erreur actuelle (après fixes) | Ne pas relâcher strict mode |
| Styles dark mode | Risque de casser l'UI | Tests visuels sur chaque page |

---

## K. QUESTIONS BLOQUANTES

1. **Domaine Supabase** : Quel est l'URL du projet Supabase AGRIFRIK ? (nécessaire pour `.env`)
2. **Email** : Quel fournisseur SMTP ? (Resend recommandé pour démarrer rapidement)
3. **Paiement prioritaire** : CinetPay ou Mobile Money en premier ?
4. **Superadmin** : Accès depuis un sous-domaine (`admin.agrifrik.ibigsoft.com`) ou sous-route (`/superadmin`) ?
5. **GitHub PAT** : Besoin d'un nouveau token avec `Contents: Read and write` pour pusher le code

---

## L. STATUT FINAL PAR INTERVENTION

| N° | Intervention | Statut |
|----|-------------|--------|
| 1 | Audit complet | ✅ FAIT |
| 2 | Auth Supabase réelle | 🔲 À FAIRE |
| 3 | Schéma BDD complet + migrations | 🔲 À FAIRE |
| 4 | RLS + multi-tenant | 🔲 À FAIRE |
| 5 | 35+ APIs manquantes | 🔲 À FAIRE |
| 6 | Dashboard dynamique | 🔲 À FAIRE |
| 7 | Exports XLSX + PDF | 🔲 À FAIRE |
| 8 | Dark mode complet | 🔲 À FAIRE |
| 9 | PWA icônes + Service Worker | 🔲 À FAIRE |
| 10 | Système de licences SaaS | 🔲 À FAIRE |
| 11 | Paiements | 🔲 À FAIRE |
| 12 | Emails automatiques | 🔲 À FAIRE |
| 13 | Console Superadmin | 🔲 À FAIRE |
| 14 | Landing haute conversion | 🔲 À FAIRE |
| 15 | Centre d'aide + tickets | 🔲 À FAIRE |
| 16 | IA fonctionnelle (ARIA) | 🔲 À FAIRE |
| 17 | Guide utilisateur PDF | 🔲 À FAIRE |
| 18 | Multilingue FR/EN | 🔲 À FAIRE |
| 19 | Tests Vitest + Playwright | 🔲 À FAIRE |
| 20 | Performance + optimisation | 🔲 À FAIRE |
| 21 | Documentation technique | 🔲 À FAIRE |
