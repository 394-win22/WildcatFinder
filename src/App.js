import './App.css'
import Banner from './components/Banner'
import FoundPosts from './components/FoundPosts'
import ShowItem from './components/Item'
import Post from './components/Post'

const Title = {
  title: "WildcatFinder",
  subtitle: "Lost & Found",
  descriptionLine: "Reporting lost items today!"
}

const found_items = {
  "posts": {
    'f1': {
      "id": 1,
      "item": "water bottle",
      "found_location": "Tech LR3",
      "img": "https://s2.loli.net/2022/01/10/PEd1Ls7ZqclvyNG.jpg"
    },
    'f2': {
      "id": 2,
      "item": "airpods",
      "found_location": "University Hall",
      "img":"https://s2.loli.net/2022/01/10/83CuWEsaK7MZfYn.jpg"
    },
    'f3': {
      "id": 3,
      "item": "car keys",
      "found_location": "Mudd Library",
      "img": "https://s2.loli.net/2022/01/10/lFUfXvHu8Lws3oO.jpg",
    }
  }
};

function App() {
  return (
    <div className="App">
      <Banner title={Title.title}
              subtitle={Title.subtitle}
              descriptionLine={Title.descriptionLine}
      />
      <FoundPosts posts={found_items.posts} />
      {/* <Post item={found_items.item} location={found_items.found_location} image={found_items.img}/> */}
    </div>
  );
}

export default App;
