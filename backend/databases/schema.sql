CREATE DATABASE pc_specs;
USE pc_specs;

CREATE TABLE main (
    id integer PRIMARY KEY AUTO_INCREMENT,
    cpu VARCHAR(10) NOT NULL,
    gpu VARCHAR(10) NOT NULL,
    mobo VARCHAR(10) NOT NULL,
    ram VARCHAR(10) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO main (cpu, gpu, mobo, ram)
VALUES
('cpu', 'gpu', 'mobo', 'ram'),
('cpu', 'gpu', 'mobo', 'ram'),