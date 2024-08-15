
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "ShortenedUrl" (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_url VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*

Como meu banco de dados está alimentado.

{
"User": [
	{
		"email" : "novousuario5@example.com",
		"password" : "$2a$10$7zUVk6wgDWrHsKsq19B4p.2GoRgNTyCqTdIrniElSVhAXPN1VuQUS",
		"token" : "",
		"created_at" : "2024-08-15T03:54:40.474Z",
		"updated_at" : "2024-08-15T03:54:40.474Z",
		"id" : "3484df1b-1378-4c65-8ccc-f682cc6f9cbc"
	},
	{
		"email" : "novousuario2@example.com",
		"password" : "$2a$10$HWqI2oMpLR1X2gWucPpGF.d6MT7.2HYidTqNVswBYYyH5xCCUvKZK",
		"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzU5Zjk4OC02YWU4LTQyZjctOTViNi02NDhmMGYzN2IyMTMiLCJpYXQiOjE3MjM2OTQyMDYsImV4cCI6MTcyMzY5NzgwNn0._cWkwRLtc0IkW8teT6HDt-7nN7b9YFqD05soCTZn5H8",
		"created_at" : "2024-08-14T19:27:01.375Z",
		"updated_at" : "2024-08-15T03:56:46.688Z",
		"id" : "a359f988-6ae8-42f7-95b6-648f0f37b213"
	},
	{
		"email" : "novousuario4@example.com",
		"password" : "$2a$10$vLBfHgEd3UbO61QJen8vNewThqS7l1NxfvipfYWemwfKUQWUy3WcS",
		"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGVlYTI1Mi1hM2ZkLTRkZWYtYTFhOC02ZjZkYmU5MGI2YzgiLCJpYXQiOjE3MjM2OTQ2NTUsImV4cCI6MTcyMzY5ODI1NX0.PC6wP0M8xYx1ddE0yyRq9w_e79WXzjeVqKfQIAQfCwo",
		"created_at" : "2024-08-15T03:02:35.335Z",
		"updated_at" : "2024-08-15T04:04:15.232Z",
		"id" : "64eea252-a3fd-4def-a1a8-6f6dbe90b6c8"
	},
	{
		"email" : "novousuario@example.com",
		"password" : "$2a$10$EYNk1kZ9\/xKivaFwJXCwW.h9.fkpcSyIksiBPIfMwo\/0MVegJbIHq",
		"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzOTllZmJjYS03M2M5LTQ4NWMtYTliMC01OTI4ZjlhZDU3MDYiLCJpYXQiOjE3MjM2OTUxNzEsImV4cCI6MTcyMzY5ODc3MX0.2_h47NyVImNPiDCaKz7puR1jTaxu-ochqUGbBHfP2MQ",
		"created_at" : "2024-08-14T19:06:51.342Z",
		"updated_at" : "2024-08-15T04:12:51.228Z",
		"id" : "399efbca-73c9-485c-a9b0-5928f9ad5706"
	},
	{
		"email" : "novousuario3@example.com",
		"password" : "$2a$10$w7Tr9xRU5Hha0j5e0hu3gOoiPM\/0EICf8wxVXzylaQizxHIvoPN9S",
		"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YzQ1NDA1NS00MTFhLTQzNjUtOGMwOC0zZmFkNGIyMmNiNDIiLCJpYXQiOjE3MjM2OTY0NjUsImV4cCI6MTcyMzcwMDA2NX0.rCt5eLElNhNHQXj9b7jki3i4LHgUJ5mpTi48ar88xRU",
		"created_at" : "2024-08-15T03:01:38.997Z",
		"updated_at" : "2024-08-15T04:34:25.445Z",
		"id" : "9c454055-411a-4365-8c08-3fad4b22cb42"
	}
]}

{
"ShortnedUrl": [
	{
		"id" : 2,
		"original_url" : "https:\/\/newurl.com\/dashboard",
		"short_url" : "localhost\/987654",
		"clicks" : 80,
		"deleted_at" : null,
		"userId" : "9c454055-411a-4365-8c08-3fad4b22cb42"
	}
]}


*/

