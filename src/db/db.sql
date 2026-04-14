CREATE DATABASE student;
CREATE USER myuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE student TO myuser;


CREATE TABLE students (
  id           SERIAL PRIMARY KEY,
  first_name   VARCHAR(100)  NOT NULL,
  last_name    VARCHAR(100)  NOT NULL,
  student_id   VARCHAR(20)   NOT NULL UNIQUE,
  email        VARCHAR(255)  NOT NULL UNIQUE,
  phone        VARCHAR(20),
  gender       VARCHAR(20),
  dob          DATE,
  level        VARCHAR(50),
  student_type VARCHAR(50),
  degree       VARCHAR(100),
  major        VARCHAR(100),
  program      VARCHAR(100),
  admit_term   VARCHAR(50)
);