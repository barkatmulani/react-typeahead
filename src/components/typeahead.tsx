import { useState } from "react";
import { ListGroup } from "react-bootstrap";

type Props = {
    list: string[];
    debounceTime?: number; // In milliseconds
    onChange?: (e: any) => void;
}

export default function Typeahead({ list, debounceTime = 1000, onChange}: Props) {
    const [ text, setText ] = useState<string>("");
    const [ items, setItems ] = useState<string[]>([]);
    
    const onInputChange = (e: any) => {
        const val = ("" + e.target.value).toLowerCase();
        const filtered = list.filter(x => x.toLowerCase().includes(val));
        setText(val)
        setItems(filtered);
        onChange && onChange(e.target.value);
    };

    const onItemClicked = (e: any) => {
        const val = e.target.innerText;
        console.log(val);
        setText(val);
    };
    
    const getHighlightedText = (str: string) => {
        const lower = str.toLowerCase();
        const index = lower.indexOf(text);
        const prefix = str.substring(0, index);
        const high = str.substring(index, index + text.length);
        const suffix = str.substring(index + text.length, lower.length);

        return (
            <>
                <span>{prefix}</span>
                <span className="font-bold">{high}</span>
                <span>{suffix}</span>
            </>
        );
    };

    return (
        <div className="w-fit">
            <input
                title="Input"
                type="text"
                value={text}
                className="border border-gray-800"
                onChange={onInputChange}
            />
            {!text || !items.length ? <></> :
            <ListGroup className="border border-gray-400 text-sm text-neutral-600 cursor-pointer p-1">
                {items.map((item: string, i: number) => {
                    return (
                        <ListGroup.Item
                            key={i}
                            className="hover:bg-neutral-100"
                            onClick={onItemClicked}
                        >
                            {getHighlightedText(item)}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            }
        </div>
    );
}