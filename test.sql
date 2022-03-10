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




select q.question_id,
  q.question_body,
  q.question_date,
  q.asker_name,
  q.question_helpfulness,
  q.reported,
  (select
    json_object_agg(
      a.id,
      row_to_json(a)
    )
    from (select id, body, date, answerer_name, helpfulness, (select json_agg(p.url) from photos as p where p.answer_id = answers.id) photos from answers where question_id = q.question_id) a) answers from questions as q where product_id = 1;



select a.id,
  a.body,
  a.date,
  a.answerer_name,
  a.helpfulness,
  (select json_build_object(
    'photos', (select json_agg(
      json_build_object(
        'id', p.id,
        'url', p.url
      ) )from photos as p where p.answer_id = answers.id) photo) from answers as a where question_id = 1


select a.id,
  a.body,
  a.date,
  a.answerer_name,
  a.helpfulness,
  (select
    json_agg(
      json_build_object(
        'id', p.id,
        'url', p.url
      )
    )
    from photos as p
    where p.answer_id = a.id
  ) as photos
  from answers as a
  where question_id = $1 and reported = false limit $2 offset $3;

