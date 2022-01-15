import './App.css'
import Banner from './components/Banner'
import FoundPosts from './components/FoundPosts'
import ShowItem from './components/Item'
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

// lost: 0 , found: 1
// const items = {
// posts: {
//   0: {
//     "id": 1,
//     "item": "water bottle",
//     "location": "Tech LR3",
//     "img": "https://s2.loli.net/2022/01/10/PEd1Ls7ZqclvyNG.jpg",
//     "type": 1
//   },
//   1: {
//     "id": 2,
//     "item": "airpods",
//     "location": "University Hall",
//     "img": "https://s2.loli.net/2022/01/10/83CuWEsaK7MZfYn.jpg",
//     "type": 1
//   },
//   2: {
//     "id": 3,
//     "item": "car keys",
//     "location": "Mudd Library",
//     "img": "https://s2.loli.net/2022/01/10/lFUfXvHu8Lws3oO.jpg",
//     "type": 1
//   },
//   3: {
//     "id": 4,
//     "item": "tennis shoes",
//     "location": "Henry Crown Sports Pavilion",
//     "img": "https://s2.loli.net/2022/01/12/uc38gRPtJ6QahDI.png",
//     "type": 0
//   },
//   4: {
//     "id": 5,
//     "item": "hat",
//     "location": "Elder Dining Hall",
//     "img": "https://s2.loli.net/2022/01/12/uc38gRPtJ6QahDI.png",
//     "type": 0
//   }
//   }
// };


function App() {
  const [itemsType, setItemsType] = useState(1);
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
          onClick={() => setItemsType(0)}> Lost </Button>
        <Button sx={buttonStyle}
          onClick={() => setItemsType(1)}> Found </Button>
        <Button sx={buttonStyle}
          onClick={() => handleMakePost()}> Post </Button>
        <MakePost show={makePost} handleClose={handlesMakePostClose} posts={data} />
      </div>

      <FoundPosts posts={data} itemsType={itemsType} />
    </div>
  );
}

export default App;