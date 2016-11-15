import {
    List,
    Map
} from 'immutable';

export const INITIAL_STATE = Map();

// Takes a state and a list of entries and updates the state with a list 'entries'
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

// Next is called when voting is started. Takes the next two values from the list and adds them to the vote pair
export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({
                pair: entries.take(2)
            }),
            entries: entries.skip(2)
        });
    }
}

// Takes an entry and adds a vote to it (sets tally to 0 first if it does not exist)
export function vote(state, entry) {
    return state.updateIn(['vote', 'tally', entry],
        0,
        tally => tally + 1
    );
}

// Takes a vote and decides the winner, returning both if a tie or an empty arry if no vote exists
function getWinners(vote) {
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) {
        return [a];
    } else if (bVotes > aVotes) {
        return [b];
    } else {
        return [a, b];
    }
}
