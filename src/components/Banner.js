import './css/Banner.css'
import Grow from '@mui/material/Grow';

const Banner = ({title, subtitle, descriptionLine, isMobile}) => {

    return (
      <div className={isMobile ? 'BannerMobile' : 'BannerBrowser'}>
          <Grow in={true} {...({ timeout: 2000 })}>
              <div className={isMobile ? "logoMobile" : "logoBrowser"}>
                  <img src="https://s2.loli.net/2022/01/10/XhDq1dtigxlfyrQ.png"
                       className="Image"
                       alt="AppIcon"
                       style={isMobile ? {width: 60, height: 60, marginBottom: 20} : {width: 100, height: 100}}/>
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