import './App.css'
import Banner from './components/Banner'
import FoundPosts from './components/FoundPosts'
import Button from "@mui/material/Button";
import MakePost from './components/MakePost'
import React, { useEffect, useState } from 'react';
import { useData } from './utilities/firebase';
import { SignInOut } from './components/LogInButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare} from '@fortawesome/free-solid-svg-icons'
import { signInWithGoogle, useUserState } from './utilities/firebase';
import { MyPosts } from'./components/MyPosts'

const Title = {
  title: "WildcatFinder",
  subtitle: "Lost & Found",
  descriptionLine: "Reporting lost items today!"
}

const buttonStyle = {
  width: 1,
  height: 1,
  bgcolor: "rgba(28,133,255,0.95)",
  borderRadius: 2,
  color: "rgb(255, 255, 255)",
  '&:hover': {
    bgcolor: "rgba(129,182,239,0.95)"
  },
  '&:focus': {
    bgcolor: "rgba(129,182,239,0.95)"
  },
}

function App() {
  const [user] = useUserState();
  const [itemsType, setItemsType] = useState("Found");
  const [makePost, setMakePost] = useState(false);
  const handleMakePost = () => setMakePost(true);
  const handlesMakePostClose = () => setMakePost(false);
  const [data, loadingData, errorData] = useData("/");
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (data === undefined) return;
     setPost(data);
  }, [data])

  if (errorData) return <h1>{errorData}</h1>;
  if (loadingData) return <h1>Loading the data...</h1>;

  return (
    <div className="App">
      <Banner title={Title.title}
        subtitle={Title.subtitle}
        descriptionLine={Title.descriptionLine}
      />
      <SignInOut />
      <MyPosts posts={data} setPost={setPost}/>
      
      <div className="FoundPosts">
        <FoundPosts posts={post} itemsType={itemsType} />
      </div>
      <div className="bottom-banner">
        <Button sx={buttonStyle}
          onClick={() => setItemsType("Lost")}> Lost </Button>
        <FontAwesomeIcon className="plus-icon" icon={faPlusSquare} color="white" size="3x" onClick={() => user === null ? signInWithGoogle() : handleMakePost()} />
        <Button sx={buttonStyle}
          onClick={() => setItemsType("Found")}> Found </Button>
        <MakePost show={makePost} handleClose={handlesMakePostClose} posts={post} />
      </div>

    </div>
  );
}

export default App;