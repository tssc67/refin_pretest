import axios from 'axios';
import * as React from 'react';
import { render } from 'react-dom';
import spinning from './img/tail-spin.svg';
let lastStroke = +new Date();
let debounceHandler: number;
export const App: React.FunctionComponent = (_) => {
    const [searchString, setSearchString] = React.useState('');
    const [results, setResults] = React.useState<string[]>([]);
    const [querying, setQuerying] = React.useState(false);
    function query() {
        window.clearTimeout(debounceHandler);
        debounceHandler = window.setTimeout(async () => {
            setQuerying(true);
            const {data: categories} = await axios.get(`https://api.publicapis.org/categories`);
            setResults(categories);
            setQuerying(false);
        }, 200);
    }
    const filterResults = results.filter((r) => {
        return r.toLowerCase().includes(searchString.toLowerCase());
    });
    React.useEffect(() => {
        query();
    }, []);
    function renderResult() {
        if(querying) {
            return <img src={spinning}/>
        }
        if(filterResults.length === 0) {
            return 'No search result.';
        }
        return <div>
            {filterResults.map((row) => <div className='row' key={row}>{row}</div>)}
        </div>
    }
    return <div id='container'>
        <h1>Category filter</h1>
        <input id='search' type='text' value={searchString} onChange={(e) => {setSearchString(e.target.value); query()}} placeholder='Please input your category'/>
        <div id="result">
            {renderResult()}
        </div>
    </div>;
};