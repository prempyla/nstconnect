import ChatRoom from "@/components/SafeRooms/ChatRoom";

export default async function RoomPage({ params }) {
    // In Next.js 15, params is a promise that needs to be awaited
    const { roomId } = await params;

    return <ChatRoom roomId={roomId} />;
}
