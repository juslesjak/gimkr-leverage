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

-> kako dobit "id" param vn iz requesta zato da lah pošlem en DELETE request da zbrišem tedva docsa?✔️
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
  na **req**, nepa na **res**.category. ko klice next(), je naslednjem middlewaru dosegjivo to na 
  req.category, ko končni middleware opravi svoje je pa šele res.karkoli✔️

-> POST http://localhost:3000/api/categories/, v request body sm dou (key: name, value: "novaKategorija")
  -> duplex error (ni mi najdl keya zato je dou pod key: null, ker je ena že taka notr je zavrnu)
  -> req.body k pride v exports.post() je {}✔️
  -> v POSTMANU sm sam spremenu body encription iz form-data v raw: { "name" : "novaKategorija"}✔️

-> test CRUD (levo categories, desno users)
  -> GET ✔️✔️
  -> POST ✔️✔️
  -> DELETE ✔️✔️
  -> GETONE ✔️✔️
  -> UPDATE ✔️✔️


-> AUTH: (jwt)
  -> secure routes (post, put, delete)
    -> v categoryRoutes in userRoutes pred določene requeste daš checkUser = [middleware: decodeToken(), getFreshUser()] (definirana v auth.js)✔️

  -> json web token
    -> POST /api/auth/signin, 
      -> verifyUser() a sploh obstaja in preveri password✔️
      -> controller.signin dodeli token glede na user id in ga vrne v res userju da ga naprej lah uporabla✔️

      -> finish auth.js✔️

-> congif.js and nitty gritty connection stuff

-> test auth
  -> app is running, get requests (no auth) work✔️
  -> "no authorization token was found"
    -> rabm najprej narest novga userja.
    -> token dobim nazaj :) 
    {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Y2I1YWE2ZWJjYTM3NjEzMmNhM2YwNzEiLCJpYXQiOjE1NTU0MDk1MTksImV4cCI6MTU1NjI3MzUxOX0.w89SSQAhlRLJudTvLrbHjAkiUHJMiODSm34kGRR73ts"
    }
    -> spet no authorization token. Očitno ga ne zapiše na userja oz na request, idk!
    -> auth: jwt secret more bit isti pr stvaritvi tokena in pr uporabi tokena za validacijo userja.
    -> manually sm dou v postmanu header Authorization: Bearer + token k sm ga dobu pr stvaritvi userja
    -> invalid signature se zmeram (kokr prej k se secret ni ujemou k sm ga umes spremenu)


## 24/4/2019

-> Passport.js with OAuth with Google account.
    -> secure CRUD paths
-> Frontend skeleton

##26/4/2019

-> register at google API cloud, get clientID and clientSecret,️️✔️

-> auth: passport.use(googleStrategy)
    -> async response (profile) // kar dobiš v profil e se nastavi v google devs cloudu✔️
        -> ime, emails, id,.. // to rabs za application userja, seprav za server
    
    -> [/auth/routers] router.route('/oauth/google')✔️
                                        .post(passport.authenticate('googleToken', session: {false}))


    to se zgodi ob post requestu na tist path-
        -> najprej poklice strategy googleToken (prever userja, po potrebi nardi novga)✔️

    -> za testiranje: google oauth playground, avtoriziraš en račun da dobiš podatke iz njega, ✔️
    dobiš access_token in ga vstaviš v headerje POST requesta na /oauth/google✔️
        -> to vse zrihtam, poj pa dobim request timeout. s curl -X POST ne dobim nicesar nazaj (mogu bi user profile od google auth)❌

        -> ta response rabm ker je notr google user id k ga rabm za ustvart userja v userModel
    
    -> dokler tole opravlam je cel userCrud zjeban❌

    
## 28/4/2019

[google oauth]

-> POST /oauth/google, req.body{ "access_token": oauth playground token}
    -> ne nardi userja❌
    -> passport response vrne samo POST /oauth/google - - ms - -, namest full user profile :(

**reorganize AUTH**
-> [auth.js] passport.use('googleStrategy', new googlestrategy: clientid, secret, callback, verify) //TO BO MIDDLEWARE
-> [server.js] app.get(/oauth/google, (middleware) passport.authenticate('googleStrategy')) //tale pa poklice zgornji middleware in pol si redirectan na callback url:
    app.get('/oauth/google/callbackUrl, passport.authenticate('googleStrategy')) 
        **PAZI TO.** tle bi ratov infinite loop, sam ko google oauth posle GET na callback, 
        vkljuc parameter ?code=nekinekineki. ko googleStrategy zazna ta parameter, ve, da nerab seeny delat authorizationa in prevede "code" v user data. to je za primere k bi kdo kr direkt hotu direkt do callbacka dostopat.
--> oauth/google on oauth/google/callback mata isti middleware in isto stvar nardita, zato lah prvega spustis in je auth page kr direkt /callback

-> zdej ni več POST na /oauth/google z access_tokenom v body. AMPAK google vse hendla. ✔️
pošle se samo GET na /oaut/google, poj pa google nardi the rest.✔️
     -> tkoda zdej rab frontend narest, da je <a href='/oauth/google'>Log In with Google</a> 
    -> kliknem na login w/google, me odnese na oauth/google/callback, dobim nazaj 304 not modified (stran se ni spremenila od prejsnjic k sm jo retrievov) in loading v neskoncnost.

    kokr da passport nebi delou

## 29 / 4 / 2019

-> [FRONTEND] stegnu sm dol **MDBOTSTRAP** toolkit k ma se bolse template, zdej rabm se merge z obstojeco spletno stranjo ker je index.html in take scene podvojen.✔️
-> oauth je TODO

## 2 / 5 / 2019
-> create basic UI for login
    -> app.get('/') gets this:  res.sendFile(path.join(__dirname + '/public/index.html'));, is 200.. WHY??
    -> app.get('/inside') get this:     res.sendFile(path.join(__dirname + '/public/index1.html')); is 404
        -> looks for file in 'C:\Users\Uporabnik\Documents\CODE\Frontend\ghk-mongo\server\public\index1.html'.
        -> correct path da ni v server ampak direkt v public, tut **404** ✔️
        -> mozno da mi express.static() ze sam po sebi index.html serva in da sta app.get('/') neuporaben✔️
        -> YEP✔️
        -> AAAARGH fucking typo, vse je kul. file se routa in servira tkole: 
            app.get('/', function(req, res) {
                res.sendFile(path.join(__dirname + '/../public/login.html'));
            })


## 3 / 5 / 2019
-> auth
    -> implemented googlestrategy on login page, getting no response (loading circle on browser). google login not showing up.
        -> zato ker app is running on private IP (localhost). for google oauth to work, it must run on public IP

-> front to back connection:
    -> REACT?
    -> search users / categories (te dva mata različne onclick funkcije, čeprov sta iz istiga category fielda) nazačetk bi bla lah 2 različna
    -> create profile form to save the user to DB (id, email, appData {name, category}) // ta ID pride iz responsa od googla, pomoje se ga rab za neke session cookije pol k jih bom implementov (to zaenkrat še ni potrebno.)

-> MONGO DUPLICATE KEY ERROR: v UserSchema je biu **COMMENTAN** en property local: { username: { blabla}} in ga je mongoose
upoštevou kokr da je uncommentan! zato ga je vedno beležu kokr da je "null", torej sm dobu duplicate key error✔️✔️✔️
-> zdej se grem ubit v miru :) ✔️✔️✔️✔️✔️✔️

## 4 / 5 / 2019
-> connect categories with users and vice versa (prepare for frontend querying)✔️
-> start React frontend to generate cards for users searched from user search on ladning page
    -> working with vanilla javascript✔️

## 5 / 5 / 2019
-> querying & routing users&categories concern: ščćž (regex to change for urls to english) ❌❌
-> research UI guidlines ❗❗❗
-> add createNewUser / Edit User frontend page (/Jus%20Lesjak/uredi) (link za to se pokaže na profil strani ČE je logged in user isti kokr profil k ga gleda?)
    -> reorganize all UI into separate part of server✔️
    -> postUser() in ui.js✔️
        -> gotta preventDefault✔️
            -> redirect na http://localhost:3000/ustvari?first=Jus&last=Lesjak&categories=e se sezmer zgodi❌
        -> formData() mi ga neki svira. ne sprocesira <form> kokr bi mogu
            -> YOU ARE NOT SUPPOSED TO CONSOLELOG FORMDATA YOU DUMB FUCK✔️
        -> get correcty modelled data from FormData, da ustrezajo data: formData❌

## 8 / 5 / 2019
-> formData not working, asked for help on Slack
-> incorporate react forntend (get David on board?)✔️
    -> brocen the home.html to start building react component
        
    
## 11 / 5 / 2019
-> api dela
-> do a demo with mock redirections and data✔️
-> deploy to AWS

## 12 / 5 / 2019
-> deploy to heroku:✔️
    -> connected to heroku db MONGODB_URI✔️
        ->to je zdej shranjeno pod env variable na heroku dashboardu
        -> k hocem povezat svoj node s to bazo podatkov napišem process.env.MONGODB_URL
    -> build stack (front and back)✔️
        -> dokler ni Reacta, ni treba nč buildat.
        -> sam Procfile z web: node index.js daš pa je vse good

## 13 / 5 / 2019
-> Add mobile-first features to frontend mock
-> google oauth2
    -> dela✔️
    -> write findbygoogleid in povež vse da bo delal✔️
    -> organizrej nazaj da nau vse na enmu app.js✔️

## 14 / 5 / 2019
-> oauth
    -> create new user works!!✔️
        -> errors nontetheless:
            -> no user found :( at /app/server/ui/uiController.js:14:14 , mjbi mam slab routing zarad /:username/neki
            in mi auth potegne kokr da je /auth/ ubistvu en username✔️
            -> zakva mi v console.log dvakrat izpiše user object
    -> secure proper paths❌
    -> correct organization✔️
-> create user virgin: choose fron categories list (responsive form) or add new category❌
-> mobile ui sucks✔️

-> k dm sou stran /auth/google je direkt hittov callback function ker je to nastavlen kot callback. zj sm dodou dejnski oauth da vidm če zbuilda sploh, kličem ga še ne v callbacku toj delal. ✔️

-> figure out kako bos routou ui in crud (user.delete pa update), k eni fuknejo vn svoj html (update), delete ga pa recmo sam zbrise

-> sessioni me jebejo. brez sessionov dela. kuj k dam v /callback session: false stran, se ustav proces pr callbacku. (mejbi je blo to zato ker je biu v callbacku nastavlen callbackurl na localhost/auth/google, kar pa ne dela).

## 25 / 6 / 2019

okeeej whaddup! 
-> popravu sm API User model (zvečan), pršu nazaj in the game✔️
-> google auth ne odpre dialoga sploh✔️
-> mongoDB slike ✔️
-> routing v browserju je s ščž, v postmanu pa s kodami

## 19 / 7 / 2019

-> cookies and sessions to lock down paths via tokens
-> google auth TO NE DELA NA LOCALHOSTU!!!!!!!!
-> mongoDB slike
    -> gridFS na to se bom zj skoncentriru.
    -> https://www.youtube.com/watch?v=3f5Q9wDePzY
    -> https://www.youtube.com/watch?v=EVIGIcm7o2w
    -> https://medium.com/@kavitanambissan/uploading-and-retrieving-a-file-from-gridfs-using-multer-958dfc9255e8
-> zarad nekga neznanga razloga comment Xrtl+K ne dela. uporablam toggle line comment Ctrl + '.

## 21 / 7 / 19

-> gridFS dela ampak rabm zrihtat zmedo z bazami podatkov. Rabm naceta pa ta tutorial https://www.youtube.com/watch?v=3f5Q9wDePzY
    -> gridFS je up and running. zdej rabl ta middleware prestavt iz app.js globok notr v nested routing, sam nevem kako.
    -> **BATABASE clarifications** k je production nekak zazna in uporab MONGOLAB_CHARCOAL_URI k je v Heroku Dashboardu nastavlen kot tale
    mLabov database: https://www.mlab.com/databases/heroku_4f1mdk76#collections. do tega najlazi dostopas prek Heroku dashboarda.
    -> k pa ni production, sm pa do zdej uporabli lokaln DB (newDb ker sm skos rabu laufat mongod), od zj naprej bom pa tut uporablu unga na mLabu.
    -> zato rabm na mLabu registrirat DB userja. ime: Yux. password: b3r59p89bctkifvkfam6rl6dqh
    -> ok lepo zdej je vse povezan z mLab bazo podatkov. zjpa GridFS.✔️

    -> gridFS dela in na mLabu kaže kako uploadam file. GOOOOD ✔️
    -> userModel profilepicture ma filename od te uploadane.
        -> portfolio ma pa array filenamov. 
        -> a jih frontend pol z gfs sparsa al jih js zapišem v bytni obliki na API?❌ kapa to da se slike shranjo v /img/ folder na serverju?

-> Lia je on board za design, zdele začne delat.✔️
-> **SECURITY** config file bi pomoje mogu bit na kompu shranjen, ne pa pushan na github z vsemi passwordi pa to.

## 22 / 7 / 19

-> gridFS kako je z brisanjem slik? k se user updata alpa zbriše.
    -> v fileInfo se doda od userja _id, pa v user.profileData se doda filename od slike
    -> najprej se uploada sliko in dobi nazaj njen __id. pol se ustvari userja in v frontendu (skrito) v njegov profilePhoto: zapise ta id. in se shrani userja.
    -> vse to je lah na istem pagu. spodnji del (createUser) se osvetli šele ko pošlje sliko in se uspešno nastav. 
        -> prvi del pošlje POST request na /uploadFile k ga shran pa vrne njegov ID. tega bo frontend pol zapisou kot njegov profilePhoto.
    

## 29 / 7 / 19
-> googlecallbackUrl je biu nastavlen na localhost/auth/google/callback :(( rookie
    -> GOOGLEAUTH DELA TUT NA LOCALHOSTU!✔️✔️
    -> SCENA JE DA RABS ACCESSTOKEN POSILJAT, tok dolg casa nism biu na temu da sm pozabu cist. start fresh.✔️

    -> zdej mi dela google oauth. v callbacku k se v DB ustvraja nov user mi ga ne nardi, pride pa notr do 'creating new user'✔️
    -> problem je biu v google.callback funkciji, sezmeram je tm problem.❌
-> gridfs crud (delete)❌

## 30 / 7 / 19
-> userConstroller 43: req.file??❌
-> DB
    -> createConnection vs connect (rabm prvo da dela .once, morm spremenit kodo. mam že tutorial ready.)
-> gridFS delete: koda je, delal bo k zgorn problem rešm.

## 31 / 7 / 19
-> createConnection
    -> vse kar rabm je da pri ustvarjanju Modelov namest mongoose.model('user', UserSchema) uporabm db.model(..) ❌❌
    -> **TO SPLOH NI RES, dela normal tut z mongoose.connect. sam od začetka sm šu vse delat pa je good!**
    -> ta db je mongoose.createConnection(...)
    -> zdej rabm sam še 'db' spravt v file UserModel.js, k drgač v app.js mi dela ampak model pa ustvarm v UserModel.js tkoda rabm tm

## 15 / 8 / 19
-> everthing dela. ✔️
-> credentials crash: keysi pomembni k nesmejo jit na github so bli v .gitignore. locally je delal, na heroku pa ne ker jih na githubu ni blo. Zaneat sm jih exposov, k mi Nace napiše kako nej ravnam z njimi pol bom refreshu vse to in naredu proper.✔️
-> google auth redirecta na httP:/gimkrhussleclub/auth/google/callback, čeprov bi mogu na https. začasno bom nastavi v Google API console da je kul tut http:/gimeagn... tko me vedno redirekta na https:google/auth, zato stvar ne delajo.
-> karkol se dela callbackov na https:google/auth, je vse 500 internal server error. TODO❌