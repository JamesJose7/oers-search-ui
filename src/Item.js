import React from 'react'
class Item extends React.Component {
    state = {
        oer: {}
    }
    componentDidMount() {
        const { params } = this.props.match
        fetch('http://localhost:9200/oers/_source/' + params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ oer: data })
            })
            .catch(console.log)
    }
    render() {
        const { params } = this.props.match
        const { data } = this.state.oer
        console.log(this.state.oer)
        return (
            <div className="container">
                <h1>{data.title}</h1>
                <p>{data.about}</p>
            </div>
        )
    }
}
export default Item
