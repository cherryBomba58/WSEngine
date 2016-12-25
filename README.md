# Web�ruh�z motor
Ez egy olyan projekt, amely azt a c�lt szolg�lja, hogy olyan web�ruh�z motort hozzon l�tre, 
amely k�pes t�bb web�ruh�zat is l�trehozni �s kiszolg�lni.

## Felhaszn�lt technol�gi�k
Kliens oldal: HTML, CSS, AngularJS

Szerver oldal: MongoDB, MySQL, Node.js

## Hivatkoz�sok
A projekt GitHub oldala: https://github.com/cherryBomba58/WSEngine

Start Bootstrap: Shop Homepage template, https://startbootstrap.com/template-overviews/shop-homepage/

Start Bootstrap: Modern Business template, https://startbootstrap.com/template-overviews/modern-business/

Start Bootstrap: SB Admin 2 template, https://startbootstrap.com/template-overviews/sb-admin-2/

## V�ltoz�sok
- 62: a szakdolgozattal egy�tt beadott, eredeti verzi�
- 63: v�ltoz�s t�rt�nt a package.json f�jlokban �s a README.md-ben. Ugyanis, ha a package.json-ban tal�lhat� verzi�sz�mok el�tt van egy ^ karakter, akkor egy �jabb npm install eset�n az npm a megadott verzi�sz�mn�l �jabbat is telep�thet az adott csomagb�l, amely kompatibilit�si hib�kat okozhat. Ez�rt elt�vol�tottam a kalap karaktereket. Tov�bb�, a README.md sz�veg�n is pontos�tottam.

## Alkalmaz�s ind�t�sa
### Telep�t�sek
Telep�ts�k fel a MySQL Servert �s MySQL Workbench-et a MySQL weboldal�r�l: http://dev.mysql.com/downloads/installer/

A MySQL telep�t�sekor adjuk meg a root felhaszn�l� jelszav�t. A MySQL Workbench-ben haszn�ljuk a localhostot a root accounttal.
Hozzunk l�tre benne egy �j adatb�zist. Futtassuk le benne a k�vetkez� szkripteket ebben a sorrendben: 
mysql_script_create.sql, mysql_script_insert.sql.
K�sz�ts�nk ugyanitt egy t�rolt elj�r�st, amelynek itt van a tartalma: mysql_stored_proc.sql
A server.js f�jlban m�dos�tsuk az al�bbi r�szt a jelsz�val �s az adatb�zis nev�vel:

```javascript
// Connect to MySQL
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'wsengine'
});
```

Telep�ts�k fel a MongoDB Servert a MongoDB weboldal�r�l: https://www.mongodb.com/download-center

Telep�ts�k fel a Node.js-t �s az npm-et a Node.js oldal�r�l: https://nodejs.org/en/

### L�p�sek
T�lts�k le ezt a projektet egy tetsz�leges k�nyvt�rba. Miut�n a Telep�t�sek pontban felsorolt teend�ket megcsin�ltuk, 
a projekt k�nyvt�r�ban nyissunk meg egy Command Prompt/parancssor ablakot, majd hozzunk l�tre egy data mapp�t:

```
mkdir data
```

Ezut�n �rjuk be a k�vetkez� parancsot:

```
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath "<<projekt el�r�si �tja>>\data"
```

Term�szetesen a val�di el�r�si utat kell megadni a mongod.exe f�jlhoz is, �s a "projekt el�r�si �tja" 
helyett adjuk meg a projekt gy�k�r k�nyvt�r�hoz vezet� el�r�si �tvonalat, a meghajt� bet�jel�vel egy�tt. 
Data helyett megadhatunk egy m�s nev�, l�tez� k�nyvt�rat is. Itt hozza majd l�tre a MongoDB az adatb�zist.

Ezut�n meg kell jelennie a k�vetkez� �zenetnek a sz�vegek v�g�n:

```
waiting for connections on port 27017
```

Ekkor elindult a MongoDB szervere.

Ha ez megvan, akkor nyissunk egy m�sik parancssori ablakot ugyanebben a k�nyvt�rban, �s �rjuk be a k�vetkez�t:

```
npm install
```

Ez feltelep�ti a package.json-ban felsorolt csomagokat.

L�pj�nk be a public k�nyvt�rba, �s ott is ism�telj�k meg az npm install parancsot, mivelhogy ott is van egy package.json. 
Ha ez a k�t telep�t�s siker�lt, akkor nem kell �ket az tov�bbi programind�t�sokkor megism�telni.

Gy�z�dj�nk meg arr�l, hogy fut a MySQL service az oper�ci�s rendszerben.

Ezut�n l�pj�nk vissza a gy�k�rk�nyvt�rba, �s ind�tsuk el az alkalmaz�st: 

```
node server.js
```

Akkor m�k�dik minden, ha a parancssor a k�vetkez�ket �rja ki:

```
App listening on port 3000
Connected correctly to MongoDB server.
Connected correctly to MySQL server.
```

Chrome �s Firefox eset�ben a k�vetkez�t kell be�rni a c�m mez�be:
```
localhost:3000
```

Internet Explorer �s Edge eset�ben pedig a k�vetkez�t:
```
http://localhost:3000/
```