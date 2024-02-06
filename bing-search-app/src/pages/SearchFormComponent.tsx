import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import CustomSearchInput from "../components/SearchInput";

interface SearchFormData {
    query: string;
}

const SearchFormComponent: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
        defaultValues: {
            query: '',
        }
    });
    const [searchResults, setSearchResults] = React.useState([]);

    const onSubmit = async (data: SearchFormData) => {
        try {
            const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
                params: { q: data.query },
                headers: { 'Ocp-Apim-Subscription-Key': 'c5fc181b0fda4b0aa9f33a8dc8d5bb97' }
            });
            setSearchResults(response.data.webPages.value);
        } catch (error) {
            console.error('Failed to fetch search results', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                        <div className="d-flex align-items-center">
                            <Controller
                                name="query"
                                control={control}
                                rules={{required: 'A search query is required'}}
                                render={({field}) => <CustomSearchInput {...field}/>}
                            />
                            <button type="submit" className="btn btn-primary m-lg-2">Search</button>
                        </div>
                        {errors.query && <div className="text-danger mt-2">{errors.query.message}</div>}
                    </form>
                    {searchResults.length > 0 && (
                        <ul className="list-group mt-3">
                            {searchResults.map((result: any, index: number) => (
                                <li key={index} className="list-group-item">
                                    <a href={result.url} target="_blank" rel="noopener noreferrer">{result.name}</a>
                                    <p>{result.snippet}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};


export default SearchFormComponent;
