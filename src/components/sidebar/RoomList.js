import React from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom';

import { getBookmarks } from '../../ducks/bookmarks';

class RoomList extends React.Component {

    componentDidMount() {
        this.props.getBookmarks();
    }

    render() {
        return (
        <div className="RoomList">
            <h3>Rooms</h3>
            
            {/* { this.props.rooms ? (
                <div>
                    { this.props.rooms.map(room => (
                        <p>room</p>
                    ))}
                </div>



            ) : (
                <div>Loading...</div>
            )} */}

            <ul>
                <li><Link to={`/room/whitesands@conference.localhost`}>whitesands</Link></li>
            </ul>

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  bookmarks: state.bookmarks,
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    getBookmarks: () => dispatch(getBookmarks),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);

// export default RoomList;