# TODO

## 12/4/2019
Follow the process organically. 

index 
-> server (app) ✔️
-> api (routers): kakšni routi? directory-like. na enih (landing page) kr direkt servira index.js ✔️
    A SO VAZNA IMENA pathov in routerjev? users, user.. [api: 5]; ❌
-> categoryRoutes (set CRUD controllers) ✔️
    -> categoryController (do the actual operations) ✔️
-> userRoutes ✔️
    -> userController ✔️

## 14/4/2019

file-i bi mogl bit v delujočem stanju: vsi pathi so zvezani.
-> mongo? kje pride to v igro? mongoose mam, sam kaj pa dejanski db:
  -> mongod (v enmu ternimalu)
  ->
-> network: objectId (populate)

-> zalaufov, node index dela, poveže z mongo. 
  -> GET dela
  -> post ne dela če notr v url dam query parametre.
  -> query parameter je sam en (id), iz tega najde v mongotu object in ga vrne NE NI TKO
    -> za POST nerabs id ampak sam post na categories/
    -> v req.body mors dat nov category (ime), poj se pa v controller.js nardi nov model in se shrani v DB.
    -> ce dam vse potrebno v Postmanu body (form-data) pol mi zavrne
    -> ne zazna body data kot json da bi ga lepo poparsal.❌

-> zdej sem par praznih POST kategorij poslov, DB se je nafilou (mongod prau tko). kako pa zdej v mongo cmd dostopam do teh podatkov?? ❌
