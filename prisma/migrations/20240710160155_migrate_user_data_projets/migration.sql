insert into user_projet(email_address, role, projet_id, user_id, created_at, invitation_status)
    (SELECT u.email, 'ADMIN', p.id, u.id, p.created_at, 'ACCEPTED'
     from projet p,
          "User" u
     where p.created_by = u.id);