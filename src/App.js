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
        <div className="App">
            <ReactiveBase
                app="oers"
                url="http://localhost:9200"
            >
                <header className="row app-header">
                    <div className="app-title col-md-3">
                        <h1>OER Search Engine</h1>
                    </div>
                    <div className="search-container col-md-9">
                        <DataSearch
                            componentId="SearchSensor"
                            dataField={['title', 'about']}
                            fieldWeights={[1, 3]}
                            placeholder="Search for Oers"
                            autosuggest={false}
                            /*defaultSuggestions={[
                              { label: 'Songwriting', value: 'Songwriting' },
                              { label: 'Musicians', value: 'Musicians' },
                            ]}*/
                            highlight={true}
                            /*highlightField={['title', 'about']}*/
                            highlightField="title"
                            queryFormat="or"
                            fuzziness={0}
                            debounce={100}
                            react={{
                                and: ['CategoryFilter', 'SearchFilter', 'SearchResult'],
                            }}
                            showIcon={false}
                        />
                    </div>
                </header>

                <div className="row">
                    <div className="col-md-3 filter-section">
                        <div>
                            <DateRange
                                componentId="DateSensor" dataField="mtime"/>
                        </div>

                        <div>
                            <MultiList
                                componentId="FacetFilter"
                                dataField="title.keyword"
                                title="Type" />
                        </div>

                        <div>
                            <DynamicRangeSlider
                                componentId="DynamicRangeSensor"
                                dataField="id"
                                stepValue={1}
                                showHistogram={true}
                                showFilter={true}
                                interval={2}
                                rangeLabels={(min, max) => ({
                                    start: min + ' id',
                                    end: max + ' id',
                                })}
                                react={{
                                    and: ['SearchSensor', 'SearchResult'],
                                }}
                                renderTooltipData={data => (
                                    <h5 style={{
                                        color: 'red',
                                        textDecoration: 'underline'
                                    }}>
                                        {data}
                                    </h5>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-md-9 results-section">
                        <div>
                            <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />
                        </div>

                        <div>
                            <ReactiveList
                                react={{
                                    "and": ["SearchSensor", "RangeSliderSensor", "DynamicRangeSensor", "FacetFilter"]
                                }}
                                componentId="SearchResult"
                            >
                                {({data, error, loading}) => (
                                    <ResultListWrapper>
                                        {
                                            data.map(item => (
                                                <ResultList key={item._id}>
                                                    <ResultList.Image src={item.imageLink}/>
                                                    <ResultList.Content>
                                                        <ResultList.Title
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.title
                                                            }}
                                                        />
                                                        <ResultList.Description>
                                                            <p>{item.about}</p>
                                                        </ResultList.Description>
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
