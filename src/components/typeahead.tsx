import { useState } from "react";
import { ListGroup } from "react-bootstrap";

type Props = {
    list: string[];
    limit?: number;
    label?: string;
    debounceTime?: number; // In milliseconds
    placeholder?: string;
    labelClass?: string;
    typeaheadClass?: string;
    onChange?: (e: any) => void;
}

export default function Typeahead({
        list,
        limit = 20,
        label = "",
        debounceTime = 1000,
        placeholder = "Type any text",
        labelClass = "",
        typeaheadClass = "",
        onChange
    }: Props) {
    const [ text, setText ] = useState<string>("");
    const [ items, setItems ] = useState<string[]>([]);
    const [ highlightedIndex, setHighlightedIndex ] = useState(-1);
    
    const onInputChange = (str: string) => {
        if (str.length) {
            const val = str.toLowerCase();
            const filtered = list.filter(x => x.toLowerCase().includes(val)).slice(0, limit);
            setText(str)
            setItems(filtered);
            onChange && onChange(str);
        }
        else {
            setText("");
            setItems([]);
            onChange && onChange("");
        }
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

    const trySetHighlightedIndex = (index: number) => {
        if (index >= -1 && index < items.length) {
            setHighlightedIndex(index);
            setText(items[index]);
        }
    };

    const onKeyDown = (e: any) => {
        console.log(e.key)
        let item = "";

        if (items.length) {
            switch (e.key) {
                case "Tab":
                    item = items[0];
                    setText(item);
                    onInputChange(item);
                    setItems([]);
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    trySetHighlightedIndex(highlightedIndex + 1);
                    break;
                case "ArrowUp":
                    trySetHighlightedIndex(highlightedIndex - 1);
                    break;
                case "Enter":
                    item = items[highlightedIndex];
                    setText(item);
                    onInputChange(item);
                    setItems([]);
                    e.preventDefault();
                    break;
            }
        }
    };

    const mouseEnter = (index: number) => {
        trySetHighlightedIndex(index);
    };

    const mouseLeave = (index: number) => {
        trySetHighlightedIndex(-1);
    }

    return (
        <div className="w-fit">
            <label className={labelClass}>{label}</label>
            <input
                title="Input"
                type="search"
                value={text}
                className={`border border-gray-500 ml-2 rounded-sm px-1.5 py-1.5 text-sm ${typeaheadClass}`}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                onChange={(e) => onInputChange(e.target.value)}
            />
            {!text || !items.length ? <></> :
            <ListGroup className="border border-gray-400 text-sm text-neutral-600 cursor-pointer">
                {items.map((item: string, i: number) => {
                    return (
                        <ListGroup.Item
                            key={i}
                            className={`p-1 ${highlightedIndex === i ? "bg-neutral-100" : ""}`}
                            onMouseEnter={() => mouseEnter(i)}
                            onMouseLeave={() => mouseLeave(i)}
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