-- Table pour les jetons de vérification de documents
create table if not exists document_tokens (
  id uuid primary key default gen_random_uuid(),
  jeton text unique not null,
  document_type text not null, -- 'facture', 'devis', 'recu', 'contrat', etc.
  document_id uuid not null,
  reference text not null,
  emetteur text not null,
  date_document date not null,
  statut text not null default 'authentique' check (statut in ('authentique','annule','remplace','revoque')),
  hash_sha256 text, -- empreinte du document
  organisation_id uuid,
  created_at timestamptz default now()
);
create index on document_tokens(jeton);
create index on document_tokens(document_id);
