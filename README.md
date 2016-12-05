# Web�ruh�z motor
Ez egy olyan projekt, amely azt a c�lt szolg�lja, hogy olyan web�ruh�z motort hozzon l�tre, 
amely k�pes egyszerre t�bb web�ruh�zat is l�trehozni �s kiszolg�lni.

## Felhaszn�lt technol�gi�k
Kliens oldal: HTML, CSS, AngularJS

Szerver oldal: MongoDB, MySQL, Node.js

## Hivatkoz�sok
Start Bootstrap: Shop Homepage template, https://startbootstrap.com/template-overviews/shop-homepage/

Start Bootstrap: Modern Business template, https://startbootstrap.com/template-overviews/modern-business/

Start Bootstrap: SB Admin 2 template, https://startbootstrap.com/template-overviews/sb-admin-2/

## Alkalmaz�s ind�t�sa
### Telep�t�sek
Telep�tse fel a MySQL Servert �s MySQL Workbench-et a MySQL weboldal�r�l.

Telep�tse fel a MongoDB Servert a MongoDB weboldal�r�l.

Telep�tse fel a Node.js-t �s az npm-et a Node.js oldal�r�l.

### L�p�sek
T�ltse le ezt a projektet egy tetsz�leges k�nyvt�rba. Miut�n a Telep�t�sek pontban felsorolt szoftvereket feltelep�tette, 
a projekt k�nyvt�r�ban nyisson meg egy Command Prompt/parancssor ablakot, �s ide �rja a k�vetkez�t:

```
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath "<<projekt el�r�si �tja>>\data"
```

Term�szetesen a val�di el�r�si utat kell megadni a mongod.exe f�jlhoz is, �s a <<projekt el�r�si �tja>> 
helyett adja meg a projekt gy�k�r k�nyvt�r�hoz vezet� el�r�si �tvonalat, meghajt� bet�jel�vel egy�tt. Data helyett megadhat egy m�s nev� k�nyvt�rat is. 
Itt hozza majd l�tre a MongoDB az adatb�zist.

Ezut�n meg kell jelennie a k�vetkez� �zenetnek a sz�vegek v�g�n:

```
waiting for connections on port 27017
```

Ekkor elindult a MongoDB szervere.

Ha ez megvan, akkor nyisson egy m�sik parancssori ablakot ugyanebben a k�nyvt�rban, �s �rja be a k�vetkez�t:

```
npm install
```

Ez feltelep�ti a package.json-ban felsorolt csomagokat.

L�pjen be a public k�nyvt�rba, �s ott is ism�telje meg az npm install parancsot, mivelhogy ott is van egy package.json. 
Ha ez a k�t telep�t�s siker�lt, akkor nem kell �ket az tov�bbi programind�t�sokkor megism�telni.

Gy�z�dj�n meg arr�l, hogy fut a MySQL service az oper�ci�s rendszerben.

Ezut�n l�pjen vissza a gy�k�rk�nyvt�rba, �s ind�tsa el az alkalmaz�st: 

```
node server.js
```

Akkor m�k�dik minden, ha a parancssor a k�vetkez�ket �rja ki:

```
App listening on port 3000
Connected correctly to MongoDB server.
Connected correctly to MySQL server.
```