import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';

import { FaBars } from 'react-icons/fa';


export const AsideNavButton = ({ handleToggleSidebar }) => {

	return (
		<>
			<div className="btn-toggle text-center text-light fs-5 d-sm-none bg-belmeny-gradient" onClick={() => handleToggleSidebar(true)}>
				<FaBars />
			</div>
		</>
	)
}
