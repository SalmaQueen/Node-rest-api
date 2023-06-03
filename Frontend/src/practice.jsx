var Users = React.createClass({
    getInitialState: function(){
        return({
            ninjas: []
        });
    },
    render: function(){
        var ninjas = this.state.ninjas;
        ninjas = ninjas.map(function(user, index){
            return(
                <li key={index}>
                    <span className={user.obj.available}></span>
                    <span className="name">{user.obj.name}</span>
                    <span className="rank">{user.obj.rank}</span>
                    <span className="dist">{Math.floor(user.dis / 1000)} km</span>
                </li>
            );
        });
        return(
            <div id="user-container">
                <form id="search" onSubmit={this.handleSubmit}>
                    <label>Enter your Latitude:</label>
                    <input type="text" ref="lat" placeholder="latitude" required />
                    <label>Enter your Longitude:</label>
                    <input type="text" ref="lng" placeholder="longitude" required />
                    <input type="submit" value="Find Users" />
                </form>
                <ul>{ninjas}</ul>
            </div>
        );
    },
    handleSubmit: function(e){
        e.preventDefault();
        var lng = this.refs.lng.value;
        var lat = this.refs.lat.value;

        fetch('/api/ninjas?lng=' + lng + '&lat=' + lat).then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                ninjas: json
            });
            console.log(json);
        });
    }
});