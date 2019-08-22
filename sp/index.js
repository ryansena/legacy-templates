import dynamic from "template-utils/dynamic";
import addDirToTemplatePath from "template-utils/addDirToTemplatePath";
const SP2019MAIN = dynamic(() =>
  import("./SP-2019-MAIN")
);

const templates = {
  "SP-2019-MAIN": SP2019MAIN
};

export default addDirToTemplatePath("sp", templates);
