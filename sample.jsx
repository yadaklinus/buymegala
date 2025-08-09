import React, { useState, useMemo } from 'react';
import { Mail, User, DollarSign, Gift, Settings as SettingsIcon, Home, BarChart2, LogIn, UserPlus, LogOut, Info, Landmark, AlertTriangle } from 'lucide-react';

// --- Hardcoded Data ---
// In a real application, this would come from a database.
const initialUserData = {
    username: 'elona',
    displayName: 'Elona',
    profilePicture: 'https://placehold.co/128x128/fde047/1f2937?text=E',
    galaPrice: 100, // Price in Naira
    supporters: [
        { id: 1, name: 'Alex', amount: 200, message: 'Loved your latest project! Keep it up.' },
        { id: 2, name: 'Brenda', amount: 500, message: 'Here are five galas! Thanks for the help.' },
        { id: 3, name: 'Charlie', amount: 100, message: 'Amazing work!' },
        { id: 4, name: 'Diana', amount: 300, message: 'Three galas for the best creator!' },
    ],
};

// --- Main App Component ---
// This component manages the state and routing for the entire application.
export default function App() {
    const [currentPage, setCurrentPage] = useState('landing');
    const [userData, setUserData] = useState(initialUserData);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigateTo = (page) => setCurrentPage(page);
    
    const handleUpdateUser = (newDetails) => {
        setUserData(prevData => ({ ...prevData, ...newDetails }));
        navigateTo('dashboard');
    };

    const handleSignIn = () => {
        setIsAuthenticated(true);
        navigateTo('dashboard');
    };
    
    const handleSignUp = () => {
        setIsAuthenticated(true);
        navigateTo('dashboard');
    }

    const handleSignOut = () => {
        setIsAuthenticated(false);
        navigateTo('landing');
    }

    // Simple router to render the correct page based on the current state.
    const renderPage = () => {
        // Protected routes
        if (['dashboard', 'settings', 'profile', 'withdraw'].includes(currentPage) && !isAuthenticated) {
            return <SignInPage navigateTo={navigateTo} onSignIn={handleSignIn} />;
        }
        
        switch (currentPage) {
            case 'signIn':
                return <SignInPage navigateTo={navigateTo} onSignIn={handleSignIn} />;
            case 'signUp':
                return <SignUpPage navigateTo={navigateTo} onSignUp={handleSignUp} />;
            case 'profile':
                return <UserProfilePage user={userData} />;
            case 'dashboard':
                return <DashboardPage user={userData} />;
            case 'settings':
                return <SettingsPage user={userData} onUpdateUser={handleUpdateUser} />;
            case 'withdraw':
                return <WithdrawPage user={userData} />;
            case 'landing':
                return <LandingPage navigateTo={navigateTo} />;
            default:
                return <NotFoundPage navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans antialiased">
            <Navbar navigateTo={navigateTo} isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
            <main className="p-4 sm:p-6 lg:p-8">
                {renderPage()}
            </main>
             <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
                <p>Buy Me A Gala &copy; 2024. Created with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
}

// --- Components (Pages & UI) ---

function Navbar({ navigateTo, isAuthenticated, onSignOut }) {
    return (
        <nav className="bg-white shadow-md w-full sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div 
                        className="flex-shrink-0 flex items-center cursor-pointer"
                        onClick={() => navigateTo('landing')}
                    >
                        <Gift className="h-8 w-8 text-yellow-500" />
                        <span className="ml-2 text-xl font-bold text-gray-800">Buy Me A Gala</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={() => navigateTo('landing')} className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"><Home className="mr-2 h-4 w-4" /> Landing</button>
                            {isAuthenticated ? (
                                <>
                                    <button onClick={() => navigateTo('profile')} className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"><User className="mr-2 h-4 w-4" /> My Page</button>
                                    <button onClick={() => navigateTo('dashboard')} className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"><BarChart2 className="mr-2 h-4 w-4" /> Dashboard</button>
                                    <button onClick={() => navigateTo('withdraw')} className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"><Landmark className="mr-2 h-4 w-4" /> Withdraw</button>
                                    <button onClick={() => navigateTo('settings')} className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"><SettingsIcon className="mr-2 h-4 w-4" /> Settings</button>
                                    <button onClick={onSignOut} className="bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"><LogOut className="mr-2 h-4 w-4" /> Sign Out</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => navigateTo('signIn')} className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"><LogIn className="mr-2 h-4 w-4" /> Sign In</button>
                                    <button onClick={() => navigateTo('signUp')} className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"><UserPlus className="mr-2 h-4 w-4" /> Sign Up</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function LandingPage({ navigateTo }) {
    return (
        <>
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow-xl mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">A new way to fund your creative work.</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Accept support from your audience with the price of a Gala.
                    It's easier than you think.
                </p>
                <div className="mt-8">
                    <button
                        onClick={() => navigateTo('signUp')}
                        className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
                    >
                        Start my Page
                    </button>
                </div>
            </div>

            <div className="text-left py-16 px-8 bg-white rounded-lg shadow-xl">
                 <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center"><Info className="mr-3 h-8 w-8 text-yellow-500" /> About Us</h2>
                 <p className="text-gray-700 leading-relaxed">
                    Welcome to 'Buy Me A Gala'! We believe that creativity should be supported, and appreciation shouldn't be complicated. 'Gala' is a popular, inexpensive snack, and our platform uses it as a metaphor for small, meaningful gestures of support.
                 </p>
                 <p className="mt-4 text-gray-700 leading-relaxed">
                    Whether you're a writer, artist, musician, or developer, 'Buy Me A Gala' provides a simple way for your audience to say "thank you" for your work. Fans can support you with the equivalent cost of one or more galas, making it easy and affordable for anyone to contribute. Our goal is to foster a community where creators can thrive with the direct support of those who love their work.
                 </p>
            </div>
        </>
    );
}

function SignInPage({ navigateTo, onSignIn }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSignIn();
    }
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" placeholder="you@example.com"/>
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg text-lg hover:bg-yellow-600 transition">
                    Sign In
                </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
                Don't have an account?{' '}
                <button onClick={() => navigateTo('signUp')} className="font-medium text-yellow-600 hover:text-yellow-500">
                    Sign Up
                </button>
            </p>
        </div>
    );
}

function SignUpPage({ navigateTo, onSignUp }) {
     const handleSubmit = (e) => {
        e.preventDefault();
        onSignUp();
    }
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Your Page</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <input type="text" id="displayName" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" placeholder="Your Name"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" placeholder="you@example.com"/>
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg text-lg hover:bg-yellow-600 transition">
                    Create Account
                </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
                Already have an account?{' '}
                <button onClick={() => navigateTo('signIn')} className="font-medium text-yellow-600 hover:text-yellow-500">
                    Sign In
                </button>
            </p>
        </div>
    );
}


function UserProfilePage({ user }) {
    const [galas, setGalas] = useState(1);
    const [message, setMessage] = useState('');
    const [supporterName, setSupporterName] = useState('');

    const handleBuyGala = (e) => {
        e.preventDefault();
        const confirmationMessage = document.getElementById('confirmation-message');
        if (confirmationMessage && (galas || 0) > 0) {
            confirmationMessage.classList.remove('hidden');
            setTimeout(() => confirmationMessage.classList.add('hidden'), 4000);
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800">Buy <span className="text-yellow-500">{user.displayName}</span> a gala</h1>
                    <form onSubmit={handleBuyGala} className="mt-8 space-y-6">
                        <div className="bg-gray-100 rounded-lg p-4">
                           <div className="flex flex-wrap items-center gap-4">
                                <Gift className="h-10 w-10 text-yellow-500 flex-shrink-0" />
                                <span className="text-2xl font-bold text-gray-800 flex-shrink-0">x</span>
                                <div className="flex items-center space-x-2 flex-wrap">
                                    {[1, 2, 5, 10].map(num => (
                                        <button key={num} type="button" onClick={() => setGalas(num)} className={`h-12 w-12 rounded-full font-bold text-lg transition-all flex-shrink-0 ${galas === num ? 'bg-yellow-500 text-white scale-110' : 'bg-white hover:bg-yellow-100'}`}>
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <input 
                                    type="number"
                                    value={galas}
                                    onChange={(e) => setGalas(e.target.value ? parseInt(e.target.value, 10) : '')}
                                    className="h-12 w-24 text-center font-bold text-lg border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                    min="1"
                                    placeholder="Custom"
                                />
                           </div>
                        </div>

                        <input type="text" placeholder="Your name (optional)" value={supporterName} onChange={(e) => setSupporterName(e.target.value)} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition" />
                        <textarea placeholder="Say something nice... (optional)" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"></textarea>
                        <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-4 rounded-lg text-xl hover:bg-yellow-600 transition disabled:bg-gray-400" disabled={(galas || 0) <= 0}>Support ₦{user.galaPrice * (galas || 0)}</button>
                        <div id="confirmation-message" className="hidden text-center p-3 bg-green-100 text-green-800 rounded-lg">Thank you for your support!</div>
                    </form>
                </div>
            </div>
            <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <img src={user.profilePicture} alt={user.displayName} className="w-24 h-24 rounded-full mx-auto ring-4 ring-yellow-400" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.displayName}</h2>
                    <p className="text-gray-500">@{user.username}</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4">Recent Supporters</h3>
                    <ul className="space-y-4">
                        {user.supporters.slice(0, 3).map(s => (
                             <li key={s.id} className="flex items-start space-x-3">
                                <span className="text-2xl">🎁</span>
                                <div>
                                    <p className="font-semibold text-gray-700">{s.name} bought {s.amount / user.galaPrice} gala(s).</p>
                                    <p className="text-gray-500 italic">"{s.message}"</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function DashboardPage({ user }) {
    const totalEarnings = useMemo(() => user.supporters.reduce((acc, s) => acc + s.amount, 0), [user.supporters]);
    const totalGalas = useMemo(() => user.supporters.reduce((acc, s) => acc + s.amount / user.galaPrice, 0), [user.supporters, user.galaPrice]);

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="h-6 w-6 text-yellow-600" /></div><div><p className="text-gray-500">Total Earnings</p><p className="text-2xl font-bold text-gray-800">₦{totalEarnings}</p></div></div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-blue-100 p-3 rounded-full"><Gift className="h-6 w-6 text-blue-600" /></div><div><p className="text-gray-500">Galas Received</p><p className="text-2xl font-bold text-gray-800">{totalGalas}</p></div></div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-green-100 p-3 rounded-full"><User className="h-6 w-6 text-green-600" /></div><div><p className="text-gray-500">Total Supporters</p><p className="text-2xl font-bold text-gray-800">{user.supporters.length}</p></div></div>
            </div>
            <div className="bg-white rounded-lg shadow-md"><h2 className="text-xl font-bold text-gray-800 p-6 border-b">Recent Supporters</h2><div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="bg-gray-50"><th className="p-4 font-semibold">From</th><th className="p-4 font-semibold">Amount</th><th className="p-4 font-semibold">Message</th></tr></thead><tbody>{user.supporters.map((s, index) => (<tr key={s.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}><td className="p-4 flex items-center space-x-3"><div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{s.name.charAt(0)}</div><span className="font-medium text-gray-700">{s.name}</span></td><td className="p-4"><span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">₦{s.amount}</span></td><td className="p-4 text-gray-600 italic">"{s.message}"</td></tr>))}</tbody></table></div></div>
        </div>
    );
}

function SettingsPage({ user, onUpdateUser }) {
    const [displayName, setDisplayName] = useState(user.displayName);
    const [username, setUsername] = useState(user.username);
    const [galaPrice, setGalaPrice] = useState(user.galaPrice);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({ displayName, username, galaPrice: parseFloat(galaPrice) || 0 });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"/></div>
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                     <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span><input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" disabled /></div>
                    <p className="text-xs text-gray-500 mt-1">Username cannot be changed.</p>
                </div>
                <div>
                    <label htmlFor="galaPrice" className="block text-sm font-medium text-gray-700 mb-1">Price per gala (₦)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                       <input type="number" id="galaPrice" value={galaPrice} onChange={(e) => setGalaPrice(e.target.value)} min="50" step="10" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"/>
                    </div>
                </div>
                <div className="pt-4"><button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg text-lg hover:bg-yellow-600 transition">Save Changes</button></div>
            </form>
        </div>
    );
}

function WithdrawPage({ user }) {
    const totalEarnings = useMemo(() => user.supporters.reduce((acc, s) => acc + s.amount, 0), [user.supporters]);

    const handleWithdraw = (e) => {
        e.preventDefault();
        const confirmationMessage = document.getElementById('withdraw-confirmation');
        if (confirmationMessage) {
            confirmationMessage.classList.remove('hidden');
            setTimeout(() => confirmationMessage.classList.add('hidden'), 5000);
        }
    };
    
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Withdraw Funds</h1>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-8" role="alert">
                <p className="font-bold">Available Balance</p>
                <p className="text-3xl">₦{totalEarnings.toLocaleString()}</p>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700">Bank Details</h2>
                <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <select id="bankName" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                        <option>Select your bank...</option>
                        <option>Access Bank</option>
                        <option>First Bank</option>
                        <option>Guaranty Trust Bank (GTB)</option>
                        <option>Kuda Bank</option>
                        <option>Opay</option>
                        <option>Palmpay</option>
                        <option>United Bank for Africa (UBA)</option>
                        <option>Zenith Bank</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input type="text" id="accountNumber" required pattern="\d{10}" title="Please enter a 10-digit account number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" placeholder="0123456789" />
                </div>
                 <div>
                    <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                    <input type="text" id="accountName" required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100" value={user.displayName} readOnly />
                </div>
                 <div className="pt-4">
                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-700 transition" disabled={totalEarnings <= 0}>
                        Withdraw ₦{totalEarnings.toLocaleString()}
                    </button>
                </div>
            </form>
            <div id="withdraw-confirmation" className="hidden mt-6 text-center p-3 bg-blue-100 text-blue-800 rounded-lg">
                Withdrawal request submitted! Funds will be processed within 24 hours.
            </div>
        </div>
    );
}

function NotFoundPage({ navigateTo }) {
    return (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow-xl">
            <AlertTriangle className="mx-auto h-24 w-24 text-yellow-500" />
            <h1 className="mt-8 text-6xl font-extrabold text-gray-800">404</h1>
            <h2 className="mt-2 text-3xl font-bold text-gray-700">Page Not Found</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
                Oops! The page you're looking for seems to have gotten lost.
            </p>
            <div className="mt-8">
                <button
                    onClick={() => navigateTo('landing')}
                    className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition duration-300"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}
