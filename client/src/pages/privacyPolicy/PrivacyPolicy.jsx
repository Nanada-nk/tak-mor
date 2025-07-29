import PrivacyPolicyContent from '../../components/auth/content/PrivacyPolicyContent.jsx'
import Brandner from '../../components/Brandner.jsx'

function PrivacyPolicy() {
    return (
        <div>
            
            <div>
                <Brandner title='นโยบายความเป็นส่วนตัว' />
            </div>

            <div className='px-30 py-10'>
                <PrivacyPolicyContent />
            </div>
        </div>
    )
}

export default PrivacyPolicy