import React from 'react'
import emojis from './emoji'
import '../assets/TextAreaEmoji.css'

export class TextAreaEmoji extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			textValue: '',
			caretPosition: 0,
			emojiSelected: 0,
			propositions: []
		};
		this.selectorLimit = 5;
		this.emojis = emojis.emojis;
		this.textArea = React.createRef();
	}

	handleChange = (event) => {
		let newValue = event.target.value;
		let caretPos = event.target.selectionStart;
		this.transformValue(newValue, caretPos);
	}

	handleKeyDown = (event) => {
		let maxIndex = this.state.propositions.length;
		if (maxIndex){
			let selected = this.state.emojiSelected;
			let deleteEvent = true;
			let validate = false;
			let clearPropositions = false;
			switch (event.keyCode){
				case 38: // up arrow
					selected--;
					break;
				case 40: // down arrow
					selected++;
					break;
				case 13: // enter
					validate = true;
					break;
				case 27: // escape
					clearPropositions = true;
					deleteEvent = false;
					break;
				default:
					deleteEvent = false;
					break;
			}
			if (selected < 0) selected = 0;
			if (selected > maxIndex-1) selected = maxIndex-1;
			
			if (deleteEvent){
				event.preventDefault();
				if (validate){
					// create a fake event for onEmojiClicked
					let fakeEvent = {
						target: { id: this.state.propositions[selected].shortname }
					}
					this.onEmojiClicked(fakeEvent);
				} else {
					this.setState({emojiSelected: selected});
				}
			} else {
				if (clearPropositions){
					this.setState({propositions: [], emojiSelected: 0});
				}
			}
		}
	}

	onEmojiClicked = (event) => {
		let emojiShortname = event.target.id;
		let newValue = this.state.textValue;

		let removeFromIndex = newValue.lastIndexOf(':', this.state.caretPosition);
		newValue = 
			this.replaceBetweenIndex(
				newValue,
				emojiShortname,
				removeFromIndex,
				this.state.caretPosition
			);
		this.textArea.focus();
		this.transformValue(newValue, removeFromIndex + emojiShortname.length);
	}

	replaceBetweenIndex = (fullStr, insertStr, from, to) => {
		let newStr =
			fullStr.substring(0, from) +
			insertStr +
			fullStr.substring(to);
		return newStr;
	}

	transformValue = (newValue, caretPos) => {
		let propositions = [];
		let selection = this.state.emojiSelected;

		// index of the 2 last colon
		let lastColonIndex = newValue.lastIndexOf(':', caretPos);
		let previousColonIndex = newValue.lastIndexOf(':', lastColonIndex - 1);

		// index of the last space
		let spaceIndex = newValue.lastIndexOf(' ', caretPos - 1);

		// determine if auto replace in case of exact match
		let autoReplace =
			(spaceIndex < previousColonIndex &&
			previousColonIndex < lastColonIndex);

		// extract the potential emoji shortname
		let from = (autoReplace ? previousColonIndex : lastColonIndex) + 1;
		let to = (autoReplace ? caretPos - 1 : caretPos);
		let shortname = newValue.substring(from, to);

		//console.log(autoReplace, caretPos, spaceIndex, previousColonIndex, lastColonIndex);
		if (spaceIndex < lastColonIndex && shortname.length) {
			if (autoReplace){
				let emoji = this.emojis.find(emoji => (emoji.shortname === `:${shortname}:`));
				if (emoji !== undefined){
					//console.log(emoji.shortname, previousColonIndex, lastColonIndex);
					newValue = this.replaceBetweenIndex(
						newValue,
						emoji.char,
						previousColonIndex,
						lastColonIndex + 1
					);
					// when we replace, put selection value to 0
					selection = 0;
				}
			} else {
				// filter the potentials emoji choice
				let count = 0;
				propositions =
					this.emojis.filter(emoji => {
						let keep =
							emoji.shortname.includes(shortname) &&
							count < this.selectorLimit;
						count += keep;
						return keep;
					}, this);
				if (this.state.propositions.length !== propositions.length){
					selection = 0;
				}
			}
		}

		this.setState({
			textValue: newValue,
			caretPosition: caretPos,
			propositions: propositions,
			emojiSelected: selection
		});
	}

	render() {
		return (
			<div
				className={'textarea-emoji'}
				style={this.props.style}>
				<textarea
					ref={(textArea) => this.textArea = textArea}
					style={this.props.textAreaStyle}
					value={this.state.textValue}
					className={"form-control textarea-emoji"}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown} />

					<div className={"list-group emoji-selector"}>
					{
					this.state.propositions.map((emoji, index) => {
						let className = 
							(index === this.state.emojiSelected ?
								"emoji py-1 list-group-item list-group-item-action list-group-item-info"
								: "emoji py-1 list-group-item list-group-item-action");
						return <span 
									key={emoji.unicode}
									id={emoji.shortname}
									className={className}
									onClick={this.onEmojiClicked}>
									{`${emoji.char} ${emoji.shortname} `}
								</span>
					})
					}
					</div>
			</div>
		);
	}
}
