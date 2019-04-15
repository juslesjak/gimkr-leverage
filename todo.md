# TODO

## 12/4/2019
Follow the process organically. 

index 
-> server (app) ✔️
-> api (routers): kakšni routi? directory-like. na enih (landing page) kr direkt servira index.js ✔️
    A SO VAZNA IMENA pathov in routerjev in collectionov pol v controllerjih? users, user.. [api: 5]; ❌
-> categoryRoutes (set CRUD controllers) ✔️
    -> categoryController (do the actual operations) ✔️
-> userRoutes ✔️
    -> userController ✔️

## 14/4/2019

file-i bi mogl bit v delujočem stanju: vsi pathi so zvezani. ✔️
-> mongo? kje pride to v igro? mongoose mam, sam kaj pa dejanski db:
  -> mongod (v enmu ternimalu)
  // url je določen v config in povezan z mongoose pri mongoose.connect
  -> mongo mongodb://localhost/ghk-gimkr (v drugmu terminalu, skoz to lah sprot čekiraš db) 
  
-> network: objectId (populate)

-> zalaufov, node index dela, poveže z mongo. 
  -> GET dela
  -> post ne dela če notr v url dam query parametre.
  -> query parameter je sam en (id), iz tega najde v mongotu object in ga vrne NE NI TKO
    -> za POST nerabs id ampak sam post na categories/
    -> v req.body mors dat nov category (ime), poj se pa v controller.js nardi nov model in se shrani v DB.
    -> ce dam vse potrebno v Postmanu body (form-data) pol mi zavrne
    -> ne zazna body data kot json da bi ga lepo poparsal.❌

-> zdej sem par praznih POST kategorij poslov, DB se je nafilou (mongod prau tko). kako pa zdej v mongo cmd dostopam do teh podatkov?? ✔️

## 15/4/2019

-> dosegu sm mongoose db skoz mongo tko da sm dou command: mongo mongodb://localhost/ghk-gimkr ✔️
-> show: 2 collections, users & categories. vsak ma notr en document. brez filedsov, samo { "_id" : ObjectId("5cb365021bd7cb263c529847"), "__v" : 0 }✔️
  -> to zato, ker če pustiš prazen filed (k si ga specifiov v mongoose), ga mongoose zapolni z "null". v collectionu je lahko samo 1 tak flawed dokument.✔️
  -> k probam dodat scene (s POST) zarad zgornga razloga ne gre.✔️

-> kako dobit "id" param vn iz requesta zato da lah pošlem en DELETE request da zbrišem tedva docsa?❌
  -> v request url more bit /localhost/api/categories/ObjectId=720597326459365
  -> ta id param se fukne v Category.findOne() k sprejme argument object
  -> ta "id"- a je to username, name (category), al ObjectId?✔️
  -> kar js dobim kot id v router.param('id', controller.param) je path po /categories, seprav http://localhost:3000/api/categories/toJeTaIDkGaDobim

-> DELETE http://localhost:3000/api/categories/ObjectId=720597326459365
  -> **findOne() more dobit Object**, nepa ObjectId
  -> z mongotom lah zbrises z db.categories.deleteMany({})
  -> s POST spet dodam prazno kategorijo v categories, kako jo pol lahko najdem z .findOne()?
    -> definitivno ne z /valueOfNameOfTheSearchedCategory, more bit object
    -> http://localhost:3000/api/categories/{name:"kategorija2"} **tega ne prepozna kot object, wtf**
    -> **findById**("7456365204376502365203") //pazi kako das, /74835298345293 je ok, /"879345289735" ni ok ✔️
    -> Cannot read property 'remove' of undefined (toj blo brez narekovajev)✔️ (problem rešen spodi)

  -> **SEPRAV** exports.param() je middleware. torej, ko v DB najde kategorijo/userja glede na id, ga appenda
  na **req**.category, nepa na **res**.category. ko klice next(), je naslednjem middlewaru dosegjivo to na 
  req.category, ko končni middleware opravi svoje je pa šele res.karkoli✔️