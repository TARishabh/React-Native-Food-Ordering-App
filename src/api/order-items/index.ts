import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { InsertTables,UpdateTables } from "@/types";


export const useInsertOrderItems = () =>{
    const queryClient = useQueryClient();
    const {session} = useAuth();
    const userId = session?.user.id;
    return useMutation({
        async mutationFn(items:InsertTables<'order_items'>[]){
            if (!userId) return null;
            const {data:newOrder,error} = await supabase.from('order_items')
            .insert(items)
            .select()
            if (error) {
                throw new Error(error.message)
            }
            return newOrder
        }
        ,
        async onError(){
            console.log("some error")
        }
    })
}

export const useUpdateOrder = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn({id,updatedField}:{id:number,updatedField:UpdateTables<'orders'>}){
            const {data:updatedOrder,error} = await supabase
            .from('orders')
            .update(updatedField)
            .eq('id',id)
            .select()
            .single()
            if (error) {
                throw new Error(error.message)
            }
            return updatedOrder
        },
        async onSuccess(_,{id}) {
            await queryClient.invalidateQueries(['orders'])
            await queryClient.invalidateQueries(['orders',data.id])
        },
    })
}