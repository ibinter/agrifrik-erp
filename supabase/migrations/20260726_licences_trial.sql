-- Migration : création automatique d'une licence d'essai à l'inscription
-- Date : 2026-07-26

-- Fonction pour créer automatiquement une licence d'essai
create or replace function create_trial_licence(p_organisation_id uuid)
returns void language plpgsql security definer as $$
begin
  insert into licences (
    organisation_id,
    plan_code,
    statut,
    date_debut,
    date_fin,
    is_trial
  ) values (
    p_organisation_id,
    'starter',
    'essai',
    now(),
    now() + interval '14 days',
    true
  )
  on conflict (organisation_id) do nothing;
end;
$$;

-- Trigger : appelle create_trial_licence automatiquement après insertion d'une organisation
create or replace function trigger_create_trial_licence()
returns trigger language plpgsql security definer as $$
begin
  perform create_trial_licence(NEW.id);
  return NEW;
end;
$$;

drop trigger if exists on_organisation_created on organisations;
create trigger on_organisation_created
  after insert on organisations
  for each row execute procedure trigger_create_trial_licence();

-- Index pour les requêtes de vérification de licence par organisation
create index if not exists idx_licences_organisation_id on licences(organisation_id);
create index if not exists idx_licences_statut on licences(statut);
create index if not exists idx_licences_date_fin on licences(date_fin);

-- Vue utilitaire pour récupérer la licence active d'une organisation
create or replace view licences_actives as
select
  l.*,
  o.nom as organisation_nom,
  (l.date_fin - now())::interval as temps_restant,
  extract(day from (l.date_fin - now())) as jours_restants
from licences l
join organisations o on o.id = l.organisation_id
where l.statut in ('essai', 'actif')
  and l.date_fin > now();
