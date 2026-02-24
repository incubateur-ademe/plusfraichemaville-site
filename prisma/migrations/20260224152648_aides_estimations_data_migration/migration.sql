-- This is an empty migration.

INSERT INTO "projet_aides" (projet_id, "aideId", created_at, user_id)
SELECT DISTINCT ON (e.projet_id, ea."aideId")
    e.projet_id,
    ea."aideId",
    ea.created_at,
    ea.user_id
FROM "estimations_aides" ea
         JOIN estimation e ON e.id = ea."estimationId"
WHERE e.deleted_at IS NULL
ORDER BY e.projet_id, ea."aideId", ea.created_at ASC NULLS LAST
ON CONFLICT (projet_id, "aideId") DO NOTHING;
