import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { get } from 'lodash'
import backgroundImg from './resources'
import { IMG_LOGO_SP, IMG_CERTIFICATE_SEAL } from './images'

export const fullWidthStyle = {
  width: '100%',
  height: 'auto'
}

const Template = ({ certificate }) => (
  <div
    className="p-2"
    style={{
      //backgroundImage: `url('${backgroundImg}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      border: '10px solid #787878'
    }}
  >
    <div
      className="p-2"
      style={{
        border: '5px solid #787878'
      }}
    >
      <div className="my-5 m-lg-5 text-center">
        <img
          src={IMG_LOGO_SP}
          className="w-100"
          style={{ maxWidth: 600 }}
        />
      </div>
	  <div className="h1 mb-4 mb-lg-5 d-flex justify-content-center">
        <b>{certificate.additionalData.diplomaName}</b>
      </div>
	  <div className="h1 mb-4 mb-lg-5 d-flex justify-content-center">
        <b>{get(certificate, 'additionalData.diplomaAddOn[0]')}</b>
      </div>
	  <div className="h1 mb-4 mb-lg-5 d-flex justify-content-center">
        <b>{get(certificate, 'additionalData.diplomaAddOn[1]')}</b>
      </div>
      <div className="h5 mb-4 mb-lg-5 d-flex justify-content-center">
        <i>It is hereby certified that</i>
      </div>
      <div className="h3 mb-4 mb-lg-5 d-flex justify-content-center">
        <b>{certificate.recipient.name}</b>
      </div>
      <div className="h5 mb-4 mb-lg-5 d-flex justify-content-center">
        <i>having successfully completed the course of study was awarded the</i>
      </div>
      <div className="h5 mb-4 mb-lg-5 d-flex justify-content-center">
        <b>{certificate.additionalData.diplomaFullDescr}</b>
      </div>
      <div className="h5 mb-4 mb-lg-5 d-flex justify-content-center">
        <i>on {format(certificate.graduationDate, 'DD MMMM YYYY')}</i>
      </div>
      <div className="d-flex justify-content-between m-3 p-2 mb-5">
        <div className="col-1">
        <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
        </div>
		<div className="col-1" />
        <div className="col-5 my-5 text-center">
         <img className="w-100" src={get(certificate, 'additionalData.certSignatories[0].signature')} />
		 <hr className="m-1" />
         <div>
             {get(certificate, 'additionalData.certSignatories[0].signatory')}
         </div>
		</div>
        <div className="col-2" />
        <div className="col-4 text-center">
          <img className="w-100" src={get(certificate, 'additionalData.certSignatories[1].signature')} />
          <hr className="m-1" />
          <div>
             {get(certificate, 'additionalData.certSignatories[1].signatory')}
		  </div>
        </div>
		<div className="row d-flex justify-content-center">
    
  </div>
      </div>

      <div className="d-flex flex-row-reverse my-5">
        Dated {format(certificate.issuedOn, 'DD/MM/YYYY')}
      </div>
    </div>
  </div>
)

Template.propTypes = {
  certificate: PropTypes.object.isRequired
}
export default Template
