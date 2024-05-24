CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL,
  CONSTRAINT unique_user UNIQUE (`login`, `password`)
);

CREATE TABLE `vacancies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company` varchar(255),
  `employment` varchar(255) NOT NULL,
  `experience_from` int,
  `experience_to` int,
  `city` varchar(255),
  `salary_from` int,
  `salary_to` int,
  `description` TEXT NOT NULL,
  `employer_id` int NOT NULL,
  FOREIGN KEY (employer_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE `replies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacancy_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
    FOREIGN KEY (vacancy_id)
        REFERENCES vacancies(id)
        ON DELETE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
