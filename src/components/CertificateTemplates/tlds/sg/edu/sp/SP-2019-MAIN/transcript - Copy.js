import PropTypes from 'prop-types';
import { get } from 'lodash';

export const renderHeader = certificate => {
  const serial = get(certificate, "additionalData.studentid");
  return (
    <div className="row">
      <div className="col-4">
        How i wish a Drink, alcoholic of course ...
      </div>
      <div className="col-4" />
      <div className="col-4">
        <div style={{ color: "navy", fontWeight: 500 }}>
          TRANSCRIPT OF ACADEMIC RECORD
        </div>
        <div className="mt-3">testing : {serial}</div>
      </div>
    </div>
  );
};

const Template = ({ certificate }) => (
<div className="container" style={{ fontSize: "0.9rem" }}>
  {renderHeader(certificate)}

</div>
)

Template.propTypes = {
  certificate: PropTypes.object.isRequired
}
export default Template