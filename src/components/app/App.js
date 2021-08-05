import React from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import spotify from '../util/spotify.js'

class app extends React.Component{

  constructor(props){
    super(props);
    
    this.state = {

        SearchResults:[],
        playlistName:'myplaylist',
        playlistTracks: [] 
      };
          this.addTrack = this.addTrack.bind(this)
          this.removeTrack = this.removeTrack.bind(this)
          this.updatePlaylistName = this.updatePlaylistName.bind(this)
          this.savePlaylist = this.savePlaylist.bind(this)
          this.search = this.search.bind(this)
  };

  addTrack(track){
          let tracks = this.state.playlistTracks;
          if(tracks.find(savedTrack => savedTrack.id === track.id)){
            return;
      };
      tracks.push(track)
      this.setState({playlistTracks: tracks}) 
  };

  removeTrack(track){
          let tracks = this.state.playlistTracks;
          tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
          this.setState({playlistTracks: tracks})
  };

  updatePlaylistName(name){
          this.setState({playlistName: name})
  }

  savePlaylist(){
          const trackUris = this.state.playlistTracks.map(track => track.uri)
          spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
            this.setState({
              playlistName: 'New Playlist',
              playlistTracks: []
            })
          })
  }

  search(term){
          spotify.search(term).then(SearchResults => {
            this.setState({SearchResults: SearchResults})
          })
  }



  render(){
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
            <SearchBar onSearch={this.search}/> 
        <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack}/> 
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks = {this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      /> 
        </div>
      </div>
    </div>
    )
  };
};


export default app

<div>