import { PropsWithChildren, createContext, useContext, useState } from "react";
import {CartItem } from '@/types'
import {randomUUID} from 'expo-crypto';
import { Tables } from "@/database.types";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";

type Product = Tables<'products'>

type CartType = {
    items:CartItem[];
    addItem:(product:Product, size: CartItem['size'])=> void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total:number;
    checkout: () => void
}


const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{},
    updateQuantity:()=> {},
    total:0,
    checkout: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  // if item already present in cart, increment it.
  // update quantity


    const [items, setItems] = useState<CartItem[]>([]);
    const router = useRouter();
    const {mutate: insertOrder} = useInsertOrder();
    const {mutate: insertOrderItems} = useInsertOrderItems();
    const addItem = (product:Product, size: CartItem['size'])=>{
      
      const existingItem = items.find((item)=>item.product === product && item.size === size)
      if (existingItem){
        updateQuantity(existingItem.id, 1)
        return;
      }

        const newCartItem: CartItem = {
          id: randomUUID(), 
          product,
          size,
          product_id:product.id,
          quantity: 1,
        }
      
      setItems([newCartItem,...items]);
    }

    const updateQuantity = (itemId: string, amount: -1 | 1) =>{
      // console.log(itemId,amount)
      const updatedItems = items.map((item)=>item.id !== itemId ? item : {...item,quantity: item.quantity + amount}).filter((item)=>item.quantity>0)
      setItems(updatedItems);
    }

    const total = items.reduce((sum,item)=>(sum +=item.product.price * item.quantity),0)

    const checkout = () =>{
      console.warn("Checking Out")
      insertOrder({total},
        {
        onSuccess:saveOrderItems,
      })
    }

    const clearCart = () =>{
      setItems([])
    }

    const saveOrderItems = (order:Tables<'orders'>) =>{

      const orderItems = items.map((cartItems)=>({
        order_id:order.id,
        product_id:cartItems.product_id,
        quantity:cartItems.quantity,
        size:cartItems.size,
      }
      ))

      insertOrderItems(orderItems,{
        onSuccess(){
          clearCart(),
          router.push(`/(user)/orders/${order?.id}`)
        }
      })
    }

  return (
    <CartContext.Provider value={{ items, addItem ,updateQuantity,total,checkout}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () =>useContext(CartContext);