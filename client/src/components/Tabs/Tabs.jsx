import React from "react";

import "./tabs.scss";

const Tabs = ( props ) => {
    const links = [
        {
            "link_text": "Активные заявки",
            "link_href": "/"
        },
        {
            "link_text": "Принятые заявки",
            "link_href": "/accepted"
        },
        {
            "link_text": "Отклонённые заявки",
            "link_href": "/rejected"
        }
    ]

    return (
        <div className="tabs mt">
            {
                links.map(
                    ( link, i ) => {
                        if ( i === props.selected ) {
                            return ( <a key={ i } className="tabs__link selected" href={ link.link_href }>{ link.link_text }</a> );
                        }

                        return ( <a key={ i } className="tabs__link" href={ link.link_href }>{ link.link_text }</a> );
                    }
                )
            }
        </div>
    );
}

export default Tabs;