import './card.css'
import './custome.css'
import custome from './custome.module.scss'
function Card() {
    return (
        <div className={`card ${custome.card}`}>
            Card
        </div>
    );
}

export default Card;