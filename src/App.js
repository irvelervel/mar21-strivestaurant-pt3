import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavBar from './components/MyNavBar'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <MyNavBar title="Strivestaurant" />
      <Home />
    </div>
  )
}

export default App
