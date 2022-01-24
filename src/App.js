import './App.css'
import Banner from './components/Banner'
import FoundPosts from './components/FoundPosts'
import Button from "@mui/material/Button";
import MakePost from './components/MakePost'
import React, { useEffect, useState } from 'react';
import { useData } from './utilities/firebase.js';

const Title = {
  title: "WildcatFinder",
  subtitle: "Lost & Found",
  descriptionLine: "Reporting lost items today!"
}

const buttonStyle = {
  mx: 2,
  width: 1 / 14,
  bgcolor: "rgba(28,133,255,0.95)",
  borderRadius: 2,
  color: "rgb(255, 255, 255)",
  '&:hover': {
    bgcolor: "rgba(129,182,239,0.95)"
  }
}

function App() {
  const [itemsType, setItemsType] = useState("Found");
  const [makePost, setMakePost] = useState(false);
  const handleMakePost = () => setMakePost(true);
  const handlesMakePostClose = () => setMakePost(false);

  const [data, loadingData, errorData] = useData("/");

  useEffect(() => {
    if (data === undefined) return;
  }, [data])

  if (errorData) return <h1>{errorData}</h1>;
  if (loadingData) return <h1>Loading the data...</h1>;

  return (
    <div className="App">
      <Banner title={Title.title}
        subtitle={Title.subtitle}
        descriptionLine={Title.descriptionLine}
      />

      <div>
        <Button sx={buttonStyle}
          onClick={() => setItemsType("Lost")}> Lost </Button>
        <Button sx={buttonStyle}
          onClick={() => setItemsType("Found")}> Found </Button>
        <Button sx={buttonStyle}
          onClick={() => handleMakePost()}> Post </Button>
        <MakePost show={makePost} handleClose={handlesMakePostClose} posts={data} />
      </div>

      <FoundPosts posts={data} itemsType={itemsType} />
    </div>
  );
}

export default App;