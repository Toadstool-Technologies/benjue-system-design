drop schema if exists qa;
CREATE SCHEMA IF NOT EXISTS qa;

drop table if exists products cascade;
drop table if exists questions cascade;
drop table if exists answers cascade;
drop table if exists photos cascade;

CREATE TABLE products (
  id serial primary key,
  name varchar(100) not null,
  slogan varchar(200),
  description varchar(500),
  category varchar(30),
  default_price int
);

CREATE TABLE questions (
  question_id serial primary key,
  product_id int references products(id),
  question_body varchar(400) not null,
  question_date bigint,
  asker_name varchar(100) not null,
  asker_email varchar(100),
  reported boolean,
  question_helpfulness smallint
);

CREATE TABLE answers (
  id serial primary key,
  question_id int references questions(id),
  body varchar(1000) not null,
  date bigint,
  answerer_name varchar(100) not null,
  answerer_email varchar(100),
  reported boolean,
  helpfulness smallint
);

CREATE TABLE photos (
  id serial primary key,
  answer_id int references answers(id),
  url varchar(150)
)

\COPY products FROM 'olddata/product.csv' delimiter ',' csv header;
\copy questions from 'olddata/questions.csv' delimiter ',' csv header;
\copy answers from 'olddata/answers.csv' delimiter ',' csv header;
\copy photos from 'olddata/answers_photos.csv' delimiter ',' csv header;