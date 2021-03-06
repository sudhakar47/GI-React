import React from 'react';
import { Col } from 'react-bootstrap';

const Footerlinks = (props) => {
    const footerLinksData = props.name.map((val, index) => {
        return(
            <Col key={index} md={3} sm={3}>
                {
                    val.map((item, childindex) => {
                        return(
                            <div key={childindex}>
                                <h3>
                                    {item.text}
                                </h3>
                                <ul>
                                    { item.children.map((litem, i) => {
                                        return (
                                            <li key={i}>
                                                <a href={litem.action}>{litem.text}</a>
                                            </li>
                                        )})
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </Col>
        )
    })
    return footerLinksData;
}

export default Footerlinks;