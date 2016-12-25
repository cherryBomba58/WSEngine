# Webáruház motor
Ez egy olyan projekt, amely azt a célt szolgálja, hogy olyan webáruház motort hozzon létre, 
amely képes több webáruházat is létrehozni és kiszolgálni.

## Felhasznált technológiák
Kliens oldal: HTML, CSS, AngularJS

Szerver oldal: MongoDB, MySQL, Node.js

## Hivatkozások
A projekt GitHub oldala: https://github.com/cherryBomba58/WSEngine

Start Bootstrap: Shop Homepage template, https://startbootstrap.com/template-overviews/shop-homepage/

Start Bootstrap: Modern Business template, https://startbootstrap.com/template-overviews/modern-business/

Start Bootstrap: SB Admin 2 template, https://startbootstrap.com/template-overviews/sb-admin-2/

## Változások
- 62: a szakdolgozattal együtt beadott, eredeti verzió
- 63: változás történt a package.json fájlokban és a README.md-ben. Ugyanis, ha a package.json-ban található verziószámok elõtt van egy ^ karakter, akkor egy újabb npm install esetén az npm a megadott verziószámnál újabbat is telepíthet az adott csomagból, amely kompatibilitási hibákat okozhat. Ezért eltávolítottam a kalap karaktereket. Továbbá, a README.md szövegén is pontosítottam.

## Alkalmazás indítása
### Telepítések
Telepítsük fel a MySQL Servert és MySQL Workbench-et a MySQL weboldaláról: http://dev.mysql.com/downloads/installer/

A MySQL telepítésekor adjuk meg a root felhasználó jelszavát. A MySQL Workbench-ben használjuk a localhostot a root accounttal.
Hozzunk létre benne egy új adatbázist. Futtassuk le benne a következõ szkripteket ebben a sorrendben: 
mysql_script_create.sql, mysql_script_insert.sql.
Készítsünk ugyanitt egy tárolt eljárást, amelynek itt van a tartalma: mysql_stored_proc.sql
A server.js fájlban módosítsuk az alábbi részt a jelszóval és az adatbázis nevével:

```javascript
// Connect to MySQL
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'wsengine'
});
```

Telepítsük fel a MongoDB Servert a MongoDB weboldaláról: https://www.mongodb.com/download-center

Telepítsük fel a Node.js-t és az npm-et a Node.js oldaláról: https://nodejs.org/en/

### Lépések
Töltsük le ezt a projektet egy tetszõleges könyvtárba. Miután a Telepítések pontban felsorolt teendõket megcsináltuk, 
a projekt könyvtárában nyissunk meg egy Command Prompt/parancssor ablakot, majd hozzunk létre egy data mappát:

```
mkdir data
```

Ezután írjuk be a következõ parancsot:

```
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath "<<projekt elérési útja>>\data"
```

Természetesen a valódi elérési utat kell megadni a mongod.exe fájlhoz is, és a "projekt elérési útja" 
helyett adjuk meg a projekt gyökér könyvtárához vezetõ elérési útvonalat, a meghajtó betûjelével együtt. 
Data helyett megadhatunk egy más nevû, létezõ könyvtárat is. Itt hozza majd létre a MongoDB az adatbázist.

Ezután meg kell jelennie a következõ üzenetnek a szövegek végén:

```
waiting for connections on port 27017
```

Ekkor elindult a MongoDB szervere.

Ha ez megvan, akkor nyissunk egy másik parancssori ablakot ugyanebben a könyvtárban, és írjuk be a következõt:

```
npm install
```

Ez feltelepíti a package.json-ban felsorolt csomagokat.

Lépjünk be a public könyvtárba, és ott is ismételjük meg az npm install parancsot, mivelhogy ott is van egy package.json. 
Ha ez a két telepítés sikerült, akkor nem kell õket az további programindításokkor megismételni.

Gyõzödjünk meg arról, hogy fut a MySQL service az operációs rendszerben.

Ezután lépjünk vissza a gyökérkönyvtárba, és indítsuk el az alkalmazást: 

```
node server.js
```

Akkor mûködik minden, ha a parancssor a következõket írja ki:

```
App listening on port 3000
Connected correctly to MongoDB server.
Connected correctly to MySQL server.
```

Chrome és Firefox esetében a következõt kell beírni a cím mezõbe:
```
localhost:3000
```

Internet Explorer és Edge esetében pedig a következõt:
```
http://localhost:3000/
```