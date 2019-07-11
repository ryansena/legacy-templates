import PropTypes from 'prop-types';
import { get } from 'lodash';

export const renderHeader = p_certificate => {
  const serial = get(p_certificate, "additionalData.studentid");
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
  )
}

export const renderFooter = p_Obj => (
  <div className="row">
    <div className="row">
      <div className="col" />
      <div className="col-4">
        <div style={{ color: "navy", fontWeight: 50 }}>
          signature here {get(p_Obj, "additionalData.studentid")}
        </div>
      </div>
      <div className="col-1" />
    </div>
  </div>
)

export const renderTermTranscript = (p_ObjTranscript) => {
	var xs = get(p_ObjTranscript, 'name');
  return (
  <div className="row">
  <div className="col-10">
    <div className="row">
      <div className="col">term: </div>
      <div clasName="col-9">{xs}</div>
    </div>
  
    <div className="row">
      <div className="col">course: </div>
      <div className="col-2">{get(p_ObjTranscript, 'course')}</div>
      <div className="col-2">oth:{get(p_ObjTranscript, 'otherItems[0].name')}</div>
      <div className="col-2">statement:{get(p_ObjTranscript, 'description')}</div>
    </div>
  </div></div>
  )
}
  

const Template = ({ certificate }) => {
  const renderTranscripts = get(certificate,'transcript').map((objArr,i) => (
    <div className="row">
      <div>for obj {i}<br/>
	  {renderTermTranscript(objArr)}
      </div>
    </div>
  ))

return (
<div className="container" style={{ fontSize: "0.9rem" }}>
  {renderHeader(certificate)}
  {renderTranscripts}

  {renderFooter(certificate)}
</div>
)
}

Template.propTypes = {
  certificate: PropTypes.object.isRequired
}
export default Template