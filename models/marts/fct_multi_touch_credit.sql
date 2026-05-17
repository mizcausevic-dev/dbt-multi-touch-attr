select
    opportunity_id,
    account_name,
    channel,
    case
        when touch_rank_asc = 1 then 'first-touch'
        when touch_rank_desc = 1 then 'last-touch'
        else 'assist'
    end as attribution_role,
    conversion_value_usd
from {{ ref('int_journey_windows') }}
