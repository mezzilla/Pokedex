import './App.css';
import Table from './component/Table';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom'
import PokeInfo from './component/PokeInfo'
import backgroundImage from './pattern.png'
import Search from './component/Search';
import { useState } from 'react';

function App() {
  const [filter, setFilter] = useState('')
  var [reverse, setReverse] = useState(false)

  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <Router>
      <div className="App" style={{backgroundColor:'white'}}>
        <section className='bg-dark text-light p-1 mb-5' id='#'>
          <a href="#" style={{ color: 'white', hover: 'disable', textDecoration: 'none' }}><h1>Pokedex</h1></a>
        </section>

        <Routes>
          <Route exact path='/' element={
            <>
              <section>
                <div className="container bg-dark text-light col-lg-7  mb-4 "
                style={{boxShadow: '0px 0px 5px black'}}>
                  <div className="row items-align-center justify-content-center" >
                    <div className="input-group pl-4 py-2 mt-3 col-8 ">
                      <div class="input-group-prepend" style={{ height: '70%' }}>
                        <span class="input-group-text">Filter</span>
                      </div>
                      <textarea placeholder='Type...' class="form-control" aria-label="With textarea"
                        style={{ resize: 'none', height: '70%' }}
                        onChange={handleChange}>
                      </textarea>
                    </div>
                    <div className='col-1 py-2 mt-3'>
                      <button className='btn btn-light' onClick={() => (setReverse(!reverse))}>
                        Order
                      </button>
                    </div>

                  </div>
                </div>
              </section>
              <div className="container col-lg-7 bg-white px-0" style={{boxShadow: '0px 0px 5px black'}}>
                <Table filter={filter} reverse={reverse} />
              </div>
              <a href="#" className="p-1" style={{ position: 'fixed', top: '93%', right: '2%' }}>
                <i className="bi bi-arrow-up-circle text-dark h1"></i>
              </a>
            </>
          }
          >
          </Route>
          <Route exact path='/pokemon/:index/' element={<PokeInfo />}>
          </Route>
        </Routes >
      </div >
    </Router >
  );
}

export default App;
