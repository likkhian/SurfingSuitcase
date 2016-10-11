# SurfingSuitcase
Welcome to the SurfingSuitcase app, a mobile web app where you can discover nearby cafes that have WiFi, power outlets and are remote-work friendly.
These spaces offer timed promotional deals, as well as loyalty rewards!

!!!BEFORE EDITING THE CODE!!!
There is a piece of code in imports>ui>surf.js that forces a https connection. Please comment those 4 lines out (lines 16-19) when testing
so your changes will display correctly on your localhost:3000. When committing changes, remember to unstage that hunk too, so people will get directed
to the app with secure origins!

Know issues: in the /manager area, you'll have to click 'edit' twice to populate the data fields. When you are done editing and click 'submit', the changes do not show up immediately but require a refresh. WARNING. if you only click edit once, and click edit on another entry, the entry that is populated will not be the correct entry. I suspect it is because a meteor publish and subscribe is not implemented yet, so the data does not 'live update'

