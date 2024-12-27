-- @param {DateTime} $1:dateFrom Start date to use for computing stats
-- @param {String} $2:range Date range to use (year/month/week/day)
with score_table as (select date_trunc($2, created_at)                                            as date1,
                            sum(CASE WHEN event_type = 'UPDATE_PROJET_SET_VISIBLE' THEN 1 ELSE -1 END) as score
                     from pfmv."Analytics"
                     WHERE event_type in ('UPDATE_PROJET_SET_VISIBLE', 'UPDATE_PROJET_SET_INVISIBLE')
                       and created_at >= $1
                     group by 1
                     order by 1 desc),
     all_intervals as (SELECT date_trunc($2, ts) as date1
                       FROM generate_series($1, now(), CONCAT('1 ',$2)::interval) AS ts
                       group by 1)
select all_intervals.date1::timestamp::date as "periode", coalesce(score, 0) as "score"
from score_table
         right outer join all_intervals on all_intervals.date1 = score_table.date1
order by 1;