CREATE TABLE tasks (
    id INT PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    task VARCHAR(255) NOT NULL,
    completedAt TIMESTAMP NULL 
);

CREATE TABLE task_dependencies (
    task_id INT,
    dependency_id INT,
    PRIMARY KEY (task_id, dependency_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (dependency_id) REFERENCES tasks(id) ON DELETE CASCADE
);
