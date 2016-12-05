# Webáruház motor
Ez egy olyan projekt, amely azt a célt szolgálja, hogy olyan webáruház motort hozzon létre, 
amely képes egyszerre több webáruházat is létrehozni és kiszolgálni.

## Felhasznált technológiák
Kliens oldal: HTML, CSS, AngularJS

Szerver oldal: MongoDB, MySQL, Node.js

## Hivatkozások
Start Bootstrap: Shop Homepage template, https://startbootstrap.com/template-overviews/shop-homepage/

Start Bootstrap: Modern Business template, https://startbootstrap.com/template-overviews/modern-business/

Start Bootstrap: SB Admin 2 template, https://startbootstrap.com/template-overviews/sb-admin-2/

## Alkalmazás indítása
### Telepítések
Telepítse fel a MySQL Servert és MySQL Workbench-et a MySQL weboldaláról.

Telepítse fel a MongoDB Servert a MongoDB weboldaláról.

Telepítse fel a Node.js-t és az npm-et a Node.js oldaláról.

### Lépések
Töltse le ezt a projektet egy tetszõleges könyvtárba. Miután a Telepítések pontban felsorolt szoftvereket feltelepítette, 
a projekt könyvtárában nyisson meg egy Command Prompt/parancssor ablakot, és ide írja a következõt:

```
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath "<<projekt elérési útja>>\data"
```

Természetesen a valódi elérési utat kell megadni a mongod.exe fájlhoz is, és a <<projekt elérési útja>> 
helyett adja meg a projekt gyökér könyvtárához vezetõ elérési útvonalat, meghajtó betûjelével együtt. Data helyett megadhat egy más nevû könyvtárat is. 
Itt hozza majd létre a MongoDB az adatbázist.

Ezután meg kell jelennie a következõ üzenetnek a szövegek végén:

```
waiting for connections on port 27017
```

Ekkor elindult a MongoDB szervere.

Ha ez megvan, akkor nyisson egy másik parancssori ablakot ugyanebben a könyvtárban, és írja be a következõt:

```
npm install
```

Ez feltelepíti a package.json-ban felsorolt csomagokat.

Lépjen be a public könyvtárba, és ott is ismételje meg az npm install parancsot, mivelhogy ott is van egy package.json. 
Ha ez a két telepítés sikerült, akkor nem kell õket az további programindításokkor megismételni.

Gyõzödjön meg arról, hogy fut a MySQL service az operációs rendszerben.

Ezután lépjen vissza a gyökérkönyvtárba, és indítsa el az alkalmazást: 

```
node server.js
```

Akkor mûködik minden, ha a parancssor a következõket írja ki:

```
App listening on port 3000
Connected correctly to MongoDB server.
Connected correctly to MySQL server.
```