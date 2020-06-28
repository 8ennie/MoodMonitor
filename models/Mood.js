class Mood {
    
}

Mood.schema = {
    name: 'Mood',
    primaryKey: 'id',
    properties: {
        id: 'int',
        date: 'date',
        mainMood: 'int',
        moods: 'int?[]',
        note: 'string?'
    }
};

let realm = new Realm({schema: [Mood]});

export default Mood