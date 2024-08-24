import React from 'react';
import Typeahead from './components/typeahead';
import { MOCK_DATA } from './data/mock';

function App() {
  const MOCKDATA = MOCK_DATA.map(x => x.name);
  const onChange = (e: any) => {
    console.log(e);
  };

  return (
    <div className="App">
      <Typeahead list={MOCKDATA} onChange={onChange} />
    </div>
  );
}

export default App;
