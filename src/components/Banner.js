import './Banner.css'
  
const Banner = ({title, subtitle, descriptionLine}) => {
    return (
      <div className='Banner'>
        <img src="https://s2.loli.net/2022/01/10/XhDq1dtigxlfyrQ.png" 
             alt="AppIcon"
             style={{width: 60, height: 60, marginBottom: 20}}
        />
        <div className='App-title'>{title}</div>
        <div className='App-subtitle'>{subtitle}</div>
        <div className='App-description'>{descriptionLine}</div>
      </div>
    )
}

export default Banner