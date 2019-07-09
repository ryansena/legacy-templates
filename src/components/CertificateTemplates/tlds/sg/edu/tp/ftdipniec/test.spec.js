import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";
const RenderedCertificate = Selector("#rendered-certificate");
const NiecLogo = Selector(
  'img[title="National Institute of Early Childhood Development"]'
);

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Full-time NIEC Diploma is rendered correctly.", async t => {
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
      { id: "transcript", label: "Transcript", template: undefined }
    ]);

  await t.expect(NiecLogo.exists).ok();

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "DUMMY COURSE NAME",
    "WITH MERIT*",
    "by the National Institute of Early Childhood Development in collaboration",
    "with Temasek Polytechnic (Singapore) on",
    "Exempted from satisfying the full range of assessment objectives of the diploma",
    "Director",
    "National Institute of Early Childhood Development",
    "Principal",
    "Registrar"
  ]);

  // Navigate to next tab using window.opencerts.selectTemplateTab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "999",
    "Dummy street name 1",
    "Dummy street name 2",
    "Dummy street name 3",
    "01",
    "Singapore",
    "999999",
    "S0000000A",
    "1234567A",
    "DUMMY COURSE NAME",
    "Dummy course type",
    "credit units were granted based on the following exemptions",
    "S001",
    "Dummy01 exempted subject name",
    "5",
    "Exempted",
    "AY9998/9999",
    "Dummy0 Semester",
    "S001",
    "Dummy01 subject name",
    "Dummy23 subject name *",
    "Dummy24 subject name #",
    "Cumulative Grade Point Average Score: 5.00",
    "Awarded the DUMMY COURSE NAME",
    "WITH MERIT",
    "# The candidate was granted partial exemption from the assessment objectives of this subject.",
    "* The candidate was granted full exemption from the assessment objectives of this subject.",
    "Grading System",
    "DEAN, ACADEMIC & STUDENT MANAGEMENT",
    "NATIONAL INSTITUTE OF EARLY CHILDHOOD DEVELOPMENT",
    "for REGISTRAR"
  ]);
});
