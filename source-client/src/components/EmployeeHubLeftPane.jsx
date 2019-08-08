import React, { PureComponent } from 'react';
import { leftPaneSection } from '../constants/SourceConstants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LeftPaneSection from './LeftPaneSection';
import { selectLeftPaneSection } from '../actions/sourceWebClientActions';

import './EmployeeHubLeftPane.less';
class EmployeeHubLeftPane extends PureComponent {

    static get propTypes() {
        return {
            selectedSection: PropTypes.number,
            selectLeftPaneSection: PropTypes.func.isRequired,
        };
    }

    static get defaultProps() {
        return {
            selectedSection: 1,
        };
    }

    _renderSections() {
        let paneSection = [];
        paneSection = leftPaneSection.map((section) => {
            return <LeftPaneSection
                    key={section.id} 
                    id={section.id}
                    name={section.name}
                    selectedLeftPaneSection={section.id === this.props.selectedSection}
                    onClick={() => this.props.selectLeftPaneSection(section.id)}
                    />
        })
        return paneSection;
    }
    
    render() {
        return (
            <div className="EmployeeHubLeftPane">
                {this._renderSections()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedSection: state.page.selectedSection,
});

export default connect(mapStateToProps, { selectLeftPaneSection })(EmployeeHubLeftPane)