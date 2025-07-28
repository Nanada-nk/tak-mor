import React from 'react'
import TermsOfServiceContent from '../../components/auth/content/TermsOfServiceContent'
import Brandner from '../../components/Brandner'

function TermOfService() {
    return (
        <div>

            <div>
                <Brandner title='ข้อกำหนก และ เงื่อนไข'/>
            </div>

            <div className='px-30 py-10'>
                <TermsOfServiceContent />
            </div>
            
        </div>
    )
}

export default TermOfService