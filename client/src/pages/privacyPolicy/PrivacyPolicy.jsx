import React from 'react'
import PrivacyPolicyContent from '../../components/auth/content/PrivacyPolicyContent'
import Brandner from '../../components/Brandner'

function PrivacyPolicy() {
    return (
        <div>
            
            <div>
                <Brandner title='นโยบายวามเป็นส่วนตัว' />
            </div>

            <div className='px-30 py-10'>
                <PrivacyPolicyContent />
            </div>
        </div>
    )
}

export default PrivacyPolicy