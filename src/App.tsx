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
			<h1 className="text-3xl font-bold">Typeahead Demo</h1>
			<h2 className="text-lg font-bold">Developed by Barkat Mulani</h2>

			<div className="w-64 mt-5">
				<Typeahead
					className="flex flex-col"
					label="Country"
					placeholder="Type any country name"
					list={MOCKDATA}
					onChange={onChange}
				/>

				<Form.Group className="mt-3 flex flex-col">
					<Form.Label>Selected Country</Form.Label>
					<Form.Control
						value={text}
						className="bg-neutral-100 border border-neutral-300"
						readOnly
					/>
				</Form.Group>
			</div>

			<h3 className="text-md font-bold mt-7 underline">Notes</h3>
			<p>- Up and down arrow keys can be used to select an item from the typeahead dropdown</p>
			<p>- Press Enter or Tab key, or a mouse-click to select an item</p>
		</div>
	);
}

export default App;
