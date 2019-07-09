import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";
const RenderedCertificate = Selector("#rendered-certificate");
const TpLogo = Selector('img[title="Temasek Polytechnic"]');

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Part-time Post Diploma Certificate of Modular Courses is rendered correctly.", async t => {
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
    .eql([
      { id: "certificate", label: "Certificate", template: undefined },
      { id: "transcript", label: "Statement of Results", template: undefined }
    ]);

  await t.expect(TpLogo.exists).ok();

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "DUMMY MODULAR COURSE NAME",
    "Temasek Polytechnic",
    "Registrar"
  ]);

  // Navigate to next tab using window.opencerts.selectTemplateTab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "STATEMENT OF RESULTS",
    "DUMMY STUDENT NAME",
    "S0000000A",
    "1234567A",
    "DUMMY MODULAR COURSE NAME",
    "S001",
    "Dummy01 subject name",
    "Cumulative Grade Point Average",
    "5.00",
    "Certificate Awarded",
    "DUMMY MODULAR COURSE NAME",
    "WITH MERIT",
    "Grading System"
  ]);
});
