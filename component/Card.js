const Card = (props) => {
    return(
        <div>
            <img width="75" src={props.avatar_url} />
            <div style={{ display: "inline-block", marginLeft: 10 }}>
                <div>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const data = [
    {
        name: "Makaron",
        avatar_url: "https://avatars2.githubusercontent.com/u/8445?v=3",
        company: "GL"
    },
    {
        name: "Vita",
        avatar_url: "https://avatars1.githubusercontent.com/u/8035368?v=3",
        company: "Webitel"
    }
];

const CardList = (props) => {
    return(
        <div>
            {props.cards.map(card => <Card {...card}/>)}
        </div>
    );
};

ReactDOM.render(<CardList cards={data} />, mountNode);
