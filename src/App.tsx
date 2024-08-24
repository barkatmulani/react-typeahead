import React, { useState } from 'react';
import Typeahead from './components/typeahead';
import { MOCK_DATA } from './data/mock';
import { Form } from 'react-bootstrap';

function App() {
	const MOCKDATA = MOCK_DATA.map(x => x.name);

	const [ text, setText ] = useState("");
	
	const onChange = (str: string) => {
		setText(str);
	};

	return (
		<div className="p-3">
			<Typeahead
				className="flex flex-col"
				label="Country"
				placeholder="Type any country name"
				list={MOCKDATA}
				onChange={onChange}
			/>

			<Form.Group className="mt-3 flex flex-col">
				<Form.Label>Selected Text</Form.Label>
				<Form.Control
					value={text}
					className="bg-neutral-100 border border-neutral-300"
					readOnly
				/>
			</Form.Group>
		</div>
	);
}

export default App;
