DELETE FROM "Analytics" WHERE event_type in ('UPDATE_PROJET_SET_VISIBLE', 'UPDATE_PROJET_SET_INVISIBLE');

INSERT INTO "Analytics" (id, reference_id, reference_type, created_at, event_type, user_id)
    (SELECT substring(created_by, 0, 16) || id, id, 'PROJET', coalesce(updated_at, created_at), 'UPDATE_PROJET_SET_VISIBLE', created_by FROM projet
     where is_public is true
       and deleted_at is null);