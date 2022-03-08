select
    json_build_object(
        'persons', json_agg(
            json_build_object(
                'person_name', p.name,
                'cars', cars
            )
        )
    ) persons
from person p
left join (
    select
        personid,
        json_agg(
            json_build_object(
                'carid', c.id,
                'type', c.type,
                'comment', 'nice car', -- this is constant
                'wheels', wheels
                )
            ) cars
    from
        car c
        left join (
            select
                carid,
                json_agg(
                    json_build_object(
                        'which', w.whichone,
                        'serial number', w.serialnumber
                    )
                ) wheels
            from wheel w
            group by 1
        ) w on c.id = w.carid
    group by personid
) c on p.id = c.personid;