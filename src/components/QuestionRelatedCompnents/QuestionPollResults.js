import React from 'react';
import {connect} from 'react-redux';
import PageNotFound from './../PageNotFound';

var QuestionPollResults = function (props) {
    const {question, author} = props;

    if (PageNotFound === true) {
        return <PageNotFound/>;
    }

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    const optionSelected = question.optionOne.votes.includes(author.id) ? "optionOne" : "optionTwo";

    let optionOneWidth = Math.round((question.optionOne.votes.length / totalVotes) * 100);
    let optionTwoWidth = Math.round((question.optionTwo.votes.length / totalVotes) * 100);

    return (
        <div>
            <div className='projectContainer'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-sm-8'>
                            <div className='card'>
                                <div className='card-header bold'>Added by {author.name}</div>
                                <div className='card-body'>
                                    <div className='container'>
                                        <div className='row justify-content-center'>
                                            <div className='col-sm-4 border-right vert-align'>
                                                <img src={author.avatarURL}
                                                     alt={`Avatar of ${author.name}`}
                                                     className='avatar'/>
                                            </div>
                                            <div className='col-sm-8'>
                                                <div className='question-info'>
                                                    <div className='col-sm-12 '>
                                                        <div className='results-header'>Results:</div>
                                                        <div className={`card card-poll-results ${(optionSelected === 'optionOne') ? "chosen-answer" : ""}`}>Would you rather {question.optionOne.text}?

                                                            <div className="progress m-progress--sm">
                                                                <div className="progress-bar m--bg-success"
                                                                     style={{ width: optionOneWidth + '%' }}
                                                                     ></div>
                                                            </div>
                                                            <div>
                                                                <span>{question.optionOne.votes.length} out of {totalVotes} votes. ({optionOneWidth}%)</span>
                                                            </div>

                                                        </div>
                                                        <div className={`card card-poll-results ${(optionSelected === 'optionTwo') ? "chosen-answer" : ""}`}>Would you rather {question.optionTwo.text}?

                                                            <div className="progress m-progress--sm">
                                                                <div className="progress-bar m--bg-success"
                                                                     style={{ width: optionTwoWidth + '%' }}
                                                                ></div>
                                                            </div>
                                                            <div>
                                                                <span>{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps({authedUser, questions, users}, props) {
    const {id} = props.match.params;

    let PageNotFound = true;
    let author = "";
    let specificQuestion = "";

    if (questions[id] !== undefined) {
        PageNotFound = false;
        specificQuestion = questions[id];
        author = users[specificQuestion['author']];
    }

    return {
        id,
        question: specificQuestion,
        author: author,        
        PageNotFound: PageNotFound
    }
}

export default connect(mapStateToProps)(QuestionPollResults);