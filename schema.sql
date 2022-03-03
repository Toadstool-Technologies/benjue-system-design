drop schema if exists qa;
CREATE SCHEMA IF NOT EXISTS qa;

drop table if exists products;
drop table if exists questions;
drop table if exists answers;

CREATE TABLE products (
  id serial,
  product_id int not null unique,
  primary key(id)
);

CREATE TABLE questions (
  id serial primary key,
  question_body varchar(400) not null,
  question_date timestamp,
  asker_name varchar(100) not null,
  question_helpfulness smallint,
  reported boolean,
  product_id int references products(id)
);

CREATE TABLE answers (
  id serial primary key,
  body varchar(1000) not null,
  answer_date timestamp,
  answerer_name varchar(100) not null,
  answer_helpfulness smallint,
  photos text []
);
