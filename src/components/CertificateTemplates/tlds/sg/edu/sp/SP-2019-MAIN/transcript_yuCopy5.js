import PropTypes from 'prop-types';
import { format } from 'date-fns'
import { get } from 'lodash';

const renderHeader = p_Cert => {
  //const serial = p_Cert.additionalData.studentid
  // also OK: get(p_Cert, "additionalData.studentid");
  return (
  <div className="block">
  {/*<div className="row">
      <div className="col" />
      <div className="col-10 h3 font-weight-bold d-flex justify-content-center"
        style={{fontFamily:'Times' }}>
          ACADEMIC TRANSCRIPT
        </div>
      <div className="col" />
  </div>*/ }
    <div className="row">
      <div className="col" />
      <div className="col-10 h3 font-weight-bold text-lg-center">
          ACADEMIC TRANSCRIPT
        </div>
      <div className="col" />
    </div>
    <div className="row h5">
	  <div className="col-2 ml-0"> National No: </div>
	  <div className="col-5"> {p_Cert.recipient.nric} </div>
	  <div className="col text-lg-right">
        Date of Issue: &nbsp; {format(p_Cert.issuedOn, 'DD MMM YYYY')} </div>
	</div>
    <div className="row h5">
      <div className="col-2"> Admission No: </div>
	  <div className="col"> {p_Cert.additionalData.studentid} </div>
	</div>
    <div className="row h5">
      <div className="col-2"> Name: </div>
	  <div className="col"> {p_Cert.recipient.name} </div>
	</div>
  </div>
  )
}

const renderFooter = p_Obj => (
  <div className="row">
    <div className="col-1" />
    <div className="col-10">
      <div style={{ color: "navy", fontWeight: 50 }}>
        signature here {get(p_Obj, "additionalData.studentid")}
      </div>
    </div>
    <div className="col-1" />
  </div>
)

      //<div className="col-2">{objOthItems && `oth:${xoth}`}</div>
const renderTermTranscript = (p_ObjTranscript) => {
  var xs = get(p_ObjTranscript, 'name')
  //ok: var xs = p_ObjTranscript.Xname
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
<div className="container" style={{fontFamily:'Times', fontSize: "1.0rem", borderStyle:'solid', borderColor:'rgb(204,204,170)' }}>
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