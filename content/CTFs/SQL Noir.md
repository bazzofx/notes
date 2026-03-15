SQLNOIR

## Lab 1 
1> SELECT * FROM crime_scene where location LIKE '%Lounge%'
A briefcase containing sensitive documents vanished.
A witness reported a man in a trench coat with a scar on his left cheek fleeing the scene.

2> SELECT * FROM suspects where scar == "left cheek" and attire = "trench coat"

id	name	                 attire	        scar
3	Frankie Lombardi	trench coat	left cheek
183	Vincent Malone	        trench coat	left cheek

3> SELECT * FROM interviews WHERE suspect_id = 183

=======================================================
## Lab2
select * from crime_scene where location like "%record%"

id        date           type      location	description
65	19830715	theft	West Hollywood Records	A prized vinyl record was stolen from the store during a busy evening.

select * from witnesses where crime_scene_id = 65
id	crime_scene_id	clue
28	65	I saw a man wearing a red bandana rushing out of the store.
75	65	The main thing I remember is that he had a distinctive gold watch on his wrist.

select * from suspects where bandana_color="red" and accessory like "%gold watch%"
id	name	bandana_color	accessory
35	Tony Ramirez	red	gold watch
44	Mickey Rivera	red	gold watch
97	Rico Delgado	red	gold watch
