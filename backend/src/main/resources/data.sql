INSERT INTO genre (content)
SELECT genre_content
FROM (VALUES ('가요'),
             ('팝'),
             ('어쿠스틱'),
             ('재즈'),
             ('댄스'),
             ('포크'),
             ('펑크'),
             ('메탈'),
             ('인디'),
             ('R&B/Soul'),
             ('클래식'),
             ('블루스'),
             ('록'),
             ('라틴'),
             ('발라드'),
             ('랩/힙합'),
             ('트로트')) AS new_genres(genre_content)
         LEFT JOIN genre ON new_genres.genre_content = genre.content
WHERE genre.content IS NULL;
