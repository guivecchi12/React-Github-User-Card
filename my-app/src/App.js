import React from 'react';
import axios from "axios";
import "./App.css"


class App extends React.Component {
  state = {
    name: "",
    bio: "",
    followers: "",
    avatar: "",
    followersProfile: [],
    showing: false,
    user: "jakewmeyer"
  };

  componentDidMount(){
    console.log("component Mounted");
    axios 
      .get(`https://api.github.com/users/${this.user}`)
      .then(res =>{
        // console.log (res);
        const data = res.data;
        this.setState({name: data.name, bio: data.bio, followers: data.followers, avatar: data.avatar_url})
      } )
      .catch(err => {console.log(err, "error from axios call")});
  }

  fetchFollowers = () =>{
    axios
      .get(`https://api.github.com/users/${this.user}/followers`)
      .then(res=>{
        console.log("followers", res);
        this.setState({...this.state, followersProfile: res.data});
        })
      .catch(err => {console.log(err)});
    }
  
  addFollower = (e) =>{
    e.preventDefault();
    this.fetchFollowers();
    const follower = document.querySelector(".followers");
    const butt = document.querySelector("button");

    if(this.state.showing === true){
      this.setState({...this.state, showing: false});
      follower.classList.toggle("hide");
      butt.textContent = "See Followers";
      }
    else{
        this.setState({...this.state, showing: true});
        follower.classList.toggle("hide");
        butt.textContent = "Hide Followers";
      };
  };

  handleChanges = e => {
    this.setState({ ...this.state, user: e.target.value });
  };

  searchUser = e =>{
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.user}`)
      .then(res=>{
        const data = res.data;
        this.setState({...this.state, name: data.name, bio: data.bio, followers: data.followers, avatar: data.avatar_url})
      })
  }

  render(){
    console.log("render");
    return(
      <div className = "app">
        <div className= "header">
          <h1>GitHub</h1>
          <input
          type="text"
          name="user"
          value={this.state.user}
          onChange={this.handleChanges}
          />
          <button className="search" onClick={this.searchUser}>
            Search
          </button>
        </div>
        
        <div className="user">
          <h3>{this.state.name}</h3>
          <img width = "100" src={this.state.avatar} key={this.state.avatar} alt = "avatar" />
          <p className="title">About Me:</p>
          <p>{this.state.bio}</p>
          <p className="num"><span className="title">Number of followers: </span>{this.state.followers}</p>
      </div>
      <button onClick={this.addFollower}>
        See Followers
      </button>
        <div className="followers hide">
          {this.state.followersProfile.map(prof=>{
            return(
              <span className="follow">
                <h3>{prof.login}</h3>
                <img width = "100" src={prof.avatar_url} key={prof.avatar_url} alt = "avatar" />
              </span>
              );
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
