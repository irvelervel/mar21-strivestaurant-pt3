import { ListGroup } from 'react-bootstrap'

const DishComments = (props) => (
    // props.dish is the whole object
    <div className={`mt-${props.marginTop}`}>
        <h2>Comments for {props.dish.name}</h2>
        <ListGroup>
            {
                props.dish.comments.map(c => (
                    <ListGroup.Item key={c.id}>"{c.comment}" from {c.author}</ListGroup.Item>
                ))
            }
        </ListGroup>
    </div>
)

export default DishComments