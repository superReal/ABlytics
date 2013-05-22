## ABlytics - simple A/B tests##
A/B-Testing für HTML-Elemente protokolliert in Google Analytics


**ABlytics** ist ein pflegeleichtes jQuery-Plugin für die Durchführung von A/B- und [Multivariate-Tests](http://de.wikipedia.org/wiki/Multivariate_Verfahren). Die einzelnen Tests werden auf gewünschte Bereiche innerhalb einer Webseite angewendet, die Erstellung separater Seitenvariationen entfällt.

Die einzelnen Test-Szenarien werden als Parameter an die Plugin-Funktion übergeben: Zusätzlich zum abweichenden Namen der Test-Variation übernimmt die jeweilige Callback-Funktion die Steuerung und das Verhalten des Tests (z.B. ein- oder ausblenden der Bereiche). Übersichtlich und verständlich.

Die ausgelieferte Test-Variante wird im Browser-Cookie des Seitenbesuchers für einen benutzerdefinierten Zeitraum gespeichert, um beim nächsten Aufruf der Webseite das gleiche Ergebnis erneut auszuliefern und die Statistik nicht zu verfälschen. Die Cookie-Lebensdauer ist ebenfalls ein Plugin-Parameter.

Die Zusammenfassung und Auswertung des Testings befindet sich in Google Analytics unter ```Content``` > ```Ereignisse```. Als Ereigniskategorie dient der aussagekräftige und eindeutige ABlytics-Name, welcher dem Plugin als Option mitgeteilt wird.


### Inbetriebnahme

1. jQuery und ABlytics in die Webseite einbinden

```html
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/ablytics.jquery.js"></script>
```

2. Google Analytics initialisieren

```html
<script>
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-XXXXXXX-XX']);
	_gaq.push(['_trackPageview']);

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
</script>
```

3. ABlytics auf den gewünschten Bereich anwenden

```html
<script>
	$(function() {
		$('#crossSelling').ablytics(
			{
				'name': 'A/B Test Crossselling',
				'expires': 31,
				'variants': {
					'A': {
						'name': 'Mit Crosselling',
						'callback': function() {
							$(this).show();
						}
					},
					'B': {
						'name': 'Ohne Crossselling',
						'callback': function() {
							$(this).hide();
						}
					}
				}
			}
		);
	});
</script>
```

### Parameter
- ```name``` - Test-Name, welcher in Google Analytics als Ereigniskategorie dient
- ```expires``` - Lebensdauer des Tests bzw. des Browser-Cookies in Tagen
- ```variants``` - einzelne Test-Varianten
- ```variants``` ```name``` - Varianten-Name bzw. Ereignis
- ```variants``` ```callback``` - Funktion, die bei jeweiliger Test-Variante ausgelöst wird


### Erläuterung
Oben vorgestellte Plugin-Einbindung zählt Seitenbesucher, die den Crossselling-Bereich gesehen oder eben nicht gesehen haben. Nach dem gleichen Prinzip kann mit Farben, Größen, Bildern, Call2Action gearbeitet werden, um herauszufinden, welche Layout-Änderungen zu welcher Konversionrate geführt haben.


### Browser
Unterstützt werden alle Browser bis auf Internet Explorer <= 8.


### Development
[Sergej Müller](https://gist.github.com/sergejmueller) / [superreal.de](http://superreal.de)


### Changelog

- Version: 1.0 geht online


### Screenshot

Auflistung der Test-Varianten als Ereignisaktion
<p>
	<img src="https://github.com/superReal/ABlytics/raw/master/screenshot-1.png" width="1154" height="660" alt="Google Analytics"/>
</p>