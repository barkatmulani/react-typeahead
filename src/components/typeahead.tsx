import { useState } from "react";
import { ListGroup } from "react-bootstrap";

type Props = {
    list: string[];
    debounceTime?: number; // In milliseconds
    onChange?: (e: any) => void;
}

export default function Typeahead({ list, debounceTime = 1000, onChange}: Props) {
    const [ items, setItems ] = useState<string[]>([]);

    const onInputChange = (e: any) => {
        const filtered = list.filter(x => x.includes(e.target.value));
        setItems(filtered);
        onChange && onChange(e.target.value);
    };

    const onItemClicked = (e: any) => {
        console.log(e.target.innerText);
    };

    return (
        <div>
            <input title="Input" type="text" onChange={onInputChange} />
            <ListGroup>
                {items && items.map((item: string, i: number) =>
                    <ListGroup.Item key={i} onClick={onItemClicked}>
                        {item}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
}