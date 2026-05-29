-- Remove "Materiaux à changement de phase" as it has been depublished in the CMS.
delete from "estimation_materiaux"
where estimation_fiche_solution_id in (select id from "estimation_fiche_solution" where fiche_solution_id = 19);

delete from "estimation_fiche_solution"
where fiche_solution_id = 19;

delete from "projet_fiche"
where fiche_id = 19 and type = 'SOLUTION';
