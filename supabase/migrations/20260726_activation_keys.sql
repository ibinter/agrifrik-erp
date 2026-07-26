-- Migration: table activation_keys
-- Gère les clés d'activation pré-générées par les superadmins.
-- Une clé est liée à un plan et à une durée ; elle passe de 'disponible'
-- à 'utilisee' au moment de l'activation par un client.

create table if not exists activation_keys (
  id               uuid        primary key default gen_random_uuid(),
  -- Format attendu : XXXX-XXXX-XXXX-XXXX (lettres et chiffres majuscules)
  -- Exemple généré par l'API superadmin : AGFR-X4T2-9KWQ-B17Z
  key              text        unique not null,
  plan_code        text        not null,
  -- Durée de validité de la licence activée (en jours)
  duree_jours      integer     not null default 30,
  statut           text        not null default 'disponible'
                               check (statut in ('disponible', 'utilisee', 'revoquee')),
  -- Date limite d'utilisation de la clé elle-même (pas de la licence)
  date_expiration  timestamptz not null,
  date_activation  timestamptz,
  societe_id       uuid        references organisations(id) on delete set null,
  created_at       timestamptz default now(),
  -- Permet de regrouper les clés par lot de génération
  batch_id         text
);

create index if not exists activation_keys_key_idx      on activation_keys(key);
create index if not exists activation_keys_batch_idx    on activation_keys(batch_id);
create index if not exists activation_keys_statut_idx   on activation_keys(statut);
create index if not exists activation_keys_societe_idx  on activation_keys(societe_id);

-- Politique RLS : lecture réservée aux superadmins et à la propre société
alter table activation_keys enable row level security;

-- Superadmin : accès complet (via service_role, RLS bypassé côté serveur)
-- Client : peut lire uniquement la clé qu'il vient d'activer (pour affichage récapitulatif)
create policy "societe_peut_lire_sa_cle" on activation_keys
  for select
  using (societe_id = (select id from organisations where id = auth.uid()));
