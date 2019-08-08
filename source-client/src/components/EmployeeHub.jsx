import React, { PureComponent } from 'react';
import EmployeeHubLeftPane from './EmployeeHubLeftPane';
import EmployeeHubRightPane from './EmployeeHubRightPane';

import './EmployeeHub.less';
export default class EmployeeHub extends PureComponent {
    render() {
        return (
            <div className="EmployeeHub">
                <EmployeeHubLeftPane />
                <EmployeeHubRightPane />
            </div>
        );
    }
}