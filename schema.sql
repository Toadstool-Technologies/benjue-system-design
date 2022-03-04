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
  id serial primary key,
  product_id int references products(id),
  body varchar(400) not null,
  date_written bigint,
  asker_name varchar(100) not null,
  asker_email varchar(100),
  reported boolean,
  helpful smallint
);

CREATE TABLE answers (
  id serial primary key,
  question_id int references questions(id),
  body varchar(1000) not null,
  date_written bigint,
  answerer_name varchar(100) not null,
  answerer_email varchar(100),
  reported boolean,
  helpful smallint
);

CREATE TABLE photos (
  id serial primary key,
  answer_id int references answers(id),
  url varchar(150)
)
