import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_PTD_MAIN_2019.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("PTD-MAIN 2019 certificate is rendered correctly", async t => {
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
    "Student Name PTD Main 2019",
    "Diploma with Merit",
    "Early Childhood Care & Education",
    "Principal",
    "Council Chairman",
    "May 2019",
    "DCET119M2001"
  ]);

  // Navigate to Transcript tab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "SUCCESSFULLY COMPLETED",
    "00002001",
    "Student Name PTD Main 2019",
    "S1234567A",
    "APRIL 2015",
    "DIPLOMA IN COMMUNITY GERONTOLOGY NURSING",
    "CERT IN INTRODUCTION TO EARLY CARE AND EDUCATION",
    "ANATOMY & PHYSIOLOGY 1",
    "CERT IN EARLY YEARS CURRICULUM",
    "PRACTICUM III",
    "DIPLOMA IN EARLY CHILDHOOD CARE & EDUCATION (TEACHING)",
    "CERT IN EARLY YEARS PROFESSIONAL PRACTICE",
    "PHARMACOLOGY 2.1",
    "allowed a transfer",
    "Graduating GPA: 2.8276",
    "The student has completed the course in DIPLOMA IN EARLY CHILDHOOD CARE & EDUCATION (TEACHING)",
    "CET ACADEMY"
  ]);
});
