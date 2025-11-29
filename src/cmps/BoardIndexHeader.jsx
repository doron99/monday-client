export function BoardIndexHeader({ userName = "User" }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 21) return "Good evening";
        return "Good night";
    };

    return (
        <div className="board-index-header">
            <h1 className="board-index-header-title">{getGreeting()}, {userName}!</h1>
            <p className="board-index-header-subtitle">Quickly access your recent boards, Inbox and workspaces</p>
        </div>
    );
}