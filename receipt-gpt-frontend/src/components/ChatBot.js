import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBot = () => {
  const [chatMessages, setChatMessages] = useState([
    { type: 'user', content: 'האם יש אזכור כלשהו של עץ קשה באחת מהקבלות?' },
    { type: 'ai', content: 'כן, יש אזכור של עץ קשה באחת מהתמונות שסופקו. הקבלה מ"Rhine\'s Lumber & Supplies" מציינת "Selected Hardwoods 1pc 1x4x12" עם כמות של 128 ומחיר יחידה של 3.90$, לסכום כולל של 499.20$. יש גם סכום מס מכירה והערה בכתב יד המתייחסת למשלוח, מה שמביא את הסך הכולל בקבלה ל-561.60$.' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { type: 'user', content: newMessage }]);
      setNewMessage('');
      // TODO: Implement AI response logic
      setTimeout(() => {
        setChatMessages(prev => [...prev, { type: 'ai', content: 'תודה על השאלה. אני מעבד את המידע ואחזור אליך בקרוב.' }]);
      }, 1000);
    }
  };

  return (
    <Paper elevation={3} className="chat-interface mt-8 border rounded-lg p-4 bg-gray-50">
      <Typography variant="h6" gutterBottom align="right">שיחה עם AI</Typography>
      <div className="chat-history mb-4 max-h-60 overflow-y-auto">
        {chatMessages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type}-message mb-2`}>
            <Paper elevation={1} style={{ display: 'inline-block', padding: '10px', maxWidth: '80%' }}>
              <Typography>
                <strong>{message.type === 'user' ? 'משתמש:' : 'מערכת:'}</strong> {message.content}
              </Typography>
            </Paper>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input flex">
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="הקלד את ההודעה שלך..."
          InputProps={{
            style: { direction: 'rtl' }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginRight: '10px' }}>
          <SendIcon />
        </Button>
      </div>
    </Paper>
  );
};

export default ChatBot;