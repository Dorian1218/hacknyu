import { database } from "@/firebase";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json()
        const userRef = ref(database, "users/")
        const que = query(userRef, orderByChild("id"), equalTo(id))
        const snapshot = await get(que)
        if (snapshot.exists()) {
            return NextResponse.json(snapshot.val())
        }
        else {
            return NextResponse.json("Could not find user", {status: 404})
        }
    } catch (e) {
        console.log(e)
    }
}