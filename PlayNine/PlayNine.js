const Stars = (props) => {
    const numOfStars = 1 + Math.floor(Math.random()*9);

    return(
        <div className="col-sm-5">
            {_.range(numOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
         </div>
    );
};

const Button = (props) => {
    return(
        <div className="col-sm-2">
            <button>=</button>
        </div>
    );
};

const Answer = (props) => {
    return(
        <div className="col-sm-5">
            ...
        </div>
    );
};

const Numbers = (props) => {
    return(
        <div className="card text-center">
            <div>
                {Numbers.list.map((n, i) => {
                    return <span key={i}>{n}</span>
                })}
            </div>
        </div>
    );
};

Numbers.list = _.range(1, 10);

class PlayNine extends React.Component {
    render() {
        return(
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars/>
                    <Button/>
                    <Answer/>
                </div>
                <br/>
                <Numbers/>
            </div>
        );
    }
}

