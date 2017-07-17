import React from 'react';

import Client from './xmppClient';

class RoomList extends React.Component {

                //       {/*<Link to={`/room/whitesands@conference.a2f62c74afbd`}>
                //   Whitesands
            //   </Link>*/}

    componentDidMount() {

        // TODO load the rooms from server... getDiscoItems?

        console.log('requesting mucs...')

        Client.getDiscoItems('conference.localhost','',function(err,res){console.log(res); console.log(err)})

    }

    render() {
        return (
        <div className="RoomList">
            <h3>Rooms</h3>
            { this.props.rooms ? (
                <div>
                    { this.props.rooms.map(room => (
                        <p>room</p>
                    ))}
                </div>



            ) : (
                <div>Loading...</div>
            )}
        </div>
        );
    }

}

export default RoomList;