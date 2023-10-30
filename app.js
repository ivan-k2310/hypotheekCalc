const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const calculateTotaalInkomen = (JaarInkomenNummer, JaarInkomenPartner) => {
  return JaarInkomenNummer + JaarInkomenPartner;
};

const calculateMaxHypotheek = (totaalInkomen, studieschuld, termijnen) => {
  let maxHypotheek = 0;

  if (studieschuld) {
    maxHypotheek = totaalInkomen * 4.25 * 0.75;
  } else {
    maxHypotheek = totaalInkomen * 4.25;
  }

  switch (termijnen) {
    case 1:
      maxHypotheek *= 1.02;
      break;
    case 5:
      maxHypotheek *= 1.03;
      break;
    case 10:
      maxHypotheek *= 1.035;
      break;
    case 20:
      maxHypotheek *= 1.045;
      break;
    case 30:
      maxHypotheek *= 1.05;
      break;
  }

  return Math.round(maxHypotheek);
};

const printMaxHypotheek = (maxHypotheek) => {
  console.log(`Je maximale hypotheek is ${maxHypotheek}`);
};

const MaxHypotheek = (
  JaarInkomenNummer,
  JaarInkomenPartner,
  studieschuld,
  termijnen
) => {
  const totaalInkomen = calculateTotaalInkomen(
    JaarInkomenNummer,
    JaarInkomenPartner
  );
  const maxHypotheek = calculateMaxHypotheek(
    totaalInkomen,
    studieschuld,
    termijnen
  );
  printMaxHypotheek(maxHypotheek);
  return maxHypotheek;
};

/* istanbul ignore next */
const MaxHypotheekPartner = () => {
  const VraagPostcode = () => {
    readline.question("Wat is je postcode? :  ", (PostCode) => {
      if (!PostCode) {
        console.log("Je hebt geen postcode ingevuld");
        VraagPostcode();
        return;
      }
      const PostcodeNummer = parseInt(PostCode);

      if (Number.isNaN(PostcodeNummer) || PostCode.length !== 4) {
        console.log("Dit is geen geldige postcode, probeer opnieuw.");
        VraagPostcode();
      } else if ([9679, 9681, 9682].includes(PostcodeNummer)) {
        console.log("Je postcode is niet geldig");
        VraagPostcode();
      } else {
        VraagJaarInkomen();
      }
    });
  };

  const VraagJaarInkomen = () => {
    readline.question("Wat is je jaarinkomen? :  ", (JaarInkomen) => {
      if (!JaarInkomen || isNaN(JaarInkomen)) {
        console.log("Dit is geen geldig jaarinkomen, probeer opnieuw.");
        VraagJaarInkomen();
      } else {
        const JaarInkomenNummer = parseInt(JaarInkomen);
        VraagPartner(JaarInkomenNummer);
      }
    });
  };

  const VraagPartner = (JaarInkomenNummer) => {
    readline.question("Heb je een partner? (ja/nee) :  ", (BoolPartner) => {
      BoolPartner = BoolPartner.toLowerCase();
      if (BoolPartner === "nee") {
        VraagStudieschuld();
      } else if (BoolPartner === "ja") {
        readline.question(
          "Wat is het jaarinkomen van je partner? :  ",
          (JaarInkomenPartner) => {
            if (!JaarInkomenPartner || isNaN(JaarInkomenPartner)) {
              console.log(
                "Dit is geen geldig jaarinkomen voor je partner, probeer opnieuw."
              );
              VraagPartner(JaarInkomenNummer);
            } else {
              VraagStudieschuldPartner(
                JaarInkomenNummer,
                parseInt(JaarInkomenPartner)
              );
            }
          }
        );
      } else {
        console.log("Antwoord met 'ja' of 'nee'.");
        VraagPartner(JaarInkomenNummer);
      }
    });
  };

  const VraagStudieschuldPartner = (JaarInkomenNummer, JaarInkomenPartner) => {
    readline.question(
      "Heeft een van jullie studieschuld? (ja/nee) :  ",
      (BoolStudieschuld) => {
        BoolStudieschuld = BoolStudieschuld.toLowerCase();
        if (BoolStudieschuld === "ja") {
          VraagTermijnen(JaarInkomenNummer, JaarInkomenPartner, true);
        } else if (BoolStudieschuld === "nee") {
          VraagTermijnen(JaarInkomenNummer, JaarInkomenPartner, false);
        } else {
          console.log("Antwoord met 'ja' of 'nee'.");
          VraagStudieschuldPartner(JaarInkomenNummer, JaarInkomenPartner);
        }
      }
    );
  };

  const VraagStudieschuld = () => {
    readline.question(
      "Heb je studieschuld? (ja/nee) :  ",
      (BoolStudieschuld) => {
        BoolStudieschuld = BoolStudieschuld.toLowerCase();
        if (BoolStudieschuld === "ja") {
          VraagTermijnen(0, 0, true);
        } else if (BoolStudieschuld === "nee") {
          VraagTermijnen(0, 0, false);
        } else {
          console.log("Antwoord met 'ja' of 'nee'.");
          VraagStudieschuld();
        }
      }
    );
  };

  const VraagTermijnen = (
    JaarInkomenNummer,
    JaarInkomenPartner,
    studieschuld
  ) => {
    readline.question(
      "In hoeveel termijnen wil je betalen, keuzes: 1, 5, 10, 20, 30 : ",
      (termijnen) => {
        termijnen = parseInt(termijnen);
        if ([1, 5, 10, 20, 30].includes(termijnen)) {
          MaxHypotheek(
            JaarInkomenNummer,
            JaarInkomenPartner,
            studieschuld,
            termijnen
          );
          readline.close();
        } else {
          console.log(
            "Ongeldige keuze voor termijnen. Kies uit: 1, 5, 10, 20, 30."
          );
          VraagTermijnen(JaarInkomenNummer, JaarInkomenPartner, studieschuld);
        }
      }
    );
  };

  VraagPostcode();
};

MaxHypotheekPartner();

module.exports = {
  MaxHypotheek,
  calculateMaxHypotheek,
  calculateTotaalInkomen,
  printMaxHypotheek,
};
