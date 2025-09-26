# Alltron Academy App

Dieses Projekt zeigt die Benutzeroberfläche und Funktionalität unserer Alltron Academy App.  

---

## HomePage

<img width="701" height="447" alt="image" src="https://github.com/user-attachments/assets/bb5075a7-eb13-4779-85cb-7559789a8ee5" />

<img width="711" height="452" alt="image" src="https://github.com/user-attachments/assets/876612af-4662-48ef-bfb2-ccea46e68105" />

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

<img width="712" height="441" alt="image" src="https://github.com/user-attachments/assets/e307ff86-bbbf-4431-bd36-ed7f94c7c72f" />

Die Kalenderansicht zeigt die Kurse **als Wochenübersicht** an.  

- Links sieht man die Schulungsräume:  
  - Oben: Großes Schulungszimmer  
  - Unten: Kleines Schulungszimmer  
- Die Kurse erscheinen als farbige Balken entsprechend ihres Status (Rot, Gelb, Grün).  
- Klickt man auf einen Kurs-Balken, gelangt man zur Kursbeschreibung.  
- Oben in der Mitte kann man mit den Pfeilen links und rechts zwischen den Wochen wechseln, um vergangene oder zukünftige Kurse zu sehen.  

---

## Kursbeschreibung

<img width="713" height="448" alt="image" src="https://github.com/user-attachments/assets/0f12d705-d61e-4c52-8504-fabb547463b3" />

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

<img width="716" height="448" alt="image" src="https://github.com/user-attachments/assets/3f745d02-3dc9-43bb-b828-9ad3209324f4" />

Die Checkliste zeigt:  

- Kursname  
- Datum  
- Alle Aufgaben und Schritte, die für die Vorbereitung erledigt werden müssen  

Aufgaben können einzeln abgehakt werden. Sobald mindestens eine Aufgabe abgehakt ist, **ändert sich der Status automatisch von Rot auf Gelb**.  

---

## Pop-Up „Erledigt“

<img width="710" height="445" alt="image" src="https://github.com/user-attachments/assets/ed73d360-bf3b-4299-a91d-b81945a3330f" />

Wenn alle Aufgaben einer Checkliste abgeschlossen sind, erscheint ein Pop-Up:  

- Meldung, dass die Vorbereitung abgeschlossen ist  
- Kursname  
- Datum  

Das Pop-Up bleibt **5 Sekunden sichtbar** und leitet dann direkt zur Kalenderansicht weiter.  
Alternativ kann man das Pop-Up über das **X oben rechts** schließen, wodurch man ebenfalls zur Kalenderansicht zurückkehrt.  

---

## Installation / Setup

Folge diesen Schritten, um die Alltron Academy App lokal auf deinem Rechner auszuführen:

### 1. Repository klonen
```bash
git clone <repository-url>
cd alltron-academy-app
