select
    touch_id,
    account_name,
    opportunity_id,
    lower(channel) as channel,
    day_offset,
    session_quality_score,
    conversion_value_usd
from {{ ref('raw_marketing_touches') }}
