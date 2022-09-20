import { useState, useEffect } from 'react';

const UserForm = () => {
    const [usersData, setUsersData] = useState(null);
    const [userEmail, setUserEmail] = useState(``);
    const [userPIN, setUserPIN] = useState(``);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3030/users`)
        .then(res => {

            if (!res.ok) {
                throw new Error(`Could not fetch the data.`);
            }

            return res.json()
        })
        .then(data => {
            setUsersData(data);
        })
        .catch(err => console.log(err.message));
    }, [])

    const handleForm = (e) => {
        e.preventDefault();

        const currentAccount = usersData.find(acc => userEmail === acc.email && userPIN === acc.pin);

        calcBalance(currentAccount);

        calcIncome(currentAccount);

        calcOutcome(currentAccount);

        setLoggedUser(currentAccount);
    }

    const calcBalance = (acc) => {
        acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    }

    const calcIncome = (acc) => {
        acc.income = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    }

    const calcOutcome = (acc) => {
        acc.outcome = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    }

    return (
        <div className="user-form">
            <form onSubmit={handleForm}>
                <label htmlFor="userEmail">Email:</label>
                <input 
                    type="email"
                    id="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <label htmlFor="userPIN">PIN:</label>
                <input 
                    type="text"
                    maxLength={4}
                    id="userPIN"
                    value={userPIN}
                    onChange={(e) => setUserPIN(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
            {loggedUser && (
                <div className="user-data">
                    <h2>Welcome, { loggedUser.username.split(` `)[0] }!</h2>
                    {loggedUser.movements.map((mov, key) => (
                        <h4 key={key}>{mov > 0 ? `deposit` : `withdrawal`} { mov }$</h4>
                    ))}
                    <h3>Balance: { loggedUser.balance }$</h3>
                    <h3>Income: { loggedUser.income }$</h3>
                    <h3>Outcome: { loggedUser.outcome }$</h3>
                </div>
            )}
        </div>
    )
}

export default UserForm;