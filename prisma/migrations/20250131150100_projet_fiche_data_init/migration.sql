insert into "projet_fiche" (projet_id, fiche_id, type, created_at, user_id)
    (select p.id,
            unnest(p.fiches_solutions_id) as fiche_id,
            'SOLUTION',
            coalesce(p.updated_at, p.created_at),
            p.created_by
     from projet p);


insert into "projet_fiche" (projet_id, fiche_id, type, created_at, user_id)
    (select p.id,
            unnest(p.fiches_diagnostic_id) as fiche_id,
            'DIAGNOSTIC',
            coalesce(p.updated_at, p.created_at),
            p.created_by
     from projet p);

