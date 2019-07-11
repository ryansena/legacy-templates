import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { get } from 'lodash'
import { IMG_CERT_SPLOGO, IMG_CERT_SEAL, IMG_CERT_SIGN_BC, IMG_CERT_SIGN_SWW } from './Certimages'

export const dispRow = (pstringItem) => (
  <div className="h2 my-0 font-weight-bold d-flex justify-content-center"
	style={{fontFamily:'Times', fontVariant:'small-caps'}} >
	{pstringItem} </div>
);

const Template = ({ certificate }) => (
<div className="container" style={{width:'800px', height:'1131px', backgroundColor:'rgb(255,255,238)', borderStyle:'solid', borderColor:'rgb(204,204,170)'}}>
  <div className="row">
    <div className="col"></div>
    <div className="col my-5 justify-content-center"><img src={IMG_CERT_SPLOGO} width='396' height='128'/></div>
    <div className="col"></div>
  </div>

  <div className="h2 mt-5 mb-0 font-weight-bold d-flex justify-content-center"
    style={{fontFamily:'Times', fontVariant:'small-caps'}} >
    {certificate.additionalData.diplomaName} </div>
  { dispRow (get(certificate, 'additionalData.diplomaAddOn.length')) }
  { dispRow (get(certificate, 'additionalData.diplomaAddOn[1]')) }
  { dispRow ("additionalData.diplomaAddOn[1]") }

  <div className="h5 mt-4 d-flex justify-content-center"
    style={{fontFamily:'Times'}}>
    It is hereby certified that</div>
  <div className="h3 mt-4 mb-0 justify-content-center font-weight-bold font-italic d-flex"
	style={{fontFamily:'Garamond'}} >
	{certificate.recipient.name} </div>

  <div className="row my-0"><div className="col"></div>
    <div className="col-9" style={{borderBottomWidth:'1px', borderTopWidth:'0px', borderStyle:'solid', borderColor:'#333'}} ></div>
    <div className="col"></div></div>
  <div className="h5 mt-4 d-flex justify-content-center"
	style={{fontFamily:'Times'}} >
    having successfully completed the course of study was awarded the</div>
  <div className="h5 mt-3 d-flex justify-content-center"
	style={{fontFamily:'Times'}} >
    {certificate.additionalData.diplomaFullDescr} </div>
  <div className="row my-0">
    <div className="col"></div>
    <div className="col-1 h5 mt-4 d-flex justify-content-center"
	style={{fontFamily:'Times'}} > on </div>
    <div className="col-3">
	  <div className="h4 mt-1 d-flex justify-content-center font-weight-bold font-italic"
		style={{fontFamily:'Garamond'}} >
		{format(certificate.graduationDate, 'DD MMMM YYYY')} </div>
	  <div className="row my-0">
        <div className="col" style={{borderBottomWidth:'1px', borderTopWidth:'0px', borderStyle:'solid', borderColor:'#333'}} ></div>
        
	  </div>
	</div>
	<div className="col"></div>
  </div>
 
  <div className="row" style={{height:'100px'}} ></div>
  <div className="row">
	<div className="col-2"></div>
    <div className="col-3 mt-5"><img src={IMG_CERT_SEAL} style={{width:'168px'}} /></div>
	<div className="col-2"></div>
    <div className="col-4">
	    <div className="ml-5"><img src={get(certificate, 'additionalData.certSignatories[1].signature')} style={{width:'160px'}} /></div>
		<div style={{borderBottomWidth:'1px', borderTopWidth:'0px', borderStyle:'solid', borderColor:'#333'}} ></div>
        <div className="text-center font-weight-bold"
		style={{fontFamily:'Times', fontSize:'12px'}} > Chairman, Board of Governors </div>

		<div className="row" style={{height:'20px'}} ></div>

        <div className="ml-5"><img src={get(certificate, 'additionalData.certSignatories[0].signature')} style={{width:'120px'}} /></div>
		<div style={{borderBottomWidth:'1px', borderTopWidth:'0px', borderStyle:'solid', borderColor:'#333'}} ></div>
        <div className="text-center font-weight-bold"
		style={{fontFamily:'Times', fontSize:'12px'}} > Principal &amp; </div>
        <div className="text-center font-weight-bold"
		style={{fontFamily:'Times', fontSize:'12px'}} > Chief Executive Officer </div>

    </div>
	<div className="col-1"></div>
  </div>

</div>
)

Template.propTypes = {
  certificate: PropTypes.object.isRequired
}
export default Template