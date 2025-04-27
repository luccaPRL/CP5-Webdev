import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

const loadUser = async () => {
    let resp = await fetch("https://randomuser.me/api/");
    let data = await resp.json();
    let fakeUser = data.results[0];

    return {
        name: fakeUser.name.first + ' ' + fakeUser.name.last,
        email: fakeUser.email,
        username: fakeUser.login.username,
        urlPhoto: fakeUser.picture.medium
    };
};

export default function FakeUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadAllUsers = async () => {
            const newUsers = [];
            for (let i = 0; i < 5; i++) {
                const user = await loadUser();
                newUsers.push(user);
            }
            setUsers(newUsers);
        };
        loadAllUsers();
    }, []);


    const handleRefresh = async () => {
        const newUsers = [];
        for (let i = 0; i < 5; i++) {
            const user = await loadUser();
            newUsers.push(user);
        }
        setUsers(newUsers);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-3 bg-gray-100 my-2 p-4 rounded-lg shadow-md">
                {users.length === 0 ? (
                    <div>Loading...</div>
                ) : (
                    users.map((user, index) => (
                        <div key={index} className="flex items-center justify-between gap-3 bg-gray-100 my-2 p-4 rounded-lg shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                    <img src={user.urlPhoto} alt="User" className="w-full h-full object-cover"/>
                                </div>
                                <div className="leading-tight">
                                    <div className="font-semibold text-lg text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        @{user.username}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="bg-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-400" onClick={handleRefresh}>
                <Icon icon="mdi-refresh" className="text-black text-xl"/>
            </div>
        </div>
    );
}
