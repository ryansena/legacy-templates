import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_NIEC_2019.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NIEC 2019 certificate is rendered correctly", async t => {
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

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name ECH Cert 2019",
    "Diploma",
    "Early Childhood Development & Education",
    "Principal",
    "Council Chairman",
    "Ngee Ann Polytechnic",
    "Director",
    "National Institute of Early Childhood Development",
    "May 2019",
    "ECH190003"
  ]);

  // Navigate to Transcript tab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "PASS WITH MERIT",
    "0000003",
    "Student Name ECH Cert 2019",
    "S1234567A",
    "APRIL 2014",
    "EARLY CHILDHOOD EDUCATION",
    "MINDWORKS",
    "WORLD ISSUES: A SINGAPORE PERSPECTIVE",
    "Graduating GPA: 3.7835",
    "Professional Preparation Programme",
    "The student has completed the full-time course in Diploma in Early Childhood Development & Education",
    "REGISTRAR",
    "NATIONAL INSTITUTE OF EARLY CHILDHOOD DEVELOPMENT",
    "DIRECTOR, ACADEMIC AFFAIRS",
    "NGEE ANN POLYTECHNIC"
  ]);
});
