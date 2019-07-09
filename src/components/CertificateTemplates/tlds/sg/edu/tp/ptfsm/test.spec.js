import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";
const RenderedCertificate = Selector("#rendered-certificate");
const TpLogo = Selector('img[title="Temasek Polytechnic"]');
const ScdfLogo = Selector('img[title="Singapore Civil Defence Force"]');

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Part-time Joint Certificate with SCDF is rendered correctly.", async t => {
  // Inject javascript and execute window.opencerts.renderDocument
  const certificateContent = getData(
    JSON.parse(readFileSync(join(__dirname, Certificate)).toString())
  );
  await t.eval(() => window.opencerts.renderDocument(certificateContent), {
    dependencies: { certificateContent }
  });

  // Check content of window.opencerts.templates
  await t.wait(500);
  const templates = await t.eval(() => window.opencerts.getTemplates());
  await t
    .expect(templates)
    .eql([{ id: "certificate", label: "Certificate", template: undefined }]);

  await t.expect(TpLogo.exists).ok();
  await t.expect(ScdfLogo.exists).ok();

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Accredited Training Institution Scheme",
    "Fire Safety Manager",
    "DUMMY STUDENT NAME",
    "Dummy Subject Certificate Name 1",
    "DUMMY COURSE NAME",
    "Director",
    "Civil Defence Academy",
    "Registrar",
    "Temasek Polytechnic"
  ]);
});
