import React from 'react'
import './Tracklist.css'
import Track from '../Track/Track'

class Tracklist extends React.Component {
    render(){
        console.log(this.props)
        return (
            <div className="Tracklist">
                    {
                        this.props.tracks.map(track => {
                            return <Track track={track} key={track.id} onAdd={this.props.onAdd}/>
                        })
                    }
            </div>
            
        )
    }

}

export default Tracklist