import React from 'react'
import '../App/App.css'
import OersApi from '../elasticsearch/oersApi.js'

class Oer extends React.Component {
    state = {
        query: '',
        isLoading: true,
        oer: {},
        error: null
    }

    fetchOer() {
        const {params} = this.props.match
        // Get oer document based on ID
        OersApi
            .getDocument(params.id)
            // Retrieve the data from the response
            .then(response => response.data)
            // Update the state once it finishes
            .then(data =>
                this.setState({
                    oer: data,
                    isLoading: false,
                })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({error, isLoading: false}));
    }

    componentDidMount() {
        this.fetchOer()
    }

    handleChange(event) {
        this.setState({query: event.target.value})
    }

    handleSubmit(e) {
        // e.preventDefault()
        this.setState({query: '"' + this.state.query + '"'})
    }

    render() {
        const {isLoading, oer, error} = this.state

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <header className="row app-header">
                        <div className="app-title col-lg-3">
                            <a href="/"><h1>OERepository</h1></a>
                        </div>
                        <div className="search-container col-lg-9">
                            <form action="/" method="get" onSubmit={this.handleSubmit.bind(this)}>
                                <input type="text"
                                       className="search-bar"
                                       value={this.state.query}
                                       onChange={this.handleChange.bind(this)}
                                       placeholder="Search for OERs"
                                       name="SearchQuery" id="query"/>
                            </form>
                        </div>
                    </header>

                    <div>
                        {/*Display a message if an error occurs*/}
                        {error ? <p>{error.message}</p> : null}

                        {/* Display data once it's loaded */}
                        {!isLoading ? (
                            <div className="container">
                                <div className="row">
                                    <h1 className="oer-title">{oer.title}</h1>
                                </div>

                                <div className="row">
                                    <ul className="oer-details">
                                        <li><b>Material: </b>{oer.materialType}</li>
                                        <li><b>Published on: </b>{oer.date}</li>
                                        <li><b>Views: </b>{oer.views}</li>
                                    </ul>
                                </div>
                                <div className="row oer-content">
                                    <img src={oer.imageLink ? oer.imageLink : "https://via.placeholder.com/240x320/20639b/eeeeee?text=No%20cover"}
                                         className="col-md-3 oer-image"
                                         alt={oer.title}/>
                                    <div className="col-md-9">
                                        <p className="oer-description">
                                            {oer.about ? oer.about : "No description"}
                                        </p>
                                        <a href={oer.uri} className="btn btn-dark">Source</a>
                                    </div>
                                </div>
                            </div>
                            // If there is a delay in data, show the placeholder
                        ) : (
                            <PlaceholderOer/>
                        )}
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

function PlaceholderOer() {
    return (
        <div className="container container-placeholder">
            <div className="row">
                <h1 className="oer-title text line"></h1>
            </div>

            <div className="row">
                <ul className="oer-details oer-details-placeholder">
                    <li><div className="text"></div></li>
                    <li><div className="text"></div></li>
                    <li><div className="text"></div></li>
                </ul>
            </div>
            <div className="row oer-content">
                <div className="image col-md-3 oer-image">
                    <div className="embed-responsive embed-responsive-16by9"></div>
                </div>
                <div className="col-md-9">
                    <div className="text line"></div>
                    <div className="text line"></div>
                    <div className="text line"></div>
                    <div className="text"></div>
                    <br/>
                    <div className="text link">Source</div>
                </div>
            </div>
        </div>
    )
}

export default Oer
