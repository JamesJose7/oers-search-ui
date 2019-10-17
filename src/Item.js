import React from 'react'
import './Item.css'
import {DataSearch} from "@appbaseio/reactivesearch";

class Item extends React.Component {
    //

    state = {
        title: '',
        isLoading: true,
        oer: {},
        error: null
    }

    fecthOer() {
        const {params} = this.props.match
        // Where we're fetching data from
        console.log(params.id)
        fetch('http://localhost:9200/oers/_source/' + params.id)
        // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
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
        this.fecthOer()
    }

    handleChange(event) {
        this.setState({title: event.target.value})
    }

    handleSubmit(e) {
        // e.preventDefault()
        this.setState({title: '"' + this.state.title + '"'})
    }

    render() {
        const {isLoading, oer, error} = this.state

        return (
            <React.Fragment>
                <header className="row app-header">
                    <div className="app-title col-md-3">
                        <h1>OER Search Engine</h1>
                    </div>
                    <div className="col-md-9">
                        <form action="/" method="get" onSubmit={this.handleSubmit.bind(this)}>
                            <input type="text"
                                   className="search-bar"
                                   value={this.state.title}
                                   onChange={this.handleChange.bind(this)}
                                   placeholder="Search for OERs"
                                   name="SearchQuery" id="query"/>
                        </form>
                    </div>
                </header>
                <div>
                    {/*Display a message if we encounter an error*/}
                    {error ? <p>{error.message}</p> : null}

                    {/*// Here's our data check*/}
                    {!isLoading ? (
                        <div className="container">
                            <div className="row">
                                <h1 className="oer-title">{oer.title}</h1>
                            </div>

                            <div className="row">
                                <ul className="oer-details">
                                    <li>{oer.materialType}</li>
                                    <li>{oer.date}</li>
                                    <li>{oer.views}</li>
                                </ul>
                            </div>
                            <div className="row">
                                <img src={oer.imageLink}
                                     className="col-md-3 oer-image"
                                     alt={oer.title}/>
                                <p className="col-md-9 oer-description">
                                    {oer.about ? oer.about : "No description"}
                                </p>
                            </div>
                        </div>
                        // If there is a delay in data, let's let the user know it's loading
                    ) : (
                        <h3>Loading...</h3>
                    )}
                </div>
            </React.Fragment>

        )
    }
}

export default Item
