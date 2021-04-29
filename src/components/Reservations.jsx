import { Component } from 'react'
import { Alert, ListGroup, Spinner } from 'react-bootstrap'
import { convertDate } from '../helpers/dates'

class Reservations extends Component {

    // every time you need to fetch data from an endpoint (API)
    // in a react component, set up the state accordingly

    state = {
        reservations: [],
        isLoading: false,
        isError: false,
    }

    // the next step is where to put our fetch
    // I need to grab the reservations now

    componentDidMount = async () => {
        // the code put here will fire just ONCE for every mounting of this component

        // once a component get mounted into the dom:
        // 1) the initial state is set
        // 2) render() gets fired
        // 3) componentDidMount() gets fired

        // you want immediately to show something to the users!
        // maybe a spinner, or a loader, or something that will make them wait
        // then we can grab the data, we can do the expensive operations of fetch in componentDidMount
        // and finally we can present the data we fetched back to the user

        console.log('you should see this console.log just once every reload')

        // let's fetch our data!
        try {

            this.setState({
                isLoading: true
            })

            let response = await fetch('https://striveschool.herokuapp.com/api/reservation')
            console.log(response)
            if (response.ok) {
                let data = await response.json()
                console.log(data)
                this.setState({ reservations: data, isError: false, isLoading: false })
            } else {
                console.log('houston we got an error')
                this.setState({ isError: true, isLoading: false })
            }
        } catch (error) {
            console.log(error)
            this.setState({ isError: true, isLoading: false })
        }
    }

    selectedStyle = { border: '2px solid red', color: 'red' }
    notSelectedStyle = { border: 'none', color: 'black' }

    render() {
        // render is not suitable for putting a fetch
        // render is fired multiple times during the lifecycle of a component
        // render will be invoked again every time there's a change in the STATE or in the PROPS

        // I cannot put the fetch here
        // and I cannot set the state here either
        // this.setState({ reservations: ['stefano'] })


        return (
            <>
                <h3>RESERVATIONS</h3>
                {/* conditional rendering */}
                {
                    this.state.isLoading &&
                    <Spinner animation="border" variant="primary" />
                }
                {
                    !this.state.isLoading && this.state.isError &&
                    // loading must NOT be in process and we need an error in the state
                    <Alert variant="danger">Aww snap! We got an error!</Alert>
                }
                { !this.state.isLoading &&
                    <ListGroup>
                        {
                            this.state.reservations.length > 0 ?
                                this.state.reservations.map(reservation => (
                                    <ListGroup.Item key={reservation._id}>
                                        {/* 
                                            1) convert the string into a Date with parseISO
                                            2) convert the Date back to a string with format

                                            reservation.dateTime -> string
                                            parseISO(reservation.dateTime) -> Date
                                            format(parseISO(reservation.dateTime), "yyyy") -> string
                                        */}
                                        {/* {console.log(format(parseISO(reservation.dateTime), "yyyy-MMM-dd"))} */}
                                        <p>From: {reservation.name}, for {reservation.numberOfPersons}</p>
                                        <p>at {convertDate(reservation.dateTime)}</p>
                                    </ListGroup.Item>
                                ))
                                : <p>We don't have reservations yet!</p>
                        }
                    </ListGroup>}
            </>
        )
    }
}

export default Reservations