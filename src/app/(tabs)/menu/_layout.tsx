import { Stack } from "expo-router";

export default function Menu () {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: 'Menu'}}/>
        </Stack>
    )
}