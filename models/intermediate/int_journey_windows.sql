select
    account_name,
    opportunity_id,
    channel,
    day_offset,
    session_quality_score,
    conversion_value_usd,
    row_number() over (
        partition by opportunity_id
        order by day_offset asc
    ) as touch_rank_asc,
    row_number() over (
        partition by opportunity_id
        order by day_offset desc
    ) as touch_rank_desc
from {{ ref('stg_marketing_touches') }}
