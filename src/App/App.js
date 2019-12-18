import React from 'react';
import './App.css';
import $ from 'jquery';
import {
    ELASTIC_URL,
    ELASTIC_CREDENTIALS,
} from '../elasticsearch/oersApi'
import {
    StateProvider,
    ReactiveBase,
    SelectedFilters,
} from '@appbaseio/reactivesearch';
import {
    SearchBar,
    LanguageFilter,
    DatePicker,
    ViewsRange,
    Categories,
    YearSlider,
    ViewsSlider,
    SubjectWordCloud
} from '../realtime_search/Filters'
import OerResults from "../realtime_search/OerResults";

class App extends React.Component {

    componentDidMount() {
        // Toggle text and button when hiding or showing filters on mobile
        this.toggleHideFilterButtonText();

        // Bind function to close keyboard to search bar on mobile devices once the enter key is pressed
        function closeMobileKeyboardAndFilters() {
            $("input").blur()
            let collapseButton = $("#collapse-filters-button")
            if (!collapseButton.hasClass("collapsed") && collapseButton.is(':visible')) {
                collapseButton.click()
            }
        }
        $('.search-container input').on('keyup', function (e) {
            if (e.keyCode === 13) {
                closeMobileKeyboardAndFilters()
            }
        });
    }

    toggleHideFilterButtonText() {
        $('#filter-section-collapsible').on('hidden.bs.collapse', function () {
            $('#collapse-filters-button').html('Show filters<i class="fa fa-angle-down"></i>')

        })
        $('#filter-section-collapsible').on('show.bs.collapse', function () {
            $('#collapse-filters-button').html('Hide filters<i class="fa fa-angle-up"></i>')
        })
    }

    render() {
        return (
            <div className="App container-fluid">
                <ReactiveBase
                    app="oers"
                    url={ELASTIC_URL}
                    credentials={ELASTIC_CREDENTIALS}
                    // analytics={true}
                >
                    <StateProvider
                        // render={({ searchState }) => <div>Search State: ${JSON.stringify(searchState)}</div>}
                        onChange={(prevState, nextState) => {
                            if (prevState !== nextState) {
                                window.ga('set', 'page', `/?state=${JSON.stringify(nextState)}`);
                                window.ga('send', 'pageview');
                                /*console.log('Old State', prevState);
                                console.log('New State', nextState);*/
                            }
                        }}
                    />

                    <SearchBar/>

                    {/* Hide realtime_search menu for mobile */}
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
                            <LanguageFilter/>
                            <DatePicker/>
                            <ViewsRange/>
                            <Categories/>
                            <YearSlider/>
                            <ViewsSlider/>
                            <SubjectWordCloud/>
                        </div>
                        <div className="col-lg-9 results-section">
                            <div id="selected-filters">
                                <SelectedFilters
                                    showClearAll={true}
                                    clearAllLabel="Clear filters"/>
                            </div>

                            <OerResults/>
                        </div>
                    </div>
                </ReactiveBase>
            </div>
        );
    }
}

export default App;
