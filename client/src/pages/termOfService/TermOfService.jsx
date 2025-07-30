import TermsOfServiceContent from '../../components/auth/content/TermsOfServiceContent.jsx'
import Brandner from '../../components/Brandner.jsx'

function TermOfService() {
    return (
        <div className='font-prompt'>

            <div>
                <Brandner title='ข้อกำหนด และเงื่อนไข'/>
            </div>

            <div className='px-30 py-10'>
                <TermsOfServiceContent />
            </div>
            
        </div>
    )
}

export default TermOfService