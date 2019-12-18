import React from "react";
import {ReactiveList, ResultList} from "@appbaseio/reactivesearch";
import OersApi from "../elasticsearch/oersApi";

const {ResultListWrapper} = ReactiveList;

function OerResults() {

    return (
        <div>
            <ReactiveList
                dataField="title"
                react={{
                    "and": ["SearchQuery", "RangeSliderSensor", "YearRange", "Categories", "DateRange", "Views", "Language", "SubjectCloud", "ViewsRange"]
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
                                    onClick={() => OersApi.updateDocumentViews(item._id)}
                                    className="result-item">
                                    <ResultList.Image
                                        src={item.imageLink ? item.imageLink : "https://via.placeholder.com/240x320/20639b/eeeeee?text=No%20cover"}/>
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
    )
}

export default OerResults
