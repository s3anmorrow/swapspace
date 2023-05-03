import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

// import Toolkit method
import { getJSONDataAsync } from "../tools/Toolkit";
// import JSON data models for data typing
import { Orders, Order } from "../tools/orders.model";
// importing other components
import LoadingOverlay from "../components/LoadingOverlay";
import PizzaOrder from "../components/PizzaOrder";

// importing google font
import { Griffy } from 'next/font/google';
const griffy = Griffy({weight: "400", subsets: ['latin']});

export default function Home({orders}: {orders:Order[]}) {

  // LESSON PLAN NOTES
  // using the useRouter hook to navigate to the same route for refreshing the data - see below
  const router = useRouter();  

  const refreshOrders = (e:any) => {
    // LESSON PLAN NOTES
    // forcing a refresh of the server sided data (running getServerSideProps again)
    // done through useRouter hook which is used to navigate to different routes (not covered yet)
    // router.replace() is used to navigate to the same route
    // we achieve a refresh of the server sided data by using the useRouter hook to navigate to the same route which in turn will recall this function below
    // REF - https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  // ---------------------------------- state setup
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // ---------------------------------- useEffects
  useEffect(() => {
    setIsRefreshing(false);
  }, [orders]);

  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">
      <LoadingOverlay spinnerColor="#FFFFFF" bgColor="#b82308" enabled={isRefreshing} />

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
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Refresh Orders&quot; button below to view all current orders that need to be delivered.
          <div>
              <button 
                className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-[#C0C0C0] mt-5" 
                onClick={refreshOrders}>Refresh Orders</button>
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
          ? <>No orders found...</>
          : orders.map(
              (order:Order) => <PizzaOrder key={order.id} id={order.id} name={order.name} address={order.address} city={order.city} size={order.size} toppings={order.toppings} notes={order.notes} />
            )
          }

        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

  // fetch the data from the web api
  const data:Orders = await getJSONDataAsync(RETRIEVE_SCRIPT, 
    (message:string) => {
      console.log("*** Error retrieving pizza order data :(")
    });

  // returning the orders property (array of orders) as props to Home component
  return {
    props: {
      orders: data.orders
    }
  }
}