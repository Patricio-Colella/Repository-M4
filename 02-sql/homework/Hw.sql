---------------------- 1 ----------------------
SELECT * FROM movies
WHERE year=2000;
---------------------- 1 ----------------------
---------------------- 2 ----------------------
SELECT COUNT (*) FROM movies
WHERE year=1982;
---------------------- 2 ----------------------
---------------------- 3 ----------------------
SELECT * FROM actors
WHERE last_name LIKE "%stack%";
---------------------- 3 ----------------------
---------------------- 4 ----------------------
SELECT first_name,last_name, COUNT() AS Total FROM actors
GROUP BY lower(first_name),lower(last_name)
ORDER by Total DESC
LIMIT 10;
---------------------- 4 ----------------------
---------------------- 5 ----------------------
SELECT first_name,last_name,COUNT()AS Total FROM actors a
JOIN roles r
ON a.id=r.actor_id
GROUP BY a.id
ORDER BY total DESC
LIMIT 100;
---------------------- 5 ----------------------
---------------------- 6 ----------------------
SELECT genre, COUNT() AS Total FROM movies_genres
GROUP BY genre
ORDER BY Total ASC;
---------------------- 6 ----------------------
---------------------- 7 ----------------------
SELECT a.id,a.first_name,a.last_name,m.name FROM actors a
JOIN roles r
ON a.id=r.actor_id
JOIN movies m
ON m.id=r.movie_id
where m.name="Braveheart"
AND m.year=1995
ORDER BY a.last_name;
---------------------- 7 ----------------------
---------------------- 8 ----------------------
SELECT d.first_name,d.last_name,m.name,m.year FROM directors d
JOIN movies_directors md ON d.id=md.director_id
JOIN movie m ON m.id=md.movie_id
JOIN movies_genres mg ON m.id=mg.movie_id
WHERE mg.genre='Film-Noir' AND m.year%4=0
ORDER BY m.name;
---------------------- 8 ----------------------
---------------------- 9 ----------------------
SELECT DISTINCT a.first_name,a.last_name,mg.genre, m.name FROM actors a
JOIN roles r ON a.id=r.actor_id
JOIN movies m ON m.id=r.movie_id
JOIN movies_genres mg ON m.id=mg.movie_id
WHERE m.name IN (SELECT m.name FROM movies
JOIN roles r ON m.id=r.movie_id
JOIN actors a ON a.id=r.actor_id
WHERE a.first_name ="Kevin" AND a.last_name LIKE"Bacon"
)
AND mg.genre LIKE "Drama"
AND (a.first_name || a.last_name != "KevinBacon")
ORDER BY a.last_name DESC;
---------------------- 9 ----------------------
--DISTINCT ELIMINA EL CASE SENSITIVE, EVITANDO REPETICIONES
---------------------- 10 ----------------------
SELECT DISTINCT first_name,last_name FROM actors
    WHERE id in(
        SELECT a.id FROM autor a
            JOIN roles r ON a.id=r.actor_id
            JOIN movies m ON m.id=r.movie_id
            WHERE m.year<1900
        )
    AND id in(
        SELECT a.id FROM autor a
           JOIN roles r ON a.id=r.actor_id
            JOIN movies m ON m.id=r.movie_id
            WHERE m.year>2000
    )
;
---------------------- 10 ----------------------
---------------------- 11 ----------------------