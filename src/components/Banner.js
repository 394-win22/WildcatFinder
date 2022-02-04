import './css/Banner.css'
import Grow from '@mui/material/Grow';

const Banner = ({title, subtitle, descriptionLine, isMobile}) => {

    return (
      <div className={isMobile ? 'BannerMobile' : 'BannerBrowser'}>
          <Grow in={true} {...({ timeout: 2000 })}>
              <div className={isMobile ? "logoMobile" : "logoBrowser"}>
                    <img src="http://www.sunimprint.com/images/Northwestern%20Wildcats%201981-Pres%20Partial%20Logo%20diy%20iron%20on%20transfer%202.png"
                       className="Image"
                       alt="AppIcon"
                       style={isMobile ? {width: 70, height: 60, marginBottom: 20} : {width: 120, height: 100}}/>
              </div>
          </Grow>
          <div className="details">
              <Grow in={true} {...({ timeout: 1000 })}><div className='App-title'>{title}</div></Grow>
              <Grow in={true} {...({ timeout: 1500 })}><div className='App-subtitle'>{subtitle}</div></Grow>
              <Grow in={true} {...({ timeout: 2000 })}><div className='App-description'>{descriptionLine}</div></Grow>
          </div>
      </div>
    )
}

export default Banner