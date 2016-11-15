import {
    List,
    Map
} from 'immutable';

// Takes a state and a list of entries and updates the state with a list 'entries'
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

// Next is called when voting is started. Takes the next two values from the list and adds them to the vote pair
export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({
            pair: entries.take(2)
        }),
        entries: entries.skip(2)
    });
}

// Takes an entry and adds a vote to it (sets tally to 0 first if it does not exist)
export function vote(state, entry) {
    return state.updateIn(['vote', 'tally', entry],
        0,
        tally => tally + 1
    );
}
