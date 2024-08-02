'use client'
import React,{useState, useEffect} from "react";
import { collection,
  addDoc,
  getDoc,
  querySnapshot,
  onSnapshot,
  query,
  deleteDoc,
  doc
} from "firebase/firestore"; 
import {db} from "./firebase"

export default function Home() {
  const [items, setItems] = useState([
  ]);
  const [newItem, setNewItem] = useState({name: '', price: ''})
  const [total, setTotal] = useState(0)


  // add items to database
const addItems = async(e) => {
  e.preventDefault()
  if (newItem.name !== '' && newItem.price !== '') {
    setItems([...items, newItem]);
    await addDoc(collection (db, 'items'),{
      name: newItem.name.trim(),
      price: newItem.price
    });
    setNewItem({name: '',price: ''});
  }
};
  // read items from db 
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id:doc.id})
      })
      setItems((itemsArr));


      //total from itemsArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        const roundedTotalPrice = totalPrice.toFixed(2); // Round to 2 decimal places
        setTotal(parseFloat(roundedTotalPrice)); // Convert back to number
      };
      
      calculateTotal();
      return () => unsubscribe();
    });
  },[]);

  // delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items',id));
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">
          Expense Tracker
        </h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
             className="col-span-3 p-3 border mx-4" type="text" placeholder="Enter Item: "/>
            <input
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
             className="col-span-2 p-3 border mx-4" type="number" placeholder="Enter $: "/>
            <button
              onClick={addItems}
             type="submit" className="text-white bg-slate-950 hover:bg-slate-950 p-3">
              +
            </button>
          </form>
          <ul>
            {items.map((items,id) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">
                    {items.name}
                  </span>
                  <span>
                    ${items.price}
                  </span>
                </div>
                <button
                onClick={() => deleteItem(items.id)}
                 className="ml-8 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1? ('') :(
            <div className="justify-between flex p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          ) }
        </div>
      </div>
    </main>
  );
}
