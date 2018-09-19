import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux';

import Contact from '../Contact/index'
import ContactPropType from '../PropTypes/Contact/index'

import styles from './styles.scss'

const Contacts = ({ contacts }) => (
	<div className={styles.contacts}>
		{contacts.map((contact, index) => (
			<Contact
				key={index}
				contact={contact}
			/>
		))}
	</div>
)

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(ContactPropType)
}

const foo = (state) => ({ contacts: state });

export default connect(foo)(Contacts);
