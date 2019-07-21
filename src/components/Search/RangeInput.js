import React, { Component } from 'react';
import { connectRange } from 'react-instantsearch-native';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';

class RangeInput extends Component {
      
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder={this.props.minLabel}
                    keyboardType="numeric"
                    onChangeText={text => this.props.refine({...currentRefinement,
                        min: text})}
                    value={this.props.currentRefinement.min}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    placeholder={this.props.maxLabel}
                    keyboardType="numeric"
                    onChangeText={text => this.props.refine({...currentRefinement,
                        max: text})}
                    value={this.props.currentRefinement.max}
                    underlineColorAndroid="transparent"
                />
            </View>    
                
            
        );
    }
}

RangeInput.propTypes = {
    refine: PropTypes.func.isRequired,
    currentRefinement: PropTypes.object,
    min: PropTypes.string,
    max: PropTypes.string,
    minLabel: PropTypes.string,
    maxLabel: PropTypes.string
}

export default ConnectedRangeInput = connectRange(RangeInput);