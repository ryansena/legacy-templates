import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import sp from "./sp";
import np from "./np";
import nyp from "./nyp";
import ite from "./ite";
import tp from "./tp";
import rp from "./rp";

export default addDirToTemplatePath("edu", {
  ...singaporetech,
  ...sp,
  ...np,
  ...nyp,
  ...ite,
  ...tp,
  ...rp
});
