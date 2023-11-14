import { Component } from 'react';
import './card-list.styles.css'
import './card.styles.css'

class CardList extends Component {
    render() {
        const { workers } = this.props;

        return (
            <div className="card-list">
                {workers.map((worker) => (
                    <div className="card-container" key={worker.id}>
                        <img alt={"worker " + worker.name} src={"https://robohash.org/" + worker.id + "?set=set4&size=180x180"}/>
                        <h2>{worker.name}</h2> 
                        <p>{worker.email}</p>
                    </div>
                )
                )}
            </div>
        )
    }
}

export default CardList;