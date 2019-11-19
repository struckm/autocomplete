import React, { Component, Fragment } from 'react';
import './AutoComplete.css';

export default class AutoCompleteText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSuggestions: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        };
    }

    // this fires before the onKeyUP but after onKeyDown
    onTextChanged = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        
        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase())
        );

        // Update the user input and filtered suggestions, reset the
        // suggestion and make sure the suggestions are shown

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    }

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    }

    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if(e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        else if(e.keyCode === 38) { // User pressed the up arrow, decrement the index
            if(activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        else if(e.keyCode === 40){ // User pressed the down arrow, increment the index
            if(activeSuggestion - 1 === filteredSuggestions + 1) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if(showSuggestions && userInput) {
            if(filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if(index === activeSuggestion) {
                                className = 'suggestion-active';
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No Suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <input
                    type="test"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </Fragment>
        )
    }
}