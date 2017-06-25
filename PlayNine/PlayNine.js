//  TODO: serhii.kokovskyi 25.06.2017 Add the timer to the game

var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

const Stars = (props) => {
    return(
        <div className="col-sm-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
         </div>
    );
};

const Button = (props) => {
    let button;
    switch(props.isAnswerCorrect) {
        case true:
            button =
                <button className="btn btn-success" onClick={props.acceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>;
            break;
        case false:
            button =
                <button className="btn btn-danger" onClick={props.cancelAnswer}>
                    <i className="fa fa-times"></i>
                </button>;
            break;
        default:
            button =
                <button className="btn"
                    onClick={props.checkAnswer}
                    disabled={props.numbers.length === 0 }>
                =
                </button>;
            break;
    }

    return(
        <div className="col-sm-2 text-center">
            {button}
            <br/>
            <br/>
            <button className="btn btn-warning btn-xs"
                    disabled={props.redrawCount === 0}
                    onClick={props.redrawStars}>
                <i className="fa fa-refresh"> {props.redrawCount}</i>
            </button>
        </div>
    );
};

const Answer = (props) => {
    return(
        <div className="col-sm-5">
            {props.numbers.map((number, index) => {
                return <span key={index}
                            onClick={() => props.unselectNumberHandler(number)}>{number}</span>
            })}
        </div>
    );
};

const Numbers = (props) => {
    const isNumberSelected = (number) => {
        if (props.selectedNumbers.indexOf(number) !== -1) {
            return true;
        }
        return false;
    };

    const isNumberUsed = (number) => {
        if (props.usedNumbers.indexOf(number) !== -1) {
            return true;
        }
        return false;
    };

    const selectNumberHandler = (event) => {
        const number = parseInt(event.target.textContent);
        props.selectNumberHandler(number);
    };

    return(
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i}
                          className={
                              isNumberUsed(number) ? "used"
                                  : isNumberSelected(number) ? "selected" : ""}
                          onClick={selectNumberHandler}>
                        {number}
                    </span>
                )}
            </div>
        </div>
    );
};

Numbers.list = _.range(1, 10);

const DoneStatus = (props) => {
    return(
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Plain again</button>
        </div>
    );
};

class PlayNine extends React.Component {
    static generateStartsCount = () => {
        return 1 + Math.floor(Math.random()*9);
    };
    static initialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        numberOfStars: PlayNine.generateStartsCount(),
        isAnswerCorrect: null,
        redrawCount: 5,
        doneStatus: null
    });

    state = PlayNine.initialState();

    selectNumberHandler = (selectedNumber) => {
        if (this.state.usedNumbers.indexOf(selectedNumber) >= 0) { return; }
        if (this.state.selectedNumbers.indexOf(selectedNumber) >= 0) { return; }
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.concat(selectedNumber),
            isAnswerCorrect: null
        }));
    };

    unselectNumberHandler = (selectedNumber) => {
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.filter((number) => {
                return number !== selectedNumber;
            }),
            isAnswerCorrect: null
        }));
    };

    checkAnswer = () => {
        this.setState(() => ({
            isAnswerCorrect: this.state.numberOfStars ===
                this.state.selectedNumbers.reduce((acc, val) => {
                    return acc + val;
                }, 0)
        }));
    };

    acceptAnswer = () => {
        this.setState((prevState) => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            numberOfStars: PlayNine.generateStartsCount(),
            isAnswerCorrect: null
        }), this.updateDoneStatus);
    };

    cancelAnswer = () => {
        this.setState((prevState) => ({
            selectedNumbers: [],
            isAnswerCorrect: null
        }));
    };

    redrawStars = () => {
        if (this.state.redrawCount === 0) {return;}

        this.setState((prevState) => ({
            numberOfStars: PlayNine.generateStartsCount(),
            selectedNumbers: [],
            isAnswerCorrect: null,
            redrawCount: prevState.redrawCount - 1
        }), this.updateDoneStatus);
    };

    updateDoneStatus = () => {
        this.setState((prevState) => {
            if (prevState.usedNumbers === 9) {
                return {doneStatus: 'Great job!'}
            }
            //if (prevState.redrawCount === 0 && !this.possibleSolutions(prevState)) {
            if (prevState.redrawCount === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game over!'}
            }
        });
    };

    resetGame = () => {
        this.setState(PlayNine.initialState());
    };

    possibleSolutions = ({numberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter((number) => {
            return usedNumbers.indexOf(number) === -1;
        });

        const isPossible = possibleCombinationSum(possibleNumbers, numberOfStars)

        return isPossible;
    };

    render() {
        const {
            selectedNumbers,
            numberOfStars,
            isAnswerCorrect,
            usedNumbers,
            redrawCount,
            doneStatus
        } = this.state;

        return(
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button numbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer={this.acceptAnswer}
                            cancelAnswer={this.cancelAnswer}
                            redrawStars={this.redrawStars}
                            redrawCount={redrawCount}
                            isAnswerCorrect={isAnswerCorrect}/>
                    <Answer numbers={selectedNumbers} unselectNumberHandler={this.unselectNumberHandler}/>
                </div>
                <br/>
                {doneStatus
                    ? <DoneStatus doneStatus={doneStatus} resetGame={this.resetGame}/>
                    : <Numbers selectedNumbers={selectedNumbers}
                             usedNumbers={usedNumbers}
                             selectNumberHandler={this.selectNumberHandler}/>
                }
            </div>
        );
    }
}

