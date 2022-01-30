import './Banner.css'
import Grow from '@mui/material/Grow';

const Banner = ({title, subtitle, descriptionLine}) => {

    return (
      <div className='Banner'>
          <Grow in={true} {...({ timeout: 500 })}>
              <img src="https://s2.loli.net/2022/01/10/XhDq1dtigxlfyrQ.png"
                 alt="AppIcon"
                 style={{width: 60, height: 60, marginBottom: 20}}/>
          </Grow>
          <Grow in={true} {...({ timeout: 1000 })}><div className='App-title'>{title}</div></Grow>
          <Grow in={true} {...({ timeout: 1500 })}><div className='App-subtitle'>{subtitle}</div></Grow>
          <Grow in={true} {...({ timeout: 2000 })}><div className='App-description'>{descriptionLine}</div></Grow>
      </div>
    )
}

export default Banner