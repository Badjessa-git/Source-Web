import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import source_logo from '../raw/source_logo.png';
import Button from '@material-ui/core/Button';
import './SourceBody.less';
import { triggerPrintDialog, triggerRequestDialog } from '../actions/sourceWebClientActions';
import Modal from '@material-ui/core/Modal';
import PrintRequestFormDialog from '../dialog/PrintRequestFormDialog';
import GeneralRequestForm from '../dialog/GeneralRequestForm';
import About from './About';
import SnackBar from './SnackBar';


class SourceBody extends PureComponent {
    
    static get propTypes() {
        return {
            triggerPrintDialog: PropTypes.func.isRequired,
            triggerRequestDialog: PropTypes.func.isRequired,
            showPrintDialog: PropTypes.bool.isRequired,
            showRequestDialog: PropTypes.bool.isRequired,
            success: PropTypes.bool.isRequired,
        };
    }

    _renderPrintFormDialog() {
        return (
            <div className="Modal">
                <Modal open={this.props.showPrintDialog}>
                    <PrintRequestFormDialog />
                </Modal>
            </div>
        );
    }

    _renderRequestFormDialog() {
        return (
            <div className="Modal">
                <Modal open={this.props.showRequestDialog}>
                    <GeneralRequestForm />
                </Modal>
            </div>
        );
    }

    render() {
        if (this.props.showAboutPage) {
            return <About />;
        }
        return (
            <div className="SourceBody">
                <div className="source-logo">
                    <img src={source_logo} alt={"logo"} />
                </div>
                <div className="actions">
                    <div className="print">
                        <Button
                            className="button"
                            size="medium"
                            variant="contained"
                            onClick={() => { this.props.triggerPrintDialog(!this.props.showPrintDialog) }}
                            fullWidth={true}>Print</Button>
                    </div>
                    <div className="empty"></div>
                    <div className="gdesign">
                        <Button
                            className="button"
                            size="medium"
                            variant="contained"
                            onClick={() => { this.props.triggerRequestDialog(!this.props.showRequestDialog) }}
                            fullWidth={true}>Graphic</Button>
                    </div>
                </div>
                <div className="Dialogs">
                    {this._renderPrintFormDialog()}
                    {this._renderRequestFormDialog()}
                </div>
                <div className="SnackBar">
                    <SnackBar {...this.props} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    showPrintDialog: state.dialog.showPrintDialog,
    showRequestDialog: state.dialog.showRequestDialog,
    success: state.dialog.successRequest,
});

export default connect(mapStateToProps, { triggerPrintDialog, triggerRequestDialog })(SourceBody)