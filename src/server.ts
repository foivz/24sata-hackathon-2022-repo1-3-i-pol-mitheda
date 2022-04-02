import path from "path";
import gateway from "express-gateway";

// dok dodajete novi mikroservis:
// 1. dodajte ga u config/gateway.config.yml (pazite da port ne pripada nekom drugom mikroservisu)
// 2. importajte ga tu

// importanje servisa tu zapravo znaci da se ti servisi pokrecu kao normalan node server
// samo sto se svaki servis pokrece na razlicitom portu i express-gateway
// sve proxy-ja na jedan port, na taj nacin se moze jedan dio aplikacije
// brejkat bez da utjece na ostale

import "./test/service";
import "./invoice-scanner/invoice-scanner";
import "./resources/users/users";
import "./resources/expenses/expenses";
import "./resources/accounts/accounts";
import "./personalization/personalization";

gateway().load(path.join(__dirname, "..", "config")).run();
