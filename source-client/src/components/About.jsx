import React, { PureComponent } from 'react';
import source_logo from '../raw/source_logo.png';
import './About.less';

export default class About extends PureComponent {
    render() {
        return (
            <div className="About">
                <div className="source-logo">
                    <img src={source_logo} alt={"logo"} />
                </div>
                <div className="aboutInfo">
                    <div className="body">
                        <div className="left">
                            <ul className="todo">
                                <li>Create flyers and event advertisements
                                    with Photoshop, Illustrator,
                        inDesign, etc.</li>
                                <li>Color and/or black and white copies </li>
                                <li>Laminate items </li>
                                <li>Create buttons as well as a host of other crafts that are available</li>
                            </ul>
                            <p className="itemTitle"><strong>Supplies available include: </strong></p>
                            <ul className="items">
                                <li>Butcher paper </li>
                                <li>Construction paper</li>
                                <li>Glue</li>
                                <li>GoldPlus Machine </li>
                                <li>Markers </li>
                                <li>Paper cutter </li>
                                <li>Poster board </li>
                                <li>Tables (for checkout)</li>
                                <li>and MORE</li>
                            </ul>
                        </div>
                        <div className="right">
                            <div>
                                <p className="title"><strong>The SOuRCe is staffed by
                                    student workers: </strong></p>
                                <p className="info">
                                    Monday-Thursday: 9:00am-8:00pm <br />
                                    Friday: 9:00am-5:00pm <br />
                                    2nd Floor University Center (near Baker's Junction) <br />
                                    <span>Phone: 610-758-6670<br />
                                        Email: <a href="mailto:insource@lehigh.edu">insource@lehigh.edu</a></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <h3 className="mission">MISSION:</h3>
                        <p className="missionBody">Our Mission is to contribute
                            positively to clubs and
                            organizations. We help clubs and
                            organizations thrive emotionally,
                            physically, an spiritually so they
                            can in turn be the best they can be.
                            Overall, we want seek to encourage
                            creativity in The SOuRCe so that
                            clubs and organizations can make a
                            difference for students and the
                            overall community.
                        </p>
                        <h3 className="footerTitle">Teamwork Makes the Dream Work:</h3>
                        <p>Our staff makes up five teams: Event
                            Planning, Social Media, Newsletter,
                            Graphic Design, Club of the Month,
                            and Inventory.
                    </p>
                    </div>
                </div>

            </div>
        );
    }
}