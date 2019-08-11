import React, { Component, Fragment } from 'react';
import { BrowserRouter ,Route,Switch,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import NewQuestion from './QuestionRelatedCompnents/NewQuestion';
import QuestionPoll from './QuestionRelatedCompnents/QuestionPoll';
import QuestionPollResults from './QuestionRelatedCompnents/QuestionPollResults';
import Scoreboard from './ScoreBoard';
import Navbar from './Navbar';
import Login from './Login';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import LoadingBar from 'react-redux-loading';
import { handleGetQuestions } from '../actions/questions';

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleGetQuestions());
	}

	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<LoadingBar />
					{this.props.authenticated == null ? null : (
						<Navbar loggedInUser={this.props.loggedInUser} />
					)}
					<div>
						{this.props.loading === true ? null : (
							<div>
								<Switch>
									<ProtectedRoute
										path="/"
										exact
										component={Dashboard}
										isAuthenticated={this.props.authenticated}
									/>
									<ProtectedRoute
										path="/question/:id"
										exact
										component={connect(mapStateToProps)(QuestionPoll)}
										isAuthenticated={this.props.authenticated}
									/>
									<ProtectedRoute
										path="/question/:id/results"
										exact
										component={connect(mapStateToProps)(QuestionPollResults)}
										isAuthenticated={this.props.authenticated}
									/>
									<ProtectedRoute
										path="/add"
										exact
										component={NewQuestion}
										isAuthenticated={this.props.authenticated}
									/>
									<ProtectedRoute
										path="/scoreboard"
										exact
										component={Scoreboard}
										isAuthenticated={this.props.authenticated}
									/>
									<Route path="/login" exact component={withRouter(Login)} />
									<Route path="/logout" exact component={withRouter(Logout)} />
								</Switch>
							</div>
						)}
					</div>
				</Fragment>
			</BrowserRouter>
		);
	}
}

function mapStateToProps({ users, login }) {
	return {
		loading: false,
		loggedInUser: login.loggedInUser,
		authenticated: login.authenticated
	};
}

export default connect(mapStateToProps)(App);
