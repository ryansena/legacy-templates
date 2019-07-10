import PropTypes from 'prop-types'
import SPCertificate from './certificate'
import SPTranscript from './transcript'
import { MultiCertificateRenderer } from '../../../../MultiCertificateRenderer'

const templates = [
  {
    id: 'certificate',
    label: 'Certificate',
    template: SPCertificate
  },
  {
    id: 'transcript',
    label: 'Tanscript',
    template: SPTranscript
  }
]

const addresses = [
  '0x9B12B5C3fdA927ba4e9E707e2BA0b8405cAFB394'
]

const SP2019MAIN = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={addresses}
  />
)

SP2019MAIN.propTypes = {
  certificate: PropTypes.object.isRequired
}

export default SP2019MAIN
