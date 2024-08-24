import { useState } from "react";

type Props = {
    list: string[];
    className?: string;
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
        className = "",
        limit = 15,
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
    
    const filterItems = (str: string) => {
        if (str?.length) {
            const val = str.toLowerCase();
            const filtered = list.filter(x => x.toLowerCase().includes(val)).slice(0, limit);
            setText(str)
            setItems(filtered);
            setHighlightedIndex(0);
        }
        else {
            setText("");
            setItems([]);
            setHighlightedIndex(-1);
        }
    };

    const onItemClicked = (item: string) => {
        setText(item);
        setItems([]);
        onChange && onChange(item);
    };
    
    const getHighlightedItem = (str: string) => {
        const lower = str.toLowerCase();
        const index = lower.indexOf(text.toLowerCase());
        const prefix = str.substring(0, index);
        const high = str.substring(index, index + text.length);
        const suffix = str.substring(index + text.length, lower.length);

        return (
            <span data-value={str}>
                <span>{prefix}</span>
                <span className="font-bold">{high}</span>
                <span>{suffix}</span>
            </span>
        );
    };

    const trySetHighlightedIndex = (index: number) => {
        if (index >= 0 && index < items.length) {
            setHighlightedIndex(index);
            setText(items[index]);
        }
    };

    const onKeyDown = (e: any) => {
        let item = "";

        if (items.length) {
            switch (e.key) {
                case "Enter":
                case "Tab":
                    item = items[highlightedIndex];
                    setText(item);
                    filterItems(item);
                    setItems([]);
                    e.preventDefault();
                    onChange && onChange(item);
                    break;
                case "ArrowDown":
                    trySetHighlightedIndex(highlightedIndex + 1);
                    break;
                case "ArrowUp":
                    trySetHighlightedIndex(highlightedIndex - 1);
                    break;
            }
        }
    };

    return (
        <div className={className}>
            <label className={labelClass}>{label}</label>
            
            <input
                title="Input"
                type="search"
                value={text}
                className={`border border-gray-500 rounded-sm px-1.5 py-1.5 text-sm ${typeaheadClass}`}
                placeholder={placeholder}
                onChange={(e: any) => filterItems(e.target.value)}
                onKeyDown={onKeyDown}
            />
            {!text || !items.length ? <></> :
            <div className="relative">
                <div className="border border-gray-400 text-sm text-neutral-600 cursor-pointer absolute z-10 bg-white">
                    {items.map((item: string, i: number) => {
                        return (
                            <div
                                key={i}
                                className={`p-1 ${highlightedIndex === i ? "bg-neutral-100" : ""}`}
                                onMouseEnter={() => setHighlightedIndex(i)}
                                onMouseLeave={() => setHighlightedIndex(-1)}
                                onClick={() => onItemClicked(item)}
                            >
                                {getHighlightedItem(item)}
                            </div>
                        )
                    })}
                </div>
            </div>
            }
        </div>
    );
}