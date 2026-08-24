import { useLanguage } from '../../i18n';
import { LegalPage } from './LegalPage';

export function PrivacyPolicy() {
  const { language } = useLanguage();

  return language === 'lt' ? <PrivacyPolicyLT /> : <PrivacyPolicyEN />;
}

function PrivacyPolicyLT() {
  return (
    <LegalPage title="Privatumo politika" lastUpdated="2026 m. rugpjūčio 24 d.">
      <p>
        Ši Privatumo politika paaiškina, kaip ReviewBoost (toliau – „ReviewBoost", „mes", „mūsų") renka, naudoja ir saugo asmens duomenis, kai lankotės mūsų interneto svetainėje https://reviewboost.lt/ arba susisiekiate su mumis.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">1. Duomenų valdytojas</h2>
      <p>
        Duomenų valdytojas:<br />
        ReviewBoost<br />
        El. paštas: reviewboostlt@gmail.com<br />
        Telefonas: +37067784788
      </p>
      <p>
        Jeigu turite klausimų dėl jūsų asmens duomenų tvarkymo, susisiekite su mumis nurodytais kontaktais.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">2. Kokius duomenis renkame</h2>
      <p>Kai naudojatės mūsų kontaktine forma, galime rinkti:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>įmonės pavadinimą;</li>
        <li>kontaktinio asmens vardą ir pavardę;</li>
        <li>el. pašto adresą;</li>
        <li>telefono numerį, jeigu jį pateikiate;</li>
        <li>pageidaujamą produkto kiekį;</li>
        <li>jūsų žinutės turinį;</li>
        <li>kitą informaciją, kurią savanoriškai pateikiate užklausos metu.</li>
      </ul>
      <p>Taip pat svetainės veikimo metu gali būti automatiškai renkami techniniai duomenys, pavyzdžiui:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>IP adresas;</li>
        <li>naršyklės tipas;</li>
        <li>įrenginio informacija;</li>
        <li>operacinė sistema;</li>
        <li>apsilankymo laikas;</li>
        <li>lankomi svetainės puslapiai;</li>
        <li>techniniai naudojimosi svetaine duomenys.</li>
      </ul>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">3. Kam naudojame asmens duomenis</h2>
      <p>Jūsų duomenis galime naudoti:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>atsakyti į jūsų užklausas;</li>
        <li>susisiekti dėl ReviewBoost produkto;</li>
        <li>parengti pasiūlymą;</li>
        <li>administruoti jūsų užklausą ar užsakymą;</li>
        <li>teikti klientų aptarnavimą;</li>
        <li>užtikrinti svetainės saugumą ir veikimą;</li>
        <li>vykdyti teisines prievoles;</li>
        <li>ginti savo teisėtus interesus.</li>
      </ul>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">4. Teisinis duomenų tvarkymo pagrindas</h2>
      <p>Priklausomai nuo konkrečios situacijos, asmens duomenis galime tvarkyti remdamiesi:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>jūsų sutikimu;</li>
        <li>veiksmais, kurių reikia imtis jūsų prašymu prieš sudarant sutartį;</li>
        <li>sutarties vykdymu;</li>
        <li>mums taikomų teisinių prievolių vykdymu;</li>
        <li>mūsų teisėtais interesais, jeigu jie nepažeidžia jūsų pagrindinių teisių ir laisvių.</li>
      </ul>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">5. Duomenų perdavimas paslaugų teikėjams</h2>
      <p>Kad galėtume tinkamai administruoti svetainę ir užklausas, jūsų duomenys gali būti perduodami mūsų pasitelkiamiems paslaugų teikėjams, pavyzdžiui:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>svetainės talpinimo ir infrastruktūros paslaugų teikėjams;</li>
        <li>el. pašto ir pranešimų siuntimo paslaugų teikėjams;</li>
        <li>IT ir techninės priežiūros paslaugų teikėjams.</li>
      </ul>
      <p>Šie paslaugų teikėjai gali tvarkyti duomenis tik tiek, kiek tai būtina jų paslaugoms teikti ir pagal taikomus teisės aktus.</p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">6. Resend</h2>
      <p>
        Kontaktinės formos užklausoms perduoti galime naudoti el. laiškų siuntimo paslaugą Resend.
      </p>
      <p>
        Kai pateikiate užklausą, jos duomenys gali būti perduodami Resend tam, kad galėtume išsiųsti ir gauti su užklausa susijusius el. laiškus.
      </p>
      <p>
        Daugiau informacijos apie Resend privatumo praktiką rasite Resend privatumo politikoje.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">7. Duomenų saugojimo terminai</h2>
      <p>
        Asmens duomenis saugome tik tiek laiko, kiek būtina konkrečiam tikslui pasiekti arba kiek to reikalauja taikomi teisės aktai.
      </p>
      <p>
        Užklausų duomenys gali būti saugomi tiek, kiek būtina atsakyti į užklausą, palaikyti verslo santykius, vykdyti sutartinius įsipareigojimus arba apginti teisėtus interesus.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">8. Jūsų teisės</h2>
      <p>Pagal taikomus duomenų apsaugos teisės aktus jūs galite turėti teisę:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>gauti informaciją apie jūsų duomenų tvarkymą;</li>
        <li>susipažinti su savo asmens duomenimis;</li>
        <li>reikalauti ištaisyti netikslius duomenis;</li>
        <li>reikalauti ištrinti duomenis;</li>
        <li>apriboti duomenų tvarkymą;</li>
        <li>nesutikti su tam tikru duomenų tvarkymu;</li>
        <li>tam tikrais atvejais gauti savo duomenis struktūrizuotu formatu;</li>
        <li>atšaukti sutikimą, kai duomenys tvarkomi sutikimo pagrindu.</li>
      </ul>
      <p>Jūsų teisės gali būti ribojamos teisės aktuose numatytais atvejais.</p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">9. Skundų teikimas</h2>
      <p>
        Jeigu manote, kad jūsų asmens duomenys tvarkomi netinkamai, pirmiausia galite susisiekti su ReviewBoost.
      </p>
      <p>
        Taip pat turite teisę pateikti skundą Valstybinei duomenų apsaugos inspekcijai.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">10. Slapukai</h2>
      <p>
        Svetainėje galime naudoti slapukus ir panašias technologijas, kurios yra būtinos svetainės veikimui, saugumui ir naudojimo patogumui.
      </p>
      <p>
        Jeigu ateityje naudosime analitinius ar rinkodaros slapukus, prieš juos naudojant, kai to reikalauja teisės aktai, bus prašoma jūsų sutikimo.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">11. Saugumas</h2>
      <p>
        Taikome tinkamas technines ir organizacines priemones, skirtas apsaugoti asmens duomenis nuo neteisėto naudojimo, praradimo, pakeitimo ar atskleidimo.
      </p>
      <p>
        Tačiau joks perdavimas internetu ar elektroninio saugojimo būdas negali būti laikomas absoliučiai saugiu.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">12. Politikos pakeitimai</h2>
      <p>
        Šią Privatumo politiką galime periodiškai atnaujinti, kad ji atspindėtų mūsų veiklos, technologijų ar teisinių reikalavimų pokyčius.
      </p>
      <p>
        Atnaujinta versija bus skelbiama šioje svetainėje.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">13. Kontaktai</h2>
      <p>
        Dėl privatumo ir asmens duomenų tvarkymo klausimų:<br /><br />
        ReviewBoost<br />
        El. paštas: reviewboostlt@gmail.com<br />
        Telefonas: +37067784788
      </p>
    </LegalPage>
  );
}

function PrivacyPolicyEN() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="August 24, 2026">
      <p>
        This Privacy Policy explains how ReviewBoost ("ReviewBoost", "we", "us", or "our") collects, uses and protects personal data when you visit https://reviewboost.lt/ or contact us.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">1. Data Controller</h2>
      <p>
        Data controller:<br />
        ReviewBoost<br />
        Email: reviewboostlt@gmail.com<br />
        Phone: +37067784788
      </p>
      <p>
        If you have questions about the processing of your personal data, please contact us using the details above.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">2. Information We Collect</h2>
      <p>When you use our contact form, we may collect:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>business name;</li>
        <li>contact person's name;</li>
        <li>email address;</li>
        <li>phone number, if provided;</li>
        <li>requested product quantity;</li>
        <li>message content;</li>
        <li>other information you voluntarily provide.</li>
      </ul>
      <p>We may also automatically collect technical information such as:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>IP address;</li>
        <li>browser type;</li>
        <li>device information;</li>
        <li>operating system;</li>
        <li>visit time;</li>
        <li>pages visited;</li>
        <li>technical usage information.</li>
      </ul>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">3. How We Use Your Data</h2>
      <p>We may use your personal data to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>respond to inquiries;</li>
        <li>contact you regarding ReviewBoost products;</li>
        <li>prepare quotations;</li>
        <li>process inquiries or orders;</li>
        <li>provide customer support;</li>
        <li>maintain website security and functionality;</li>
        <li>comply with legal obligations;</li>
        <li>protect our legitimate interests.</li>
      </ul>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">4. Legal Basis</h2>
      <p>Depending on the circumstances, we may process personal data based on:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>your consent;</li>
        <li>steps taken at your request before entering into a contract;</li>
        <li>performance of a contract;</li>
        <li>compliance with legal obligations;</li>
        <li>our legitimate interests, where those interests do not override your fundamental rights and freedoms.</li>
      </ul>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">5. Service Providers</h2>
      <p>We may share personal data with service providers that help us operate our website and business, including:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>hosting and infrastructure providers;</li>
        <li>email and transactional messaging providers;</li>
        <li>IT and technical service providers.</li>
      </ul>
      <p>Such providers may process personal data only as necessary to provide their services and in accordance with applicable law.</p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">6. Resend</h2>
      <p>
        We may use Resend as an email delivery service for contact form inquiries.
      </p>
      <p>
        When you submit an inquiry, the information contained in that inquiry may be transmitted to Resend so that we can send and receive emails relating to your inquiry.
      </p>
      <p>
        For more information, please refer to Resend's privacy policy.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">7. Data Retention</h2>
      <p>
        We retain personal data only for as long as necessary for the relevant purpose or as required by applicable law.
      </p>
      <p>
        Inquiry data may be retained for as long as necessary to respond to the inquiry, maintain a business relationship, fulfill contractual obligations, or establish, exercise or defend legal claims.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">8. Your Rights</h2>
      <p>Under applicable data protection laws, you may have the right to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>receive information about how your data is processed;</li>
        <li>access your personal data;</li>
        <li>request correction of inaccurate data;</li>
        <li>request deletion of your data;</li>
        <li>request restriction of processing;</li>
        <li>object to certain processing;</li>
        <li>receive your data in a structured format where applicable;</li>
        <li>withdraw consent where processing is based on consent.</li>
      </ul>
      <p>These rights may be subject to legal limitations.</p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">9. Complaints</h2>
      <p>
        If you believe your personal data is being processed unlawfully, you may contact ReviewBoost first.
      </p>
      <p>
        You also have the right to lodge a complaint with the State Data Protection Inspectorate in Lithuania.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">10. Cookies</h2>
      <p>
        We may use cookies and similar technologies that are necessary for website functionality, security and usability.
      </p>
      <p>
        If we introduce analytics or marketing cookies that require consent under applicable law, we will request your consent before using them.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">11. Security</h2>
      <p>
        We implement appropriate technical and organizational measures designed to protect personal data against unauthorized access, loss, alteration or disclosure.
      </p>
      <p>
        However, no internet transmission or electronic storage method can be guaranteed to be completely secure.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our business, technology or legal requirements.
      </p>
      <p>
        The updated version will be published on this website.
      </p>

      <h2 className="text-h2 text-[var(--text-primary)] mt-10 mb-4">13. Contact</h2>
      <p>
        For questions regarding privacy or personal data processing:<br /><br />
        ReviewBoost<br />
        Email: reviewboostlt@gmail.com<br />
        Phone: +37067784788
      </p>
    </LegalPage>
  );
}
