-- AlterTable
CREATE SEQUENCE estimations_aides_id_seq;
ALTER TABLE "estimations_aides" ALTER COLUMN "id" SET DEFAULT nextval('estimations_aides_id_seq');
ALTER SEQUENCE estimations_aides_id_seq OWNED BY "estimations_aides"."id";
