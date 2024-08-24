type Props = {
    list: string[];
    debounceTime?: number; // In milliseconds
    onChange?: (e: any) => void;
}

export default function Typeahead({ list, debounceTime = 1000, onChange}: Props) {
    const onInputChange = (e: any) => {
        console.log(e.target.value);
        onChange && onChange(e.target.value);
    };

    return (
        <div>
            <input title="Input" type="text" onChange={onInputChange} />
        </div>
    )
}