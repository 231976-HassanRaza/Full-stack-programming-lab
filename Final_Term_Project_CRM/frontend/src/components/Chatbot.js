'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { customerAPI } from '@/lib/api';

const BOT_RESPONSES = {
  greet: ['Hello! 👋 I am your CRM assistant. Type **help** to see what I can do.'],
  help: [
    '📋 Available commands:\n• **list customers** — Show all customers\n• **add customer** — Go to add form\n• **invoice** — Open invoice module\n• **dashboard** — Go to dashboard\n• **stats** — Show system stats\n• **help** — Show this menu',
  ],
  unknown: [
    "I didn't understand that. Type **help** to see available commands.",
    "Hmm, I'm not sure about that. Try **help** for the command list.",
  ],
};

function getBotReply(input) {
  const msg = input.toLowerCase().trim();
  if (msg.match(/^(hi|hello|hey|helo)/)) return { type: 'greet' };
  if (msg.includes('help') || msg === '?') return { type: 'help' };
  if (msg.includes('list customer') || msg.includes('show customer') || msg.includes('customers')) return { type: 'customers' };
  if (msg.includes('add customer') || msg.includes('new customer')) return { type: 'addCustomer' };
  if (msg.includes('invoice')) return { type: 'invoice' };
  if (msg.includes('dashboard') || msg.includes('home')) return { type: 'dashboard' };
  if (msg.includes('stat') || msg.includes('count') || msg.includes('total')) return { type: 'stats' };
  return { type: 'unknown' };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hi! I'm your CRM assistant. Type **help** to get started." },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMsg = (from, text) => setMessages(prev => [...prev, { from, text }]);

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg) return;
    addMsg('user', msg);
    setInput('');

    const intent = getBotReply(msg);

    if (intent.type === 'greet') {
      setTimeout(() => addMsg('bot', BOT_RESPONSES.greet[0]), 400);
    } else if (intent.type === 'help') {
      setTimeout(() => addMsg('bot', BOT_RESPONSES.help[0]), 400);
    } else if (intent.type === 'addCustomer') {
      setTimeout(() => {
        addMsg('bot', '➕ Navigating to Add Customer page...');
        router.push('/dashboard/customers/add');
      }, 400);
    } else if (intent.type === 'invoice') {
      setTimeout(() => {
        addMsg('bot', '🧾 Opening Invoice module...');
        router.push('/dashboard/invoices');
      }, 400);
    } else if (intent.type === 'dashboard') {
      setTimeout(() => {
        addMsg('bot', '🏠 Going to Dashboard...');
        router.push('/dashboard');
      }, 400);
    } else if (intent.type === 'customers') {
      try {
        const res = await customerAPI.getAll();
        const list = res.data.slice(0, 5);
        const names = list.map((c, i) => `${i + 1}. ${c.name} (${c.status})`).join('\n');
        addMsg('bot', `👥 Recent customers (showing 5 of ${res.data.length}):\n${names}\n\nNavigating to customers list...`);
        setTimeout(() => router.push('/dashboard/customers'), 800);
      } catch {
        addMsg('bot', '❌ Could not fetch customers. Are you logged in?');
      }
    } else if (intent.type === 'stats') {
      try {
        const res = await customerAPI.getStats();
        const s = res.data;
        addMsg('bot', `📊 System Stats:\n• Total Customers: ${s.total}\n• Active: ${s.active}\n• Leads: ${s.leads}\n• Inactive: ${s.inactive}\n• Total Revenue: PKR ${s.totalRevenue?.toLocaleString()}`);
      } catch {
        addMsg('bot', '❌ Could not fetch stats.');
      }
    } else {
      const replies = BOT_RESPONSES.unknown;
      setTimeout(() => addMsg('bot', replies[Math.floor(Math.random() * replies.length)]), 400);
    }
  };

  const formatText = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/).map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setOpen(!open)} title="CRM Assistant">
        {open ? '✕' : '🤖'}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <h3>🤖 CRM Assistant</h3>
              <p>Rule-based helper</p>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>
                {formatText(msg.text)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a command..."
            />
            <button className="btn btn-primary btn-sm" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
