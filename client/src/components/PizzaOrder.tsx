// import JSON data models for data typing
import { PizzaOrderProps, Note, Topping } from "./../tools/orders.model";

const PizzaOrder = ({id, name, address, city, size, toppings, notes}:PizzaOrderProps) => {

    return (
        <div className="py-5">
            <div className="font-bold text-2xl text-accent">Order {id}:</div>
            <div className="font-bold pt-1"><i className="fas fa-info-circle"></i> Customer Information:</div><div>{name}<br/>{address}<br/>{city}</div>
            <div className="font-bold pt-4"><i className="fas fa-pizza-slice"></i> Pizza Size:</div><div>{size}</div>

            {/* // see below doing toppings and notes without adding new components for each */}
            <div className="font-bold pt-4"><i className="fas fa-list-ul"></i> Order Details:</div><div>
                {toppings.map(
                    (data:Topping, n:number) => <div key={n}>{data.topping}</div>
                )}
            </div>
            <div className="font-bold pt-4"><i className="fas fa-sticky-note"></i> Order Notes:</div><div>
                {notes.map(
                    (data:Note, n:number) => <div key={n}>{data.note}</div>
                )}
            </div>
        </div>
    );
}

export default PizzaOrder;