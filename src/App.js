import React from 'react';
import './App.css';
import {
    ReactiveBase,
    DataSearch,
    ReactiveList,
    ResultList,
    DateRange,
    DynamicRangeSlider,
    SelectedFilters,
    MultiList
} from '@appbaseio/reactivesearch';

const {ResultListWrapper} = ReactiveList;

function App() {
    return (
        <div className="App container-fluid">
            <ReactiveBase
                app="oers"
                /*url="http://localhost:9200"*/
                url="https://eaeacc6124194914b83ee5a86cd54f03.us-east-1.aws.found.io:9243"
                credentials="elastic:h9dVdzv8lTF3krFV7kSWFbQa"
            >
                <header className="row app-header">
                    <div className="app-title col-md-3">
                        <a href="/"><h1>OER Search Engine</h1></a>
                    </div>
                    <div className="search-container col-md-9">
                        <DataSearch
                            componentId="SearchQuery"
                            dataField={['title', 'about']}
                            fieldWeights={[1, 3]}
                            placeholder="Search for OERs"
                            autosuggest={false}
                            /*defaultSuggestions={[
                              { label: 'Songwriting', value: 'Songwriting' },
                              { label: 'Musicians', value: 'Musicians' },
                            ]}*/
                            highlight={true}
                            /*highlightField={['title', 'about']}*/
                            /*highlightField="title"*/
                            queryFormat="or"
                            fuzziness={0}
                            debounce={100}
                            react={{
                                and: ['CategoryFilter', 'SearchFilter', 'SearchResult'],
                            }}
                            showIcon={false}
                            URLParams={true}
                        />
                    </div>
                </header>

                <div className="row">
                    <div className="col-md-3 filter-section">
                        <div>
                            <DateRange
                                title="Date picker"
                                componentId="DateRange"
                                dataField="date"/>
                        </div>

                        <div>
                            <MultiList
                                componentId="Categories"
                                dataField="materialType.keyword"
                                title="Categories"
                                react={{
                                    "and": ["SearchQuery", "RangeSliderSensor", "YearRange", "DateRange"]
                                }}
                            />
                        </div>

                        <div>
                            <DynamicRangeSlider
                                title="Year"
                                componentId="YearRange"
                                dataField="year"
                                stepValue={1}
                                showHistogram={true}
                                showFilter={true}
                                interval={1}
                                rangeLabels={(min, max) => ({
                                    start: min + '',
                                    end: max + '',
                                })}
                                react={{
                                    and: ['SearchQuery', 'SearchResult'],
                                }}
                                /*renderTooltipData={data => (
                                    <h5 style={{
                                        color: 'red',
                                        textDecoration: 'underline'
                                    }}>
                                        {data}
                                    </h5>
                                )}*/
                            />
                        </div>
                    </div>
                    <div className="col-md-9 results-section">
                        <div id="selected-filters">
                            <SelectedFilters
                                showClearAll={true}
                                clearAllLabel="Clear filters"/>
                        </div>

                        <div>
                            <ReactiveList
                                dataField="title"
                                react={{
                                    "and": ["SearchQuery", "RangeSliderSensor", "YearRange", "Categories", "DateRange"]
                                }}
                                componentId="SearchResult"
                                scrollOnChange={false}
                            >
                                {({data, error, loading}) => (
                                    <ResultListWrapper>
                                        {
                                            data.map(item => (
                                                <ResultList
                                                    key={item._id}
                                                    href={"/oer/" + item._id}
                                                    className="result-item">
                                                    <ResultList.Image src={item.imageLink}/>
                                                    <ResultList.Content>
                                                        <ResultList.Title
                                                            className="result-item-title"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.title
                                                            }}
                                                        />
                                                        <ResultList.Description
                                                            dangerouslySetInnerHTML={{
                                                                __html: !item.about ? "-- No description --" : item.about
                                                            }}
                                                        />
                                                        {/*<p>{item.about}</p>
                                                            <a href={item.uri}>Source</a>*/}
                                                        {/*</ResultList.Description>*/}
                                                        <a href={item.uri}>Source</a>
                                                        {/*<p>Id: {item._id}</p>
                                                        <p>Id DB: {item.id}</p>*/}
                                                    </ResultList.Content>
                                                </ResultList>
                                            ))
                                        }
                                    </ResultListWrapper>
                                )}
                            </ReactiveList>
                        </div>
                    </div>
                </div>
            </ReactiveBase>
        </div>
    );
}

export default App;
