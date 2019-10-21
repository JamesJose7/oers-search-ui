import React from 'react';
import './App.css';
import $ from 'jquery';
import axios from "axios";
import {
    StateProvider,
    ReactiveBase,
    DataSearch,
    ReactiveList,
    ResultList,
    ToggleButton,
    DateRange,
    RangeSlider,
    DynamicRangeSlider,
    SelectedFilters,
    MultiList,
    TagCloud
} from '@appbaseio/reactivesearch';

const {ResultListWrapper} = ReactiveList;

class App extends React.Component {

    componentDidMount() {
        $('#filter-section-collapsible').on('hidden.bs.collapse', function () {
            $('#collapse-filters-button').html('Show filters<i class="fa fa-angle-down"></i>')

        })

        $('#filter-section-collapsible').on('show.bs.collapse', function () {
            $('#collapse-filters-button').html('Hide filters<i class="fa fa-angle-up"></i>')
        })
    }

    render() {
        async function updateViews(id) {
            const response = await axios.post(
                'https://eaeacc6124194914b83ee5a86cd54f03.us-east-1.aws.found.io:9243/oers/_update/' + id,
                {
                    script: {
                        source: "ctx._source.views += params.ttl",
                        lang: "painless",
                        params: {
                            ttl: 1
                        }
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + btoa('elastic:h9dVdzv8lTF3krFV7kSWFbQa')
                    }

                }
            )
        }

        return (
            <div className="App container-fluid">
                <ReactiveBase
                    app="oers"
                    // url="http://localhost:9200"
                    url="https://eaeacc6124194914b83ee5a86cd54f03.us-east-1.aws.found.io:9243"
                    credentials="elastic:h9dVdzv8lTF3krFV7kSWFbQa"
                    // analytics={true}
                >
                    <StateProvider
                        onChange={({ prevState, nextState }) => {
                            if (prevState !== nextState) {
                                window.ga('set', 'page', `/?state=${JSON.stringify(nextState)}`);
                                window.ga('send', 'pageview');
                            }
                        }}
                    />

                    <header className="row app-header">
                        <div className="app-title col-lg-3">
                            <a href="/"><h1>OERepository</h1></a>
                        </div>
                        <div className="search-container col-lg-9">
                            <DataSearch
                                componentId="SearchQuery"
                                dataField={['title', 'about']}
                                fieldWeights={[1, 3]}
                                placeholder="Search for OERs"
                                filterLabel="Search"
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
                                    and: ['CategoryFilter', 'SearchFilter', 'SearchResult', 'SubjectCloud'],
                                }}
                                showIcon={false}
                                URLParams={true}
                            />
                        </div>
                    </header>

                    <div className="row">
                        <button className="btn btn-link d-lg-none" type="button" data-toggle="collapse"
                                data-target="#filter-section-collapsible" aria-expanded="true"
                                aria-controls="filter-section-collapsible"
                                id="collapse-filters-button">
                            Hide filters<i className="fa fa-angle-up"></i>
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 filter-section collapse show" id="filter-section-collapsible">
                            <div>
                                <ToggleButton
                                    componentId="Language"
                                    dataField="language.keyword"
                                    data={[
                                        {label: 'English', value: 'English'},
                                        // { label: 'English', value: ' English' },
                                        {label: 'Spanish', value: ' Spanish'},
                                    ]}
                                    title="Language"
                                    multiSelect={true}
                                    showFilter={true}
                                    filterLabel="Language"
                                />
                                {/*<SingleList
                                componentId="Language"
                                dataField="language.keyword"
                                title="Language"
                                react={{
                                    "and": ["SearchQuery", "RangeSliderSensor", "YearRange", "DateRange", "Views"]
                                }}
                            />*/}
                            </div>

                            <div>
                                <DateRange
                                    title="Date picker"
                                    componentId="DateRange"
                                    dataField="date"
                                    filterLabel="Date range"/>
                            </div>

                            <div>
                                <MultiList
                                    componentId="Categories"
                                    dataField="materialType.keyword"
                                    title="Categories"
                                    react={{
                                        "and": ["SearchQuery", "RangeSliderSensor", "YearRange", "DateRange", "Views", "SubjectCloud"]
                                    }}
                                />
                            </div>

                            <div>
                                <DynamicRangeSlider
                                    title="Year"
                                    componentId="YearRange"
                                    filterLabel="Year"
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
                                        and: ['SearchQuery', 'SearchResult', 'SubjectCloud'],
                                    }}
                                    innerClass={{
                                        slider: 'filter-slider'
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

                            <div>
                                <RangeSlider
                                    componentId="Views"
                                    dataField="views"
                                    title="Views"
                                    range={{
                                        start: 0,
                                        end: 500,
                                    }}
                                    rangeLabels={{
                                        start: '0',
                                        end: '500',
                                    }}
                                    stepValue={1}
                                    showHistogram={true}
                                    showFilter={true}
                                    interval={5}
                                    react={{
                                        and: ['SearchQuery', 'SearchResult', 'SubjectCloud'],
                                    }}
                                    innerClass={{
                                        slider: 'filter-slider'
                                    }}
                                />
                            </div>

                            <div>
                                <TagCloud
                                    componentId="SubjectCloud"
                                    dataField="subject.keyword"
                                    title="Subjects"
                                    size={32}
                                    showCount={true}
                                    multiSelect={true}
                                    queryFormat="or"
                                    react={{
                                        and: ['RangeSliderSensor', 'YearRange', 'DateRange', 'Views', 'SearchQuery'],
                                    }}
                                    showFilter={true}
                                    filterLabel="Subject"
                                    loader="Loading ..."
                                />
                            </div>
                        </div>
                        <div className="col-lg-9 results-section">
                            <div id="selected-filters">
                                <SelectedFilters
                                    showClearAll={true}
                                    clearAllLabel="Clear filters"/>
                            </div>

                            <div>
                                <ReactiveList
                                    dataField="title"
                                    react={{
                                        "and": ["SearchQuery", "RangeSliderSensor", "YearRange", "Categories", "DateRange", "Views", "Language", "SubjectCloud"]
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
                                                        onClick={() => updateViews(item._id)}
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
                                                                className="result-item-description"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: !item.about ? "-- No description --" : item.about
                                                                }}
                                                            />
                                                            {/*<p>{item.about}</p>
                                                            <a href={item.uri}>Source</a>*/}
                                                            {/*</ResultList.Description>*/}
                                                            {/*<p>Views: {item.views}</p>*/}
                                                            {/*<a href={item.uri}>Source</a>*/}
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
}

export default App;
