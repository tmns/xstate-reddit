import './styles.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { useMachine } from './redditMachine';
import { Subreddit } from './Subreddit';

const subreddits = ['frontend', 'reactjs', 'vuejs'];

const App = () => {
	const [current, send] = useMachine(redditMachine);
	const { subreddit } = current.context;

	return (
		<main
			data-machine={redditMachine.id}
			data-state={current.toStrings().join(' ')}
		>
			<header>
				<select
					onChange={e => {
						send('SELECT', { name: e.target.value });
					}}
				>
					<option disabled>Select one</option>
					{subreddits.map(subreddit => {
						return <option key={subreddit}>{subreddit}</option>
					})}
				</select>
			</header>
			<div>
				<h1>{current.matches('idle') ? 'Select a subreddit' : null}</h1>
				{subreddit && <Subreddit service={subreddit} key={subreddit.id} />}
			</div>
		</main>
	);
};

const rootElement = document.getElementById('root';)
ReactDOM.render(<App />, rootElement);

