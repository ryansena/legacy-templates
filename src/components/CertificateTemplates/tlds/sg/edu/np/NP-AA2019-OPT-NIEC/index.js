import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import NPCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: NPCert
  }
];

const NPAA2019OPTNIEC = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
    {...props}
  />
);

NPAA2019OPTNIEC.displayName = "NP-AA2019-OPT-NIEC Template";

export default NPAA2019OPTNIEC;
