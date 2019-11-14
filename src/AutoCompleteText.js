import React from 'react';
import './AutoCompleteText.css';

export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            text: ''
        };
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }));
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map(item => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }


    render() {
        const { text } = this.state;
        return (
            <div>
                <div className="AutoCompleteText">
                    <input value={text} type="text" onChange={this.onTextChanged} />
                </div>
                <div className="container">
                    <div className="AutoCompleteTextContainer">
                        {this.renderSuggestions()}
                    </div>
                </div>
            </div>
        )
    }
}