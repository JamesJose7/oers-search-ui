import React from "react";
import {
    DataSearch,
    DateRange,
    DynamicRangeSlider,
    MultiList,
    MultiRange, RangeSlider, TagCloud,
    ToggleButton
} from "@appbaseio/reactivesearch";

export function SearchBar() {
    return (
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
                    onValueChange={value => {
                        window.ga('set', 'page', `/?query=${value}`);
                        window.ga('send', 'pageview');
                    }}
                />
            </div>
        </header>
    )
}

export function LanguageFilter() {
    return (
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
    )
}

export function DatePicker() {
    return (
        <div>
            <DateRange
                title="Date picker"
                componentId="DateRange"
                dataField="date"
                filterLabel="Date range"/>
        </div>
    )
}

export function ViewsRange() {
    return (
        <div>
            <MultiRange
                componentId="ViewsRange"
                dataField="views"
                data={[
                    { start: 0, end: 100, label: 'Less than 100' },
                    { start: 101, end: 200, label: 'Between 100 and 200' },
                    { start: 201, end: 300, label: 'Between 200 and 300' },
                    { start: 301, end: 400, label: 'Between 300 and 400' },
                    { start: 401, end: 500, label: 'More than 400' },
                ]}
                title="Views"
                filterLabel="Views"
            />
        </div>
    )
}

export function Categories() {
    return (
        <div>
            <MultiList
                componentId="Categories"
                dataField="materialType.keyword"
                title="Categories"
                react={{
                    "and": ["SearchQuery", "RangeSliderSensor", "YearRange", "DateRange", "Views", "SubjectCloud"]
                }}
                URLParams={true}
            />
        </div>
    )
}

export function YearSlider() {
    return (
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
    )
}

export function ViewsSlider() {
    return (
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
    )
}

export function SubjectWordCloud() {
    return (
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
    )
}
