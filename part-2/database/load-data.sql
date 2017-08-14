\c hotel

COPY guests (id, name, email) FROM '/Users/michaelmasterson/Desktop/LearnersGuild/phase-3-challenge-c/part-2/database/guests.csv' DELIMITER ',' HEADER CSV;

COPY rooms (id, number, capacity) FROM '/Users/michaelmasterson/Desktop/LearnersGuild/phase-3-challenge-c/part-2/database/rooms.csv' DELIMITER ',' HEADER CSV;

COPY bookings (id, room_id, guest_id, check_in, check_out) FROM '/Users/michaelmasterson/Desktop/LearnersGuild/phase-3-challenge-c/part-2/database/bookings.csv' DELIMITER ',' HEADER CSV;