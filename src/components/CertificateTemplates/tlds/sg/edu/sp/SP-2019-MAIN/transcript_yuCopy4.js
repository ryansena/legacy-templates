import PropTypes from 'prop-types';
import { get } from 'lodash';

const renderHeader = p_Obj => {
  const serial = p_Obj.additionalData.studentid
  // also OK: get(p_Obj, "additionalData.studentid");
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

const renderFooter = p_Obj => (
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

      //<div className="col-2">{objOthItems && `oth:${xoth}`}</div>
const renderTermTranscript = (p_ObjTranscript) => {
  //var xs = get(p_ObjTranscript, 'name')
  var xs = p_ObjTranscript.Xname
  const objOthItems = get(p_ObjTranscript, 'otherItems');
  // ok: const xoth = get(p_ObjTranscript, 'otherItems[0].name');
  const dispOthItems = objOthItems ? objOthItems.map((objArr,i) => (
    <div className="h4 my-0 font-weight-bold d-flex justify-content-center" >
	Oth: {objArr.name } </div>
	)
) : "";

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
      {dispOthItems}
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