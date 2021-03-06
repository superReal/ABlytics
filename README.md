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
- ```name``` - Test-Name, welcher in Google Analytics als Ereigniskategorie dient [optional]
- ```expires``` - Lebensdauer des Tests bzw. des Browser-Cookies in Tagen [optional, _31_ als Standard]
- ```nonInteraction``` - Auf _true_ gesetzt, wird der Event bei der Ermittlung der Bounce-Rate nicht berücksichtigt [optional, _false_ als Standard]
- ```variants``` - einzelne Test-Varianten [erforderlich]
- ```variants``` ```name``` - Varianten-Name bzw. Ereignis
- ```variants``` ```callback``` - Funktion, die bei jeweiliger Test-Variante ausgelöst wird


### Erläuterung
Oben vorgestellte Plugin-Einbindung zählt Seitenbesucher, die den Crossselling-Bereich gesehen oder eben nicht gesehen haben. Nach dem gleichen Prinzip kann mit Farben, Größen, Bildern, Call2Action gearbeitet werden, um herauszufinden, welche Layout-Änderungen zu welcher Konversionrate geführt haben.


### Browser
Unterstützt werden alle Browser bis auf Internet Explorer <= 8.


### Development
[Sergej Müller](https://github.com/sergejmueller) / [superReal](http://superreal.de)


### Changelog

###### Version: 1.0.2
Parameter ```non-interaction``` als Option beim Aufruf der ABlytics-Funktion

###### Version: 1.0.1
Parameter ```non-interaction``` zum Funktionsaufruf ```_trackEvent``` hinzugefügt

###### Version 1.0.0
Plugin geht online