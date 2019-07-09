import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_PDP_SDCGN_2019.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("PDP-SDCGN 2019 certificate is rendered correctly", async t => {
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
    "Student Name PDP SDCGN 2019",
    "Specialist Diploma",
    "Community Gerontology Nursing",
    "Principal",
    "Council Chairman",
    "Ngee Ann Polytechnic",
    "Chief Executive Officer",
    "Tsao Foundation",
    "May 2019",
    "SDCGN19M3002"
  ]);

  // Navigate to Transcript tab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "SUCCESSFULLY COMPLETED",
    "0003002",
    "Student Name PDP SDCGN 2019",
    "S1234567A",
    "APRIL 2015",
    "SPECIALIST DIPLOMA IN COMMUNITY GERONTOLOGY NURSING",
    "PDC IN COMMUNITY GERONTOLOGY NURSING 1",
    "ANATOMY & PHYSIOLOGY 1",
    "PDC IN COMMUNITY GERONTOLOGY NURSING 2",
    "CLINICAL ATTACHMENT 1.1",
    "Graduating GPA: 2.8276",
    "The student has completed the course in SPECIALIST DIPLOMA IN COMMUNITY GERONTOLOGY NURSING",
    "CET ACADEMY"
  ]);
});
