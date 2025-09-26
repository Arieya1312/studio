# Alltron Academy App

Dieses Projekt zeigt die Benutzeroberfläche und Funktionalität unserer Alltron Academy App.  

---

<img width="710" height="445" alt="image" src="https://github.com/user-attachments/assets/0976d5ce-556f-4a94-b89d-189a3aa54b90" />


## HomePage

Auf der Startseite sieht man oben das **Alltron Academy Logo**, das auf jeder Ansicht sichtbar ist, jedoch keine Funktion hat.  

Darunter werden alle **anstehenden Kurse** angezeigt. Jeder Kurs ist in einem eigenen Kästchen dargestellt und enthält:  

- **Name des Kurses**  
- **Datum**  
- **Schulungsraum**  
- **Status** (oben rechts im Kästchen):  
  - Rot = noch nicht vorbereitet  
  - Gelb = Vorbereitung begonnen  
  - Grün = Vorbereitung abgeschlossen  

Klickt man auf einen Kurs, gelangt man zur **Kursbeschreibung**.  

Unten auf der Startseite gibt es einen Button **„Zum Kalender“**, mit dem man zur Kalenderansicht gelangt.  

---

## Kalenderansicht

Die Kalenderansicht zeigt die Kurse **als Wochenübersicht** an.  

- Links sieht man die Schulungsräume:  
  - Oben: Großes Schulungszimmer  
  - Unten: Kleines Schulungszimmer  
- Die Kurse erscheinen als farbige Balken entsprechend ihres Status (Rot, Gelb, Grün).  
- Klickt man auf einen Kurs-Balken, gelangt man zur Kursbeschreibung.  
- Oben in der Mitte kann man mit den Pfeilen links und rechts zwischen den Wochen wechseln, um vergangene oder zukünftige Kurse zu sehen.  

---

## Kursbeschreibung

Hier werden folgende Informationen angezeigt:  

- **Name des Kurses**  
- **Datum**  
- **Schulungsraum**  
- **Kurze Beschreibung** des Inhalts  

Oben rechts sieht man erneut die **Statusfarbe**.  

Unten links befindet sich ein Button **„Vorbereiten“**, der zur **Checkliste** für den Kurs führt.  
Kurse mit **grünem Status** haben keinen „Vorbereiten“-Button.  

---

## Checkliste

Die Checkliste zeigt:  

- Kursname  
- Datum  
- Alle Aufgaben und Schritte, die für die Vorbereitung erledigt werden müssen  

Aufgaben können einzeln abgehakt werden. Sobald mindestens eine Aufgabe abgehakt ist, **ändert sich der Status automatisch von Rot auf Gelb**.  

---

## Pop-Up „Erledigt“

Wenn alle Aufgaben einer Checkliste abgeschlossen sind, erscheint ein Pop-Up:  

- Meldung, dass die Vorbereitung abgeschlossen ist  
- Kursname  
- Datum  

Das Pop-Up bleibt **5 Sekunden sichtbar** und leitet dann direkt zur Kalenderansicht weiter.  
Alternativ kann man das Pop-Up über das **X oben rechts** schließen, wodurch man ebenfalls zur Kalenderansicht zurückkehrt.  

---


