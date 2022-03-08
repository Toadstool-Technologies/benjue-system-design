select
  json_build_object(
    'product_id', p.id,
    'results', questions
  ) products
from products p
left join (
  select product_id,
  json_agg(
    json_build_object(
      'question_id', q.question_id,
      'question_body', q.question_body,
      'question_date', q.question_date,
      'asker_name', q.asker_name,
      'question_helpfulness', q.question_helpfulness,
      'reported', q.reported,
      'answers', answers
    )
  ) questions
  from questions q
  left join (
    select question_id,
    json_agg(
      json_build_object(
        'id', a.id,
        'body', a.body,
        'date', a.date,
        'answerer_name', a.answerer_name,
        'helpfulness', a.helpfulness,
        'photos', photos
      )
    ) answers
    from answers a
    left join (
      select
        answer_id,
        json_agg(
          json_build_object(
            'id', p.id,
            'url', p.url
          )
        ) photos
        from photos p
        group by answer_id
    ) p on a.id = p.answer_id
    group by question_id
  ) a on q.question_id = a.question_id
  group by product_id
) q on p.id = q.product_id
