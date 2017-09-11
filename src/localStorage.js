import uniq from 'lodash/uniq';
import findIndex from 'lodash/findIndex';

// Helper functions for interaction with localStorage
// TODO move most of this into saga

// TODO consider user prefix here?
export const RECENT_ROOMS = "JCHAT_RECENT_ROOMS";

export const clearLocalStorage = () => {

    // TODO

};

export const getRecentRooms = () => {

    let rooms = [];

    let localRooms = localStorage.getItem(RECENT_ROOMS);
    if(localRooms) {
        rooms = JSON.parse(localRooms);
    }

    return rooms;
};

export const addRecentRoom = (room) => {

    let localRooms = localStorage.getItem(RECENT_ROOMS);
    if(localRooms) {

        let rooms = JSON.parse(localRooms);

        let roomIndex = findIndex(rooms, function(r) {
            return r.jid.bare === room.jid.bare;
        })

        if(roomIndex === -1) {
            
            let uniqRooms = uniq([
                ...rooms,
                room
            ]);
    
            localStorage.setItem(RECENT_ROOMS, JSON.stringify(uniqRooms));

        }

    } else {
        localStorage.setItem(RECENT_ROOMS, JSON.stringify([
            room
        ]));
    }

};