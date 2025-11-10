-- This is an empty migration.

UPDATE "User"
SET CANAL_ACQUISITION = 'Accompagnement ou appel à manifestation d’intérêt'
WHERE CANAL_ACQUISITION = 'Appel à manifestation d’intérêt (AMI)';

UPDATE "User"
SET CANAL_ACQUISITION = 'Message de ma hiérarchie ou de collègues'
WHERE CANAL_ACQUISITION = 'Mail';

UPDATE "User"
SET CANAL_ACQUISITION = 'Salon ou événement local'
WHERE CANAL_ACQUISITION = 'Salon, événement local';
