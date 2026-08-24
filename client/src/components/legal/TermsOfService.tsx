import { useLanguage } from '../../i18n';
import { LegalPage } from './LegalPage';

export function TermsOfService() {
  const { language } = useLanguage();

  return language === 'lt' ? <TermsOfServiceLT /> : <TermsOfServiceEN />;
}

function TermsOfServiceLT() {
  return (
    <LegalPage title="Naudojimo taisyklės ir paslaugų teikimo sąlygos" lastUpdated="2026 m. rugpjūčio 24 d.">
      <h2 className="text-h2 text-[var(--text-primary)] mt-6 mb-4">1. Bendrosios nuostatos</h2>
      <p>
        Šios Naudojimo taisyklės ir paslaugų teikimo sąlygos reglamentuoja naudojimąsi ReviewBoost interneto svetaine https://reviewboost.lt/ (toliau – „Svetainė").
      </p>
      <p>
        Naudodamiesi Svetaine patvirtinate, kad susipažinote su šiomis sąlygomis.
      </p>
      <p>
        ReviewBoost<br />
        El. paštas: reviewboostlt@gmail.com<br />
        Telefonas: +37067784788
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">2. Svetainės paskirtis</h2>
      <p>
        Svetainėje pateikiama informacija apie ReviewBoost NFC produktus ir sprendimus verslui.
      </p>
      <p>
        Svetainėje taip pat galima pateikti užklausą dėl produkto, kiekio, kainos ir kitų sąlygų.
      </p>
      <p>
        Kontaktinės formos pateikimas savaime nelaikomas pirkimo–pardavimo sutarties sudarymu, nebent šalys aiškiai susitaria kitaip.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">3. Produkto informacija</h2>
      <p>
        Mes stengiamės pateikti tikslią ir aktualią informaciją apie ReviewBoost produktus.
      </p>
      <p>
        Produkto nuotraukos yra skirtos produktui vizualiai pavaizduoti. Faktinė produkto išvaizda, spalvos ar kitos detalės gali šiek tiek skirtis nuo ekrane matomo vaizdo.
      </p>
      <p>
        Galutinės produkto specifikacijos, kaina, kiekis, pristatymo sąlygos ir kitos sąlygos nustatomos individualiai, kai jos taikomos.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">4. Kainos</h2>
      <p>
        Jeigu Svetainėje nėra nurodyta konkreti produkto kaina, kaina pateikiama individualaus pasiūlymo metu.
      </p>
      <p>
        Galutinė kaina ir kitos komercinės sąlygos patvirtinamos prieš sudarant atitinkamą sutartį.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">5. Užklausos</h2>
      <p>
        Pateikdami kontaktinę užklausą įsipareigojate pateikti teisingą ir aktualią informaciją.
      </p>
      <p>
        Pateikus užklausą, ReviewBoost gali susisiekti su jumis dėl jūsų užklausos, produkto, kiekio, kainos ar kitų su galimu užsakymu susijusių klausimų.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">6. Užsakymai ir sutartys</h2>
      <p>
        Pateikta užklausa savaime nesukuria pareigos ReviewBoost priimti užsakymą.
      </p>
      <p>
        Užsakymas laikomas priimtu tik tada, kai šalys susitaria dėl esminių sąlygų ir, kai taikoma, sudaroma pirkimo–pardavimo ar kita atitinkama sutartis.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">7. Pristatymas</h2>
      <p>
        Jeigu užsakymas priimamas, pristatymo būdas, terminas ir kaina nurodomi individualiame pasiūlyme arba užsakymo patvirtinime.
      </p>
      <p>
        Jeigu taikomi vartotojų apsaugos teisės aktai, pristatymui ir vartotojo teisėms taikomos privalomos teisės aktų nuostatos.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">8. Atsisakymo teisė ir grąžinimas</h2>
      <p>
        Jeigu sudaroma vartojimo sutartis nuotoliniu būdu, vartotojui taikomos Lietuvos Respublikos teisės aktuose nustatytos teisės, įskaitant teisę atsisakyti nuotolinės sutarties, kai tokia teisė taikoma.
      </p>
      <p>
        Bendra taisyklė vartotojams – teisė atsisakyti nuotolinės sutarties per 14 dienų, tačiau teisės aktai numato išimtis.
      </p>
      <p>
        Jeigu produktas gaminamas pagal individualų vartotojo pasirinkimą ar specialų užsakymą, gali būti taikoma įstatyme nustatyta išimtis iš teisės atsisakyti sutarties.
      </p>
      <p>
        Konkrečios grąžinimo ir atsisakymo sąlygos pateikiamos prieš sudarant atitinkamą sutartį.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">9. Produkto kokybė ir garantija</h2>
      <p>
        Produktams taikomos vartotojų teisės aktuose nustatytos garantijos ir kitos privalomos teisės.
      </p>
      <p>
        Jeigu suteikiama papildoma komercinė garantija, jos sąlygos nurodomos atskirai.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">10. Intelektinė nuosavybė</h2>
      <p>
        Visa Svetainėje esanti medžiaga, įskaitant logotipą, tekstus, grafiką, dizainą, nuotraukas ir kitą turinį, priklauso ReviewBoost arba naudojama teisėtai.
      </p>
      <p>
        Be išankstinio rašytinio sutikimo draudžiama kopijuoti, platinti, keisti ar kitaip naudoti Svetainės turinį komerciniais tikslais, išskyrus teisės aktuose numatytus atvejus.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">11. Svetainės prieinamumas</h2>
      <p>
        Dedame pagrįstas pastangas užtikrinti nepertraukiamą Svetainės veikimą.
      </p>
      <p>
        Tačiau negalime garantuoti, kad Svetainė visada veiks be sutrikimų, klaidų ar pertrūkių.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">12. Atsakomybė</h2>
      <p>
        Informacija Svetainėje pateikiama bendro pobūdžio informaciniais tikslais.
      </p>
      <p>
        ReviewBoost neatsako už nuostolius, atsiradusius dėl netinkamo Svetainėje pateiktos bendro pobūdžio informacijos naudojimo, kiek tokia atsakomybės ribojimo nuostata leidžiama pagal taikomus teisės aktus.
      </p>
      <p>
        Šios sąlygos neriboja vartotojų teisių ar atsakomybės, kurios pagal įstatymus negali būti ribojamos.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">13. Skundai ir ginčai</h2>
      <p>
        Jeigu turite nusiskundimų ar klausimų dėl produkto ar paslaugų, pirmiausia prašome susisiekti su ReviewBoost:
      </p>
      <p>
        El. paštas: reviewboostlt@gmail.com<br />
        Telefonas: +37067784788
      </p>
      <p>
        Ginčai sprendžiami taikiai, o nepavykus susitarti – Lietuvos Respublikos teisės aktų nustatyta tvarka.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">14. Taikytina teisė</h2>
      <p>
        Šioms sąlygoms taikoma Lietuvos Respublikos teisė, išskyrus atvejus, kai privalomos teisės normos nustato kitaip.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">15. Sąlygų pakeitimai</h2>
      <p>
        ReviewBoost gali atnaujinti šias sąlygas, kai keičiasi Svetainė, mūsų veikla ar taikomi teisės aktai.
      </p>
      <p>
        Atnaujinta versija skelbiama Svetainėje.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">16. Kontaktai</h2>
      <p>
        ReviewBoost<br />
        El. paštas: reviewboostlt@gmail.com<br />
        Telefonas: +37067784788
      </p>
    </LegalPage>
  );
}

function TermsOfServiceEN() {
  return (
    <LegalPage title="Terms and Conditions" lastUpdated="August 24, 2026">
      <h2 className="text-h2 text-[var(--text-primary)] mt-6 mb-4">1. General</h2>
      <p>
        These Terms and Conditions govern the use of the ReviewBoost website at https://reviewboost.lt/ (the "Website").
      </p>
      <p>
        By using the Website, you acknowledge that you have read and understood these Terms.
      </p>
      <p>
        ReviewBoost<br />
        Email: reviewboostlt@gmail.com<br />
        Phone: +37067784788
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">2. Purpose of the Website</h2>
      <p>
        The Website provides information about ReviewBoost NFC products and business solutions.
      </p>
      <p>
        The Website also allows businesses to submit inquiries regarding products, quantities, pricing and other commercial terms.
      </p>
      <p>
        Submitting an inquiry does not by itself constitute a purchase agreement unless the parties expressly agree otherwise.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">3. Product Information</h2>
      <p>
        We make reasonable efforts to ensure that product information displayed on the Website is accurate and up to date.
      </p>
      <p>
        Product images are provided for illustrative purposes. Actual product appearance, colors or other details may vary slightly from the images displayed on your device.
      </p>
      <p>
        Final product specifications, pricing, quantities, delivery terms and other conditions will be confirmed where applicable before an order is accepted.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">4. Pricing</h2>
      <p>
        Where no product price is displayed on the Website, pricing will be provided through an individual quotation.
      </p>
      <p>
        The final price and commercial terms will be confirmed before the relevant agreement is concluded.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">5. Inquiries</h2>
      <p>
        When submitting an inquiry, you agree to provide accurate and current information.
      </p>
      <p>
        After receiving an inquiry, ReviewBoost may contact you regarding your inquiry, product requirements, quantities, pricing or other matters relating to a potential order.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">6. Orders and Agreements</h2>
      <p>
        Submitting an inquiry does not obligate ReviewBoost to accept an order.
      </p>
      <p>
        An order will only be considered accepted once the parties have agreed on the relevant material terms and, where applicable, entered into a purchase or other applicable agreement.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">7. Delivery</h2>
      <p>
        If an order is accepted, the delivery method, estimated delivery time and applicable delivery costs will be specified in the relevant quotation or order confirmation.
      </p>
      <p>
        Where mandatory consumer protection laws apply, all statutory requirements regarding delivery and consumer rights will apply.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">8. Right of Withdrawal and Returns</h2>
      <p>
        Where a distance contract is concluded with a consumer, the consumer rights provided by applicable Lithuanian law will apply, including the statutory right of withdrawal where applicable.
      </p>
      <p>
        As a general rule, consumers have a 14-day right to withdraw from a distance contract, subject to statutory exceptions.
      </p>
      <p>
        Where a product is manufactured according to the consumer's specific choices or specifications, a statutory exception to the right of withdrawal may apply.
      </p>
      <p>
        Specific return and withdrawal terms will be provided before the relevant agreement is concluded.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">9. Product Quality and Warranty</h2>
      <p>
        Products are subject to mandatory statutory consumer rights and warranties where applicable.
      </p>
      <p>
        If an additional commercial warranty is offered, its specific terms will be provided separately.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">10. Intellectual Property</h2>
      <p>
        All content on the Website, including the ReviewBoost logo, text, graphics, design, photographs and other materials, is owned by ReviewBoost or used lawfully.
      </p>
      <p>
        Without prior written permission, the Website content may not be copied, distributed, modified or commercially exploited except where permitted by law.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">11. Website Availability</h2>
      <p>
        We make reasonable efforts to keep the Website available and functioning.
      </p>
      <p>
        However, we cannot guarantee uninterrupted operation or that the Website will always be free from errors, interruptions or technical issues.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">12. Liability</h2>
      <p>
        Information on the Website is provided for general informational purposes.
      </p>
      <p>
        ReviewBoost is not responsible for losses arising from reliance on general information provided on the Website to the extent permitted by applicable law.
      </p>
      <p>
        Nothing in these Terms limits consumer rights or liability that cannot legally be limited.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">13. Complaints and Disputes</h2>
      <p>
        If you have a complaint or question regarding our products or services, please contact ReviewBoost first:
      </p>
      <p>
        Email: reviewboostlt@gmail.com<br />
        Phone: +37067784788
      </p>
      <p>
        We will seek to resolve disputes amicably. If a dispute cannot be resolved amicably, it will be handled in accordance with applicable Lithuanian law.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">14. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the Republic of Lithuania, except where mandatory legal provisions provide otherwise.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">15. Changes to These Terms</h2>
      <p>
        ReviewBoost may update these Terms when the Website, our business or applicable legal requirements change.
      </p>
      <p>
        The updated version will be published on the Website.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">16. Contact</h2>
      <p>
        ReviewBoost<br />
        Email: reviewboostlt@gmail.com<br />
        Phone: +37067784788
      </p>
    </LegalPage>
  );
}
