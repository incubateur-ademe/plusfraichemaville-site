-- AlterTable
CREATE SEQUENCE climadiag_id_seq;
ALTER TABLE "climadiag" ALTER COLUMN "id" SET DEFAULT nextval('climadiag_id_seq');
ALTER SEQUENCE climadiag_id_seq OWNED BY "climadiag"."id";
