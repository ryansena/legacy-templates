import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";
import { getData } from "@govtechsg/open-attestation";

fixture("Default Certificate Template").page`http://localhost:3000`;

const Certificate = "./DEFAULT_CERTIFICATE.opencert";
const BannerPrivacyFilter = Selector("#banner-privacy-filter");
const RenderedCertificate = Selector("#rendered-certificate");

test("Default certificate is rendered correctly", async t => {
  // Inject javascript and execute window.opencerts.renderDocument
  const certificateContent = getData(
    JSON.parse(readFileSync(join(__dirname, Certificate)).toString())
  );
  await t.eval(() => window.opencerts.renderDocument(certificateContent), {
    dependencies: { certificateContent }
  });

  // Privacy filter notice rendered
  await t.expect(BannerPrivacyFilter.visible).ok();
  await t
    .expect(BannerPrivacyFilter.textContent)
    .contains("OpenCerts Privacy Filter Enabled");

  // Certificate rendered
  await t.expect(RenderedCertificate.visible).ok();
  await t
    .expect(RenderedCertificate.textContent)
    .contains("Sample Certificate");
  await t
    .expect(RenderedCertificate.textContent)
    .contains("A_SAMPLE_CERTIFICATE");
  await t.expect(RenderedCertificate.textContent).contains("Issuer Info");
  await t.expect(RenderedCertificate.textContent).contains("Transcript");
});
