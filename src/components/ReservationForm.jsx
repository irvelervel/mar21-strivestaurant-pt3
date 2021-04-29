import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// name
// phone
// numberOfPersons
// smoking (boolean)
// dateTime
// specialRequests

// https://striveschool.herokuapp.com/api/reservation without authorization

class ReservationForm extends React.Component {

    state = {
        reservation: { // INITIAL STATE
            name: '',
            phone: '',
            numberOfPersons: 1,
            smoking: false,
            dateTime: '',
            specialRequests: '',
        }
    }

    submitReservation = async (e) => {
        // let's prevent the default browser behavior
        e.preventDefault()
        console.log(this.state.reservation)
        try {
            let response = await fetch('https://striveschool.herokuapp.com/api/reservation',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.reservation),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            // now response holds the result of my operation
            // the ok property of it will tell me if everything went well or not
            if (response.ok) {
                alert('your reservation has been saved correctly')
                this.setState({
                    reservation: { // INITIAL STATE
                        name: '',
                        phone: '',
                        numberOfPersons: 1,
                        smoking: false,
                        dateTime: '',
                        specialRequests: ''
                    }
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                alert('something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = (e) => {
        // e.target.value
        // e.target.id
        let id = e.target.id
        console.log('the field I need to change in the reservation object is', id)
        // id can be "name", "phone", "smoking"
        this.setState({
            reservation: {
                ...this.state.reservation,
                [id]: id === 'smoking' ? e.target.checked : e.target.value
            }
        })
    }

    // DIFFERENCE BETWEEN DOT NOTATION AND SQUARE BRACKETS NOTATION
    // user = {
    //     name: 'Stefano',
    //     role: 'Teacher',
    //     area: {
    //         country: 'Italy',
    //         region: 'FVG'
    //     },
    // }

    // propertyToAccess = 'role'

    // user.role
    // user['role']

    // user.propertyToAccess // undefined
    // user[propertyToAccess] // 'Teacher'

    render() {
        console.log('RESERVATIONFORM GOT RE-RENDERED')
        return (
            // React Fragment, just for wrap multiple elements out of my return statement
            <>
                <h2>Book your table NOW!</h2>
                <Form onSubmit={this.submitReservation}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            id="name"
                            value={this.state.reservation.name}
                            // onChange={this.handleChange}
                            onChange={(e) => this.setState({
                                reservation: {
                                    // I want here to preserve the actual content
                                    // of the reservation object
                                    ...this.state.reservation,
                                    // we're copying every key/value pair from this.state.reservation
                                    // the spread operator will copy over every property
                                    // of this.state.reservation
                                    name: e.target.value
                                }
                            })}
                            type="text"
                            placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            id="phone"
                            value={this.state.reservation.phone}
                            onChange={this.handleChange}
                            type="number"
                            placeholder="Enter phone" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>How many people?</Form.Label>
                        <Form.Control
                            as="select"
                            id="numberOfPersons"
                            value={this.state.reservation.numberOfPersons}
                            // onChange={(e) => this.setState({
                            //     reservation: {
                            //         ...this.state.reservation,
                            //         numberOfPersons: e.target.value
                            //     }
                            // })}
                            onChange={this.handleChange}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            id="smoking"
                            checked={this.state.reservation.smoking}
                            // onChange={(e) => this.setState({
                            //     reservation: {
                            //         ...this.state.reservation,
                            //         smoking: e.target.checked
                            //     }
                            // })}
                            onChange={this.handleChange}
                            type="checkbox"
                            label="Smoking?" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date & Time</Form.Label>
                        <Form.Control
                            id="dateTime"
                            value={this.state.reservation.dateTime}
                            // onChange={(e) => this.setState({
                            //     reservation: {
                            //         ...this.state.reservation,
                            //         dateTime: e.target.value
                            //     }
                            // })}
                            onChange={this.handleChange}
                            type="datetime-local" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Special Requests</Form.Label>
                        <Form.Control
                            id="specialRequests"
                            value={this.state.reservation.specialRequests}
                            // onChange={(e) => this.setState({
                            //     reservation: {
                            //         ...this.state.reservation,
                            //         specialRequests: e.target.value
                            //     }
                            // })}
                            onChange={this.handleChange}
                            as="textarea" rows={3} />
                    </Form.Group>
                    <Button
                        variant="info"
                        type="submit">
                        Send reservation
                    </Button>
                </Form>
            </>
        )
    }
}

export default ReservationForm