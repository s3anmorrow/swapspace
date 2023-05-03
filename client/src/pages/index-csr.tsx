import { useState } from "react";

// import Toolkit method
import { getJSONData } from "../tools/Toolkit";
// import JSON data models for data typing
import { Orders, Order } from "../tools/orders.model";
// importing other components
import LoadingOverlay from "../components/LoadingOverlay";
import PizzaOrder from "../components/PizzaOrder";

// importing google font
import { Griffy } from 'next/font/google';
const griffy = Griffy({weight: "400", subsets: ['latin']});

export default function Home() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

  // ----------------------------------- event handlers
  const onResponse = (result:Orders) => {
    // console.log(result);
    // save the JSON data in a state variable
    setOrders(result.orders);
    setLoading(false);
  }

  const onError = () => console.log("*** Error retrieving pizza order data :(");

  const getOrders = (e:any) => {
    // fetch the data!
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
    setLoading(true);
  };

  // ---------------------------------- state setup
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">
      <LoadingOverlay spinnerColor="#FFFFFF" bgColor="#b82308" enabled={loading} />

      {/* LESSON PLAN NOTES
      - add how to do a background watermark using tailwind's custom properties
      - addition of /lib folder to project folder */}
      <div className="flex flex-nowrap items-center justify-center 
          bg-accent bg-[url('./../lib/images/background.jpg')] bg-no-repeat bg-center bg-cover
          border-solid border-b-4 border-accent
          min-h-[220px] p-5
          text-white">

        {/*
        LESSON PLAN NOTES
        > tailwind makes it easy to do responsive design without leaving HTML and without media queries
        > has built in several break points represented by prefixes:
        sm	640px, md	768px, lg	1024px, xl	1280px, 2xl	1536px	
        > have to design mobile first and then use these prefixes before utility to have it apply when screen width the breakpoint OR GREATER 
        https://tailwindcss.com/docs/responsive-design 
        */}
        <header className="grow text-center md:text-left">
          <div className={griffy.className + " text-6xl"}>Antonio's Online Pizzaria</div>
          <div className="text-sm">If it's not Antonio's, it's rubbish!</div>
        </header>

        <div className="shrink-0 hidden md:block">
          <i className="fab fa-facebook-square fa-2x ml-1"></i>
          <i className="fab fa-twitter-square fa-2x ml-1"></i>
          <i className="fab fa-instagram fa-2x ml-1"></i>
        </div>
      </div>

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
              <button 
                className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-[#C0C0C0] mt-5" 
                onClick={getOrders}>Get Orders</button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-[#939393] hidden md:block">
          <div>Antonio's Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-[#EDEDED] p-10">

        <div id="output" className="divide-dashed divide-y-2 divide-[#b82308]">

          {orders.length===0
          ? <>No orders retrieved...</>
          : orders.map(
              (order:Order) => <PizzaOrder key={order.id} id={order.id} name={order.name} address={order.address} city={order.city} size={order.size} toppings={order.toppings} notes={order.notes} />
            )
          }

        </div>
      </div>
    </main>
  );
}