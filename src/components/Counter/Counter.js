import './Counter.css';


const Counter = ({ stock, count, setCount }) => {


    const sumar = () => count < stock ? setCount(count + 1) : alert('PRODUCTO AGOTADO')
    const restar = () => count > 0 ? setCount(count - 1) : alert('ERROR, minimo 1 unidad')


    return (
        <div className='counter'>
            <button className='rest' onClick={restar}>-</button>
            <span>{count}</span>
            <button className='add' onClick={sumar}>+</button><span></span>

        </div>
    )
}

export default Counter;