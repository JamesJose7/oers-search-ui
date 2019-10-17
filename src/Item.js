import React from 'react'
import './App.css'

class Item extends React.Component {
    state = {
        query: '',
        isLoading: true,
        oer: {},
        error: null
    }

    fecthOer() {
        const {params} = this.props.match
        // Where we're fetching data from
        console.log(params.id)
        fetch('https://eaeacc6124194914b83ee5a86cd54f03.us-east-1.aws.found.io:9243/oers/_source/' + params.id, {
            headers: new Headers({
                'Authorization': 'Basic '+btoa('elastic:h9dVdzv8lTF3krFV7kSWFbQa'),
            }),
        })
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
                                        <li><b>Material: </b>{oer.materialType}</li>
                                        <li><b>Published on: </b>{oer.date}</li>
                                        <li><b>Views: </b>{oer.views}</li>
                                    </ul>
                                </div>
                                <div className="row oer-content">
                                    <img src={oer.imageLink}
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
                            // If there is a delay in data, let's let the user know it's loading
                        ) : (
                            <h3>Loading...</h3>
                        )}
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default Item
