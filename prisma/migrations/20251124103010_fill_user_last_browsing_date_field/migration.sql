update "User" u
set last_browsing_date = coalesce((select max(last_viewed_at) from user_projet where user_id = u.id), u.updated_at,
                                  u.created_at)
where u.last_browsing_date is null;
