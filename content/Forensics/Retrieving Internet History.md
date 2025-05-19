
# NirSoft Internet Browser View
Using a NirSoft tool, we are able to view a historical internet access from the computer. Simply run the application on the computer you would like to view the internet browser history. This tool is good for forensic analysis, or to collect evidence when we have a direct access to the computer.

# Web Browser files
All browsers will keep the data saved in a certain file, if we retrieve these files we can view the internet history directly. 

### View file history
To view the `History` file, you can open it with a [SQLite browser](https://sqlitebrowser.org/).
![[Pasted image 20250517202708.png]]

### File Format Files:
- `History` → SQLite
- `Bookmarks` → JSON file
- `Favicons` → SQLite

## 🔵 **Google Chrome**
```
C:\Users\<YourUsername>\AppData\Local\Google\Chrome\User Data\Default\
```
## 🔵  Brave Browser (Chromium-based)
```
C:\Users\<YourUsername>\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\
```
## 🔵 **Microsoft Edge**
```
C:\Users\<YourUsername>\AppData\Local\Microsoft\Edge\User Data\Default\
```
## 🔶 **Mozilla Firefox**
```
C:\Users\<YourUsername>\AppData\Roaming\Mozilla\Firefox\Profiles\<profile folder>\
```

![[Pasted image 20250517204056.png]]

Using SQLiteBrowser we can open the places.sqlite file
- `places.sqlite`
Navigate to Browse Data and use table **moz_places** for the Internet history
![[Pasted image 20250517204413.png]]