import dynamic from "template-utils/dynamic";
import addDirToTemplatePath from "template-utils/addDirToTemplatePath";
/* import dynamic from "next/dynamic"
import addDirToTemplatePath from "../../../addDirToTemplatePath"

const SP2019MAIN = dynamic( */
const SP2019MAIN = dynamic(() =>
  import("./SP-2019-MAIN" /* webpackChunkName: "SPTemplates" */)
);

const templates = {
  "SP-2019-MAIN": SP2019MAIN
};

export default addDirToTemplatePath("sp", templates);
