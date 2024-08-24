import { useState } from "react";
import { ListGroup } from "react-bootstrap";

type Props = {
    list: string[];
    debounceTime?: number; // In milliseconds
    placeholder?: string;
    typeaheadClass?: string;
    onChange?: (e: any) => void;
}

export default function Typeahead({
        list,
        debounceTime = 1000,
        placeholder = "Type any text",
        typeaheadClass = "",
        onChange
    }: Props) {
    const [ text, setText ] = useState<string>("");
    const [ items, setItems ] = useState<string[]>([]);
    
    const onInputChange = (str: string) => {
        console.log(str);
        const val = str.toLowerCase();
        const filtered = list.filter(x => x.toLowerCase().includes(val));
        setText(str)
        setItems(filtered);
        onChange && onChange(str);
    };

    const onItemClicked = (item: string) => {
        setText(item);
        onInputChange(item);
    };
    
    const getHighlightedText = (str: string) => {
        const lower = str.toLowerCase();
        const index = lower.indexOf(text.toLowerCase());
        const prefix = str.substring(0, index);
        const high = str.substring(index, index + text.length);
        const suffix = str.substring(index + text.length, lower.length);
        console.log(prefix, high, suffix, index)

        return (
            <span data-value={str}>
                <span>{prefix}</span>
                <span className="font-bold">{high}</span>
                <span>{suffix}</span>
            </span>
        );
    };

    return (
        <div className="w-fit">
            <input
                title="Input"
                type="search"
                value={text}
                className={`border border-gray-800 px-1.5 py-1.5 text-sm ${typeaheadClass}`}
                placeholder={placeholder}
                onChange={(e) => onInputChange(e.target.value)}
            />
            {!text || !items.length ? <></> :
            <ListGroup className="border border-gray-400 text-sm text-neutral-600 cursor-pointer">
                {items.map((item: string, i: number) => {
                    return (
                        <ListGroup.Item
                            key={i}
                            className="hover:bg-neutral-100 p-1"
                            onClick={() => onItemClicked(item)}
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