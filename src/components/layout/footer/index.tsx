import { socialMediaAcc } from '../../../utils/socialMediaAccounts'
import ButtonWithLink from '../../button/buttonWithLink'

const Footer = () => {
  return (
    <div className='container pb-5 d-flex flex-column align-items-center justify-content-center gap-3 p-4'>
      <div className="d-flex align-items-center gap-3 mb-4 justify-content-evenly">
        {socialMediaAcc.map(({ id, link, icon }) => (
          <ButtonWithLink id={id} link={link} icon={icon} />
        ))}
      </div>
      <h6 className='fw-medium fs-6 mb-0'>Example@email.com</h6>
      <h6 className='fw-medium fs-6'>Copyright © 2020 Name. All rights reserved.</h6>
    </div>
  )
}

export default Footer